/*jshint esnext: true*/
'use strict';

import React from 'react';
import {actions} from '../api';

export default class ViewCurrent extends React.Component {
    handleClickSong(songId, e) {
        actions.play(songId);
    }

    renderSongs(songs) {
        return [].map.call(songs || [], (song, index) => {
            return (
                <li className="song row"
                    key={`current-song-${index}`}
                    onClick={this.handleClickSong.bind(null, index)}>
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
