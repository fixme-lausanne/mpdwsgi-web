/*jshint esnext: true*/
import csp from 'js-csp';
import request from 'superagent';
import _ from 'lodash';
import {webApi} from '../config';

function req(method, path, data) {
    var ch = csp.chan();
    request(method, path).send(data).end((err, res) => {
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

function fetch(path) {
    return req('GET', path);
}

function insert(path, data) {
    return req('PUT', path, data);
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

export function queryCurrentPlaylist() {
    return csp.go(function*() {
        let response = yield csp.take(fetch(webApi.currentPlaylist));
        let data = response.data;

        if (!response.ok) {
            throw response.error;
        }

        return data.songs;
    });
}

export function addToCurrentPlaylist (songFile) {
    return csp.go(function*() {
        let data = `song=${songFile}`;
        let response = yield csp.take(insert(webApi.currentPlaylist, data));
    });
}

export function queryCurrentSong() {
    return csp.go(function*() {
        let response = yield csp.take(fetch(webApi.currentSong));
        let data = response.data;

        if (!response.ok) {
            throw response.error;
        }

        return data;
    });
}

export function queryStatus() {
    return csp.go(function*() {
        let response = yield csp.take(fetch(webApi.status));
        let data = response.data;

        if (!response.ok) {
            throw response.error;
        }

        return data;
    });
}

function sendAction(actionName, value) {
    return csp.go(function*() {
        let path = _.filter([webApi.action, actionName, value], (x) => {
            return (x !== undefined && x !== null);
        }).join('/');
        let response = yield csp.take(fetch(path));

        if (!response.ok) {
            throw response.error;
        }

        return response.data;
    });
}

const listActions = ['pause', 'play', 'previous', 'next', 'seek'];
const actions = listActions.reduce((acc, actionName) => {
    acc[actionName] = sendAction.bind(null, actionName);
    return acc;
}, {});

export {actions};
