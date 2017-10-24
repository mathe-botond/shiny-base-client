module.exports.translate = function (load) {
    load.source = load.source
        .replace(/(import|export) +([{} a-zA-Z,*]+) +from '(.*\/)([a-zA-Z.-]+)';/g,
                function (match, impexp, what, base, file) {
                    if (file.indexOf('.') === -1) {
                        file = file + '/index';
                    }
                    let result = impexp + ' ' + what + ' from \'' + base + file + '.js\';';
                    console.log(result);
                    return result;
                });
    return load;
};

