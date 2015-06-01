/*jshint esnext: true*/
'use strict';

import React from 'react';
import Info from './Info.jsx';
import Actions from './Actions.jsx';
import ProgressBar from './ProgressBar.jsx';

export default class Player extends React.Component {
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
        let playerContent = this.props.song ?
                [React.createElement(Info, {song: this.props.song}),
                 React.createElement(Actions, {
                     isPlaying: this.props.isPlaying,
                     onClickPrevious: this.handleClickPrevious.bind(this),
                     onClickPlay: this.handleClickPlay.bind(this),
                     onClickPause: this.handleClickPause.bind(this)
                 }),
                 React.createElement(ProgressBar, {
                     isPlaying: this.props.isPlaying
                 })]: null;
        return (
            <div className="bottom-player">
                {playerContent}
            </div>
        );
    }
};
