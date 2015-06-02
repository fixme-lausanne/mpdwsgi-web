/*jshint esnext: true*/
'use strict';

import React from 'react';
import * as _ from 'lodash';
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

    anim(fromTime) {
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

    start(fromTime) {
        return this.anim(fromTime || 0);
    }

    play() {
        return this.anim(this.state.currentTime + 1);
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

    get events() {
        return new Map([
            ['resize', this.handleResize],
            ['player:start', (e) => {
                let fromTime = _.get(e, 'detail.fromTime');
                if (typeof fromTime === 'number' && fromTime >= 0) {
                    this.start.call(this, fromTime);
                }
            }],
            ['player:pause', this.pause],
            ['player:play', this.play]
        ]);
    }

    componentDidMount() {
        this.handleResize();
        if (this.props.isPlaying) {
            this.start();
        }

        for (let [key, value] of this.events) {
            addEventListener(key, value.bind(this));
        }
    }

    componentWillUnmount() {
        for (let [key, value] of this.events) {
            removeEventListener(key, value.bind(this));
        }
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
