/*jshint esnext: true*/
'use strict';

let baseUrl = "http://api.mpd.local";
export const webApi = {
    baseUrl: baseUrl,
    status: `${baseUrl}/status`,
    currentPlaylist: `${baseUrl}/playlist`,
    currentSong: `${baseUrl}/current`,
    albums: `${baseUrl}/list_albums`,
    artists: `${baseUrl}/list_artists`,
    playlists: `${baseUrl}/list_playlists`,
    action: `${baseUrl}/action`,
    file: `${baseUrl}/file`
};

let baseUrlWS = "ws://api.mpd.local";
export const websocket = {
    baseUrl: baseUrlWS,
    events: `${baseUrlWS}/events`
};

const config = {webApi, websocket};
export {config as default};
