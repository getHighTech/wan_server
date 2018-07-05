const path = require('path');
const webpack = require('webpack');
const spawn = require('child_process').spawn;

const compiler = webpack({
    // add your webpack configuration here
    entry: "./src/server", 
});
const watchConfig = {
    // compiler watch configuration
    // see https://webpack.js.org/configuration/watch/
    aggregateTimeout: 300,
    poll: 1000
};

let serverControl;

compiler.watch(watchConfig, (err, stats) => {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        info.errors.forEach(message => console.log(message));
        return;
    }

    if (stats.hasWarnings()) {
        info.warnings.forEach(message => console.log(message));
    }

    if (serverControl) {
        serverControl.kill();
    }

    // change app.js to the relative path to the bundle created by webpack, if necessary
    // serverControl = spawn('node', [path.resolve(__dirname, 'server/index.js')]);

    serverControl.stdout.on('data', data => console.log(data.toString()));
    serverControl.stderr.on('data', data => console.error(data.toString()));
});
