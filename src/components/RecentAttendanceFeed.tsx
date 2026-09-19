import React from 'react';
import { Clock, UserCheck, CheckCircle2, ChevronRight, Users } from 'lucide-react';
import { Voter } from '../data/initialVoters';

interface RecentAttendanceFeedProps {
  voters: Voter[];
  attendanceMap: Record<number, { hadir: boolean; hadirAt?: string; petugas?: string }>;
  onOpenSlip: (voter: Voter) => void;
}

export const RecentAttendanceFeed: React.FC<RecentAttendanceFeedProps> = ({
  voters,
  attendanceMap,
  onOpenSlip,
}) => {
  // Collect all voters marked as hadir with hadirAt
  const attendedList = voters
    .filter((v) => {
      const info = attendanceMap[v.no];
      return Boolean(
        info?.hadir ||
        (v.absensi && v.absensi.trim().length > 0 && v.absensi.toUpperCase() !== '0')
      );
    })
    .map((v) => {
      const info = attendanceMap[v.no];
      return {
        voter: v,
        hadirAt: info?.hadirAt || v.absensi || 'Tercatat',
        petugas: info?.petugas || 'Petugas TPS',
      };
    })
    .sort((a, b) => b.hadirAt.localeCompare(a.hadirAt))
    .slice(0, 10); // Show latest 10

  if (attendedList.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            Aktivitas Presensi Terkini
          </h3>
          <span className="text-xs text-slate-400">Live stream TPS</span>
        </div>
        <div className="py-8 text-center text-slate-400 text-xs">
          Belum ada pemilih yang melakukan absensi pada sesi ini.
          <br />
          Gunakan kolom pencarian di atas untuk menandai kehadiran.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            Aktivitas Presensi Terkini ({attendedList.length} Terakhir)
          </h3>
          <p className="text-xs text-slate-500">
            Daftar pemilih yang baru saja diverifikasi kehadirannya di TPS
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md text-[11px] font-semibold border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          Live Feed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {attendedList.map(({ voter, hadirAt, petugas }) => (
          <div
            key={voter.no}
            onClick={() => onOpenSlip(voter)}
            className="p-3 bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 rounded-xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="font-mono font-bold text-xs bg-white text-slate-800 px-1.5 py-0.5 rounded border border-slate-200">
                  #{voter.no}
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded font-semibold">
                  {hadirAt} WIB
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs truncate group-hover:text-emerald-700">
                {voter.nama}
              </h4>
            </div>

            <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
              <span>RT 0{voter.rt} &bull; {voter.jk}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
