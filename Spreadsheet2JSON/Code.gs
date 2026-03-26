/**
 * =================================================================
 * PROJECT : SPREADSHEET TO JSON ULTIMATE + TELEGRAM NOTIF
 * BRAND   : SPY-E & 123Tool
 * VERSION : 4.0 (Professional Edition)
 * =================================================================
 */

const CONFIG = {
  // 1. KONFIGURASI GOOGLE DRIVE
  FOLDER_ID: "MASUKKAN_ID_FOLDER_DRIVE_ANDA", // ID Folder tempat simpan file JSON
  FILENAME: "database_spy_e.json",           // Nama file hasil ekspor
  
  // 2. KONFIGURASI TELEGRAM BOT
  TELEGRAM_TOKEN: "TOKEN_BOT_ANDA",          // Token dari @BotFather
  CHAT_ID: "ID_CHAT_ANDA",                   // ID Chat Anda (Gunakan @userinfobot)
  
  // 3. KONFIGURASI SPREADSHEET
  SHEET_INDEX: 0,                            // 0 = Sheet pertama (paling kiri)
  BRAND_NAME: "SPY-E & 123Tool"
};

/**
 * [ENDPOINT API]
 * Mengizinkan aplikasi luar (Web/Mobile) mengambil data JSON secara langsung.
 */
function doGet() {
  try {
    const data = db_getJSON();
    const response = {
      status: "success",
      brand: CONFIG.BRAND_NAME,
      timestamp: new Date().toLocaleString("id-ID"),
      total_data: data.length,
      results: data
    };
    
    return ContentService.createTextOutput(JSON.stringify(response, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: err.message 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * [TRIGGER OTOMATIS]
 * Berjalan setiap kali ada sel yang diedit di Spreadsheet.
 */
function onEditTrigger(e) {
  const isSuccess = saveToDrive();
  if (isSuccess) {
    const msg = `🔔 *[${CONFIG.BRAND_NAME}] Update Terdeteksi!*\n\n` +
                `✅ Data Spreadsheet berhasil disinkronkan.\n` +
                `📂 File: \`${CONFIG.FILENAME}\` telah diperbarui di Drive.\n` +
                `🕒 Waktu: ${new Date().toLocaleString("id-ID")}`;
    sendTelegramNotif(msg);
  }
}

/**
 * [FUNGSI INTI: KONVERSI DATA]
 */
function db_getJSON() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[CONFIG.SHEET_INDEX]; 
  const frozenRows = sheet.getFrozenRows() || 1; 
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow <= frozenRows) return [];

  // Ambil semua data sekaligus (Batch Reading)
  const allValues = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  
  // Ambil Header & Normalisasi ke camelCase
  const rawHeaders = allValues[frozenRows - 1];
  const keys = rawHeaders.map(h => normalizeKey(h));
  
  // Mapping baris menjadi Objek JSON
  return allValues.slice(frozenRows).map(row => {
    return keys.reduce((obj, key, index) => {
      let val = row[index];
      if (key && val !== "" && val !== null) {
        obj[key] = val;
      }
      return obj;
    }, {});
  }).filter(item => Object.keys(item).length > 0);
}

/**
 * [SIMPAN KE GOOGLE DRIVE]
 */
function saveToDrive() {
  try {
    const data = db_getJSON();
    const folder = DriveApp.getFolderById(CONFIG.FOLDER_ID);
    const jsonString = JSON.stringify(data, null, 2);
    const files = folder.getFilesByName(CONFIG.FILENAME);
    
    if (files.hasNext()) {
      files.next().setContent(jsonString);
    } else {
      folder.createFile(CONFIG.FILENAME, jsonString, MimeType.PLAIN_TEXT);
    }
    return true;
  } catch (e) {
    console.error("Gagal simpan ke Drive: " + e.message);
    return false;
  }
}

/**
 * [NOTIFIKASI TELEGRAM]
 */
function sendTelegramNotif(message) {
  const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_TOKEN}/sendMessage`;
  const payload = {
    "chat_id": CONFIG.CHAT_ID,
    "text": message,
    "parse_mode": "Markdown"
  };
  
  const options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };
  
  UrlFetchApp.fetch(url, options);
}

/**
 * [HELPER: NORMALISASI KEY]
 */
function normalizeKey(str) {
  if (!str) return "";
  return str.toString()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .filter(word => word.length > 0)
    .map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}
