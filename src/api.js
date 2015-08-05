/*jshint esnext: true*/
import csp from 'js-csp';
import request from 'superagent';
import _ from 'lodash';
import {webApi} from '../config';

function req(method, path, data, customBehavior) {
    var ch = csp.chan();
    var r = request(method, path);
    if (customBehavior) {
        customBehavior(r, method, path, data);
    } else {
        r.send(data);
    }
    r.end(handleResult.bind(null, ch));
    return ch;
}

function handleResult(ch, err, res) {
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
}

function fetch(path) {
    return req('GET', path);
}

function insert(path, data) {
    return req('POST', path, data);
}

function update(path, data) {
  return req('PUT', path, data);
}

function uploadFiles(path, files) {
    return req('POST', path, files, (r) => {
        [].forEach.call(files, (f) => {
            r.attach('file[]', f, f.name);
        });
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

export function queryAlbums() {
    return csp.go(function*() {
        let response = yield csp.take(fetch(webApi.albums));
        let data = response.data;

        if (!response.ok) {
            throw response.error;
        }

        return data.albums;
    });
}

export function queryArtists() {
    return csp.go(function*() {
        let response = yield csp.take(fetch(webApi.albums));
        let data = response.data;

        if (!response.ok) {
            throw response.error;
        }

        return data.albums;
    });
}

export function queryPlaylists() {
    return csp.go(function*() {
        let response = yield csp.take(fetch(webApi.playlists));
        let data = response.data;

        if (!response.ok) {
            throw response.error;
        }

        return data.playlists;
    });
}

export function sendFiles(files) {
    return csp.go(function*() {
        let response = yield csp.take(uploadFiles(webApi.file, files));

        if (!response.ok) {
            throw response.error;
        }

        return response.data;
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
