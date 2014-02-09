var minimist = require('minimist');

module.exports = function parse (args, opts) {
    var inside = false, index;
    for (var i = 0; i < args.length; i++) {
        if (/^\[/.test(args[i])) {
            inside = true;
            index = i;
        }
        if (inside && /\]$/.test(args[i])) {
            var sub = args.slice(index, i + 1);
            sub[0] = sub[0].replace(/^\[/, '');
            if (sub[0] === '') sub.shift();
            
            sub[sub.length-1] = sub[sub.length-1].replace(/\]$/, '');
            if (sub[sub.length-1] === '') sub.pop();
            
            args.splice(index, i - 1, parse(sub));
            inside = false;
        }
    }
    
    var argv = minimist(args, opts);
    return argv;
};
