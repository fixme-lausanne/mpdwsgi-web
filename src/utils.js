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
