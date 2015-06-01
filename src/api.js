/*jshint esnext: true*/
import csp from 'js-csp';
import request from 'superagent';
import _ from 'lodash';

function fetchInitialData() {
    var ch = csp.chan();
    csp.putAsync(ch, {
        error: null,
        data: {},
        ok: true
    });
    return ch;
}

export function queryInitialData() {
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
