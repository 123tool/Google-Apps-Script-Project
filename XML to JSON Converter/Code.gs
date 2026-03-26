/**
 * =================================================================
 * PROJECT : XML TO JSON ULTIMATE (PDF + TELE + WA)
 * BRAND   : SPY-E & 123Tool
 * VERSION : 6.0 (Enterprise Edition)
 * =================================================================
 */

const CONFIG = {
  // 1. TELEGRAM CONFIG
  TELE_TOKEN: "TOKEN_BOT_ANDA",
  TELE_CHAT_ID: "ID_CHAT_ANDA",

  // 2. WHATSAPP CONFIG (Menggunakan Fonnte API sebagai contoh)
  WA_TOKEN: "TOKEN_FONNTE_ANDA",
  WA_NUMBER: "NOMOR_WA_ANDA", // Contoh: 08123456789

  // 3. DRIVE CONFIG
  FOLDER_PDF_ID: "ID_FOLDER_DRIVE_UNTUK_PDF",

  // 4. BRANDING
  BRAND: "SPY-E & 123Tool"
};

/**
 * Endpoint Web App
 */
function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setTitle(CONFIG.BRAND + " - XML Converter")
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * FUNGSI INTI: XML TO JSON
 */
function processXml(xmlString) {
  try {
    const doc = XmlService.parse(xmlString);
    const root = doc.getRootElement();
    const result = {};
    result[root.getName()] = elementToObj(root);
    
    // Generate PDF & Ambil URL-nya
    const pdfUrl = createPdfResult(result);
    
    // Kirim Notifikasi Dual Channel
    const msg = `🚀 *[${CONFIG.BRAND}] XML Processed!*\n\nData XML berhasil dikonversi.\n📄 PDF: ${pdfUrl}`;
    sendTelegram(msg);
    sendWhatsApp(msg.replace(/\*/g, '')); // WA tidak pakai Markdown bintang

    return { success: true, data: result, pdfUrl: pdfUrl };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

/**
 * REKURSIF ELEMENT
 */
function elementToObj(element) {
  const result = {};
  element.getAttributes().forEach(attr => result[attr.getName()] = castValue(attr.getValue()));
  element.getChildren().forEach(child => {
    const key = child.getName();
    const value = elementToObj(child);
    if (result[key]) {
      if (!(Array.isArray(result[key]))) result[key] = [result[key]];
      result[key].push(value);
    } else { result[key] = value; }
  });
  const text = element.getText().trim();
  if (text) {
    if (Object.keys(result).length === 0) return castValue(text);
    result['value'] = castValue(text);
  }
  return result;
}

function castValue(v) {
  if (v === "true") return true;
  if (v === "false") return false;
  return (!isNaN(v) && v !== "") ? Number(v) : v;
}

/**
 * CREATE PDF & SAVE TO DRIVE
 */
function createPdfResult(jsonData) {
  const folder = DriveApp.getFolderById(CONFIG.FOLDER_PDF_ID);
  const fileName = `XML_Export_${new Date().getTime()}.html`;
  
  // Buat tampilan HTML sederhana untuk PDF
  const htmlContent = `
    <html>
      <body style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #2c3e50;">${CONFIG.BRAND} - XML Export Report</h2>
        <hr>
        <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
          ${JSON.stringify(jsonData, null, 2)}
        </pre>
        <p style="font-size: 10px; color: grey;">Generated on: ${new Date()}</p>
      </body>
    </html>
  `;
  
  const blob = Utilities.newBlob(htmlContent, 'text/html', fileName);
  const pdfFile = folder.createFile(blob.getAs('application/pdf'));
  pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  return pdfFile.getDownloadUrl().replace("?e=download", "");
}

/**
 * NOTIFICATION CHANNELS
 */
function sendTelegram(msg) {
  const url = `https://api.telegram.org/bot${CONFIG.TELE_TOKEN}/sendMessage`;
  UrlFetchApp.fetch(url, {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify({"chat_id": CONFIG.TELE_CHAT_ID, "text": msg, "parse_mode": "Markdown"})
  });
}

function sendWhatsApp(msg) {
  const url = "https://api.fonnte.com/send";
  UrlFetchApp.fetch(url, {
    "method": "post",
    "headers": { "Authorization": CONFIG.WA_TOKEN },
    "payload": { "target": CONFIG.WA_NUMBER, "message": msg }
  });
}
