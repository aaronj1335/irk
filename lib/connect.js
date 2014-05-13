var fs = require('fs');

var irc = require('irc-js');

var handle = require('./lib/handlers');

var SSH_DIR = process.env.HOME + '/.ssh/';
var ca = false
var user;

if (fs.existsSync(SSH_DIR + 'znc.pem'))
  ca = {ca: fs.readFileSync(SSH_DIR + 'znc.pem')};

if (fs.existsSync(SSH_DIR + 'znc-login.json'))
  user = JSON.parse(fs.readFileSync(SSH_DIR + 'znc-login.json'));

module.exports = function connect() {
  var bot = irc.connect({
    nick: 'aaronj1335',
    server: {
      address: 'dev1.waterfall.com',
      port: 1335,
      ssl: ca
    },
    user: user
  }, function() {
    handle(bot);
  });
};
