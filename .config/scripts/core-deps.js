const path = require("path");
const fs = require('fs');
const rules = require("../rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins, depDir } = require("../config");

const getDepsConfig = () => {
    const files = fs.readdirSync(depDir).filter(file => file.endsWith('.js'));
    const entry = {};
    const copyTasks = [];
    const deleteTasks = [];

    files.forEach(file => {
        const name = file.replace('.js', '');

        entry[name] = {
            import: path.join(depDir, file),
            library: {
                name: name,
                type: "window",
            },
        };

        deleteTasks.push(`./framework/assets/js/frontend/${name}.js`);

        copyTasks.push({
            source: process.env.NODE_ENV === 'development' ? `./build/${name}.js` : `./build/${name}.js`,
            destination: "./framework/assets/js/frontend/",
        });
    });

    return { entry, copyTasks, deleteTasks };
}

const { entry, copyTasks, deleteTasks } = getDepsConfig();

const coredeps = {
    mode: "development",
    devtool: "source-map",
    entry,
    stats,
    output,
    module: {
        // strictExportPresence: true,
        rules,
    },
    plugins: [
        ...plugins,
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: deleteTasks
                },
                onEnd: {
                    copy: copyTasks,
                },
            },
            runTasksInSeries: true,
        }),
    ],
};

module.exports = {
    coredeps,
};
