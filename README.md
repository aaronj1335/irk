# `irk`

scriptable irc notifications

## running

```text
git clone https://github.com/aaronj1335/irk.git
cd irk
npm install
npm run
```

if you want ssl, make sure it's using a version of IRC-js that includes [this
little guy][oh-that-little-guy].

## scripting notifications

add a handler to the [`lib/handlers.js`][handlers] export function like this:

```js
bot.match('PRIVMSG', function(msg) {
  var chan = msg.params[0];
  var text = msg.params[1] && msg.params[1].slice(1);
  if (chan === '#butts')
    notify(text);
});
```

note that `bot` is an instance of an [`IRC-js`][ircjs] bot, so you can check
that for documentation.

## self-signed certs

you look like a stingy, paranoid nerd, so chances are you're hooking `irk` up
to a bouncer running somewhere w/ a self-signed cert. no worries, just put that
`*.pem` file in `~/.ssh/znc.pem`, and your login credentials in
`~/.ssh/znc-login.json` like this:

```json
{
  "username": "johnlau",
  "password": "pass1234"
}
```

[handlers]: /aaronj1335/irk/master/lib/handlers.js
[ircjs]: https://github.com/gf3/IRC-js
[oh-that-little-guy]: https://github.com/gf3/IRC-js/pull/69
