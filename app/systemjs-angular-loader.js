var templateUrlRegex = /templateUrl\s*:(\s*['"`](.*?)['"`]\s*)/gm;
var stylesRegex = /styleUrls *:(\s*\[[^\]]*?\])/g;
var stringRegex = /(['`"])((?:[^\\]\\\1|.)*?)\1/g;

function resolveResourceUrl(base, path) {
    if (base.startsWith('gen/')) {
        base = base.substr(4);
    }

    if (path.startsWith('.')) {
        return base + path.substr(1);
    }

    if (! path.startsWith('/')) {
        return base + '/' + path;
    }

    return path;
}

module.exports.translate = function (load) {
    if (load.source.indexOf('moduleId') != -1) return load;

    var url = document.createElement('a');
    url.href = load.address;

    var basePathParts = url.pathname.split('/');

    basePathParts.pop();
    var basePath = basePathParts.join('/');

    var baseHref = document.createElement('a');
    baseHref.href = this.baseURL;
    baseHref = baseHref.pathname;

    if (!baseHref.startsWith('/base/')) { // it is not karma
        basePath = basePath.replace(baseHref, '');
    }

    load.source = load.source
        .replace(templateUrlRegex, function (match, quote, url) {
            var resolvedUrl = resolveResourceUrl(basePath, url);
            return 'templateUrl: "' + resolvedUrl + '"';
        })
        .replace(stylesRegex, function (match, relativeUrls) {
            var urls = [];

            while ((match = stringRegex.exec(relativeUrls)) !== null) {
                const resolved = resolveResourceUrl(basePath, match[2]);
                urls.push('"' + resolved + '"');
            }

            return "styleUrls: [" + urls.join(', ') + "]";
        });

    return load;
};
