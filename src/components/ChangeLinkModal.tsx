import React, { useState } from 'react';
import {
  X,
  Link2,
  FileSpreadsheet,
  Check,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  DEFAULT_GOOGLE_SHEET_CSV_URL,
  DEFAULT_GOOGLE_SHEET_VIEW_URL,
  getCustomSheetUrl,
  saveCustomSheetUrl,
  getActiveSheetViewUrl,
  getActiveSheetCsvUrl,
} from '../utils/csvSync';

interface ChangeLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLinkUpdated: (newViewUrl: string) => void;
}

export const ChangeLinkModal: React.FC<ChangeLinkModalProps> = ({
  isOpen,
  onClose,
  onLinkUpdated,
}) => {
  const [sheetUrl, setSheetUrl] = useState<string>(() => getCustomSheetUrl() || DEFAULT_GOOGLE_SHEET_VIEW_URL);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentActiveUrl = getActiveSheetViewUrl();
  const isCustom = Boolean(getCustomSheetUrl());

  const handleSave = () => {
    const trimmed = sheetUrl.trim();
    saveCustomSheetUrl(trimmed);
    setSaveStatus('Tautan Google Spreadsheet berhasil diperbarui!');
    onLinkUpdated(getActiveSheetViewUrl());
    setTimeout(() => {
      onClose();
      setSaveStatus(null);
    }, 900);
  };

  const handleResetToDefault = () => {
    saveCustomSheetUrl('');
    setSheetUrl(DEFAULT_GOOGLE_SHEET_VIEW_URL);
    setSaveStatus('Tautan dikembalikan ke Spreadsheet Resmi TPS 50.');
    onLinkUpdated(DEFAULT_GOOGLE_SHEET_VIEW_URL);
    setTimeout(() => {
      onClose();
      setSaveStatus(null);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Ganti Link Google Spreadsheet</h3>
              <p className="text-[11px] text-slate-400">Pilkades Wanajaya 2026 &bull; TPS 50</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs text-slate-700">
          <div>
            <label className="font-semibold text-slate-900 block mb-1.5 flex items-center justify-between">
              <span>Masukkan URL Google Spreadsheet Baru:</span>
              {isCustom ? (
                <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 font-medium">
                  Link Kustom Aktif
                </span>
              ) : (
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
                  Link Default TPS 50
                </span>
              )}
            </label>
            <input
              type="url"
              value={sheetUrl}
              onChange={(e) => {
                setSheetUrl(e.target.value);
                setSaveStatus(null);
              }}
              placeholder="https://docs.google.com/spreadsheets/d/.../edit atau link /pubhtml"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
            <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
              Anda dapat memasukkan link spreadsheet biasa (<code>/edit</code>), link hasil publikasi (<code>/pubhtml</code>), maupun tautan CSV. Sistem akan otomatis menyesuaikannya.
            </p>
          </div>

          {/* Current Active Target */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-700 block">Tautan Aktif Saat Ini:</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentActiveUrl}
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[10px] font-mono text-slate-600 truncate"
              />
              <a
                href={currentActiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg shrink-0 transition-colors"
                title="Buka Lembar Spreadsheet di Tab Baru"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {saveStatus && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{saveStatus}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={handleResetToDefault}
              className="w-full sm:w-auto px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kembalikan ke Link TPS 50</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-3.5 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl font-medium text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Link Baru</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
