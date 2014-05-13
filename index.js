#!/usr/bin/env node --harmony

var fs = require('fs');
var vm = require('vm');

var connect = fs.readFileSync(require.resolve('./lib/connect')).toString();

if (require.main === module) {
  // ya so i dunno why but if i just call `require('./lib/connect')()` i get
  // DEPTH_ZERO_SELF_SIGNED_CERT error events emitted on `bot.socket`

  // BUT if i run it in its own context, that doesn't happen. and if i change
  // the contents of the pem file, it doesn't work either way, so i don't think
  // it's the pem file.

  vm.runInContext(connect + ';module.exports();', vm.createContext({
    require: require,
    process: process,
    console: console,
    module: module
  }));

  (function chill() {
    setTimeout(chill, 10000);
  })();
}
