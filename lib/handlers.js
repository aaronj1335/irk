var notify = require('./notify');

module.exports = function handle(bot) {
  bot.match('*', function(msg) {
    var args = [msg.type, msg.params];

    if (msg.from.nick)
      args.unshift(msg.from.nick);

    console.log.apply(console, args);
  });

  bot.match('PRIVMSG', function(msg) {
    var chan = msg.params[0];
    var text = msg.params[1] && msg.params[1].slice(1);

    if (chan === '#waterfall')
      notify({message: text, title: msg.from.nick});
  });

  process.on('uncaughtException', function(err) {
    console.dir(err);
  });

  bot.socket.on('error', function(err) {
    console.dir(err);
  });
};
