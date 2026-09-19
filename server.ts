import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

interface AttendanceRecord {
  hadir: boolean;
  hadirAt: string;
  petugas: string;
  catatan?: string;
}

interface ServerState {
  attendanceMap: Record<number, AttendanceRecord>;
  appsScriptUrl: string;
  sheetViewUrl: string;
  lastUpdated: string;
}

const DATA_FILE = path.join(process.cwd(), 'attendance_data.json');
const DEFAULT_SHEET_VIEW_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQctg922kOAZyg5b5s-2_ZZ3Jx0q0vMee_dvpVcsiUEb9mV0a73AFteaArZdc7TR08KyO7iTPilencR/pubhtml?gid=915343721&single=true';

function loadState(): ServerState {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      return {
        attendanceMap: parsed.attendanceMap || {},
        appsScriptUrl: parsed.appsScriptUrl || '',
        sheetViewUrl: parsed.sheetViewUrl || DEFAULT_SHEET_VIEW_URL,
        lastUpdated: parsed.lastUpdated || new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error('Error reading attendance_data.json:', err);
  }
  return {
    attendanceMap: {},
    appsScriptUrl: '',
    sheetViewUrl: DEFAULT_SHEET_VIEW_URL,
    lastUpdated: new Date().toISOString(),
  };
}

function saveState(state: ServerState): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing attendance_data.json:', err);
  }
}

// In-memory active SSE clients
const sseClients = new Set<Response>();

function broadcastSSE(eventType: string, data: any) {
  const payload = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch {
      sseClients.delete(client);
    }
  }
}

async function forwardToAppsScript(
  url: string,
  voterNo: number,
  hadir: boolean,
  waktu: string,
  petugas: string
) {
  if (!url || !url.trim()) return;
  try {
    const payload = JSON.stringify({
      action: 'mark',
      no: voterNo,
      hadir: hadir,
      waktu: waktu,
      petugas: petugas,
      timestamp: new Date().toISOString(),
    });

    // Send POST
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: payload,
    }).catch((e) => console.warn('Server GAS POST notice:', e));

    // Fallback GET parameter query
    const getUrl = new URL(url);
    getUrl.searchParams.set('action', 'mark');
    getUrl.searchParams.set('no', voterNo.toString());
    getUrl.searchParams.set('hadir', hadir ? 'true' : 'false');
    getUrl.searchParams.set('waktu', waktu);
    getUrl.searchParams.set('petugas', petugas);
    getUrl.searchParams.set('_t', Date.now().toString());

    fetch(getUrl.toString(), { method: 'GET' }).catch((e) =>
      console.warn('Server GAS GET notice:', e)
    );
  } catch (err) {
    console.warn('Error forwarding to Apps Script from server:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API 1: Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // API 2: Get shared attendance state across all devices
  app.get('/api/attendance', (_req: Request, res: Response) => {
    const state = loadState();
    res.json({
      success: true,
      attendanceMap: state.attendanceMap,
      appsScriptUrl: state.appsScriptUrl,
      sheetViewUrl: state.sheetViewUrl,
      lastUpdated: state.lastUpdated,
    });
  });

  // API 3: Mark or unmark attendance (shared across all devices)
  app.post('/api/attendance/mark', (req: Request, res: Response) => {
    const { voterNo, hadir, waktu, petugas } = req.body;
    const numNo = Number(voterNo);

    if (!numNo || isNaN(numNo)) {
      return res.status(400).json({ success: false, error: 'Invalid voterNo' });
    }

    const state = loadState();
    const timeStr =
      waktu ||
      new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });
    const petStr = petugas || 'Petugas Meja';

    if (hadir) {
      state.attendanceMap[numNo] = {
        hadir: true,
        hadirAt: timeStr,
        petugas: petStr,
      };
    } else {
      delete state.attendanceMap[numNo];
    }

    state.lastUpdated = new Date().toISOString();
    saveState(state);

    // Broadcast to all connected devices in real time
    broadcastSSE('update', {
      voterNo: numNo,
      hadir: Boolean(hadir),
      record: state.attendanceMap[numNo] || null,
      attendanceMap: state.attendanceMap,
      lastUpdated: state.lastUpdated,
    });

    // Forward to Apps Script if configured
    if (state.appsScriptUrl) {
      forwardToAppsScript(state.appsScriptUrl, numNo, Boolean(hadir), timeStr, petStr);
    }

    return res.json({
      success: true,
      attendanceMap: state.attendanceMap,
      lastUpdated: state.lastUpdated,
    });
  });

  // API 4: Reset all attendance data across all devices
  app.post('/api/attendance/reset', (_req: Request, res: Response) => {
    const state = loadState();
    state.attendanceMap = {};
    state.lastUpdated = new Date().toISOString();
    saveState(state);

    broadcastSSE('reset', {
      attendanceMap: {},
      lastUpdated: state.lastUpdated,
    });

    return res.json({
      success: true,
      attendanceMap: {},
      lastUpdated: state.lastUpdated,
    });
  });

  // API 5: Save global Apps Script or Sheet URL configuration
  app.post('/api/config', (req: Request, res: Response) => {
    const { appsScriptUrl, sheetViewUrl } = req.body;
    const state = loadState();

    if (typeof appsScriptUrl === 'string') {
      state.appsScriptUrl = appsScriptUrl.trim();
    }
    if (typeof sheetViewUrl === 'string') {
      state.sheetViewUrl = sheetViewUrl.trim();
    }
    state.lastUpdated = new Date().toISOString();
    saveState(state);

    broadcastSSE('config', {
      appsScriptUrl: state.appsScriptUrl,
      sheetViewUrl: state.sheetViewUrl,
      lastUpdated: state.lastUpdated,
    });

    return res.json({
      success: true,
      appsScriptUrl: state.appsScriptUrl,
      sheetViewUrl: state.sheetViewUrl,
    });
  });

  // API 6: SSE stream for real-time live sync across devices
  app.get('/api/attendance/stream', (req: Request, res: Response) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    res.flushHeaders?.();

    const state = loadState();
    res.write(`event: init\ndata: ${JSON.stringify(state)}\n\n`);

    sseClients.add(res);

    const pingTimer = setInterval(() => {
      try {
        res.write(': ping\n\n');
      } catch {
        clearInterval(pingTimer);
        sseClients.delete(res);
      }
    }, 15000);

    req.on('close', () => {
      clearInterval(pingTimer);
      sseClients.delete(res);
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
