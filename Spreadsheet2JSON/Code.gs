/**
 * =================================================================
 * PROJECT : SPREADSHEET TO JSON ULTIMATE + DASHBOARD + TELEGRAM
 * BRAND   : SPY-E & 123Tool
 * VERSION : 5.0 (Pro Edition)
 * =================================================================
 */

const CONFIG = {
  FOLDER_ID: "MASUKKAN_ID_FOLDER_DRIVE_ANDA", 
  FILENAME: "database_spy_e.json",           
  TELEGRAM_TOKEN: "TOKEN_BOT_ANDA",          
  CHAT_ID: "ID_CHAT_ANDA",                   
  BRAND_NAME: "SPY-E & 123Tool",
  SHEET_INDEX: 0
};

/**
 * Melayani akses Web (Dashboard & API)
 */
function doGet() {
  const template = HtmlService.createTemplateFromFile('Index');
  template.brand = CONFIG.BRAND_NAME;
  return template.evaluate()
    .setTitle(CONFIG.BRAND_NAME + " - Dashboard")
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Endpoint API untuk mengambil data mentah
 */
function getApiData() {
  const data = db_getJSON();
  return {
    status: "success",
    timestamp: new Date().toLocaleString("id-ID"),
    results: data
  };
}

/**
 * Trigger Otomatis saat edit Spreadsheet
 */
function onEditTrigger(e) {
  const isSuccess = saveToDrive();
  if (isSuccess) {
    const msg = `🔔 *[${CONFIG.BRAND_NAME}] Update!*\n\n` +
                `✅ Data berhasil disinkronkan.\n` +
                `📂 File: \`${CONFIG.FILENAME}\` update.\n` +
                `🕒 ${new Date().toLocaleString("id-ID")}`;
    sendTelegramNotif(msg);
  }
}

function db_getJSON() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[CONFIG.SHEET_INDEX]; 
  const frozenRows = sheet.getFrozenRows() || 1; 
  const values = sheet.getDataRange().getValues();

  if (values.length <= frozenRows) return [];

  const keys = values[frozenRows - 1].map(h => normalizeKey(h));
  return values.slice(frozenRows).map(row => {
    return keys.reduce((obj, key, index) => {
      let val = row[index];
      if (key && val !== "" && val !== null) obj[key] = val;
      return obj;
    }, {});
  }).filter(item => Object.keys(item).length > 0);
}

function saveToDrive() {
  try {
    const data = db_getJSON();
    const folder = DriveApp.getFolderById(CONFIG.FOLDER_ID);
    const jsonString = JSON.stringify(data, null, 2);
    const files = folder.getFilesByName(CONFIG.FILENAME);
    files.hasNext() ? files.next().setContent(jsonString) : folder.createFile(CONFIG.FILENAME, jsonString, MimeType.PLAIN_TEXT);
    return true;
  } catch (e) { return false; }
}

function sendTelegramNotif(message) {
  const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_TOKEN}/sendMessage`;
  UrlFetchApp.fetch(url, {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify({"chat_id": CONFIG.CHAT_ID, "text": message, "parse_mode": "Markdown"})
  });
}

function normalizeKey(str) {
  if (!str) return "";
  return str.toString().replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(w => w.length > 0)
    .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}
