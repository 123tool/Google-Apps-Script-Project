// configuration
var apiToken = "YOUR_TELEGRAM_BOT_TOKEN";
var appUrl = "YOUR_GOOGLE_APPS_SCRIPT_URL";
var apiUrl = "https://api.telegram.org/bot" + apiToken;

//commands
var command = {
   "/start": {
      type: "text",
      text: "Hello welcome to my bot",
   },
   amazon: {
      type: "image",
      text: "Amazon Logo",
      url: "https://companieslogo.com/img/orig/AMZN-e9f942e4.png",
   },
   alibaba: {
      type: "image",
      text: "Alibaba Logo",
      url: "https://companieslogo.com/img/orig/BABA-2884ac04.png",
   },
   apple: {
      type: "image",
      text: "Apple Logo",
      url: "https://companieslogo.com/img/orig/AAPL-bf1a4314.png",
   },
   facebook: {
      type: "image",
      text: "Facebook Logo",
      url: "https://companieslogo.com/img/orig/FB-2d2223ad.png",
   },
};

//set webhook
function setWebhook() {
   var url = apiUrl + "/setWebhook?url=" + appUrl;
   var req = UrlFetchApp.fetch(url).getContentText();
   Logger.log(req);
}

//handle webhook
function doPost(e) {
   var webhookData = JSON.parse(e.postData.contents);
   var from = webhookData.message.from.id;
   var text = webhookData.message.text;

   if (typeof command[text] == "undefined") {
      var sendType = "text";
      var sendText = encodeURIComponent("command not found");
   } else {
      if (command[text]["type"] == "text") {
         var sendType = "text";
         var sendText = encodeURIComponent(command[text]["text"]);
      } else {
         var sendType = "image";
         var sendText = encodeURIComponent(command[text]["text"]);
         var sendImageUrl = encodeURIComponent(command[text]["url"]);
      }
   }

   if (sendType == "text") {
      var url = apiUrl + "/sendMessage?parseMode=HTML&chat_id=" + from + "&text=" + sendText;
   } else {
      var url = apiUrl + "/sendPhoto?parseMode=HTML&chat_id=" + from + "&caption=" + sendText + "&photo=" + sendImageUrl;
   }

   var opts = { muteHttpExceptions: true };
   UrlFetchApp.fetch(url, opts).getContentText();
}
