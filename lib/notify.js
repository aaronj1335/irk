var spawn = require('child_process').spawn;
var Notifier = require('node-notifier');

var scpt = 'if application "Textual" is frontmost then\n  get version of application "Textual"\nend if';
var notifier = new Notifier();

function checkIfFrontmost(cb) {
  var isFront = spawn('osascript', ['-e', scpt]);
  var out = '';

  isFront.stdout.on('data', function(d) {
    out += d.toString().replace(/^\s+$/, '');
  });
  isFront.stdout.resume();
  isFront.on('close', function(code) {
    cb(!!out);
  });
};

module.exports = function notify(msg) {
  checkIfFrontmost(function(isFront) {
    if (!isFront)
      notifier.notify(msg);
  });
};
