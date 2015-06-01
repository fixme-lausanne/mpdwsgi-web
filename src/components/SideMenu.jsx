/*jshint esnext: true*/
'use strict';

import React from 'react';
import Router from 'react-router';
var {Link} = Router;

export default class SideMenu extends React.Component {
    render() {
        return (
            <aside className="menu">
                <header>
                    <h1 className="brand">Fix My Music
                        <sup>
                            <div className="flip">
                                <div className="front">Hack</div>
                                <div className="back">Hack</div>
                            </div>
                        </sup>
                    </h1>
                </header>
                <nav>
                    <ul>
                        <li className="active"><Link to="current">Current</Link></li>
                        <li><Link to="albums">Albums</Link></li>
                        <li><Link to="artists">Artists</Link></li>
                        <li><Link to="playlists">Playlists</Link></li>
                    </ul>
                </nav>
            </aside>
        );
    }
};
