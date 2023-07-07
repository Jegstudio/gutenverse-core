const path = require("path");
const rules = require("../rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals } = require("../externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

const core = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        core: {
            import: path.resolve(__dirname, "../../src/externals/core.js"),
            library: {
                name: "gutenverseCore",
                type: "window",
            },
        },
    },
    stats,
    output,
    externals,
    resolve: {
        alias: {
            "gutenverse-core": path.resolve(__dirname, "../../src/"),
        },
    },
    module: {
        // strictExportPresence: true,
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
                            source: "./build/core.js",
                            destination: "./framework/assets/js/",
                        },
                        {
                            source: "./build/core.asset.php",
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
    core,
};
