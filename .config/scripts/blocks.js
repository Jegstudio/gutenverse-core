const fs = require("fs");
const rules = require("../rules");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals, coreExternals } = require("../externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

let copyPath = [];
let deletePath = [];

fs.readdirSync("./src/blocks/").filter(function (file) {
    const path = "./src/blocks/" + file;

    if (fs.statSync(path).isDirectory()) {
        const jsonPath = path + "/block.json";
        if (fs.existsSync(jsonPath)) {
            deletePath.push("./gutenverse/block/" + file + "/block.json");
            copyPath.push({
                source: jsonPath,
                destination: "./framework/block/" + file + "/block.json",
            });
        }
    }
});

const blocks = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        blocks: {
            import: path.resolve(__dirname, "../../src/blocks/index.js"),
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
