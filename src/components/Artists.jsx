/*jshint esnext: true*/
'use strict';

import React from 'react';
import {formatTime} from '../utils';
import * as _ from 'lodash';

import {
    queryArtists
} from '../api';

import csp from 'js-csp';

export default class Artists extends React.Component {
    static fetchInitialData(params) {
        return csp.go(function*() {
            return (yield queryArtists());
        });
    }

    renderAlbums(albums) {
        return [].map.call(Object.keys(albums || {}), (album) => {
            let songs = albums[album];
            return (
                <li className="album">
                    <figure>
                    <div className="cover"></div>
                    <div>
                    <span>{album}</span>
                    <small>{_.first(songs).date}</small>
                    </div>
                    </figure>
                </li>
            );
        });
    }

    renderArtists(artists) {
        return [].map.call(Object.keys(artists || {}), (artist) => {
            let songs = artists[artist],
                albums = _.groupBy(songs, 'album');
            return (
                <li className="artist">
                    <h3>{artist}</h3>
                    <div className="row">
                        <ul className="albums">
                            {this.renderAlbums(albums)}
                        </ul>
                    </div>
                </li>
            );
        });
    }

    render() {
        let {artists} = this.props.initialData;
        return (
            <ul id="view-artists">
                {this.renderArtists(artists)}
            </ul>
        );
    }
};
