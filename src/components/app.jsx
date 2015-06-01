/*jshint esnext: true*/
/*global require,module*/
'use strict';

import React from 'react/addons';
let {CSSTransitionGroup} = React.addons;
import Router from 'react-router';
let {RouteHandler} = Router;
import csp from 'js-csp';

import SideMenu from './SideMenu.jsx';
import Player from './player/Player.jsx';

export default class App extends React.Component {
    static fetchInitialData(api, params) {
        return csp.go(function*() {
            return (yield api.queryInitialData());
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            currentSong: null,
            currentPlaylist: null,
            isPlaying: false
        };
    }

    componentDidMount() {
        let initialData = this.props.initialData['appRoot'];
        let {currentSong, currentPlaylist, status} = initialData;

        this.setState({
            currentSong: currentSong,
            currentPlaylist: currentPlaylist,
            isPlaying: (status.state === 'play') ? true: false
        });
    }

    render() {
        return (
            <div>
                <CSSTransitionGroup transitionName="screen"
                                    transitionAppear={true}>
                    <SideMenu />
                    <main>
                        <header>
                            <div className="search">
                                <img className="icon" src="images/icon-search.png"/>
                                <input type="text" placeholder="Search terms"/>
                            </div>
                        </header>

                        <div className="content">
                            <RouteHandler data={this.state}/>
                        </div>
                    </main>
                </CSSTransitionGroup>
                <Player song={this.state.currentSong}
                        isPlaying={this.state.isPlaying}/>
            </div>
        );
    }
};
