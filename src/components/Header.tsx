import React from 'react';
import {
  RefreshCw,
  ExternalLink,
  Volume2,
  VolumeX,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Printer,
  Download,
} from 'lucide-react';
import { getActiveSheetViewUrl } from '../utils/csvSync';

interface HeaderProps {
  currentTime: Date;
  lastSyncTime: string;
  isSyncing: boolean;
  onRefresh: () => void;
  autoSync: boolean;
  setAutoSync: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  operator: string;
  setOperator: (op: string) => void;
  onOpenReport: () => void;
  onExportCSV: () => void;
  onOpenSettings: () => void;
  isAppsScriptConfigured?: boolean;
  onOpenChangeLink?: () => void;
  sheetViewUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTime,
  lastSyncTime,
  isSyncing,
  onRefresh,
  autoSync,
  setAutoSync,
  soundEnabled,
  setSoundEnabled,
  operator,
  setOperator,
  onOpenReport,
  onExportCSV,
  onOpenSettings,
  isAppsScriptConfigured = false,
  onOpenChangeLink,
  sheetViewUrl,
}) => {
  const formattedTime = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formattedDate = currentTime.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      {/* Top micro-bar for institutional identity */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800 text-xs text-slate-400 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            PANITIA PEMILIHAN KEPALA DESA (PILKADES) WANAJAYA
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400">
            Kec. Cibitung, Kab. Bekasi - TPS 50 Pesona Gading Cibitung (RT 05, RT 06, RT 09)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono font-medium">{formattedTime} WIB</span>
            <span className="hidden sm:inline text-slate-500">({formattedDate})</span>
          </div>
        </div>
      </div>

      {/* Main navigation & controls */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-bold text-white shadow-inner shadow-black/20 text-lg border border-emerald-400/40">
            PW
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Dashboard & Absensi Pilkades
              </h1>
              <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                TPS 50 &bull; Live DPT
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Desa Wanajaya &bull; TPS 50 Pesona Gading Cibitung &bull; Verifikasi & Presensi Real-Time
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Operator selector */}
          <div className="flex items-center bg-slate-800 rounded-lg px-2.5 py-1.5 border border-slate-700">
            <span className="text-xs text-slate-400 mr-2 hidden sm:inline">Petugas:</span>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="Meja 1 (Verifikasi DPT)" className="bg-slate-800 text-white">
                Meja 1 (Verifikasi DPT)
              </option>
              <option value="Meja 2 (Absensi Masuk)" className="bg-slate-800 text-white">
                Meja 2 (Absensi Masuk)
              </option>
              <option value="Ketua KPPS" className="bg-slate-800 text-white">
                Ketua KPPS
              </option>
              <option value="Pengawas TPS" className="bg-slate-800 text-white">
                Pengawas TPS
              </option>
              <option value="Saksi Calon" className="bg-slate-800 text-white">
                Saksi Calon
              </option>
            </select>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Matikan suara notifikasi' : 'Nyalakan suara notifikasi'}
            className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
              soundEnabled
                ? 'bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-800/60 text-slate-400 border-slate-800 hover:bg-slate-800'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Database Sync indicator and button */}
          <div className="flex items-center bg-slate-800/90 rounded-lg p-1 border border-slate-700">
            <button
              onClick={onRefresh}
              disabled={isSyncing}
              title="Sinkronkan data dengan Google Spreadsheet"
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-200 hover:text-white rounded-md hover:bg-slate-700 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-emerald-400' : 'text-slate-400'}`} />
              <span className="hidden md:inline">Sync Sheets</span>
            </button>

            <span className="text-[10px] text-slate-400 px-1.5 border-l border-slate-700 hidden lg:inline">
              {lastSyncTime ? `Pukul ${lastSyncTime}` : 'Siap'}
            </span>

            <button
              onClick={() => setAutoSync(!autoSync)}
              title={autoSync ? 'Auto-sync aktif (30 detik)' : 'Auto-sync non-aktif'}
              className={`ml-1 text-[10px] font-semibold px-2 py-0.5 rounded transition-colors cursor-pointer ${
                autoSync ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {autoSync ? 'Auto ON' : 'Auto OFF'}
            </button>
          </div>

          {/* Action quick links */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenReport}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Cetak Berita Acara & Rekapitulasi TPS"
            >
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden sm:inline">Cetak Rekap</span>
            </button>

            <button
              onClick={onExportCSV}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Ekspor CSV Absensi Terkini"
            >
              <Download className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden sm:inline">Ekspor CSV</span>
            </button>

            {/* Google Spreadsheet Link */}
            <a
              href={sheetViewUrl || getActiveSheetViewUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Buka Database Google Spreadsheet Asli di Tab Baru"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium hidden xl:inline">Google Sheet</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
