/*jshint esnext: true*/
'use strict';

import React from 'react';
import classnames from 'classnames';
import {actions, queryCurrentPlaylist} from '../api';

import csp from 'js-csp';

export default class ViewCurrent extends React.Component {

    static fetchInitialData(params) {
        return csp.go(function*() {
            return (yield queryCurrentPlaylist());
        });
    }

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

    renderSongs(songs) {
        return [].map.call(songs || [], (song, index) => {
            let isCurrentPlayingSong = this.props.currentSong &&
                    (song.file === this.props.currentSong.file) &&
                    (index.toString() === this.props.currentSong.pos),
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
        }, this);
    }

    render() {
        let {current} = this.props.initialData;
        return (
            <ul id="view-current-songs">
                {this.renderSongs(current)}
            </ul>
        );
    }
};
