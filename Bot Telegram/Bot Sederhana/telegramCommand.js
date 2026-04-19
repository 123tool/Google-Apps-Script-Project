var token = "";
var url = "https://api.telegram.org/bot" + token;
var webAppUrl = "";
function setWebhook() {
    var response = UrlFetchApp.fetch(url + "/setWebhook?url=" + webAppUrl);
    Logger.log(response.getContentText());
  }
function doPost(e) {
  var stringJson = e.postData.getDataAsString();
  var updates = JSON.parse(stringJson);
  var id = updates.message.from.id;
  var nama = updates.message.from.first_name;
  var username = updates.message.from.username;
  var textBot = updates.message.text;
  var chat_bot = textBot;
  var command_cek = chat_bot.substring(0, 1);
  var command = chat_bot.split(" ")[0]; // command
  var subCommand = chat_bot.split(" ")[1]; // odp
  
  
  if (command_cek == "/") {
      let text = "Ini merupakan perintah untuk BOT";
      sendText(id, text);
  } else {
    let text = "Bukan perintah !";
    sendText(id, text);
  }
  switch(perintah){
    case "/start" :
    break;
    case "/help" :
        
    break;
    case "/cabutan" :
    
    break;
    case "/cekgolive" :
      
    break;
    case "/adduser" :
    
    break;
    default:
    sendText(id,"Perintah yang anda kirimkan tidak ada di bot ini !!");    
  }
  
}

function simpan(data) {
  let id = data.message.from.id;
  var nama = data.message.from.first_name;
  var username = data.message.from.username;
  var pesan = data.message.text;
  let text = pesan;
  var now = new Date();
  var waktu = Utilities.formatDate(now, "Asia/Jakarta", "dd/mm/yyyy hh:mm:ss"); // format timestamp indonesia

  var txt1 = text.split(" ")[0]; // kata pertama/command
  var txt2 = text.split(" ")[1]; // kata kedua
  var txt3 = text.split(" ")[2]; // kata ketiga

  var SSID = ""; //alamat spreadsheet untuk simpan
  var namasheet = ""; //alamat sheet pada spreadsheet
  SpreadsheetApp.openById(SSID).getSheetByName(namasheet).appendRow([waktu, id, username, txt1, txt2, txt3]); // input log
}

function sendText(chatid, text, replymarkup) {
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatid),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(replymarkup)
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}
