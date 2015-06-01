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
            contentHeight: null,

            currentSong: null,
            currentPlaylist: null,
            albums: null,
            artists: null,
            isPlaying: false
        };
    }

    handleResize() {
        let playerNode = React.findDOMNode(this.refs.player),
            mainHeaderNode = React.findDOMNode(this.refs.mainHeader),
            contentNode = React.findDOMNode(this.refs.content);
        let contentComputedStyles = getComputedStyle(contentNode),
            contentPaddingTop = parseInt(
                contentComputedStyles['padding-top'], 10
        ), contentPaddingBottom = parseInt(
            contentComputedStyles['padding-bottom'], 10
        );

        this.setState({
            contentHeight: window.innerHeight -
                mainHeaderNode.clientHeight -
                playerNode.clientHeight -
                contentPaddingBottom -
                contentPaddingTop
        });
    }

    get events() {
        return new Map([
            ['resize', this.handleResize]
        ]);
    }

    componentDidMount() {
        this.handleResize();

        for (let [key, value] of this.events) {
            addEventListener(key, value.bind(this));
        }

        let initialData = this.props.initialData['appRoot'];
        let {
            currentSong,
            currentPlaylist,
            albums,
            artists,
            status
        } = initialData;

        this.setState({
            currentSong,
            currentPlaylist,
            albums,
            artists,
            isPlaying: (status.state === 'play') ? true: false
        });
    }

    componentWillUnmount() {
        for (let [key, value] of this.events) {
            removeEventListener(key, value.bind(this));
        }
    }

    render() {
        let contentStyles = {
            height: this.state.contentHeight
        };
        return (
            <div>
                <CSSTransitionGroup transitionName="screen"
                                    transitionAppear={true}>
                    <SideMenu />
                    <main>
                        <header ref="mainHeader">
                            <div className="search">
                                <img className="icon" src="images/icon-search.png"/>
                                <input type="text" placeholder="Search terms"/>
                            </div>
                        </header>

                        <div className="content" ref="content"
                             style={contentStyles}>
                            <RouteHandler data={this.state}/>
                        </div>
                    </main>
                </CSSTransitionGroup>
                <Player ref="player" song={this.state.currentSong}
                        isPlaying={this.state.isPlaying}/>
            </div>
        );
    }
};
