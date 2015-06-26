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
        return (
            <Dropzone onDrop={this.onDrop}
                      size={150}>
                <div>Upload</div>
            </Dropzone>
        );
    }
};
