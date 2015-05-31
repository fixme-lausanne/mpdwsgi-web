/*jshint esnext: true*/
/*global require,module*/
'use strict';

var React = require('react');

class ViewCurrent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [
                {
                    cover: '',
                    title: 'Money',
                    album: 'The Dark Side of the Moon',
                    artist: 'Pink Floyd'
                },
                {
                    cover: '',
                    title: 'Time',
                    album: 'The Dark Side of the Moon',
                    artist: 'Pink Floyd'
                },
                {
                    cover: '',
                    title: 'On the Run',
                    album: 'The Dark Side of the Moon',
                    artist: 'Pink Floyd'
                }
            ]
        };
    }

    renderSongs(songs) {
        return [].map.call(songs, (song) => {
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
        return (
            <ul id="view-current-songs">
                {this.renderSongs(this.state.songs)}
            </ul>
        );
    }
}

module.exports = ViewCurrent;
