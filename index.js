#!/usr/bin/env node --harmony

var connect = require('./lib/connect');

if (require.main === module) {
  // ya so i dunno why but if i just call `connect` i get
  // DEPTH_ZERO_SELF_SIGNED_CERT error events emitted on `bot.socket`
  // connect();

  // BUT if i run it in its own context, that doesn't happen. and if i change
  // the contents of the pem file, it doesn't work either way, so i don't think
  // it's the pem file.
  var vm = require('vm');
  var fn = connect.toString().replace(/^[^{]+\{/, '').replace(/\}\s*$/, '');
  vm.runInContext(fn, vm.createContext({
    require: require,
    process: process,
    console: console
  }));

}
