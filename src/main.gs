function doGet(e){
  return HtmlService.createHtmlOutput("Hello, this is a telegram bot server!");
}

function doPost(e) {
  // Make sure to only reply to json requests
  if(e.postData.type == "application/json") {
    
    // Parse the update sent from Telegram
    var update = JSON.parse(e.postData.contents);

    // Instantiate our bot passing the update 
    var bot = new Bot(tgBotToken, update);
    
    // Building commands
    var bus = new CommandBus();
    bus.on(/\/start/, function () {
      this.replyToSender("Nya!");
    });
    
    bus.on(/\/ping/, function () {
      this.replyToChat("pong!");
    });

    bus.on(/\/pic@aomaru_bot\s*([\u4e00-\u9fa5A-Za-z0-9_]+)?/, function () {
      this.replyToChat("为什么不试试 /setu@aomaru_bot 呢? [E01]");
    });
    
    bus.on(/\/pic\s*([\u4e00-\u9fa5A-Za-z0-9_]+)?/, function () {
      this.replyToChat("为什么不试试 /setu 呢? [E02]");
    });
    bus.on(/\/setu@aomaru_bot\s*([\u4e00-\u9fa5A-Za-z0-9_]+)?/, setu);

    bus.on(/\/setu\s*([\u4e00-\u9fa5A-Za-z0-9_]+)?/, setu);
    
    // Register the command bus
    bot.register(bus);
    
    // If the update is valid, process it
    if (update) {
      bot.process();
    }   
  } 
  
  // record message to log
  logToSheet(update);     
}

function setWebhook() {
  var bot = new Bot(tgBotToken, {});
  var result = bot.request('setWebhook', {
    url: ScriptApp.getService().getUrl()
  });
  
  Logger.log(result);
}
