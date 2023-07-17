const path = require("path");
const rules = require("../rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals, coreExternals, coreFrontendExternals } = require("../externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

const dashboard = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        dashboard: {
            import: path.resolve(__dirname, "../../src/dashboard/index.js"),
        },
    },
    stats,
    output,
    module: {
        strictExportPresence: true,
        rules,
    },
    externals: {
        ...externals,
        ...coreExternals,
        ...coreFrontendExternals
    },
    plugins: [
        ...plugins,
        new DependencyExtractionWebpackPlugin(),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: [
                        "./framework/assets/js/dashboard.js*",
                        "./framework/lib/dependencies/dashboard.asset.php"
                    ]
                },
                onEnd: {
                    copy: [
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/dashboard.js*" : "./build/dashboard.js",
                            destination: "./framework/assets/js/",
                        },
                        {
                            source: "./build/dashboard.asset.php",
                            destination: "./framework/lib/dependencies/",
                        },
                    ],
                },
            },
            runTasksInSeries: true,
        }),
    ],
};

module.exports = {
    dashboard,
};
