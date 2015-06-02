/*jshint esnext: true*/
'use strict';

let baseUrl = "http://api.mpd.local";
export const webApi = {
    baseUrl: baseUrl,
    initial: `${baseUrl}/initial_data`,
    current: `${baseUrl}/playlist`,
    albums: `${baseUrl}/albums`,
    artists: `${baseUrl}/artists`,
    playlists: `${baseUrl}/playlists`
};

let baseUrlWS = "ws://api.mpd.local";
export const websocket = {
    baseUrl: baseUrlWS,
    events: `${baseUrlWS}/events`
};

const config = {webApi, websocket};
export {config as default};
