const rules = require("../rules");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals, coreExternals } = require("../externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

const frontend = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        frontend: {
            import: path.resolve(__dirname, "../../src/frontend/blocks/index.js"),
        },
    },
    externals: {
        ...externals,
        ...coreExternals,
    },
    stats,
    output,
    module: {
        strictExportPresence: true,
        rules,
    },
    plugins: [
        ...plugins,
        new DependencyExtractionWebpackPlugin(),
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {
                            source: "./build/frontend.js",
                            destination: "./framework/assets/js/",
                        },
                        {
                            source: "./build/frontend.asset.php",
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
    frontend,
};
