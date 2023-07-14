const rules = require("../rules");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { coreFrontendExternals } = require("../externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

const frontend = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        frontend: {
            import: path.resolve(process.cwd(), "src/frontend/blocks/blocks/index.js"),
        },
    },
    externals: {
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
