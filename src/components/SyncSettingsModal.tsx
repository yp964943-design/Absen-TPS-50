import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
  Download,
  Database,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Code2,
  Send,
  HelpCircle,
  Link2,
} from 'lucide-react';
import {
  GOOGLE_SHEET_CSV_URL,
  DEFAULT_GOOGLE_SHEET_VIEW_URL,
  AttendanceMap,
  getAppsScriptUrl,
  saveAppsScriptUrl,
  testAppsScriptPing,
  sendTestVoterToAppsScript,
  getCustomSheetUrl,
  saveCustomSheetUrl,
  getActiveSheetViewUrl,
} from '../utils/csvSync';
import { Voter } from '../data/initialVoters';
import { GOOGLE_APPS_SCRIPT_CODE } from '../data/appsScriptCode';

interface SyncSettingsModalProps {
  onClose: () => void;
  isSyncing: boolean;
  onRefresh: () => void;
  lastSyncTime: string;
  source: 'google_sheets' | 'local_cache';
  voters: Voter[];
  attendanceMap: AttendanceMap;
  onResetAttendance: () => void;
  onExportCSV: () => void;
  onAppsScriptUrlChanged?: (url: string) => void;
  onSheetUrlChanged?: (url: string) => void;
}

export const SyncSettingsModal: React.FC<SyncSettingsModalProps> = ({
  onClose,
  isSyncing,
  onRefresh,
  lastSyncTime,
  source,
  voters,
  attendanceMap,
  onResetAttendance,
  onExportCSV,
  onAppsScriptUrlChanged,
  onSheetUrlChanged,
}) => {
  const [activeTab, setActiveTab] = useState<'script' | 'database'>('script');
  const [copiedCsvUrl, setCopiedCsvUrl] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  // Sheet URL states
  const [sheetUrlInput, setSheetUrlInput] = useState<string>(() => getCustomSheetUrl() || DEFAULT_GOOGLE_SHEET_VIEW_URL);
  const [sheetSaveNotice, setSheetSaveNotice] = useState<string | null>(null);

  // Apps Script states
  const [appsScriptUrl, setAppsScriptUrlState] = useState<string>(() => getAppsScriptUrl());
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isWritingTest, setIsWritingTest] = useState<boolean>(false);
  const [testWriteResult, setTestWriteResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleCopyCsvUrl = () => {
    navigator.clipboard.writeText(sheetUrlInput);
    setCopiedCsvUrl(true);
    setTimeout(() => setCopiedCsvUrl(false), 2000);
  };

  const handleSaveSheetUrl = () => {
    const trimmed = sheetUrlInput.trim();
    saveCustomSheetUrl(trimmed);
    if (onSheetUrlChanged) {
      onSheetUrlChanged(getActiveSheetViewUrl());
    }
    setSheetSaveNotice('Tautan Google Spreadsheet berhasil diperbarui!');
    setTimeout(() => setSheetSaveNotice(null), 3000);
  };

  const handleResetSheetUrl = () => {
    saveCustomSheetUrl('');
    setSheetUrlInput(DEFAULT_GOOGLE_SHEET_VIEW_URL);
    if (onSheetUrlChanged) {
      onSheetUrlChanged(DEFAULT_GOOGLE_SHEET_VIEW_URL);
    }
    setSheetSaveNotice('Tautan dikembalikan ke Spreadsheet Resmi TPS 50.');
    setTimeout(() => setSheetSaveNotice(null), 3000);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleSaveAndTestScript = async () => {
    saveAppsScriptUrl(appsScriptUrl);
    if (onAppsScriptUrlChanged) {
      onAppsScriptUrlChanged(appsScriptUrl);
    }

    if (!appsScriptUrl.trim()) {
      setTestResult({
        success: false,
        message: 'Silakan tempel URL Web App dari Google Apps Script yang berakhiran /exec.',
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    const res = await testAppsScriptPing(appsScriptUrl.trim());
    setTestResult(res);
    setIsTesting(false);
  };

  const handleTestWriteRow = async () => {
    saveAppsScriptUrl(appsScriptUrl);
    if (onAppsScriptUrlChanged) {
      onAppsScriptUrlChanged(appsScriptUrl);
    }

    if (!appsScriptUrl.trim()) {
      setTestWriteResult({
        success: false,
        message: 'Silakan tempel URL Web App terlebih dahulu sebelum menguji tulis data.',
      });
      return;
    }

    setIsWritingTest(true);
    setTestWriteResult(null);

    const res = await sendTestVoterToAppsScript(appsScriptUrl.trim());
    setTestWriteResult(res);
    setIsWritingTest(false);
  };

  const attendedCount = Object.values(attendanceMap).filter((a) => a.hadir).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-6 overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                Integrasi Database & Google Apps Script
              </h3>
              <p className="text-[11px] text-slate-400">
                Pilkades Wanajaya &bull; Sinkronisasi Baca & Tulis Google Spreadsheet
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('script')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'script'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Kode Google Apps Script (Tulis Balik)</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'database'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Database CSV & Cadangan</span>
          </button>
        </div>

        {/* Tab 1: Google Apps Script Integration */}
        {activeTab === 'script' ? (
          <div className="p-6 space-y-5 overflow-y-auto text-xs text-slate-700">
            {/* Intro Alert */}
            <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-amber-950 space-y-1.5">
              <div className="font-bold flex items-center gap-2 text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Penting: Mengapa Data Presensi Belum Masuk ke Google Sheet?</span>
              </div>
              <p className="text-[11px] text-amber-900/90 leading-relaxed">
                Tautan CSV Spreadsheet yang dipublikasikan hanya bersifat <strong>BACA (Read-Only)</strong>. Untuk <strong>MENULIS & MENYIMPAN</strong> data kehadiran secara otomatis ke Google Sheets, Google mewajibkan penggunaan endpoint <strong>Google Apps Script Web App</strong>.
              </p>
              <p className="text-[11px] text-amber-900/90 leading-relaxed">
                Silakan ikuti panduan 3 langkah di bawah ini (hanya butuh 2 menit). Setelah URL Web App ditempelkan di bawah, setiap kali petugas mengklik <strong>&quot;Tandai Hadir&quot;</strong>, status dan jam presensi akan langsung tertulis ke <strong>Kolom F (ABSENSI)</strong> di Google Spreadsheet secara real-time!
              </p>
            </div>

            {/* Step-by-step instructions */}
            <div>
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                Panduan Pemasangan Google Apps Script (Hanya 2 Menit):
              </h4>
              <ol className="space-y-2.5 text-[11px] text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Buka Google Spreadsheet DPT Pilkades Wanajaya Anda, lalu klik menu <strong>Ekstensi (Extensions)</strong> &rarr; pilih <strong>Apps Script</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Hapus semua tulisan bawaan di editor <code>Code.gs</code>. Klik tombol <strong>&quot;Salin Kode Script&quot;</strong> di bawah, lalu tempelkan (Paste). Klik ikon disket <strong>Simpan (Save)</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <p>
                      Klik tombol biru <strong>Terapkan (Deploy)</strong> di kanan atas &rarr; pilih <strong>Penerapan baru (New deployment)</strong>:
                    </p>
                    <ul className="mt-1 space-y-1 list-disc list-inside text-slate-700 bg-white p-2 rounded border border-slate-200 font-medium">
                      <li>Pilih jenis (ikon gerigi ⚙️): <strong>Aplikasi web (Web app)</strong></li>
                      <li>Jalankan sebagai (Execute as): <strong>Saya (Me)</strong></li>
                      <li>Yang memiliki akses (Who has access): <strong className="text-emerald-700">Siapa saja (Anyone)</strong> <span className="text-[10px] text-slate-500">(Wajib &quot;Anyone&quot; agar browser dapat mengirim data)</span></li>
                    </ul>
                    <p className="mt-1">
                      Klik <strong>Terapkan</strong> &rarr; Berikan izin akun (Review permissions &rarr; Advanced &rarr; Go to... unsafe) &rarr; Salin <strong>URL Aplikasi Web (Web App URL)</strong> yang berakhiran <code>/exec</code>, lalu tempelkan pada kolom input di bawah ini.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Code block with copy button */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                  Kode Google Apps Script (Code.gs):
                </span>
                <button
                  onClick={handleCopyScript}
                  className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedScript ? 'Kode Disalin!' : 'Salin Kode Script'}</span>
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 font-mono text-[11px] text-slate-200">
                <div className="bg-slate-900 px-3.5 py-1.5 border-b border-slate-800 text-slate-400 text-[10px] flex justify-between items-center">
                  <span>Google Apps Script &bull; Code.gs</span>
                  <span className="text-emerald-400">Siap Pakai (Full Feature)</span>
                </div>
                <pre className="p-4 max-h-56 overflow-y-auto leading-relaxed text-slate-300">
                  {GOOGLE_APPS_SCRIPT_CODE}
                </pre>
              </div>
            </div>

            {/* Web App URL Connection Configuration */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-emerald-600" />
                  URL Web App Google Apps Script Anda:
                </label>
                {appsScriptUrl && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Terkonfigurasi
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={appsScriptUrl}
                  onChange={(e) => {
                    setAppsScriptUrlState(e.target.value);
                    setTestResult(null);
                    setTestWriteResult(null);
                  }}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  onClick={handleSaveAndTestScript}
                  disabled={isTesting}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shrink-0 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  <Send className={`w-3.5 h-3.5 ${isTesting ? 'animate-pulse' : ''}`} />
                  <span>{isTesting ? 'Menguji...' : 'Simpan & Tes'}</span>
                </button>
              </div>

              {testResult && (
                <div
                  className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
                    testResult.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span>{testResult.message}</span>
                </div>
              )}

              {/* Direct Live Write Test */}
              <div className="pt-2 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-semibold text-slate-900 text-xs">Uji Coba Tulis Langsung ke Google Sheet:</span>
                    <p className="text-[11px] text-slate-500">
                      Klik untuk mengirim 1 data presensi uji coba ke pemilih urut #1 di spreadsheet Anda.
                    </p>
                  </div>
                  <button
                    onClick={handleTestWriteRow}
                    disabled={isWritingTest || !appsScriptUrl.trim()}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shrink-0 transition-colors disabled:opacity-40 cursor-pointer shadow-xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isWritingTest ? 'animate-spin text-emerald-400' : ''}`} />
                    <span>{isWritingTest ? 'Mengirim Data...' : 'Kirim Tes Baris #1'}</span>
                  </button>
                </div>

                {testWriteResult && (
                  <div
                    className={`mt-2.5 p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                      testWriteResult.success
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                  >
                    {testWriteResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <span className="leading-relaxed">{testWriteResult.message}</span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-500">
                Setelah URL ini disimpan, setiap aksi verifikasi absensi di TPS akan otomatis memperbarui spreadsheet secara langsung!
              </p>
            </div>
          </div>
        ) : (
          /* Tab 2: Published CSV & Backup */
          <div className="p-6 space-y-5 overflow-y-auto text-xs text-slate-700">
            {/* Status badge */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      source === 'google_sheets' ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                  ></span>
                  {source === 'google_sheets'
                    ? 'Terhubung Langsung ke Google Spreadsheet (CSV Publik)'
                    : 'Menggunakan Database Lokal Siap Pakai'}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Pembaruan terakhir: {lastSyncTime ? `Pukul ${lastSyncTime} WIB` : 'Saat aplikasi dibuka'}
                </p>
              </div>

              <button
                onClick={onRefresh}
                disabled={isSyncing}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Sekarang'}</span>
              </button>
            </div>

            {/* Configurable Spreadsheet URL */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tautan Google Spreadsheet DPT:</span>
                </label>
                {Boolean(getCustomSheetUrl()) ? (
                  <span className="text-[10px] text-amber-700 bg-amber-100 font-semibold px-2 py-0.5 rounded-md">
                    Link Kustom
                  </span>
                ) : (
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 font-semibold px-2 py-0.5 rounded-md">
                    Link TPS 50 Resmi
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={sheetUrlInput}
                  onChange={(e) => setSheetUrlInput(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-mono text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  onClick={handleCopyCsvUrl}
                  className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors shrink-0 cursor-pointer"
                  title="Salin Tautan"
                >
                  {copiedCsvUrl ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={getActiveSheetViewUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shrink-0 cursor-pointer"
                  title="Buka Lembar Spreadsheet Asli di Tab Baru"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {sheetSaveNotice && (
                <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-[11px] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{sheetSaveNotice}</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={handleResetSheetUrl}
                  className="text-[11px] text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Reset ke Link TPS 50 Asli
                </button>
                <button
                  onClick={handleSaveSheetUrl}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan Link</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Anda dapat mengganti tautan ini dengan URL Spreadsheet Google Anda sendiri (baik format <code>/edit</code> maupun format <code>/pubhtml</code>).
              </p>
            </div>

            {/* Export / Backup Section */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="font-semibold text-slate-800 mb-2">Cadangan & Ekspor Data</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={onExportCSV}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left flex items-start gap-2.5 transition-colors"
                >
                  <Download className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Ekspor Rekap CSV</span>
                    <span className="text-[11px] text-slate-500">
                      Unduh file CSV berisi DPT dan status kehadiran
                    </span>
                  </div>
                </button>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Status Presensi Lokal</span>
                    <span className="text-[11px] text-slate-500">
                      {attendedCount} pemilih tersimpan di memori perangkat
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger zone / Reset */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="font-semibold text-rose-700 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Reset Data Kehadiran Sesi
              </h4>

              {!confirmReset ? (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg font-medium transition-colors"
                >
                  Kosongkan Data Absensi Lokal
                </button>
              ) : (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                  <p className="text-rose-800 font-medium">
                    Apakah Anda yakin ingin menghapus {attendedCount} rekaman absensi lokal? Tindakan ini tidak dapat dibatalkan.
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onResetAttendance();
                        setConfirmReset(false);
                      }}
                      className="px-3 py-1 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700"
                    >
                      Ya, Hapus Semua
                    </button>
                    <button
                      onClick={() => setConfirmReset(false)}
                      className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-500">
            {appsScriptUrl ? (
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Dua Arah (Two-Way Sync) Aktif
              </span>
            ) : (
              <span className="text-slate-500">
                Satu Arah (Baca dari Spreadsheet). Pasang Apps Script untuk tulis balik.
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
