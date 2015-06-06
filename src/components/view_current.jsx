/*jshint esnext: true*/
'use strict';

import React from 'react';
import classnames from 'classnames';
import {actions} from '../api';

export default class ViewCurrent extends React.Component {
    handleClickSong(songId, e) {
        actions.play(songId);
    }

    renderCurrentSongAnimation() {
        return (
            <ul className="loader">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        );
    }

    renderSongs() {
        return [].map.call(this.props.currentPlaylist || [], (song, index) => {
            let isCurrentPlayingSong = (song.file === this.props.currentSong.file),
                firstElem = isCurrentPlayingSong ?
                    this.renderCurrentSongAnimation():
                    song.cover,
                classes = classnames({
                    'is-current-song': isCurrentPlayingSong,
                    song: true,
                    row: true
                });
            return (
                <li className={classes}
                    key={`current-song-${index}`}
                    onClick={this.handleClickSong.bind(null, index)}>
                    <div className="one column">{firstElem}</div>
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
        return (
            <ul id="view-current-songs">
                {this.renderSongs()}
            </ul>
        );
    }
};
