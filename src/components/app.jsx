/*jshint esnext: true*/
/*global require,module*/
'use strict';

import React from 'react/addons';
let {CSSTransitionGroup} = React.addons;
import Router from 'react-router';
let {RouteHandler} = Router;

import csp from 'js-csp';
import * as api from '../api';
import socket from '../socket';

import {ToastContainer, ToastMessage} from 'react-toastr';
let ToastMessageFactory = React.createFactory(ToastMessage.animation);

import SideMenu from './SideMenu.jsx';
import Player from './player/Player.jsx';

export default class App extends React.Component {
    static fetchInitialData(params) {
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
            playlists: null,
            albums: null,
            artists: null,
            isPlaying: false,
            currentTime: null
        };

        socket.onmessage = (message) => {
            let obj = JSON.parse(message.data);
            if (obj.status === 'success' && obj.result) {
                [].map.call(obj.result, (event) => {
                    let fnEvent = this.socketEvents.get(event);
                    if (fnEvent) {
                        fnEvent.call(this);
                    }
                });
            } else {
                console.error('Error on event: ', message, obj);
            }
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

    setInitialData(initialData) {
        let {
            currentSong,
            currentPlaylist,
            playlists,
            albums,
            artists,
            status
        } = initialData;

        this.setState({
            currentSong,
            currentPlaylist,
            playlists,
            albums,
            artists,
            isPlaying: (status.state === 'play') ? true: false,
            currentTime: parseInt(status.elapsed, 10)
        });
    }

    get events() {
        return new Map([
            ['resize', this.handleResize]
        ]);
    }

    get socketEvents() {
        return new Map([
            ['playlist', () => {
                csp.go(function*() {
                    let currentPlaylist = yield api.queryCurrentPlaylist();
                    this.setState({currentPlaylist});
                }.bind(this));
            }],

            ['update', () => {
                csp.go(function*() {
                    let allData = yield api.queryInitialData();
                    this.setInitialData(allData);
                }.bind(this));
            }],

            ['player', () => {
                csp.go(function*() {
                    let status = yield api.queryStatus();
                    let currentSong = yield api.queryCurrentSong();
                    let isPlaying = (!status.error && status.state == 'play');

                    this.setState({currentSong, isPlaying,
                                   currentTime: parseInt(status.elapsed, 10)});

                    if (status.error) {
                        this.refs.container.error(
                            status.error, 'MPD error',{
                                timeOut: 30,
                                extendedTimeOut: 60,
                            });
                    }
                }.bind(this));
            }]
        ]);
    }

    componentDidMount() {
        // Fix some style stuff
        let contentNode = React.findDOMNode(this.refs.content);
        contentNode.className = contentNode.className.replace('loading', '');
        [].map.call(document.querySelectorAll('.no-drag'), (elem) => {
            elem.ondragstart = () => false;
        });

        this.handleResize();

        for (let [key, value] of this.events) {
            addEventListener(key, value.bind(this));
        }

        let initialData = this.props.initialData['appRoot'];
        this.setInitialData(initialData);
    }

    componentWillUnmount() {
        for (let [key, value] of this.events) {
            removeEventListener(key, value.bind(this));
        }
    }

    render() {
        let routeHandler = React.createElement(RouteHandler, this.state),
            contentStyles = {
                height: this.state.contentHeight
            };

        return (
            <div>
                <ToastContainer toastMessageFactory={ToastMessageFactory}
                                ref="container"
                                className="toast-top-right"/>
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
                             {routeHandler}
                        </div>
                    </main>
                </CSSTransitionGroup>
                <Player ref="player" song={this.state.currentSong}
                        currentTime={this.state.currentTime}
                        isPlaying={this.state.isPlaying}/>
            </div>
        );
    }
};
