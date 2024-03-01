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
            import: path.resolve(process.cwd(), "src"),
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
            "gutenverse-core": path.resolve(process.cwd(), "src/"),
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
                onStart: {
                    delete: [
                        "./framework/assets/js/core.js*",
                        "./framework/lib/dependencies/core.asset.php"
                    ]
                },
                onEnd: {
                    copy: [
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/core.js*" : "./build/core.js",
                            destination: "./framework/assets/js/",
                        },
                        {
                            source: "./build/core.asset.php",
                            destination: "./framework/lib/dependencies/",
                        },
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/reactPlayer*.js*" : "./build/reactPlayer*.js",
                            destination: "./framework/assets/js/",
                        },
                        {
                            source: path.resolve(process.cwd(), "node_modules/react-player/api/*"),
                            destination: "./framework/assets/js/",
                        },
                        {
                            source: path.resolve(process.cwd(), "../node_modules/react-player/api/*"),
                            destination: "./framework/assets/js/",
                        }
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
