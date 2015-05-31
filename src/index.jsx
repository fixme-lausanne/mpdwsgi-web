/*jshint esnext: true*/
/*global require,module*/
require('babelify/polyfill');

var React = require('react'),
    Router = require('react-router'),
    csp = require('js-csp'),
    api = require('./api'),
    decodeParams = require('./utils').decodeParams,

    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,

    App = require('./components/app.jsx'),
    ViewCurrent = require('./components/view_current.jsx');

var routes = (
    <Route name="appRoot" path="/" handler={App}>
        <DefaultRoute name="current" handler={ViewCurrent} />
        <NotFoundRoute handler={ViewCurrent} />
    </Route>

);

Router.run(routes, Router.HashLocation, function(Handler, state) {
    csp.go(function*() {
        var fetchableRoutes = state.routes.filter(function(route) {
            return route.handler.fetchInitialData;
        });

        var fetchedData = {};
        for (var i = 0; i < fetchableRoutes.length; i += 1) {
            var data = yield fetchableRoutes[i]
                    .handler
                    .fetchInitialData(api, decodeParams(state.params));
            fetchedData[fetchableRoutes[i].name] = data;
        }

        var props = {
            initialData: fetchedData
        };

        React.render(
            React.createElement(Handler, props),
            document.getElementById('react-root')
        );
    });
});
