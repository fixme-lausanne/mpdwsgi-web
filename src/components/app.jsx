/*jshint esnext: true*/
/*global require,module*/
'use strict';

import React from 'react';
import Router from 'react-router';
let {RouteHandler} = Router;
import csp from 'js-csp';

import SideMenu from './SideMenu.jsx';
import Player from './player/Player.jsx';

export default class App extends React.Component {
    static fetchInitialData(api, params) {
        return csp.go(function*() {
            yield api.queryInitialData();
        });
    }

    render() {
        return (
            <div>
                <SideMenu />

                <main>
                    <header>
                        <div className="search">
                            <img className="icon" src="images/icon-search.png"/>
                            <input type="text" placeholder="Search terms"/>
                        </div>
                    </header>

                    <div className="content">
                        <RouteHandler />
                    </div>
                </main>

                <Player />
            </div>
        );
    }
};
