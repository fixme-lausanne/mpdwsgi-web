/*jshint esnext: true*/
'use strict';

import React from 'react';
import {formatTime} from '../../utils';

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            animate: false,
            currentTime: null,
            totalTime: 60,
            totalWidth: null,
            stepWidth: null
        });
    }

    start(fromTime) {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }

        let intervalId = setInterval(function(context) {
            if (context.state.currentTime < context.state.totalTime) {
                context.setState({currentTime: context.state.currentTime + 1});
            } else {
                context.setState({currentTime: context.state.totalTime});
                context.pause();
            }
        }.bind(null, this), 1000);

        this.setState({
            animate: true,
            currentTime: fromTime,
            intervalId: intervalId
        });
        return fromTime;
    }

    pause() {
        clearInterval(this.state.intervalId);
        this.setState({
            animate: false,
            intervalId: null
        });
        return this.state.currentTime;
    }

    stop() {
        this.setState({
            animate: false,
            currentTime: 0
        });
        return 0;
    }

    timeToWidth(seconds) {
        let ratio = seconds / this.state.totalTime;
        return this.state.totalWidth * ratio;
    }

    getTotalWidth() {
        return React.findDOMNode(this.refs.totalTimeBar).offsetWidth;
    }

    handleResize(e) {
        this.setState({
            totalWidth: this.getTotalWidth()
        });
    }

    componentDidMount() {
        this.handleResize();
        this.start(0);
        addEventListener('resize', this.handleResize.bind(this));
        addEventListener('player:start', (e) => {
            this.start.call(this, e.detail.fromTime);
        });
        addEventListener('player:pause', this.pause.bind(this));
    }

    componentWillUnmount() {
        removeEventListener('resize', this.handleResize.bind(this));
    }

    render() {
        var currentTimeBarStyles;
        currentTimeBarStyles = {
            transition: this.state.animate ?
                'width 1s linear': false,
            width: `${this.timeToWidth(this.state.currentTime)}px`
        };

        return (
            <div className="time-track">
                <div className="current time-text">{formatTime(this.state.currentTime)}</div>
                <div className="time-bars">
                    <div ref="currentTimeBar" className="current time-bar" style={currentTimeBarStyles}></div>
                    <div ref="totalTimeBar" className="total time-bar"></div>
                </div>
                <div className="total time-text">{formatTime(this.state.totalTime)}</div>
            </div>
        );
    }
};
