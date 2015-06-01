/*jshint esnext: true*/
import csp from 'js-csp';
import request from 'superagent';
import _ from 'lodash';
import config from '../config';

function fetchInitialData() {
    var ch = csp.chan();
    request(config.webApi.initial, (err, res) => {
        if (err) {
            csp.putAsync(ch, {
                error: err
            });
        } else {
            csp.putAsync(ch, {
                data: res.body,
                ok: true
            });
        }
    });
    return ch;
}

export function queryInitialData() {
    return csp.go(function*() {
        let response = yield csp.take(fetchInitialData());
        let data = response.data;

        if (!response.ok) {
            throw response.error;
        }

        let currentPlaylist = {
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
