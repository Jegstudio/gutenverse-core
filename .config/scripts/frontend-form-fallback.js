const path = require("path");
const fs = require("fs");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const rules = require("gutenverse-core/.config/rules");
const { output } = require('../config');
const { stats, plugins } = require("gutenverse-core/.config/config");
const { externals, coreFrontendExternals, configDepsExtractExternals } = require("gutenverse-core/.config/externals");
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

const modularDir = path.resolve(__dirname, "../../src/frontend/form_fallback/");

const getModularConfig = () => {
    const files = fs.readdirSync(modularDir).filter(file => file.endsWith('.js'));

    const entry = {};
    const copyTasks = [];
    const deleteTasks = [];

    files.forEach(file => {
        const name = file.replace('.js', '');

        entry[name] = {
            import: path.join(modularDir, file),
        };

        deleteTasks.push(`./gutenverse/assets/js/form_fallback/${name}.js*`);
        deleteTasks.push(`./gutenverse/lib/dependencies/form_fallback/${name}.asset.php`);

        copyTasks.push({
            source: process.env.NODE_ENV === 'development' ? `./build/${name}.js*` : `./build/${name}.js`,
            destination: "./gutenverse/assets/js/form_fallback/",
        });

        copyTasks.push({
            source: `./build/${name}.asset.php`,
            destination: "./gutenverse/lib/dependencies/form_fallback/",
        });
    });

    return { entry, copyTasks, deleteTasks };
};

const { entry, copyTasks, deleteTasks } = getModularConfig();

const formFallback = {
    mode: "development",
    devtool: "source-map",
    entry,
    externals: {
        ...externals,
        ...coreFrontendExternals,
    },
    stats,
    output,
    module: {
        strictExportPresence: true,
        rules,
    },
    plugins: [
        ...plugins,
        new DependencyExtractionWebpackPlugin(configDepsExtractExternals()),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: [
                        ...deleteTasks,
                    ]
                },
                onEnd: {
                    copy: [
                        ...copyTasks,
                    ],
                },
            },
            runTasksInSeries: true,
        }),
    ],
};

module.exports = {
    formFallback,
};
