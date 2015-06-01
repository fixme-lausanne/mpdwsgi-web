/*jshint esnext: true*/
'use strict';

import React from 'react';
import Tooltip from 'react-tooltip';

export default class Info extends React.Component {
    render() {
        var coverStyles = {};
        if (this.props.song.cover) {
            coverStyles.backgroundImage = `url(${this.props.song.cover})`;
        }

        return (
            <div className="info-song">
                <div className="cover" style={coverStyles}></div>
                <div className="infos" data-tip={this.props.song.title}>
                    <div className="title">{this.props.song.title}</div>
                    <div className="album">{this.props.song.album}</div>
                    <div className="artist">{this.props.song.artist}</div>
                </div>
                <Tooltip place="top" type="dark" effect="solid"/>
            </div>
        );
    }
};
