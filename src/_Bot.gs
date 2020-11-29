function Bot (token, update) {
  this.token = token;
  this.update = update;
  this.handlers = [];
}

Bot.prototype.register = function ( handler) {
  this.handlers.push(handler);
}

Bot.prototype.process = function () {  
  for (var i in this.handlers) {
    var event = this.handlers[i];
    var result = event.condition(this);
    if (result) {
      return event.handle(this);
    }
  }
}

Bot.prototype.request = function (method, data) {
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data)
  };
  
  var response = UrlFetchApp.fetch('https://api.telegram.org/bot' + this.token + '/' + method, options);
    
  if (response.getResponseCode() == 200) {
    return JSON.parse(response.getContentText());
  }
  
  return false;
}

Bot.prototype.replyToSender = function (text) {
  return this.request('sendMessage', {
    'chat_id': this.update.message.from.id,
    'text': text
  });
}

Bot.prototype.replyToChat = function (text) {
  return this.request('sendMessage', {
    'chat_id': this.update.message.chat.id,
    'text': text
  });
}

Bot.prototype.replyPicToChat = function (url, caption) {
    return this.request('sendPhoto', {
      'chat_id': this.update.message.chat.id,
      'photo': url,
      'caption': caption
    });
  }
