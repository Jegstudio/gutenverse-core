const path = require("path");
const fs = require('fs');
const rules = require("../rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");

const modularDir = path.resolve(__dirname, "../../src/frontend/modular");

const getModularConfig = () => {
    const files = fs.readdirSync(modularDir).filter(file => file.endsWith('.js'));

    const entry = {};
    const copyTasks = [];
    const deleteTasks = [];

    files.forEach(file=> {
        const name = file.replace('.js', '');

        entry[name] = {
            import: path.join(modularDir, file),
        };

        deleteTasks.push(`./framework/assets/js/frontend/${name}.js*`);

        copyTasks.push({
            source: process.env.NODE_ENV === 'development' ? `./build/${name}.js*` : `./build/${name}.js`,
            destination: "./framework/assets/js/frontend/",
        });
    });

    return { entry, copyTasks, deleteTasks };
}

const { entry, copyTasks, deleteTasks } = getModularConfig();

const coreFrontendModular = {
    mode: "development",
    devtool: "source-map",
    entry,
    stats,
    output,
    resolve: {
        alias: {
            "gutenverse-core-frontend": path.resolve(process.cwd(), "src/frontend"),
        },
    },
    module: {
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
    coreFrontendModular,
};
