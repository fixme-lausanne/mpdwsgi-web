/*jshint esnext: true*/
'use strict';

import React from 'react';
import Router from 'react-router';
var {Link} = Router;

import Tooltip from 'react-tooltip';

export default class SideMenu extends React.Component {
    render() {
        return (
            <aside className="menu no-select no-drag">
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
                        <li><Link to="current" activeClassName="active">
                            Current
                        </Link></li>
                        <li className="disabled"
                            data-tip="Coming soon">
                            <Link to="albums" activeClassName="active">
                                Albums
                            </Link>
                        </li>
                        <li className="disabled"
                            data-tip="Coming soon">
                            <Link to="artists" activeClassName="active">
                                Artists
                            </Link>
                        </li>
                        <li className="disabled"
                            data-tip="Coming soon">
                            <Link to="playlists" activeClassName="active">
                                Playlists
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        );
    }
};
