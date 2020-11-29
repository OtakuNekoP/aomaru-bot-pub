function CommandBus() {
  this.commands = [];
}

CommandBus.prototype.on = function (regexp, callback) {
  this.commands.push({'regexp': regexp, 'callback': callback});
}

CommandBus.prototype.condition = function (bot) {
  return bot.update.message.text.charAt(0) === '/';
}

CommandBus.prototype.handle = function (bot) {  
  for (var i in this.commands) {
    var cmd = this.commands[i];
    var tokens = cmd.regexp.exec(bot.update.message.text);
    if (tokens != null) {
      return cmd.callback.apply(bot, tokens.splice(1));
    }
  }
  return bot.replyToSender("Invalid command [E00]");
}
