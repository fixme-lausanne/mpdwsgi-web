/*jshint esnext: true*/
'use strict';

import React from 'react';

import {
    queryPlaylists
} from '../api';

import csp from 'js-csp';

export default class Playlists extends React.Component {
    static fetchInitialData(params) {
        return csp.go(function*() {
            return (yield queryPlaylists());
        });
    }

    renderPlaylists(playlists) {
        return [].map.call(playlists || [], (playlist) => {
            return (
                <div>
                    <h2>{playlist.name}</h2>
                    <pre>{playlist.songs}</pre>
                </div>
            );
        });
    }

    render() {
        let {playlists} = this.props.initialData;
        return (
            <ul id="view-current-songs">
                {this.renderPlaylists(playlists)}
            </ul>
        );
    }
};
