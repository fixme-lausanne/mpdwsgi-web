/*jshint esnext: true*/
'use strict';

import React from 'react';

export default class Playlists extends React.Component {
    renderPlaylists(playlists) {
        return [].map.call(Object.keys(playlists || {}), (playlist) => {
            return (
                    <pre>{playlist}</pre>
            );
        });
    }

    render() {
        let {playlists} = this.props.data;
        return (
            <ul id="view-current-songs">
                {this.renderPlaylists(playlists)}
            </ul>
        );
    }
};
