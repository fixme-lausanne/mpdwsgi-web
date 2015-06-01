/*jshint esnext: true*/
/*global require,module*/
'use strict';

import React from 'react';
import Router from 'react-router';
let {RouteHandler} = Router;
import csp from 'js-csp';

export default class App extends React.Component {
    static fetchInitialData(api, params) {
        return csp.go(function*() {
            yield api.queryInitialData();
        });
    }

    render() {
        return (
            <RouteHandler />
        );
    }
};
