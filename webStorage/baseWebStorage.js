var baseWebStorage = function () {};

baseWebStorage.prototype.isArray = function checkArray(obj) {
    return obj && obj.constructor === Array;
};

module.exports = baseWebStorage;