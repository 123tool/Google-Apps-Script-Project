```javascript
/**
 * SPY-E PRO UPLOADER ENGINE v2.0
 * Dibuat khusus untuk performa tinggi dan integrasi Google Sheets yang rapi.
 */

const CONFIG = {
  FOLDER_ID: '1xlIHqLzja2liarS6soL4nTNjfqfVjA9F', // ID Folder Tujuan
  SHEET_LOG: 'DATAFILEFOTO',                    // Nama Sheet untuk Log
  SHEET_FORM: 'FORM',                           // Nama Sheet untuk Display
  IMAGE_CELL: 'H5',                             // Posisi sel untuk display foto
  MAX_FILE_SIZE: 15 * 1024 * 1024               // Limit 15MB (Safe for Base64)
};

/**
 * Menampilkan Modal Dialog dengan Style Premium
 */
function showDialog() {
  const template = HtmlService.createTemplateFromFile("MenuOpload");
  const ui = template.evaluate()
    .setWidth(500)
    .setHeight(650)
    .setTitle("🚀 Pro File Uploader - AI7 Studio")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
  SpreadsheetApp.getUi().showModalDialog(ui, " ");
}

/**
 * Fungsi Utama Upload dengan Handling Izin & Logging Cerdas
 * @param {string} base64Data - Data file dalam format base64
 * @param {string} fileName - Nama file asli
 * @param {string} mimeType - Tipe file
 */
function processUpload(base64Data, fileName, mimeType) {
  try {
    const folder = DriveApp.getFolderById(CONFIG.FOLDER_ID);
    const decodedData = Utilities.base64Decode(base64Data);
    const blob = Utilities.newBlob(decodedData, mimeType, fileName);
    
    // 1. Simpan File
    const file = folder.createFile(blob);
    
    // 2. FORCE PUBLIC VIEW (Kunci agar gambar muncul di Sheets tanpa bug)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    const fileId = file.getId();
    const fileUrl = file.getUrl();
    const directLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
    
    // 3. Update Display di Sheet FORM
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const formSheet = ss.getSheetByName(CONFIG.SHEET_FORM);
    if (formSheet) {
      formSheet.getRange(CONFIG.IMAGE_CELL).setFormula(`=IMAGE("${directLink}"; 1)`);
    }
    
    // 4. Catat ke Database (Log)
    const logSheet = ss.getSheetByName(CONFIG.SHEET_LOG);
    if (logSheet) {
      const timestamp = new Date();
      logSheet.appendRow([
        timestamp,
        fileName,
        fileId,
        directLink,
        (file.getSize() / 1024).toFixed(2) + " KB",
        Session.getActiveUser().getEmail() // Catat siapa yang upload
      ]);
    }
    
    return {
      status: 'success',
      url: fileUrl,
      name: fileName
    };
    
  } catch (err) {
    console.error(err);
    throw new Error("Gagal memproses file: " + err.message);
  }
}

```
