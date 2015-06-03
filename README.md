# MPD WSGI Web client

mpdwsgi-web is not only a beautiful name but also an extremely impressive web client for the [mpd-wsgi](https://github.com/fixme-lausanne/mpd-wsgi).

> "Extremely good, excellent"
> — Joe the CEO, 2015 —

![screenshot, commit b78ce2d528a65ed52273a30f9d37ce4b5ca6122a](http://i.imgur.com/iiFvCG9.png)

# Development

You only need to have a working version of `node` installed (`v0.10+`? not sure about the version, I work with `v0.12` at the moment, tell me if it doesn't work for you).

As this project is only the frontend, you will need a running instance of [mpd-wsgi](https://github.com/fixme-lausanne/mpd-wsgi) and a MPD server if you want to display some data.

Clone the repo

```
# Clone the repo
git clone github.com:fixme-lausanne/mpdwsgi-web.git
cd mpdwsgi-web

# Install dependencies
npm install

# Build everything
npm run build
# ... or automatically rebuild when a watched file has been changed
npm run watch
```

Local server (only for dev purpose). It will build everything, run a server, open a browser tab (thanks to [browser-sync](http://www.browsersync.io/)).

```
npm run browser
```

And that's it!
