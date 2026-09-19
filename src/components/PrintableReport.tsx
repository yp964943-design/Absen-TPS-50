import React from 'react';
import { X, Printer, ShieldCheck, Download } from 'lucide-react';
import { Voter } from '../data/initialVoters';

interface PrintableReportProps {
  voters: Voter[];
  attendanceMap: Record<number, { hadir: boolean; hadirAt?: string; petugas?: string }>;
  onClose: () => void;
  onExportCSV: () => void;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({
  voters,
  attendanceMap,
  onClose,
  onExportCSV,
}) => {
  const totalDpt = voters.length;

  let totalHadir = 0;
  let hadirL = 0;
  let totalL = 0;
  let hadirP = 0;
  let totalP = 0;

  const rtStats: Record<string, { total: number; hadir: number; lTotal: number; lHadir: number; pTotal: number; pHadir: number }> = {
    '5': { total: 0, hadir: 0, lTotal: 0, lHadir: 0, pTotal: 0, pHadir: 0 },
    '6': { total: 0, hadir: 0, lTotal: 0, lHadir: 0, pTotal: 0, pHadir: 0 },
    '9': { total: 0, hadir: 0, lTotal: 0, lHadir: 0, pTotal: 0, pHadir: 0 },
  };

  voters.forEach((v) => {
    const isHadir = Boolean(
      attendanceMap[v.no]?.hadir ||
      (v.absensi && v.absensi.trim().length > 0 && v.absensi.toUpperCase() !== '0')
    );

    if (isHadir) totalHadir++;

    const isL = v.jk === 'L';
    if (isL) {
      totalL++;
      if (isHadir) hadirL++;
    } else {
      totalP++;
      if (isHadir) hadirP++;
    }

    const rtKey = v.rt ? v.rt.trim() : '';
    if (rtStats[rtKey]) {
      rtStats[rtKey].total++;
      if (isHadir) rtStats[rtKey].hadir++;

      if (isL) {
        rtStats[rtKey].lTotal++;
        if (isHadir) rtStats[rtKey].lHadir++;
      } else {
        rtStats[rtKey].pTotal++;
        if (isHadir) rtStats[rtKey].pHadir++;
      }
    }
  });

  const totalBelumHadir = Math.max(0, totalDpt - totalHadir);
  const participationRate = totalDpt > 0 ? ((totalHadir / totalDpt) * 100).toFixed(2) : '0';

  const todayDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Toolbar (hidden in print) */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold">
              Berita Acara & Rekapitulasi Presensi Pilkades Wanajaya
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Rekap (Print)</span>
            </button>
            <button
              onClick={onExportCSV}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content - Print Friendly */}
        <div className="p-8 overflow-y-auto font-serif text-slate-900 leading-relaxed bg-white">
          {/* Official Letterhead */}
          <div className="text-center pb-4 border-b-2 border-slate-900 mb-6 font-sans">
            <h1 className="text-lg font-extrabold uppercase tracking-wide">
              PANITIA PEMILIHAN KEPALA DESA WANAJAYA
            </h1>
            <h2 className="text-base font-bold uppercase tracking-wide">
              KECAMATAN CIBITUNG &bull; KABUPATEN BEKASI
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Sekretariat: Kantor Desa Wanajaya, Kec. Cibitung, Kab. Bekasi, Jawa Barat
            </p>
            <div className="mt-3 inline-block px-4 py-1 bg-slate-100 border border-slate-400 text-xs font-bold uppercase tracking-wider">
              BERITA ACARA REKAPITULASI KEHADIRAN PEMILIH TETAP (DPT) DI TPS 50
            </div>
          </div>

          {/* Statement Paragraph */}
          <p className="text-sm mb-4">
            Pada hari ini, <strong>{todayDate}</strong>, Panitia Pemilihan Kepala Desa (Pilkades) Wanajaya bersama Kelompok Penyelenggara Pemungutan Suara (KPPS) pada Tempat Pemungutan Suara (TPS) 50 Pesona Gading Cibitung, yang melingkupi wilayah RT 05, RT 06, dan RT 09, telah melaksanakan pencatatan dan verifikasi kehadiran pemilih tetap secara real-time dengan rincian sebagai berikut:
          </p>

          {/* Summary Metric Table */}
          <div className="my-5 font-sans">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="border border-slate-400 p-2 text-center w-12">No</th>
                  <th className="border border-slate-400 p-2 text-left">Wilayah Rukun Tetangga (RT)</th>
                  <th className="border border-slate-400 p-2 text-center">DPT (L)</th>
                  <th className="border border-slate-400 p-2 text-center">DPT (P)</th>
                  <th className="border border-slate-400 p-2 text-center font-bold">Total DPT</th>
                  <th className="border border-slate-400 p-2 text-center">Hadir (L)</th>
                  <th className="border border-slate-400 p-2 text-center">Hadir (P)</th>
                  <th className="border border-slate-400 p-2 text-center font-bold bg-emerald-50">Total Hadir</th>
                  <th className="border border-slate-400 p-2 text-center">Belum Hadir</th>
                  <th className="border border-slate-400 p-2 text-center font-bold">Partisipasi (%)</th>
                </tr>
              </thead>
              <tbody>
                {['5', '6', '9'].map((rt, idx) => {
                  const data = rtStats[rt];
                  const belum = data.total - data.hadir;
                  const pct = data.total > 0 ? ((data.hadir / data.total) * 100).toFixed(1) : '0';
                  return (
                    <tr key={rt} className="hover:bg-slate-50">
                      <td className="border border-slate-400 p-2 text-center font-semibold">{idx + 1}</td>
                      <td className="border border-slate-400 p-2 font-medium">RT 0{rt} (Pesona Gading Cibitung)</td>
                      <td className="border border-slate-400 p-2 text-center">{data.lTotal}</td>
                      <td className="border border-slate-400 p-2 text-center">{data.pTotal}</td>
                      <td className="border border-slate-400 p-2 text-center font-bold">{data.total}</td>
                      <td className="border border-slate-400 p-2 text-center text-emerald-800 font-medium">{data.lHadir}</td>
                      <td className="border border-slate-400 p-2 text-center text-emerald-800 font-medium">{data.pHadir}</td>
                      <td className="border border-slate-400 p-2 text-center font-bold bg-emerald-50/70 text-emerald-900">{data.hadir}</td>
                      <td className="border border-slate-400 p-2 text-center text-slate-600">{belum}</td>
                      <td className="border border-slate-400 p-2 text-center font-bold">{pct}%</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-slate-200 font-bold text-slate-900">
                  <td colSpan={2} className="border border-slate-400 p-2 text-right uppercase">
                    JUMLAH KESELURUHAN (TPS)
                  </td>
                  <td className="border border-slate-400 p-2 text-center">{totalL}</td>
                  <td className="border border-slate-400 p-2 text-center">{totalP}</td>
                  <td className="border border-slate-400 p-2 text-center">{totalDpt}</td>
                  <td className="border border-slate-400 p-2 text-center text-emerald-900">{hadirL}</td>
                  <td className="border border-slate-400 p-2 text-center text-emerald-900">{hadirP}</td>
                  <td className="border border-slate-400 p-2 text-center bg-emerald-100 text-emerald-950">{totalHadir}</td>
                  <td className="border border-slate-400 p-2 text-center">{totalBelumHadir}</td>
                  <td className="border border-slate-400 p-2 text-center text-emerald-900">{participationRate}%</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Notes */}
          <div className="my-4 text-xs font-sans text-slate-700 space-y-1">
            <p><strong>Catatan Pelaksanaan:</strong></p>
            <ol className="list-decimal list-inside space-y-0.5 text-slate-600">
              <li>Data pemilih terverifikasi dari Database DPT Resmi Pilkades Wanajaya (Google Spreadsheet Terintegrasi).</li>
              <li>Presensi dicatat secara real-time berdasarkan bukti fisik KTP / Surat Pemberitahuan Pemilih (C6).</li>
              <li>Berita acara ini ditandatangani bersama oleh KPPS dan Saksi para Calon Kepala Desa Wanajaya.</li>
            </ol>
          </div>

          {/* Signatures Block */}
          <div className="mt-8 pt-4 font-sans text-xs">
            <div className="text-center font-medium mb-6">
              Wanajaya, {todayDate}
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              {/* KPPS 1 */}
              <div>
                <p className="font-semibold text-slate-700 mb-16">
                  Ketua KPPS Pilkades
                </p>
                <p className="font-bold border-t border-slate-400 pt-1 inline-block min-w-[160px]">
                  ( ......................................... )
                </p>
              </div>

              {/* Saksi */}
              <div>
                <p className="font-semibold text-slate-700 mb-16">
                  Saksi Calon Kades
                </p>
                <p className="font-bold border-t border-slate-400 pt-1 inline-block min-w-[160px]">
                  ( ......................................... )
                </p>
              </div>

              {/* Pengawas */}
              <div>
                <p className="font-semibold text-slate-700 mb-16">
                  Pengawas Pemilihan Desa
                </p>
                <p className="font-bold border-t border-slate-400 pt-1 inline-block min-w-[160px]">
                  ( ......................................... )
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
