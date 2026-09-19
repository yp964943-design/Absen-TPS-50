import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  QrCode,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
  FileSpreadsheet,
} from 'lucide-react';
import { Voter } from '../data/initialVoters';

interface VoterTableProps {
  voters: Voter[];
  attendanceMap: Record<number, { hadir: boolean; hadirAt?: string; petugas?: string }>;
  onMarkAttendance: (voterNo: number, hadir: boolean) => void;
  onOpenSlip: (voter: Voter) => void;
  selectedRt: string;
  setSelectedRt: (rt: string) => void;
  tableSearchQuery: string;
  setTableSearchQuery: (q: string) => void;
  genderFilter?: 'all' | 'L' | 'P';
  setGenderFilter?: (g: 'all' | 'L' | 'P') => void;
}

export const VoterTable: React.FC<VoterTableProps> = ({
  voters,
  attendanceMap,
  onMarkAttendance,
  onOpenSlip,
  selectedRt,
  setSelectedRt,
  tableSearchQuery,
  setTableSearchQuery,
  genderFilter: propGenderFilter,
  setGenderFilter: propSetGenderFilter,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'hadir' | 'belum'>('all');
  const [internalGenderFilter, setInternalGenderFilter] = useState<'all' | 'L' | 'P'>('all');
  
  const genderFilter = propGenderFilter !== undefined ? propGenderFilter : internalGenderFilter;
  const setGenderFilter = propSetGenderFilter || setInternalGenderFilter;

  const [sortBy, setSortBy] = useState<'no_asc' | 'no_desc' | 'nama_asc' | 'time_desc'>('no_asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  // Compute counts
  const totalCount = voters.length;
  const hadirCount = voters.filter((v) => {
    return Boolean(
      attendanceMap[v.no]?.hadir ||
      (v.absensi && v.absensi.trim().length > 0 && v.absensi.toUpperCase() !== '0')
    );
  }).length;
  const belumCount = totalCount - hadirCount;

  // Filtered list
  const filteredVoters = useMemo(() => {
    return voters.filter((v) => {
      const isHadir = Boolean(
        attendanceMap[v.no]?.hadir ||
        (v.absensi && v.absensi.trim().length > 0 && v.absensi.toUpperCase() !== '0')
      );

      // Status filter
      if (statusFilter === 'hadir' && !isHadir) return false;
      if (statusFilter === 'belum' && isHadir) return false;

      // RT filter
      if (selectedRt && v.rt !== selectedRt) return false;

      // Gender filter
      if (genderFilter !== 'all' && v.jk !== genderFilter) return false;

      // Text search
      if (tableSearchQuery.trim()) {
        const q = tableSearchQuery.trim().toLowerCase();
        const matchesNo = v.no.toString() === q || v.no.toString().padStart(3, '0') === q;
        const matchesName = v.nama.toLowerCase().includes(q);
        const matchesAlamat = v.alamat.toLowerCase().includes(q);
        if (!matchesNo && !matchesName && !matchesAlamat) return false;
      }

      return true;
    });
  }, [voters, attendanceMap, statusFilter, selectedRt, genderFilter, tableSearchQuery]);

  // Sorted list
  const sortedVoters = useMemo(() => {
    const list = [...filteredVoters];
    if (sortBy === 'no_asc') {
      list.sort((a, b) => a.no - b.no);
    } else if (sortBy === 'no_desc') {
      list.sort((a, b) => b.no - a.no);
    } else if (sortBy === 'nama_asc') {
      list.sort((a, b) => a.nama.localeCompare(b.nama));
    } else if (sortBy === 'time_desc') {
      list.sort((a, b) => {
        const timeA = attendanceMap[a.no]?.hadirAt || '';
        const timeB = attendanceMap[b.no]?.hadirAt || '';
        return timeB.localeCompare(timeA);
      });
    }
    return list;
  }, [filteredVoters, sortBy, attendanceMap]);

  // Pagination
  const totalPages = pageSize === -1 ? 1 : Math.ceil(sortedVoters.length / pageSize) || 1;
  const paginatedVoters = useMemo(() => {
    if (pageSize === -1) return sortedVoters;
    const start = (currentPage - 1) * pageSize;
    return sortedVoters.slice(start, start + pageSize);
  }, [sortedVoters, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Header & Filter Toolbar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl max-w-fit">
            <button
              onClick={() => {
                setStatusFilter('all');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                statusFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Semua DPT</span>
              <span className="bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-full text-[10px]">
                {totalCount}
              </span>
            </button>

            <button
              onClick={() => {
                setStatusFilter('hadir');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                statusFilter === 'hadir'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Sudah Hadir</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  statusFilter === 'hadir' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {hadirCount}
              </span>
            </button>

            <button
              onClick={() => {
                setStatusFilter('belum');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                statusFilter === 'belum'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserX className="w-3.5 h-3.5" />
              <span>Belum Hadir</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  statusFilter === 'belum' ? 'bg-slate-700 text-white' : 'bg-slate-300 text-slate-700'
                }`}
              >
                {belumCount}
              </span>
            </button>
          </div>

          {/* Secondary Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* RT selector */}
            <div className="flex items-center text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-xs">
              <span className="text-slate-400 mr-1.5">Wilayah:</span>
              <select
                value={selectedRt}
                onChange={(e) => {
                  setSelectedRt(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="">Semua RT (05, 06, 09)</option>
                <option value="5">RT 05 (199 Pemilih)</option>
                <option value="6">RT 06 (195 Pemilih)</option>
                <option value="9">RT 09 (83 Pemilih)</option>
              </select>
            </div>

            {/* Gender selector */}
            <div className="flex items-center text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-xs">
              <span className="text-slate-400 mr-1.5">Gender:</span>
              <select
                value={genderFilter}
                onChange={(e) => {
                  setGenderFilter(e.target.value as 'all' | 'L' | 'P');
                  setCurrentPage(1);
                }}
                className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="all">Semua (L & P)</option>
                <option value="L">Laki-Laki (L)</option>
                <option value="P">Perempuan (P)</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-xs">
              <ArrowUpDown className="w-3 h-3 text-slate-400 mr-1.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="no_asc">Urut: No. DPT (1-477)</option>
                <option value="no_desc">Urut: No. DPT (477-1)</option>
                <option value="nama_asc">Urut: Nama (A-Z)</option>
                <option value="time_desc">Urut: Jam Hadir (Terbaru)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Filter Info row */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>
            Menampilkan <strong>{sortedVoters.length}</strong> dari {totalCount} pemilih tetap
            {selectedRt && ` di RT 0${selectedRt}`}
            {statusFilter !== 'all' && ` (${statusFilter === 'hadir' ? 'Sudah Hadir' : 'Belum Hadir'})`}
          </span>

          <div className="flex items-center gap-2">
            <span>Tampilkan per halaman:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-200 rounded px-2 py-0.5 text-xs text-slate-700"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={-1}>Semua ({totalCount})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table of Voters */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100/80 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              <th className="py-3 px-4 w-16 text-center">No DPT</th>
              <th className="py-3 px-4">Nama Lengkap</th>
              <th className="py-3 px-3 w-16 text-center">L/P</th>
              <th className="py-3 px-3 w-16 text-center">RT</th>
              <th className="py-3 px-4">Alamat Domisili</th>
              <th className="py-3 px-4">Status Presensi</th>
              <th className="py-3 px-4 text-center">Waktu Presensi</th>
              <th className="py-3 px-4 text-right">Aksi Verifikasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedVoters.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400">
                  Tidak ada data pemilih yang cocok dengan filter.
                </td>
              </tr>
            ) : (
              paginatedVoters.map((voter) => {
                const isHadir = Boolean(
                  attendanceMap[voter.no]?.hadir ||
                  (voter.absensi && voter.absensi.trim().length > 0 && voter.absensi.toUpperCase() !== '0')
                );
                const info = attendanceMap[voter.no];

                return (
                  <tr
                    key={voter.no}
                    className={`transition-colors ${
                      isHadir ? 'bg-emerald-50/30 hover:bg-emerald-50/70' : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* No */}
                    <td className="py-3 px-4 text-center">
                      <span className="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                        #{voter.no.toString().padStart(3, '0')}
                      </span>
                    </td>

                    {/* Nama */}
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span>{voter.nama}</span>
                        {isHadir && (
                          <span className="text-emerald-600 shrink-0" title="Sudah Hadir">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* JK */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          voter.jk === 'L'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-pink-50 text-pink-700 border border-pink-200'
                        }`}
                      >
                        {voter.jk}
                      </span>
                    </td>

                    {/* RT */}
                    <td className="py-3 px-3 text-center font-medium text-slate-700">
                      <span className="text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-mono">
                        0{voter.rt}
                      </span>
                    </td>

                    {/* Alamat */}
                    <td className="py-3 px-4 text-xs text-slate-600">
                      {voter.alamat}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      {isHadir ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          HADIR
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          Belum Hadir
                        </span>
                      )}
                    </td>

                    {/* Waktu Presensi */}
                    <td className="py-3 px-4 text-center text-xs">
                      {isHadir && info?.hadirAt ? (
                        <div className="font-mono text-emerald-700 font-medium">
                          {info.hadirAt} WIB
                          {info.petugas && (
                            <div className="text-[10px] text-slate-400 font-sans">
                              {info.petugas}
                            </div>
                          )}
                        </div>
                      ) : isHadir && voter.absensi ? (
                        <span className="text-xs text-emerald-700 font-mono">
                          {voter.absensi}
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    {/* Aksi */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {isHadir && (
                          <button
                            onClick={() => onOpenSlip(voter)}
                            title="Cetak Slip / Bukti Kehadiran"
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 rounded-lg transition-colors"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>
                        )}

                        {isHadir ? (
                          <button
                            onClick={() => onMarkAttendance(voter.no, false)}
                            className="px-2.5 py-1 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
                            title="Batalkan kehadiran (Koreksi)"
                          >
                            Batal
                          </button>
                        ) : (
                          <button
                            onClick={() => onMarkAttendance(voter.no, true)}
                            className="px-3 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-colors flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Absen</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pageSize !== -1 && totalPages > 1 && (
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong> (
            {sortedVoters.length} pemilih)
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Halaman sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Quick page jumps */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = currentPage;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-7 h-7 text-xs rounded-lg font-medium transition-colors ${
                    currentPage === pageNum
                      ? 'bg-slate-900 text-white font-bold'
                      : 'border border-slate-200 text-slate-700 hover:bg-white'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Halaman berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
