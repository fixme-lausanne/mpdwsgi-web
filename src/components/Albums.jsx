/*jshint esnext: true*/
'use strict';

import React from 'react';
import {formatTime} from '../utils';
import {addToCurrentPlaylist} from '../api';

export default class Albums extends React.Component {
    handleClickSong(songFile, e) {
        addToCurrentPlaylist(songFile);
    }

    renderSongs(albumId, songs) {
        return [].map.call(songs || [], (song, index) => {
            return (
                <li key={`album-${albumId}-${index}`}
                    className="song row"
                    onClick={this.handleClickSong.bind(null, song.file)}>
                    <div className="three columns"></div>
                    <div className="one column">{song.track}</div>
                    <div className="one columns">{formatTime(song.time)}</div>
                    <div className="five columns">{song.title}</div>
                    <div className="two columns">{song.artist}</div>
                </li>
            );
        });
    }

    renderAlbums(albums) {
        return [].map.call(Object.keys(albums || {}), (album, index) => {
            let songs = albums[album];
            return (
                    <li key={`album-${index}`} className="album">
                    <h3>{album}</h3>
                    <div className="row">
                        <div className="three columns">cov</div>
                        <div className="nine columns">
                            <ul className="songs">
                                {this.renderSongs(index, songs)}
                            </ul>
                    </div>
                    </div>
                    </li>
            );
        });
    }

    render() {
        let {albums} = this.props.data;
        return (
                <ul id="view-albums">
                {this.renderAlbums(albums)}
                </ul>
        );
    }
};
