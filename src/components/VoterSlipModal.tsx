import React from 'react';
import { X, Printer, CheckCircle2, QrCode, ShieldCheck, MapPin, Clock, User } from 'lucide-react';
import { Voter } from '../data/initialVoters';

interface VoterSlipModalProps {
  voter: Voter | null;
  attendanceInfo?: { hadir: boolean; hadirAt?: string; petugas?: string; catatan?: string };
  onClose: () => void;
}

export const VoterSlipModal: React.FC<VoterSlipModalProps> = ({
  voter,
  attendanceInfo,
  onClose,
}) => {
  if (!voter) return null;

  const hadirTime = attendanceInfo?.hadirAt || voter.absensi || 'Tercatat';
  const petugasName = attendanceInfo?.petugas || 'Petugas KPPS Meja 1';
  const verificationCode = `WLN-DPT-${voter.no.toString().padStart(3, '0')}-${voter.rt}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold tracking-tight">
              Bukti Kehadiran Pemilih (Slip Presensi)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Slip Content */}
        <div id="voter-slip-print" className="p-6">
          {/* Institutional Header */}
          <div className="text-center pb-4 border-b border-dashed border-slate-300">
            <div className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-full text-xs font-bold mb-2">
              ✓ TERVERIFIKASI HADIR DI TPS 50
            </div>
            <h2 className="text-base font-extrabold text-slate-900 uppercase">
              PEMILIHAN KEPALA DESA WANAJAYA
            </h2>
            <p className="text-xs text-slate-500">
              Kecamatan Cibitung, Kabupaten Bekasi &bull; TPS 50 Pesona Gading Cibitung
            </p>
          </div>

          {/* Voter Highlight Box */}
          <div className="my-5 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <span className="text-xs text-slate-500 font-medium">Nomor Urut DPT:</span>
              <span className="font-mono font-extrabold text-lg text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                #{voter.no.toString().padStart(3, '0')}
              </span>
            </div>

            <div className="flex items-start justify-between border-b border-slate-200/80 pb-2">
              <span className="text-xs text-slate-500 font-medium">Nama Pemilih:</span>
              <span className="font-bold text-slate-900 text-right">{voter.nama}</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <span className="text-xs text-slate-500 font-medium">Jenis Kelamin:</span>
              <span className="text-xs font-semibold text-slate-800">
                {voter.jk === 'L' ? 'Laki-Laki (L)' : 'Perempuan (P)'}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <span className="text-xs text-slate-500 font-medium">Rukun Tetangga (RT):</span>
              <span className="text-xs font-bold text-slate-800">RT 0{voter.rt}</span>
            </div>

            <div className="flex items-start justify-between border-b border-slate-200/80 pb-2">
              <span className="text-xs text-slate-500 font-medium">Alamat:</span>
              <span className="text-xs text-slate-700 text-right max-w-[200px]">
                {voter.alamat}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-slate-500 font-medium">Waktu Kehadiran:</span>
              <span className="font-mono font-bold text-emerald-700">
                {hadirTime} WIB
              </span>
            </div>
          </div>

          {/* Barcode & Verification Token Visual */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg text-center flex flex-col items-center justify-center">
            {/* Simulated Clean Barcode */}
            <div className="h-10 flex items-center justify-center gap-1 w-48 mb-1.5 opacity-80">
              <span className="w-1 h-full bg-slate-900"></span>
              <span className="w-2 h-full bg-slate-900"></span>
              <span className="w-0.5 h-full bg-slate-900"></span>
              <span className="w-3 h-full bg-slate-900"></span>
              <span className="w-1 h-full bg-slate-900"></span>
              <span className="w-2 h-full bg-slate-900"></span>
              <span className="w-0.5 h-full bg-slate-900"></span>
              <span className="w-1.5 h-full bg-slate-900"></span>
              <span className="w-2.5 h-full bg-slate-900"></span>
              <span className="w-1 h-full bg-slate-900"></span>
              <span className="w-0.5 h-full bg-slate-900"></span>
              <span className="w-2 h-full bg-slate-900"></span>
              <span className="w-3 h-full bg-slate-900"></span>
            </div>
            <span className="font-mono text-[11px] text-slate-500 font-semibold tracking-wider">
              {verificationCode}
            </span>
            <span className="text-[10px] text-slate-400 mt-1">
              Diverifikasi oleh: {petugasName}
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            Tutup
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Bukti Slip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
