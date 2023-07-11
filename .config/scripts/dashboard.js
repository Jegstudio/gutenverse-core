const path = require("path");
const rules = require("../rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals, coreExternals, coreEditorExternals } = require("../externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

const dashboard = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        dashboard: {
            import: path.resolve(process.cwd(), "src/editor/dashboard/index.js"),
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
        ...coreEditorExternals
    },
    plugins: [
        ...plugins,
        new DependencyExtractionWebpackPlugin(),
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {
                            source: "./build/dashboard.js",
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
