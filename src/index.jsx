/*jshint esnext: true*/
'use strict';
import 'babelify/polyfill';

import React from 'react';
import Router from 'react-router';
let {Route, DefaultRoute, NotFoundRoute} = Router;

import csp from 'js-csp';
import {decodeParams} from './utils';

import App from './components/app.jsx';
import ViewCurrent from './components/view_current.jsx';
import Albums from './components/Albums.jsx';
import Artists from './components/Artists.jsx';
import Playlists from './components/Playlists.jsx';

let routes = (
    <Route name="appRoot" path="/" handler={App}>
        <DefaultRoute name="current" handler={ViewCurrent} />
        <Route name="albums" handler={Albums}/>
        <Route name="artists" handler={Artists}/>
        <Route name="playlists" handler={Playlists}/>
        <NotFoundRoute handler={ViewCurrent} />
    </Route>
);

Router.run(routes, Router.HashLocation, function(Handler, state) {
    csp.go(function*() {
        let fetchableRoutes = state.routes.filter(function(route) {
            return route.handler.fetchInitialData;
        });

        var fetchedData = {};
        for (var i = 0; i < fetchableRoutes.length; i += 1) {
            var data = yield fetchableRoutes[i]
                    .handler
                    .fetchInitialData(decodeParams(state.params));
            fetchedData[fetchableRoutes[i].name] = data;
        }

        let props = {
            initialData: fetchedData
        };

        React.render(
            React.createElement(Handler, props),
            document.getElementById('react-root')
        );
    });
});
