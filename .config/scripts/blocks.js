const fs = require("fs");
const rules = require("../rules");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals, coreExternals, coreEditorExternals } = require("../externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

let copyPath = [];
let deletePath = [];

const blockDir = path.resolve(process.cwd(), "src/blocks");

fs.readdirSync(blockDir).filter((file) => {
    const blockPath = `${blockDir}/${file}`;

    if (fs.statSync(blockPath).isDirectory()) {
        const jsonPath = `${blockPath}/block.json`;

        if (fs.existsSync(jsonPath)) {
            deletePath.push("./gutenverse/block/" + file + "/block.json");
            copyPath.push({
                source: jsonPath,
                destination: path.resolve(process.cwd(), `framework/block/${file}/block.json`),
            });
        }
    }
});

const blocks = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        blocks: {
            import: path.resolve(process.cwd(), "src/blocks/index.js"),
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
                onStart: {
                    delete: [
                        ...deletePath,
                        "./framework/assets/js//blocks.js*",
                        "./framework/lib/dependencies/blocks.asset.php"
                    ]
                },
                onEnd: {
                    copy: [
                        ...copyPath,
                        {                            
                            source: process.env.NODE_ENV === 'development' ? "./build/blocks.js*" : "./build/blocks.js",
                            destination: "./framework/assets/js/",
                        },
                        {
                            source: "./build/blocks.asset.php",
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
    blocks,
};
