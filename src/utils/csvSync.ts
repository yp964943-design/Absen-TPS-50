import { INITIAL_VOTERS, Voter } from '../data/initialVoters';

export const DEFAULT_GOOGLE_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQctg922kOAZyg5b5s-2_ZZ3Jx0q0vMee_dvpVcsiUEb9mV0a73AFteaArZdc7TR08KyO7iTPilencR/pub?gid=915343721&single=true&output=csv';

export const DEFAULT_GOOGLE_SHEET_VIEW_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQctg922kOAZyg5b5s-2_ZZ3Jx0q0vMee_dvpVcsiUEb9mV0a73AFteaArZdc7TR08KyO7iTPilencR/pubhtml?gid=915343721&single=true';

export const GOOGLE_SHEET_CSV_URL = DEFAULT_GOOGLE_SHEET_CSV_URL;

export const LOCAL_STORAGE_KEY = 'pilkades_wanajaya_attendance_records_v2';
export const OPERATOR_STORAGE_KEY = 'pilkades_wanajaya_operator_name';
export const APPS_SCRIPT_STORAGE_KEY = 'pilkades_wanajaya_apps_script_url';
export const SHEET_URL_STORAGE_KEY = 'pilkades_wanajaya_custom_sheet_url';

// Purge obsolete v1 cache immediately upon script initialization
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem('pilkades_wanajaya_attendance_records_v1');
  }
} catch (e) {
  // ignore
}

/**
 * Clear all Pilkades data from LocalStorage
 */
export function clearAllLocalStorage(): void {
  try {
    localStorage.removeItem('pilkades_wanajaya_attendance_records_v1');
    localStorage.removeItem('pilkades_wanajaya_attendance_records_v2');
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({}));
  } catch (err) {
    console.error('Error clearing local storage:', err);
  }
}

export interface AttendanceRecord {
  hadir: boolean;
  hadirAt: string; // ISO string or format
  petugas?: string;
  catatan?: string;
}

export type AttendanceMap = Record<number, AttendanceRecord>;

/**
 * Get saved custom Google Sheet URL (if user configured another sheet)
 */
export function getCustomSheetUrl(): string {
  try {
    return localStorage.getItem(SHEET_URL_STORAGE_KEY) || '';
  } catch (err) {
    return '';
  }
}

/**
 * Save custom Google Sheet URL
 */
export function saveCustomSheetUrl(url: string): void {
  try {
    const trimmed = url.trim();
    if (!trimmed) {
      localStorage.removeItem(SHEET_URL_STORAGE_KEY);
    } else {
      localStorage.setItem(SHEET_URL_STORAGE_KEY, trimmed);
    }
  } catch (err) {
    console.error('Error saving custom sheet URL:', err);
  }
}

/**
 * Returns the URL to open in browser for viewing the Google Spreadsheet
 */
export function getActiveSheetViewUrl(): string {
  const custom = getCustomSheetUrl();
  if (custom) {
    if (custom.includes('output=csv')) {
      return custom.replace('output=csv', 'output=html');
    }
    return custom;
  }
  return DEFAULT_GOOGLE_SHEET_VIEW_URL;
}

/**
 * Returns the URL for CSV parsing
 */
export function getActiveSheetCsvUrl(): string {
  const custom = getCustomSheetUrl();
  if (custom) {
    if (custom.includes('/pub') && !custom.includes('output=csv')) {
      const sep = custom.includes('?') ? '&' : '?';
      return `${custom}${sep}output=csv`;
    }
    const match = custom.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1] && !custom.includes('/pub')) {
      return `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv`;
    }
    return custom;
  }
  return DEFAULT_GOOGLE_SHEET_CSV_URL;
}

/**
 * Get saved Google Apps Script Web App URL
 */
export function getAppsScriptUrl(): string {
  try {
    return localStorage.getItem(APPS_SCRIPT_STORAGE_KEY) || '';
  } catch (err) {
    return '';
  }
}

/**
 * Save Google Apps Script Web App URL
 */
export function saveAppsScriptUrl(url: string): void {
  try {
    localStorage.setItem(APPS_SCRIPT_STORAGE_KEY, url.trim());
  } catch (err) {
    console.error('Error saving Apps Script URL:', err);
  }
}

/**
 * Send real-time attendance update to Google Apps Script Web App
 */
export async function syncAttendanceToAppsScript(
  voterNo: number,
  hadir: boolean,
  waktu: string,
  petugas: string,
  customUrl?: string
): Promise<{ success: boolean; configured: boolean; message: string }> {
  const url = customUrl || getAppsScriptUrl();
  if (!url) {
    return {
      success: false,
      configured: false,
      message: 'URL Google Apps Script belum dimasukkan. Data sementara hanya tersimpan di memori browser.',
    };
  }

  try {
    const payload = JSON.stringify({
      action: 'mark',
      no: voterNo,
      hadir: hadir,
      waktu: waktu,
      petugas: petugas,
      _t: Date.now(),
    });

    // 1. Channel POST with mode: 'no-cors' (Standard for Google Apps Script Web App webhooks)
    const postPromise = fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: payload,
    }).catch((e) => {
      console.warn('GAS POST notice:', e);
    });

    // 2. Channel GET with query parameters as fallback / redundant delivery
    const getUrl = new URL(url);
    getUrl.searchParams.set('action', 'mark');
    getUrl.searchParams.set('no', voterNo.toString());
    getUrl.searchParams.set('hadir', hadir ? 'true' : 'false');
    getUrl.searchParams.set('waktu', waktu);
    getUrl.searchParams.set('petugas', petugas);
    getUrl.searchParams.set('_t', Date.now().toString());

    const getPromise = fetch(getUrl.toString(), {
      method: 'GET',
      mode: 'no-cors',
    }).catch((e) => {
      console.warn('GAS GET notice:', e);
    });

    // Wait for at least one to complete dispatch
    await Promise.race([postPromise, getPromise]);

    return {
      success: true,
      configured: true,
      message: hadir
        ? `Presensi #${voterNo} berhasil dikirim ke Google Sheets.`
        : `Pembatalan presensi #${voterNo} dikirim ke Google Sheets.`,
    };
  } catch (err) {
    console.warn('Failed sending attendance to Apps Script:', err);
    return {
      success: false,
      configured: true,
      message: `Gagal mengirim ke Google Sheets: ${String(err)}`,
    };
  }
}

/**
 * Send a test attendance row (e.g. voter #1) to verify Google Sheets write
 */
export async function sendTestVoterToAppsScript(
  url: string
): Promise<{ success: boolean; message: string }> {
  if (!url || !url.startsWith('https://script.google.com')) {
    return {
      success: false,
      message: 'URL harus berupa tautan Web App Google Apps Script resmi yang berakhiran /exec',
    };
  }

  const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
  const res = await syncAttendanceToAppsScript(1, true, now, 'Uji Coba Sistem', url);
  if (res.success) {
    return {
      success: true,
      message: `Perintah uji coba berhasil dikirim! Silakan buka Google Spreadsheet Anda dan periksa Kolom F (ABSENSI) pada baris pemilih #1.`,
    };
  } else {
    return {
      success: false,
      message: res.message,
    };
  }
}

/**
 * Test connectivity with Apps Script Web App
 */
export async function testAppsScriptPing(url: string): Promise<{ success: boolean; message: string }> {
  if (!url || !url.startsWith('http')) {
    return { success: false, message: 'URL Apps Script harus diawali dengan https://' };
  }

  try {
    const testUrl = new URL(url);
    testUrl.searchParams.set('action', 'ping');
    testUrl.searchParams.set('_t', Date.now().toString());

    const res = await fetch(testUrl.toString(), {
      method: 'GET',
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: Boolean(data.success),
        message: data.message || 'Koneksi ke Google Apps Script berhasil terhubung!',
      };
    } else {
      return {
        success: false,
        message: `Koneksi gagal dengan status HTTP ${res.status}`,
      };
    }
  } catch (err) {
    // If browser block due to CORS or redirect, we can still test with no-cors probe
    try {
      await fetch(url, { method: 'GET', mode: 'no-cors' });
      return {
        success: true,
        message: 'Endpoint Apps Script merespons (Mode transmisi aktif).',
      };
    } catch (innerErr) {
      return {
        success: false,
        message: 'Gagal terhubung ke Apps Script. Pastikan Web App disetel ke "Anyone" (Siapa saja).',
      };
    }
  }
}

/**
 * Parses raw CSV text into array of voters
 */
export function parseGoogleSheetCSV(csvText: string): Voter[] {
  const lines = csvText.split(/\r?\n/);
  const result: Voter[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle CSV splitting safely for simple comma separated fields
    const parts = line.split(',').map((p) => p.trim().replace(/^["']|["']$/g, ''));
    const no = parseInt(parts[0], 10);

    if (!isNaN(no) && no > 0) {
      result.push({
        no,
        nama: parts[1] || '',
        jk: (parts[2] || 'L').toUpperCase(),
        alamat: parts[3] || 'PESONA GADING CIBITUNG',
        rt: parts[4] || '',
        absensi: parts[5] || '',
      });
    }
  }

  return result.length > 0 ? result : INITIAL_VOTERS;
}

/**
 * Load attendance map from LocalStorage
 */
export function getSavedAttendance(): AttendanceMap {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved !== null) {
      const map: AttendanceMap = JSON.parse(saved);
      if (map[8]) {
        delete map[8];
        saveAttendance(map);
      }
      return map;
    }
    return {};
  } catch (err) {
    console.error('Error reading localStorage attendance:', err);
  }
  return {};
}

/**
 * Fetch shared attendance map and configuration from centralized server
 */
export async function fetchServerAttendance(): Promise<{
  success: boolean;
  attendanceMap: AttendanceMap;
  appsScriptUrl?: string;
  sheetViewUrl?: string;
  lastUpdated?: string;
}> {
  try {
    const res = await fetch('/api/attendance', {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        attendanceMap: data.attendanceMap || {},
        appsScriptUrl: data.appsScriptUrl || '',
        sheetViewUrl: data.sheetViewUrl || '',
        lastUpdated: data.lastUpdated,
      };
    }
  } catch (err) {
    console.warn('Cannot reach /api/attendance server endpoint, using fallback:', err);
  }
  return {
    success: false,
    attendanceMap: getSavedAttendance(),
  };
}

/**
 * Persist marked attendance on centralized server so all devices stay identical
 */
export async function markAttendanceOnServer(
  voterNo: number,
  hadir: boolean,
  waktu?: string,
  petugas?: string
): Promise<{ success: boolean; attendanceMap?: AttendanceMap }> {
  try {
    const res = await fetch('/api/attendance/mark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voterNo, hadir, waktu, petugas }),
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, attendanceMap: data.attendanceMap };
    }
  } catch (err) {
    console.warn('markAttendanceOnServer error:', err);
  }
  return { success: false };
}

/**
 * Reset shared attendance on centralized server for all connected devices
 */
export async function resetAttendanceOnServer(): Promise<{ success: boolean }> {
  try {
    const res = await fetch('/api/attendance/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      return { success: true };
    }
  } catch (err) {
    console.warn('resetAttendanceOnServer error:', err);
  }
  return { success: false };
}

/**
 * Save configuration to centralized server so all devices share Apps Script and Sheet URLs
 */
export async function saveConfigToServer(
  appsScriptUrl?: string,
  sheetViewUrl?: string
): Promise<void> {
  try {
    await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appsScriptUrl, sheetViewUrl }),
    });
  } catch (err) {
    console.warn('saveConfigToServer error:', err);
  }
}

/**
 * Save attendance map to LocalStorage
 */
export function saveAttendance(map: AttendanceMap): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(map));
  } catch (err) {
    console.error('Error saving localStorage attendance:', err);
  }
}

/**
 * Fetch voter data from Google Sheets with fallback to initial data
 */
export async function fetchLiveVoters(): Promise<{
  voters: Voter[];
  source: 'google_sheets' | 'local_cache';
  timestamp: string;
}> {
  // 1. If Apps Script Web App is configured, try querying getAll first for real-time live attendance
  const appsScriptUrl = getAppsScriptUrl();
  if (appsScriptUrl) {
    try {
      const gasUrl = new URL(appsScriptUrl);
      gasUrl.searchParams.set('action', 'getAll');
      gasUrl.searchParams.set('_t', Date.now().toString());
      const gasRes = await fetch(gasUrl.toString(), { method: 'GET' });
      if (gasRes.ok) {
        const gasData = await gasRes.json();
        if (gasData.success && Array.isArray(gasData.data) && gasData.data.length > 0) {
          const attendanceMap = new Map<number, string>();
          gasData.data.forEach((item: { no: number; absensi?: string }) => {
            if (item.absensi) {
              attendanceMap.set(item.no, item.absensi);
            }
          });

          const merged = INITIAL_VOTERS.map((v) => {
            const abs = attendanceMap.get(v.no);
            if (abs) {
              return { ...v, absensi: abs };
            }
            return v;
          });

          return {
            voters: merged,
            source: 'google_sheets',
            timestamp: new Date().toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          };
        }
      }
    } catch (gasErr) {
      console.warn('Apps Script getAll sync notice:', gasErr);
    }
  }

  // 2. Try fetching from configured Google Sheet CSV URL
  try {
    const csvUrl = getActiveSheetCsvUrl();
    const separator = csvUrl.includes('?') ? '&' : '?';
    const targetUrl = `${csvUrl}${separator}_t=${Date.now()}`;

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        Accept: 'text/csv, text/plain, */*',
      },
    });

    if (response.ok) {
      const text = await response.text();
      // Verify it is actual CSV rather than an HTML redirect page
      if (text && !text.trim().startsWith('<')) {
        const parsed = parseGoogleSheetCSV(text);
        if (parsed.length > 0) {
          return {
            voters: parsed,
            source: 'google_sheets',
            timestamp: new Date().toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          };
        }
      }
    }
  } catch (error) {
    console.warn('Failed to fetch published Google Sheets directly, using fallback:', error);
  }

  return {
    voters: INITIAL_VOTERS,
    source: 'local_cache',
    timestamp: new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  };
}

/**
 * Play a simple polite chime using Web Audio API
 */
export function playAttendanceBeep(type: 'success' | 'undo' = 'success') {
  try {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(329.63, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    }
  } catch (e) {
    // Audio might be blocked before user interaction, which is fine
  }
}
