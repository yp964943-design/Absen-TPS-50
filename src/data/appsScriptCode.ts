export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * =========================================================================
 * SISTEM VERIFIKASI & ABSENSI PILKADES WANAJAYA 2026
 * Google Apps Script Web App (Integrasi Dua Arah / Two-Way Sync)
 * =========================================================================
 * 
 * Struktur Kolom di Spreadsheet:
 * Kolom A: NO
 * Kolom B: NAMA
 * Kolom C: JK (L/P)
 * Kolom D: ALAMAT
 * Kolom E: RT
 * Kolom F: ABSENSI (Akan otomatis diisi tanggal/jam kehadiran)
 */

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var lock = LockService.getScriptLock();
  // Kunci sheet hingga 30 detik untuk mencegah konflik saat beberapa meja verifikasi absen bersamaan
  lock.tryLock(30000);

  try {
    var params = {};
    
    // Tangkap parameter dari POST body maupun GET query string
    if (e && e.postData && e.postData.contents) {
      try {
        params = JSON.parse(e.postData.contents);
      } catch (err) {
        params = e.parameter || {};
      }
    } else if (e && e.parameter) {
      params = e.parameter;
    }

    var action = params.action || 'ping';
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // 1. TES KONEKSI
    if (action === 'ping') {
      return respondJSON({
        success: true,
        message: "Koneksi Google Apps Script Pilkades Wanajaya Aktif!",
        timestamp: new Date().toISOString()
      });
    }

    // 2. TANDAI / BATALKAN ABSENSI PEMILIH
    if (action === 'mark' || action === 'update') {
      var voterNo = parseInt(params.no, 10);
      var isHadir = String(params.hadir) === 'true' || params.hadir === true || params.status === 'HADIR';
      var waktu = params.waktu || Utilities.formatDate(new Date(), "Asia/Jakarta", "HH:mm") + " WIB";
      var petugas = params.petugas || "Petugas Meja";
      var absensiValue = isHadir ? ("HADIR (" + waktu + ")") : "";

      if (isNaN(voterNo) || voterNo <= 0) {
        return respondJSON({ success: false, error: "Nomor DPT tidak valid" });
      }

      var data = sheet.getDataRange().getValues();
      var targetRow = -1;

      // Cari baris berdasarkan Nomor DPT di Kolom A (index 0)
      for (var r = 1; r < data.length; r++) {
        if (parseInt(data[r][0], 10) === voterNo) {
          targetRow = r + 1; // Baris spreadsheet berbasis 1-indexed
          break;
        }
      }

      if (targetRow === -1) {
        return respondJSON({
          success: false,
          error: "Nomor urut DPT #" + voterNo + " tidak ditemukan pada baris data"
        });
      }

      // Update nilai di Kolom F (ABSENSI) baris target
      sheet.getRange(targetRow, 6).setValue(absensiValue);

      return respondJSON({
        success: true,
        no: voterNo,
        row: targetRow,
        status: isHadir ? "HADIR" : "BELUM HADIR",
        absensi: absensiValue,
        message: isHadir 
          ? "Presensi DPT #" + voterNo + " berhasil dicatat ke Google Sheets!"
          : "Presensi DPT #" + voterNo + " berhasil dibatalkan dari Google Sheets."
      });
    }

    // 3. AMBIL SEMUA STATUS PRESENSI DARI SHEET
    if (action === 'getAll') {
      var values = sheet.getDataRange().getValues();
      var attendanceList = [];

      for (var i = 1; i < values.length; i++) {
        var noVal = parseInt(values[i][0], 10);
        if (!isNaN(noVal) && noVal > 0) {
          attendanceList.push({
            no: noVal,
            nama: values[i][1],
            rt: values[i][4],
            absensi: values[i][5] ? String(values[i][5]) : ""
          });
        }
      }

      return respondJSON({
        success: true,
        total: attendanceList.length,
        data: attendanceList
      });
    }

    // 4. RESET SELURUH KOLOM ABSENSI (KOLOM F)
    if (action === 'resetAll') {
      var lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.getRange(2, 6, lastRow - 1, 1).clearContent();
      }
      return respondJSON({
        success: true,
        message: "Seluruh catatan di Kolom F (ABSENSI) berhasil dikosongkan."
      });
    }

    return respondJSON({ success: false, error: "Aksi tidak dikenali: " + action });

  } catch (err) {
    return respondJSON({ success: false, error: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

function respondJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
