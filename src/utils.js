/*jshint esnext: true*/
'use strict';

export function decodeParams(params) {
    if (params) {
        return Object.keys(params).reduce(function(acc, key) {
            acc[key] = decodeURIComponent(params[key]);
            return acc;
        }, {});
    } else {
        return {};
    }
}

export function pad(str, size) {
    str = `${str}`;
    if (typeof(size) !== 'number'){
        size = 2;
    }
    while (str.length < size) {
        str = '0' + str;
    }
    return str;
}

export function formatTime(time) {
    time = parseInt(time, 10);
    if (time !== 0 && !time) {
        return '';
    }

    let hours = Math.floor(time / 3600),
        hours_rem = time % 3600,
        minutes = Math.floor(hours_rem / 60),
        seconds = hours_rem % 60;

    return ''.concat(
        (hours > 0) ? `${hours}:`: '',
        `${pad(minutes)}:`,
        `${pad(seconds)}`
    );
}
