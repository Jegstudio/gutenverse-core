const path = require("path");
const rules = require("../rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals, coreExternals } = require("../externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

const coreeditor = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        coreeditor: {
            import: path.resolve(process.cwd(), "src/externals/editor.js"),
            library: {
                name: "gutenverseCoreEditor",
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
            "gutenverse-core": path.resolve(__dirname, "../../src/"),
            "gutenverse-core-editor": path.resolve(__dirname, "../../src/"),
            "gutenverse-core-editor/helper": path.resolve(__dirname, "../../src/editor-helper"),
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
                            source: "./build/coreeditor.js",
                            destination: "./framework/assets/js/",
                        },
                        {
                            source: "./build/coreeditor.asset.php",
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
    coreeditor,
};
