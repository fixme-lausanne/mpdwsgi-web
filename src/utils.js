/*global require,module*/
function decodeParams(params) {
    if (params) {
        return Object.keys(params).reduce(function(acc, key) {
            acc[key] = decodeURIComponent(params[key]);
            return acc;
        }, {});
    } else {
        return {};
    }
}

module.exports = {
    decodeParams: decodeParams
};
