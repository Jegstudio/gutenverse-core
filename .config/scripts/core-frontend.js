const path = require("path");
const rules = require("../rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals, coreExternals } = require("../externals");

const corefrontend = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        corefrontend: {
            import: path.resolve(process.cwd(), "src/externals/frontend.js"),
            library: {
                name: "gutenverseCoreFrontend",
                type: "window",
            },
        },
    },
    stats,
    output,
    externals: {
        ...externals,
        ...coreExternals
    },
    resolve: {
        alias: {
            "gutenverse-core": path.resolve(process.cwd(), "src/"),
            "gutenverse-core-frontend": path.resolve(process.cwd(), "src/"),
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
                onEnd: {
                    copy: [
                        {
                            source: "./build/corefrontend.js",
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
