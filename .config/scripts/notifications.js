const path = require("path");
const rules = require("../rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals, coreExternals } = require("../externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

// @since v3.2.0
const notifications = {
    mode: "development",
    devtool: "source-map",
    entry: {
        notifications: {
            import: path.resolve(process.cwd(), "src/notifications/index.js"),
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
        ...coreExternals
    },
    plugins: [
        ...plugins,
        new DependencyExtractionWebpackPlugin(),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: [
                        "./framework/assets/js/notifications.js*",
                        "./framework/lib/dependencies/notifications.asset.php"
                    ]
                },
                onEnd: {
                    copy: [
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/notifications.js*" : "./build/notifications.js",
                            destination: "./framework/assets/js/",
                        },
                        {
                            source: "./build/notifications.asset.php",
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
    notifications,
};
