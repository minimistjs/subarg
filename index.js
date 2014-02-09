var minimist = require('minimist');

module.exports = function parse (args, opts) {
    var inside = false, index;
    for (var i = 0; i < args.length; i++) {
        if (/^\[/.test(args[i])) {
            inside = true;
            index = i;
        }
        if (inside && /\]$/.test(args[i])) {
            var sub = args.slice(index, i);
            sub[0] = sub[0].replace(/^\[/, '');
            sub[sub.length-1] = sub[sub.length-1].replace(/\[$/, '');
            
            args.splice(index, i, parse(sub));
            
            inside = false;
        }
    }
    
    var argv = minimist(args, opts);
    return argv;
};
