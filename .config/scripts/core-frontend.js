const path = require("path");
const rules = require("../rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");

const corefrontend = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        corefrontend: {
            import: path.resolve(__dirname, "../../src/frontend/index.js"),
            library: {
                name: "gutenverseCoreFrontend",
                type: "window",
            },
        },
    },
    stats,
    output,
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
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: [
                        "./framework/assets/js/corefrontend.js*",
                    ]
                },
                onEnd: {
                    copy: [
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/corefrontend.js*" : "./build/corefrontend.js",
                            destination: "./framework/assets/js/",
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
