var baseWebStorage = require("./baseWebStorage");

var webSessionStorage = function ss(wsKey) {
    this.wsKey = wsKey;
};

webSessionStorage.prototype.setData = function(param,value,isDelete) {
    if(typeof sessionStorage != 'undefined') {

        var found,
            ss = JSON.parse(sessionStorage.getItem(this.wsKey) || '{}'),
            objProperties = param.split("."),
            ssClone = ss,
            endPoint = objProperties[objProperties.length-1];

        for(var i=0;i<(objProperties.length-1);i++) {
            if(ssClone[objProperties[i]]) {
                ssClone = ssClone[objProperties[i]];
            }
            else {
                return false;
            }
        }

        if(this.isArray(ssClone[endPoint])) {
            if(isDelete) {
                ssClone[endPoint].indexOf(value) > -1 ? ssClone[endPoint].splice(ssClone[endPoint].indexOf(value),ssClone[endPoint].indexOf(value)) : false;
            }
            else {
                ssClone[endPoint].push(value);
            }
        }
        else {
            ssClone[endPoint] = value;
        }

        sessionStorage.setItem(this.wsKey,JSON.stringify(ss));
    }
};

webSessionStorage.prototype = new baseWebStorage();
webSessionStorage.prototype.constructor = webSessionStorage;

module.exports = webSessionStorage;