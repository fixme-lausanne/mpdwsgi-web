/*jshint esnext: true*/
'use strict';

import React from 'react';

export default class ViewCurrent extends React.Component {
    renderSongs(songs) {
        return [].map.call(songs || [], (song) => {
            return (
                <li className="song row">
                    <div className="cover one column">{song.cover}</div>
                    <div className="title four columns">{song.title}</div>
                    <div className="six columns">
                        <div className="album">{song.album}</div>
                        <div className="artist">{song.artist}</div>
                    </div>
                </li>
            );
        });
    }

    render() {
        let {currentPlaylist} = this.props.data;
        return (
            <ul id="view-current-songs">
                {this.renderSongs(currentPlaylist)}
            </ul>
        );
    }
};
