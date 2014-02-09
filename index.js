var minimist = require('minimist');

module.exports = function (args, opts) {
    var argv = minimist(args, opts);
    return argv;
};
