/*jshint esnext: true*/
/*global require,module*/
'use strict';

var React = require('react'),
    Router = require('react-router'),
    csp = require('js-csp'),
    request = require('superagent'),

    Link = Router.Link,
    RouteHandler = Router.RouteHandler,

    Controls = require('./controls.jsx');

class App extends React.Component {
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
}

module.exports = App;
