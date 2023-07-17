const path = require("path");
const rules = require("../rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals, coreExternals, coreEditorExternals } = require("../externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

const components = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        components: {
            import: path.resolve(process.cwd(), "src/components/components.js"),
        },
    },
    externals: {
        ...externals,
        ...coreExternals,
        ...coreEditorExternals
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
                            source: "./build/components.js",
                            destination: "./framework/assets/js/",
                        },
                        {
                            source: "./build/components.asset.php",
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
    components,
};
