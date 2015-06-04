/*jshint esnext: true*/
'use strict';

import React from 'react';
import {actions} from '../../api';

import Info from './Info.jsx';
import Actions from './Actions.jsx';
import ProgressBar from './ProgressBar.jsx';

export default class Player extends React.Component {
    render() {
        let playerContent = this.props.song ?
                [React.createElement(Info, {song: this.props.song}),
                 React.createElement(Actions, {
                     isPlaying: this.props.isPlaying,
                     onClickPrevious: actions.previous,
                     onClickNext: actions.next,
                     onClickPlay: actions.play,
                     onClickPause: actions.pause
                 }),
                 React.createElement(ProgressBar, {
                     isPlaying: this.props.isPlaying,
                     song: this.props.song,
                     onClick: actions.seek
                 })]: null;
        return (
            <div className="bottom-player">
                {playerContent}
            </div>
        );
    }
};
