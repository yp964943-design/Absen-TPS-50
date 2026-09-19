export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * =========================================================================
 * SISTEM VERIFIKASI & ABSENSI PILKADES WANAJAYA 2026 - TPS 50
 * Google Apps Script Web App (Integrasi Otomatis Dua Arah / Two-Way Sync)
 * =========================================================================
 * 
 * Struktur Kolom di Spreadsheet:
 * Kolom A (1): NO
 * Kolom B (2): NAMA
 * Kolom C (3): JK (L/P)
 * Kolom D (4): ALAMAT
 * Kolom E (5): RT
 * Kolom F (6): ABSENSI (Akan otomatis diisi tanggal/jam kehadiran)
 */

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var lock = LockService.getScriptLock();
  // Kunci sheet hingga 30 detik untuk mencegah konflik saat absensi cepat
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
    var sheet = getTargetDptSheet(ss);

    // 1. TES KONEKSI
    if (action === 'ping') {
      return respondJSON({
        success: true,
        sheetName: sheet.getName(),
        message: "Koneksi Google Apps Script Pilkades Wanajaya Aktif pada sheet: " + sheet.getName(),
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
          error: "Nomor urut DPT #" + voterNo + " tidak ditemukan pada sheet " + sheet.getName()
        });
      }

      // Cari kolom ABSENSI secara dinamis pada baris 1
      var absensiCol = getAbsensiColumnIndex(sheet);

      // Update nilai di Kolom ABSENSI baris target
      sheet.getRange(targetRow, absensiCol).setValue(absensiValue);
      
      // Paksa Google Sheets menyimpan perubahan seketika
      SpreadsheetApp.flush();

      return respondJSON({
        success: true,
        no: voterNo,
        row: targetRow,
        col: absensiCol,
        sheet: sheet.getName(),
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
      var absensiColIdx = getAbsensiColumnIndex(sheet) - 1;
      var attendanceList = [];

      for (var i = 1; i < values.length; i++) {
        var noVal = parseInt(values[i][0], 10);
        if (!isNaN(noVal) && noVal > 0) {
          attendanceList.push({
            no: noVal,
            nama: values[i][1],
            rt: values[i][4],
            absensi: values[i][absensiColIdx] ? String(values[i][absensiColIdx]) : ""
          });
        }
      }

      return respondJSON({
        success: true,
        total: attendanceList.length,
        sheet: sheet.getName(),
        data: attendanceList
      });
    }

    // 4. RESET SELURUH KOLOM ABSENSI
    if (action === 'resetAll') {
      var lastRow = sheet.getLastRow();
      var absCol = getAbsensiColumnIndex(sheet);
      if (lastRow > 1) {
        sheet.getRange(2, absCol, lastRow - 1, 1).clearContent();
        SpreadsheetApp.flush();
      }
      return respondJSON({
        success: true,
        message: "Seluruh catatan di Kolom ABSENSI berhasil dikosongkan."
      });
    }

    return respondJSON({ success: false, error: "Aksi tidak dikenali: " + action });

  } catch (err) {
    return respondJSON({ success: false, error: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Mencari tab sheet DPT dengan cerdas (berdasarkan GID 915343721 atau header NO & NAMA)
 */
function getTargetDptSheet(ss) {
  var sheets = ss.getSheets();
  
  // 1. Cek sheet yang cocok dengan GID 915343721
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === 915343721) {
      return sheets[i];
    }
  }

  // 2. Cek sheet yang baris pertamanya memiliki header NO dan NAMA
  for (var j = 0; j < sheets.length; j++) {
    var maxCols = Math.min(sheets[j].getLastColumn() || 1, 10);
    var firstRow = sheets[j].getRange(1, 1, 1, maxCols).getValues()[0];
    var rowText = firstRow.join(" ").toUpperCase();
    if (rowText.indexOf("NO") !== -1 && rowText.indexOf("NAMA") !== -1) {
      return sheets[j];
    }
  }

  // 3. Fallback ke sheet aktif atau sheet pertama
  return ss.getActiveSheet() || sheets[0];
}

/**
 * Mendeteksi kolom ABSENSI (default Kolom F / ke-6)
 */
function getAbsensiColumnIndex(sheet) {
  var headerRow = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 6)).getValues()[0];
  for (var c = 0; c < headerRow.length; c++) {
    var title = String(headerRow[c] || "").toUpperCase().trim();
    if (title === 'ABSENSI' || title === 'KEHADIRAN' || title === 'STATUS') {
      return c + 1; // 1-indexed
    }
  }
  return 6; // Default kolom F
}

function respondJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
