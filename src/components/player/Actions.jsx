/*jshint esnext: true*/
'use strict';

import React from 'react';
import Isvg from 'react-inlinesvg';

export default class Actions extends React.Component {
    renderSvg(filename, action) {
        let capsAction = action.charAt(0).toUpperCase() + action.slice(1),
            fnAction = this.props[`onClick${capsAction}`];
        return React.DOM.span({
            className: `action ${action}`,
            onClick: fnAction
        }, React.createElement(Isvg, {
            src: filename
        }));
    }

    render() {
        return (
            <div className="player-actions">
                {this.renderSvg('images/icon-previous.svg', 'previous')}
                <div className="pause-play"
                     data-playing={this.props.isPlaying}>
                    {this.renderSvg('images/icon-play.svg', 'play')}
                    {this.renderSvg('images/icon-pause.svg', 'pause')}
                </div>
                {this.renderSvg('images/icon-next.svg', 'next')}
            </div>
        );
    }
};
