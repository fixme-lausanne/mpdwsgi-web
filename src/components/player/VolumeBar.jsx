/*jshint esnext: true*/
'use strict';

import React from 'react';
import {setVolume} from '../../api';

export default class VolumeBar extends React.Component {
    handleChange(e) {
      setVolume(e.target.value);
    }

    render() {
        return (
            <div className="volume">
                <input className="total time-text" type="range"
                       onChange={this.handleChange} onInput={this.handleChange}
                       min={0} max={100}/>
            </div>
        );
    }
};
