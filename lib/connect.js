module.exports = function connect() {
  // i'd like to leave these all in the top of the file, but we can't because
  // of the weird tls behavior
  var fs = require('fs');

  var irc = require('irc-js');

  var handle = require('./lib/handlers');

  var SSH_DIR = process.env.HOME + '/.ssh/';
  var ca = fs.readFileSync(SSH_DIR + 'znc.pem');
  var user = JSON.parse(fs.readFileSync(SSH_DIR + 'znc-login.json'));

  var bot = irc.connect({
    nick: 'aaronj1335',
    server: {
      address: 'dev1.waterfall.com',
      port: 1335,
      ssl: {
        ca: ca
      }
    },
    user: user
  }, function() {
    handle(bot);
  });
}
