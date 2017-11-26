const extendObject = (obj1, obj2) => {
    var keys = Object.keys(obj2);
    for (var i = 0; i < keys.length; i += 1) {
        var val = obj2[keys[i]];
        obj1[keys[i]] = ['string', 'number', 'array', 'boolean'].indexOf(typeof val) === -1 ? extendObject(obj1[keys[i]] || {}, val) : val;
    }
    return obj1;
};

exports.extendObject = extendObject;

exports.checkObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
};
