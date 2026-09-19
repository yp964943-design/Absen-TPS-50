import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Header,
} from './components/Header';
import {
  StatsOverview,
} from './components/StatsOverview';
import {
  QuickVerification,
} from './components/QuickVerification';
import {
  VoterTable,
} from './components/VoterTable';
import {
  RecentAttendanceFeed,
} from './components/RecentAttendanceFeed';
import {
  VoterSlipModal,
} from './components/VoterSlipModal';
import {
  PrintableReport,
} from './components/PrintableReport';
import {
  SyncSettingsModal,
} from './components/SyncSettingsModal';
import {
  ChangeLinkModal,
} from './components/ChangeLinkModal';
import { INITIAL_VOTERS, Voter } from './data/initialVoters';
import {
  fetchLiveVoters,
  getSavedAttendance,
  saveAttendance,
  AttendanceMap,
  playAttendanceBeep,
  OPERATOR_STORAGE_KEY,
  GOOGLE_SHEET_CSV_URL,
  syncAttendanceToAppsScript,
  getAppsScriptUrl,
  getActiveSheetViewUrl,
} from './utils/csvSync';
import { ShieldCheck, Info, Sparkles, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

export default function App() {
  const [voters, setVoters] = useState<Voter[]>(INITIAL_VOTERS);
  const [attendanceMap, setAttendanceMap] = useState<AttendanceMap>(() => getSavedAttendance());
  const [appsScriptUrl, setAppsScriptUrl] = useState<string>(() => getAppsScriptUrl());
  const isAppsScriptConfigured = Boolean(appsScriptUrl.trim());
  const [lastSyncTime, setLastSyncTime] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncSource, setSyncSource] = useState<'google_sheets' | 'local_cache'>('local_cache');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [autoSync, setAutoSync] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [operator, setOperator] = useState<string>(() => {
    return localStorage.getItem(OPERATOR_STORAGE_KEY) || 'Meja 1 (Verifikasi DPT)';
  });
  const [selectedRt, setSelectedRt] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<'all' | 'L' | 'P'>('all');
  const [searchInput, setSearchInput] = useState<string>('');
  const [tableSearchQuery, setTableSearchQuery] = useState<string>('');

  // Modals
  const [activeSlipVoter, setActiveSlipVoter] = useState<Voter | null>(null);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showChangeLinkModal, setShowChangeLinkModal] = useState<boolean>(false);
  const [sheetViewUrl, setSheetViewUrl] = useState<string>(() => getActiveSheetViewUrl());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Operator persistence
  const handleSetOperator = (op: string) => {
    setOperator(op);
    localStorage.setItem(OPERATOR_STORAGE_KEY, op);
  };

  // Toast notification helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  // Real-time clock interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch data from Google Sheets
  const syncWithGoogleSheets = useCallback(async () => {
    setIsSyncing(true);
    try {
      const result = await fetchLiveVoters();
      setVoters(result.voters);
      setSyncSource(result.source);
      setLastSyncTime(result.timestamp);

      // Check if remote sheet has any absensi populated, merge gently
      setAttendanceMap((prev) => {
        const next = { ...prev };
        let hasChanges = false;

        result.voters.forEach((v) => {
          if (v.absensi && v.absensi.trim().length > 0 && v.absensi.toUpperCase() !== '0' && v.absensi.toUpperCase() !== 'TIDAK') {
            if (!next[v.no] || !next[v.no].hadir) {
              next[v.no] = {
                hadir: true,
                hadirAt: v.absensi.includes(':') ? v.absensi : result.timestamp,
                petugas: 'Google Sheets Live',
              };
              hasChanges = true;
            }
          }
        });

        if (hasChanges) {
          saveAttendance(next);
        }
        return next;
      });
    } catch (e) {
      console.error('Error during syncWithGoogleSheets:', e);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    syncWithGoogleSheets();
  }, [syncWithGoogleSheets]);

  // Auto-sync polling every 30 seconds if enabled
  useEffect(() => {
    if (!autoSync) return;
    const interval = setInterval(() => {
      syncWithGoogleSheets();
    }, 30000);
    return () => clearInterval(interval);
  }, [autoSync, syncWithGoogleSheets]);

  // Mark / Unmark attendance
  const handleMarkAttendance = (voterNo: number, hadir: boolean) => {
    const targetVoter = voters.find((v) => v.no === voterNo);
    const nowTimeStr = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setAttendanceMap((prev) => {
      const next = { ...prev };
      if (hadir) {
        next[voterNo] = {
          hadir: true,
          hadirAt: nowTimeStr,
          petugas: operator,
        };
      } else {
        delete next[voterNo];
      }
      saveAttendance(next);
      return next;
    });

    if (soundEnabled) {
      playAttendanceBeep(hadir ? 'success' : 'undo');
    }

    // Two-way sync to Google Apps Script
    if (!isAppsScriptConfigured) {
      if (hadir && targetVoter) {
        showToast(`⚠️ Presensi #${targetVoter.no} ${targetVoter.nama} tersimpan lokal. Belum masuk Google Sheets (Klik "Setup Tulis Sheets" untuk mengaktifkan).`);
      } else if (targetVoter) {
        showToast(`Pembatalan presensi #${targetVoter.no} - ${targetVoter.nama} tersimpan.`);
      }
      return;
    }

    syncAttendanceToAppsScript(voterNo, hadir, nowTimeStr, operator).then((res) => {
      if (res.success) {
        if (hadir && targetVoter) {
          showToast(`✓ Presensi #${targetVoter.no} ${targetVoter.nama} tersimpan & terkirim ke Google Sheets!`);
        } else if (targetVoter) {
          showToast(`Pembatalan presensi #${targetVoter.no} dikirim ke Google Sheets.`);
        }
      } else {
        showToast(`⚠️ Presensi tersimpan di lokal, namun gagal sync Sheets: ${res.message}`);
      }
    });
  };

  // Reset attendance
  const handleResetAttendance = () => {
    setAttendanceMap({});
    saveAttendance({});
    showToast('Seluruh data presensi lokal telah di-reset.');
  };

  // Export CSV of Attendance
  const handleExportCSV = () => {
    const headers = ['NO_DPT', 'NAMA_PEMILIH', 'JENIS_KELAMIN', 'RT', 'ALAMAT', 'STATUS_KEHADIRAN', 'WAKTU_HADIR', 'PETUGAS_TPS'];
    const rows = voters.map((v) => {
      const isHadir = Boolean(
        attendanceMap[v.no]?.hadir ||
        (v.absensi && v.absensi.trim().length > 0 && v.absensi.toUpperCase() !== '0')
      );
      const info = attendanceMap[v.no];
      const time = isHadir ? (info?.hadirAt || v.absensi || 'Hadir') : 'Belum Hadir';
      const pet = info?.petugas || '-';

      return [
        v.no,
        `"${v.nama.replace(/"/g, '""')}"`,
        v.jk,
        v.rt,
        `"${v.alamat.replace(/"/g, '""')}"`,
        isHadir ? 'HADIR' : 'BELUM HADIR',
        `"${time}"`,
        `"${pet}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0, 10);
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekap_absensi_pilkades_wanajaya_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('File Rekap Absensi Pilkades Wanajaya (.csv) berhasil diunduh.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Header */}
      <Header
        currentTime={currentTime}
        lastSyncTime={lastSyncTime}
        isSyncing={isSyncing}
        onRefresh={syncWithGoogleSheets}
        autoSync={autoSync}
        setAutoSync={setAutoSync}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        operator={operator}
        setOperator={handleSetOperator}
        onOpenReport={() => setShowReportModal(true)}
        onExportCSV={handleExportCSV}
        onOpenSettings={() => setShowSettingsModal(true)}
        isAppsScriptConfigured={isAppsScriptConfigured}
        onOpenChangeLink={() => setShowChangeLinkModal(true)}
        sheetViewUrl={sheetViewUrl}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* Notice if Google Sheets real-time write is not yet configured */}
        {!isAppsScriptConfigured && (
          <div className="mb-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-950 shadow-xs">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 bg-amber-500/20 text-amber-800 rounded-lg shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-950">
                  Data Presensi Baru Tersimpan di Memori Browser (Belum Masuk ke Google Sheet)
                </p>
                <p className="text-[11px] text-amber-900/90 leading-relaxed mt-0.5">
                  Link CSV spreadsheet bawaan hanya bersifat <em>baca</em>. Untuk mengaktifkan penulisan otomatis ke <strong>Kolom F (ABSENSI) Google Sheet</strong> secara langsung, pasang Google Apps Script.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSettingsModal(true)}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shrink-0 transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Pasang Integrasi (2 Menit)</span>
            </button>
          </div>
        )}

        {/* Top Executive Stats Overview */}
        <StatsOverview
          voters={voters}
          attendanceMap={attendanceMap}
          selectedRt={selectedRt}
          setSelectedRt={setSelectedRt}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
        />

        {/* Live Attendance Activity Feed */}
        <RecentAttendanceFeed
          voters={voters}
          attendanceMap={attendanceMap}
          onOpenSlip={(v) => setActiveSlipVoter(v)}
        />

        {/* Quick Verification & Check-In Bar */}
        <QuickVerification
          voters={voters}
          attendanceMap={attendanceMap}
          onMarkAttendance={handleMarkAttendance}
          onOpenSlip={(v) => setActiveSlipVoter(v)}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />

        {/* Main DPT and Attendance Table */}
        <VoterTable
          voters={voters}
          attendanceMap={attendanceMap}
          onMarkAttendance={handleMarkAttendance}
          onOpenSlip={(v) => setActiveSlipVoter(v)}
          selectedRt={selectedRt}
          setSelectedRt={setSelectedRt}
          tableSearchQuery={tableSearchQuery}
          setTableSearchQuery={setTableSearchQuery}
          genderFilter={selectedGender}
          setGenderFilter={setSelectedGender}
        />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-6 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-200">
              Sistem Informasi Pilkades Wanajaya 2026
            </span>
            <span>&bull;</span>
            <span>Kecamatan Cibitung, Kabupaten Bekasi</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">
              Database:{' '}
              <span className="text-emerald-400 font-mono">Google Sheets Real-Time</span>
            </span>
            <span>&bull;</span>
            <button
              onClick={() => setShowSettingsModal(true)}
              className="hover:text-white underline cursor-pointer"
            >
              Pengaturan Database
            </button>
          </div>
        </div>
      </footer>

      {/* Slip Modal */}
      {activeSlipVoter && (
        <VoterSlipModal
          voter={activeSlipVoter}
          attendanceInfo={attendanceMap[activeSlipVoter.no]}
          onClose={() => setActiveSlipVoter(null)}
        />
      )}

      {/* Official Report Modal */}
      {showReportModal && (
        <PrintableReport
          voters={voters}
          attendanceMap={attendanceMap}
          onClose={() => setShowReportModal(false)}
          onExportCSV={handleExportCSV}
        />
      )}

      {/* Sync Settings Modal */}
      {showSettingsModal && (
        <SyncSettingsModal
          onClose={() => setShowSettingsModal(false)}
          isSyncing={isSyncing}
          onRefresh={syncWithGoogleSheets}
          lastSyncTime={lastSyncTime}
          source={syncSource}
          voters={voters}
          attendanceMap={attendanceMap}
          onResetAttendance={handleResetAttendance}
          onExportCSV={handleExportCSV}
          onAppsScriptUrlChanged={(url) => {
            setAppsScriptUrl(url);
            if (url) {
              showToast('✓ URL Google Apps Script berhasil terpasang! Sinkronisasi tulis ke Google Sheets aktif.');
            }
          }}
          onSheetUrlChanged={(url) => {
            setSheetViewUrl(url);
            syncWithGoogleSheets();
            showToast('✓ Tautan Google Spreadsheet berhasil diperbarui & disinkronkan!');
          }}
        />
      )}

      {/* Quick Change Google Sheet Link Modal */}
      <ChangeLinkModal
        isOpen={showChangeLinkModal}
        onClose={() => setShowChangeLinkModal(false)}
        onLinkUpdated={(newUrl) => {
          setSheetViewUrl(newUrl);
          syncWithGoogleSheets();
          showToast('✓ Tautan Google Spreadsheet berhasil diperbarui & disinkronkan!');
        }}
      />
    </div>
  );
}
