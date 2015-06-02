/*jshint esnext: true*/
import csp from 'js-csp';
import request from 'superagent';
import _ from 'lodash';
import {webApi} from '../config';


function fetch(path) {
    var ch = csp.chan();
    request(path, (err, res) => {
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
        let response = yield csp.take(fetch(webApi.initial));
        let data = response.data;

        if (!response.ok) {
            throw response.error;
        }

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

export function queryCurrent() {
    return csp.go(function*() {
        let response = yield csp.take(fetch(webApi.current));
        let data = response.data;

        if (!response.ok) {
            throw response.error;
        }

        return data.songs;
    });
}
