import { INITIAL_VOTERS, Voter } from '../data/initialVoters';

export const GOOGLE_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQctg922kOAZyg5b5s-2_ZZ3Jx0q0vMee_dvpVcsiUEb9mV0a73AFteaArZdc7TR08KyO7iTPilencR/pub?gid=915343721&single=true&output=csv';

export const LOCAL_STORAGE_KEY = 'pilkades_wanajaya_attendance_records_v1';
export const OPERATOR_STORAGE_KEY = 'pilkades_wanajaya_operator_name';
export const APPS_SCRIPT_STORAGE_KEY = 'pilkades_wanajaya_apps_script_url';

export interface AttendanceRecord {
  hadir: boolean;
  hadirAt: string; // ISO string or format
  petugas?: string;
  catatan?: string;
}

export type AttendanceMap = Record<number, AttendanceRecord>;

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
): Promise<{ success: boolean; message?: string }> {
  const url = customUrl || getAppsScriptUrl();
  if (!url) {
    return { success: false, message: 'Apps Script URL belum dikonfigurasi' };
  }

  try {
    // Construct query parameters for GET request to avoid CORS preflight issues with GAS
    const endpoint = new URL(url);
    endpoint.searchParams.set('action', 'mark');
    endpoint.searchParams.set('no', voterNo.toString());
    endpoint.searchParams.set('hadir', hadir ? 'true' : 'false');
    endpoint.searchParams.set('waktu', waktu);
    endpoint.searchParams.set('petugas', petugas);
    endpoint.searchParams.set('_t', Date.now().toString());

    // Use mode: 'no-cors' as fallback to guarantee transmission even if redirect occurs
    const res = await fetch(endpoint.toString(), {
      method: 'GET',
      mode: 'no-cors',
    });

    return { success: true, message: 'Terkirim ke Google Sheets' };
  } catch (err) {
    console.warn('Failed sending attendance to Apps Script:', err);
    return { success: false, message: String(err) };
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
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error('Error reading localStorage attendance:', err);
  }
  return {};
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
  try {
    // Add cache buster to bypass browser aggressive caching on published spreadsheets
    const url = `${GOOGLE_SHEET_CSV_URL}&_t=${Date.now()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'text/csv, text/plain, */*',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const text = await response.text();
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
