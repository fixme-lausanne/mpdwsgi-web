/*jshint esnext: true*/
'use strict';

import React from 'react';
import {actions} from '../../api';

import Info from './Info.jsx';
import Actions from './Actions.jsx';
import ProgressBar from './ProgressBar.jsx';

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // I use a state 'isPlaying' local to this component for
            // reactive UI.
            // http://en.wikipedia.org/wiki/Reactive_user_interface
            // The idea is to update the UI, then call the api and
            // change back to previous state if it didn't work.
            isPlaying: false
        };
    }

    optimisticUpdate(newState, fn) {
        this.setState({isPlaying: newState === 'play'});
        if (fn) {
            fn.call();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isPlaying: nextProps.isPlaying});
    }

    componentDidMount() {
        this.setState({isPlaying: this.props.isPlaying});
    }

    render() {
        let playerContent = this.props.song ?
                [React.createElement(Info, {song: this.props.song}),
                 React.createElement(Actions, {
                     isPlaying: this.state.isPlaying,
                     onClickPrevious: actions.previous,
                     onClickNext: actions.next,
                     onClickPlay: this.optimisticUpdate.bind(
                         this, 'play', actions.play
                     ),
                     onClickPause: this.optimisticUpdate.bind(
                         this, 'pause', actions.pause
                     )
                 }),
                 React.createElement(ProgressBar, {
                     isPlaying: this.state.isPlaying,
                     song: this.props.song,
                     currentTime: this.props.currentTime,
                     onClick: actions.seek
                 })]: null;
        return (
            <div className="bottom-player no-select no-drag">
                {playerContent}
            </div>
        );
    }
};
