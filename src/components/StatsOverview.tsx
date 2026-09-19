import React from 'react';
import { Users, UserCheck, UserX, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { Voter } from '../data/initialVoters';

interface StatsOverviewProps {
  voters: Voter[];
  attendanceMap: Record<number, { hadir: boolean; hadirAt?: string }>;
  selectedRt: string;
  setSelectedRt: (rt: string) => void;
  selectedGender?: 'all' | 'L' | 'P';
  setSelectedGender?: (gender: 'all' | 'L' | 'P') => void;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  voters,
  attendanceMap,
  selectedRt,
  setSelectedRt,
  selectedGender = 'all',
  setSelectedGender,
}) => {
  const totalDpt = voters.length;

  // Compute attendance
  let totalHadir = 0;
  let hadirL = 0;
  let totalL = 0;
  let hadirP = 0;
  let totalP = 0;

  const rtStats: Record<string, { total: number; hadir: number }> = {
    '5': { total: 0, hadir: 0 },
    '6': { total: 0, hadir: 0 },
    '9': { total: 0, hadir: 0 },
  };

  voters.forEach((v) => {
    const isHadir = Boolean(
      attendanceMap[v.no]?.hadir ||
      (v.absensi && v.absensi.trim().length > 0 && v.absensi.trim().toUpperCase() !== 'TIDAK' && v.absensi.trim().toUpperCase() !== '0')
    );

    if (isHadir) totalHadir++;

    if (v.jk === 'L') {
      totalL++;
      if (isHadir) hadirL++;
    } else if (v.jk === 'P') {
      totalP++;
      if (isHadir) hadirP++;
    }

    const rtKey = v.rt ? v.rt.trim() : '';
    if (rtStats[rtKey]) {
      rtStats[rtKey].total++;
      if (isHadir) rtStats[rtKey].hadir++;
    }
  });

  const totalBelumHadir = Math.max(0, totalDpt - totalHadir);
  const participationRate = totalDpt > 0 ? ((totalHadir / totalDpt) * 100).toFixed(1) : '0';

  const pctL = totalL > 0 ? ((hadirL / totalL) * 100).toFixed(1) : '0';
  const belumL = totalL - hadirL;

  const pctP = totalP > 0 ? ((hadirP / totalP) * 100).toFixed(1) : '0';
  const belumP = totalP - hadirP;

  const handleToggleGender = (gender: 'L' | 'P') => {
    if (!setSelectedGender) return;
    if (selectedGender === gender) {
      setSelectedGender('all');
    } else {
      setSelectedGender(gender);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {/* Card 1: Total DPT */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total DPT Terdaftar
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {totalDpt}
            </span>
            <span className="text-xs font-medium text-slate-500">Pemilih Tetap</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            TPS 50 Pesona Gading Cibitung (RT 05, 06, 09)
          </p>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>L: <strong className="text-blue-700 font-semibold">{totalL}</strong> ({totalDpt > 0 ? ((totalL / totalDpt) * 100).toFixed(1) : 0}%)</span>
          <span>P: <strong className="text-pink-700 font-semibold">{totalP}</strong> ({totalDpt > 0 ? ((totalP / totalDpt) * 100).toFixed(1) : 0}%)</span>
          <span className="text-slate-400">Desa Wanajaya</span>
        </div>
      </div>

      {/* Card 2: Sudah Hadir */}
      <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Sudah Hadir (Presensi)
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-emerald-600">
              {totalHadir}
            </span>
            <span className="text-sm font-semibold text-emerald-700">
              ({participationRate}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalHadir / (totalDpt || 1)) * 100)}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Hadir L: <strong className="text-emerald-700">{hadirL}</strong></span>
          <span>Hadir P: <strong className="text-emerald-700">{hadirP}</strong></span>
          <span className="font-medium text-emerald-600">Terverifikasi</span>
        </div>
      </div>

      {/* Card 3: Belum Hadir */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Belum Hadir
          </span>
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <UserX className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-700">
              {totalBelumHadir}
            </span>
            <span className="text-sm font-semibold text-slate-500">
              ({totalDpt > 0 ? ((totalBelumHadir / totalDpt) * 100).toFixed(1) : 0}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalBelumHadir / (totalDpt || 1)) * 100)}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Sisa L: <strong className="text-slate-700">{belumL}</strong></span>
          <span>Sisa P: <strong className="text-slate-700">{belumP}</strong></span>
          <span className="text-amber-600 font-medium">Menunggu</span>
        </div>
      </div>

      {/* Card 4: Pemilih Laki-Laki (NEW DEDICATED CARD) */}
      <div
        onClick={() => handleToggleGender('L')}
        className={`bg-white rounded-xl p-4 border shadow-sm flex flex-col justify-between cursor-pointer transition-all duration-200 hover:shadow-md ${
          selectedGender === 'L'
            ? 'ring-2 ring-blue-500 border-blue-400 bg-blue-50/20'
            : 'border-blue-100 hover:border-blue-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
              Pemilih Laki-Laki
            </span>
            <span className="px-1.5 py-0.2 bg-blue-100 text-blue-700 text-[10px] font-extrabold rounded font-mono">
              (L)
            </span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200/60">
            <User className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tracking-tight text-blue-900">
                {totalL}
              </span>
              <span className="text-xs font-medium text-slate-500">DPT</span>
            </div>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              {hadirL} Hadir ({pctL}%)
            </span>
          </div>

          <div className="w-full bg-blue-50 rounded-full h-2 mt-2 overflow-hidden border border-blue-100">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (hadirL / (totalL || 1)) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-600">
            Hadir: <strong className="text-emerald-700">{hadirL}</strong>
          </span>
          <span className="text-slate-600">
            Belum: <strong className="text-rose-600">{belumL}</strong>
          </span>
          <span className={`text-[11px] font-semibold ${selectedGender === 'L' ? 'text-blue-600 underline' : 'text-slate-400'}`}>
            {selectedGender === 'L' ? 'Filter Aktif' : 'Klik Filter'}
          </span>
        </div>
      </div>

      {/* Card 5: Pemilih Perempuan (NEW DEDICATED CARD) */}
      <div
        onClick={() => handleToggleGender('P')}
        className={`bg-white rounded-xl p-4 border shadow-sm flex flex-col justify-between cursor-pointer transition-all duration-200 hover:shadow-md ${
          selectedGender === 'P'
            ? 'ring-2 ring-pink-500 border-pink-400 bg-pink-50/20'
            : 'border-pink-100 hover:border-pink-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-pink-800 uppercase tracking-wider">
              Pemilih Perempuan
            </span>
            <span className="px-1.5 py-0.2 bg-pink-100 text-pink-700 text-[10px] font-extrabold rounded font-mono">
              (P)
            </span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-200/60">
            <User className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tracking-tight text-pink-900">
                {totalP}
              </span>
              <span className="text-xs font-medium text-slate-500">DPT</span>
            </div>
            <span className="text-xs font-semibold text-pink-700 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
              {hadirP} Hadir ({pctP}%)
            </span>
          </div>

          <div className="w-full bg-pink-50 rounded-full h-2 mt-2 overflow-hidden border border-pink-100">
            <div
              className="bg-pink-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (hadirP / (totalP || 1)) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-600">
            Hadir: <strong className="text-emerald-700">{hadirP}</strong>
          </span>
          <span className="text-slate-600">
            Belum: <strong className="text-rose-600">{belumP}</strong>
          </span>
          <span className={`text-[11px] font-semibold ${selectedGender === 'P' ? 'text-pink-600 underline' : 'text-slate-400'}`}>
            {selectedGender === 'P' ? 'Filter Aktif' : 'Klik Filter'}
          </span>
        </div>
      </div>

      {/* Card 6: Partisipasi per RT */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Progres Tiap RT
          </span>
          <span className="text-[11px] text-slate-400">Klik filter RT</span>
        </div>

        <div className="space-y-1.5 text-xs">
          {Object.entries(rtStats).map(([rtNum, data]) => {
            const pct = data.total > 0 ? Math.round((data.hadir / data.total) * 100) : 0;
            const isSelected = selectedRt === rtNum;
            return (
              <button
                key={rtNum}
                onClick={() => setSelectedRt(isSelected ? '' : rtNum)}
                className={`w-full text-left p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-xs">RT 0{rtNum}</span>
                  <span className={isSelected ? 'text-emerald-400 text-xs' : 'text-slate-600 text-xs'}>
                    <strong>{data.hadir}</strong> / {data.total} ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`${isSelected ? 'bg-emerald-400' : 'bg-emerald-600'} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
