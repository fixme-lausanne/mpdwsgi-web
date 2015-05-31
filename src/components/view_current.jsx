/*jshint esnext: true*/
/*global require,module*/
'use strict';

var React = require('react');

class ViewCurrent extends React.Component {
    render() {
        return (
            <ul id="view-current-songs">
                <li className="song row">
                    <div className="cover one column">CVR</div>
                    <div className="title four columns">Money</div>
                    <div className="six columns">
                        <div className="album">The Dark Side of the Moon</div>
                        <div className="artist">Pink Floyd</div>
                    </div>
                </li>

                <li className="song row">
                    <div className="cover one column">CVR</div>
                    <div className="title four columns">Money</div>
                    <div className="six columns">
                        <div className="album">The Dark Side of the Moon</div>
                        <div className="artist">Pink Floyd</div>
                    </div>
                </li>

                <li className="song row">
                    <div className="cover one column">CVR</div>
                    <div className="title four columns">Money</div>
                    <div className="six columns">
                        <div className="album">The Dark Side of the Moon</div>
                        <div className="artist">Pink Floyd</div>
                    </div>
                </li>
            </ul>
        );
    }
}

module.exports = ViewCurrent;
