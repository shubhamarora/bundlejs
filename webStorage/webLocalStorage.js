var baseWebStorage = require("./baseWebStorage");

var webLocalStorage = function ls(wsKey) {
    this.wsKey = wsKey;
};

webLocalStorage.prototype.setData = function(param,value,isDelete) {
    if(typeof localStorage != 'undefined') {

        var found,
            ls = JSON.parse(localStorage.getItem(this.wsKey) || '{}'),
            objProperties = param.split("."),
            lsClone = ls,
            endPoint = objProperties[objProperties.length-1];

        for(var i=0;i<(objProperties.length-1);i++) {
           if(lsClone[objProperties[i]]) {
               lsClone = lsClone[objProperties[i]];
           }
            else {
               return false;
           }
        }

        if(this.isArray(lsClone[endPoint])) {
            if(isDelete) {
                lsClone[endPoint].indexOf(value) > -1 ? lsClone[endPoint].splice(lsClone[endPoint].indexOf(value),lsClone[endPoint].indexOf(value)) : false;
            }
            else {
                lsClone[endPoint].push(value);
            }
        }
        else {
            lsClone[endPoint] = value;
        }

        localStorage.setItem(this.wsKey,JSON.stringify(ls));
    }
};

webLocalStorage.prototype = new baseWebStorage();
webLocalStorage.prototype.constructor = webLocalStorage;

module.exports = webLocalStorage;