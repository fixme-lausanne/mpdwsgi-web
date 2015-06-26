/*jshint esnext: true*/
/*global require,module*/
'use strict';

import React from 'react/addons';
import Dropzone from 'react-dropzone';

import {sendFiles} from '../api';

export default class UploadArea extends React.Component {
    constructor(props) {
        super(props);
        this.onDrop = sendFiles;
    }

    render() {
        if (!this.props.visible) {
            return null;
        }

        let styles = {
            border: 'none'
        };

        return (
            <Dropzone onDrop={this.onDrop} style={styles}>
                <div>Upload</div>
            </Dropzone>
        );
    }
};
