const path = require("path");
const rules = require("../rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals } = require("../externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

const corefrontend = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        corefrontend: {
            import: path.resolve(__dirname, "../../src/externals/frontend.js"),
            library: {
                name: "gutenverseCoreFrontend",
                type: "window",
            },
        },
    },
    stats,
    output,
    externals,
    resolve: {
        alias: {
            "gutenverse-core-frontend": path.resolve(__dirname, "../../src/frontend"),
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
                            source: "./build/corefrontend.js",
                            destination: "./framework/assets/js/",
                        },
                        {
                            source: "./build/corefrontend.asset.php",
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
    corefrontend,
};
