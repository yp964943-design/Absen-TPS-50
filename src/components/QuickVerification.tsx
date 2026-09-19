import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  CheckCircle2,
  XCircle,
  QrCode,
  User,
  MapPin,
  Clock,
  Printer,
  Sparkles,
  AlertCircle,
  CornerDownLeft,
} from 'lucide-react';
import { Voter } from '../data/initialVoters';

interface QuickVerificationProps {
  voters: Voter[];
  attendanceMap: Record<number, { hadir: boolean; hadirAt?: string; petugas?: string }>;
  onMarkAttendance: (voterNo: number, hadir: boolean) => void;
  onOpenSlip: (voter: Voter) => void;
  searchInput: string;
  setSearchInput: (val: string) => void;
}

export const QuickVerification: React.FC<QuickVerificationProps> = ({
  voters,
  attendanceMap,
  onMarkAttendance,
  onOpenSlip,
  searchInput,
  setSearchInput,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);

  // Focus shortcut: pressing '/' anywhere focuses the search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute matched voters
  const trimmed = searchInput.trim().toLowerCase();

  let matchedVoter: Voter | null = null;
  let matches: Voter[] = [];

  if (trimmed) {
    // Check if user entered exact number
    const asNum = parseInt(trimmed, 10);
    if (!isNaN(asNum)) {
      matchedVoter = voters.find((v) => v.no === asNum) || null;
    }

    // Search by name or partial
    matches = voters.filter((v) => {
      const matchNo = v.no.toString() === trimmed;
      const matchNama = v.nama.toLowerCase().includes(trimmed);
      return matchNo || matchNama;
    });

    if (!matchedVoter && matches.length === 1) {
      matchedVoter = matches[0];
    }
  }

  // Handle active card voter
  const activeVoter = selectedVoter || matchedVoter;

  const isAttendanceDone = activeVoter
    ? Boolean(
        attendanceMap[activeVoter.no]?.hadir ||
        (activeVoter.absensi && activeVoter.absensi.trim().length > 0 && activeVoter.absensi.toUpperCase() !== '0')
      )
    : false;

  const attendanceInfo = activeVoter ? attendanceMap[activeVoter.no] : null;

  const handleKeyDownOnInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (activeVoter) {
        onMarkAttendance(activeVoter.no, !isAttendanceDone);
      } else if (matches.length > 0) {
        setSelectedVoter(matches[0]);
      }
    } else if (e.key === 'Escape') {
      setSearchInput('');
      setSelectedVoter(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-600" />
            Pencarian & Verifikasi Cepat Pemilih (Meja TPS)
          </h2>
          <p className="text-xs text-slate-500">
            Ketik No. DPT (contoh: <span className="font-mono font-semibold text-slate-700">12</span>) atau Nama Pemilih untuk verifikasi identitas langsung.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start md:self-auto">
          <span>Shortcut:</span>
          <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[11px] font-mono shadow-xs">
            /
          </kbd>
          <span>fokus cari,</span>
          <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[11px] font-mono shadow-xs">
            Enter
          </kbd>
          <span>absen langsung</span>
        </div>
      </div>

      {/* Input container */}
      <div className="relative">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setSelectedVoter(null);
            }}
            onKeyDown={handleKeyDownOnInput}
            placeholder="Cari Nomor DPT (1-477) atau Nama Pemilih..."
            className="w-full pl-11 pr-24 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base font-medium shadow-inner transition-all"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />

          {searchInput && (
            <button
              onClick={() => {
                setSearchInput('');
                setSelectedVoter(null);
                inputRef.current?.focus();
              }}
              className="absolute right-3 px-2 py-1 text-xs font-medium text-slate-500 hover:text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-md transition-colors"
            >
              Hapus (Esc)
            </button>
          )}
        </div>

        {/* Live Match Chips (when 2-8 matches) */}
        {trimmed && matches.length > 1 && matches.length <= 8 && (
          <div className="mt-2 flex flex-wrap gap-1.5 items-center">
            <span className="text-xs text-slate-500 mr-1">Ditemukan {matches.length} pemilih:</span>
            {matches.map((v) => {
              const isDone = Boolean(
                attendanceMap[v.no]?.hadir ||
                (v.absensi && v.absensi.trim().length > 0 && v.absensi.toUpperCase() !== '0')
              );
              return (
                <button
                  key={v.no}
                  onClick={() => setSelectedVoter(v)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors flex items-center gap-1.5 ${
                    activeVoter?.no === v.no
                      ? 'bg-slate-900 text-white border-slate-900'
                      : isDone
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-mono font-bold text-[11px]">#{v.no}</span>
                  <span>{v.nama}</span>
                  {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Active Voter Verification Banner / Card */}
      {activeVoter ? (
        <div
          className={`mt-4 rounded-xl border p-4 transition-all ${
            isAttendanceDone
              ? 'bg-emerald-50/70 border-emerald-200'
              : 'bg-slate-50 border-slate-300'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left Voter Data */}
            <div className="flex items-start gap-3.5">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border shrink-0 ${
                  isAttendanceDone
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 shadow-xs'
                }`}
              >
                #{activeVoter.no}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {activeVoter.nama}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      isAttendanceDone
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}
                  >
                    {isAttendanceDone ? 'SUDAH HADIR' : 'BELUM HADIR'}
                  </span>
                  <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                    RT 0{activeVoter.rt}
                  </span>
                  <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {activeVoter.jk === 'L' ? 'Laki-Laki' : 'Perempuan'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-1.5 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {activeVoter.alamat}
                  </span>

                  {isAttendanceDone && attendanceInfo?.hadirAt && (
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      Absen pukul {attendanceInfo.hadirAt} WIB
                      {attendanceInfo.petugas && ` (${attendanceInfo.petugas})`}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 self-end lg:self-center">
              {!isAttendanceDone ? (
                <button
                  onClick={() => {
                    onMarkAttendance(activeVoter.no, true);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tandai Hadir (Absen)</span>
                  <kbd className="hidden sm:inline px-1 py-0.5 bg-emerald-700/80 rounded text-[10px] font-mono">
                    ↵
                  </kbd>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => onOpenSlip(activeVoter)}
                    className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <QrCode className="w-3.5 h-3.5 text-slate-600" />
                    <span>Slip / Bukti Presensi</span>
                  </button>

                  <button
                    onClick={() => onMarkAttendance(activeVoter.no, false)}
                    className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                    title="Batalkan kehadiran jika terjadi salah input"
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Batalkan Hadir</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : searchInput.trim().length > 0 && matches.length === 0 ? (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50/60 p-4 text-center">
          <p className="text-sm font-semibold text-rose-800 flex items-center justify-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            Nama atau Nomor DPT &quot;{searchInput}&quot; tidak ditemukan di DPT Pilkades Wanajaya
          </p>
          <p className="text-xs text-rose-600 mt-1">
            Pastikan ejaan nama sesuai atau cek daftar pemilih tetap di tabel bawah.
          </p>
        </div>
      ) : null}
    </div>
  );
};
