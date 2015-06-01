/*jshint esnext: true*/
'use strict';

import React from 'react';

export default class Info extends React.Component {
    render() {
        var coverStyles = {};
        if (this.props.song.cover) {
            coverStyles.backgroundImage = `url(${this.props.song.cover})`;
        }

        return (
            <div className="info-song">
                <div className="cover" style={coverStyles}></div>
                <div className="infos">
                    <div className="title">{this.props.song.title}</div>
                    <div className="album">{this.props.song.album}</div>
                    <div className="artist">{this.props.song.artist}</div>
                </div>
            </div>
        );
    }
};

Info.defaultProps = {
    song: {
        cover: null,
        title: 'Uknown title',
        album: 'Unknown album',
        artist: 'Unknown artist'
    }
};
