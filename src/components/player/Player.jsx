/*jshint esnext: true*/
'use strict';

import React from 'react';
import Info from './Info.jsx';
import Actions from './Actions.jsx';
import ProgressBar from './ProgressBar.jsx';

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: true,
            currentSong: {
                cover: '/images/pink_floyd-dark_side_of_the_moon.jpg',
                title: 'Time',
                album: 'The Dark Side of the Moon',
                artist: 'Pink Floyd'
            }
        };
    }

    dispatch(eventName, obj) {
        let event = obj ? new CustomEvent(eventName, {detail: obj}):
            new Event(eventName);
        dispatchEvent(event);
    }

    handleClickPrevious() {
        this.setState({
            isPlaying: true
        });
        this.dispatch('player:start', {fromTime: 0});
    }

    handleClickPlay() {
        this.setState({
            isPlaying: true
        });
        this.dispatch('player:play');
    }

    handleClickPause() {
        this.setState({
            isPlaying: false
        });
        this.dispatch('player:pause');
    }

    render() {
        return (
            <div>
                <Info song={this.state.currentSong}/>
                <Actions isPlaying={this.state.isPlaying}
                         onClickPrevious={this.handleClickPrevious.bind(this)}
                         onClickPlay={this.handleClickPlay.bind(this)}
                         onClickPause={this.handleClickPause.bind(this)}/>
                <ProgressBar isPlaying={this.state.isPlaying}/>
            </div>
        );
    }
};
