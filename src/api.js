/*jshint esnext: true*/
/*global require,module*/
var csp = require('js-csp'),
    request = require('superagent'),
    _ = require('lodash'),
    Config = require('../config.json');

function fetchInitialData() {
    var ch = csp.chan();
    csp.putAsync(ch, {
        error: null,
        data: {},
        ok: true
    });
    // request.get(Config.api + '/initial_data').end(function(error, res) {
    //     csp.putAsync(ch, {
    //         error: error,
    //         data: res.body,
    //         ok: res.ok
    //     });
    // });
    return ch;
}

function queryInitialData() {
    return csp.go(function*() {
        var response = yield csp.take(fetchInitialData());
        var data = response.data;

        if (!response.ok) {
            throw response.error;
        }

        var currentPlaylist = {
            name: 'current',
            songs: _.sortBy(data.currentPlaylist, 'id')
        };

        return {
            currentSong: data.currentsong,
            currentPlaylist: data.currentplaylist,
            songs: data.songs,
            playlists: data.playlists,
            albums: _.groupBy(data.songs, 'album'),
            artists: _.groupBy(data.songs, 'artist'),
            status: data.status
        };
    });
}

module.exports = {
    queryInitialData: queryInitialData
};
