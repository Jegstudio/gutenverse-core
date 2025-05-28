const fs = require("fs");
const rules = require("../rules");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals, coreExternals } = require("../externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

class BlockJsonCopyPlugin {
    constructor() {
        this.firstRun = true;
        this.watchRun = false;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('BlockJsonCopyPlugin', (compilation, callback) => {
            this.copyBlockProcess(compilation, callback);
            this.firstRun = false;
        });

        compiler.hooks.watchRun.tapAsync('BlockJsonCopyPlugin', (compilation, callback) => {
            this.watchRun = true;
            this.copyBlockProcess(compilation, callback);
        });
    }

    copyBlockProcess = (compilation, callback) => {
        let changedBlocks = new Set();
        const changedFiles = compilation.modifiedFiles || new Set();

        if (this.firstRun) {
            const blockDirs = fs.readdirSync("./src/blocks/");
            for (const dir of blockDirs) {
                const jsonSource = `./src/blocks/${dir}/block.json`;
                if (fs.existsSync(jsonSource)) {
                    changedBlocks.add(dir);
                }
            }
        } else if (this.watchRun) {
            [...changedFiles].forEach(file => {
                const match = file.match(/src[\\/]+blocks[\\/]+([^\\/]+)/);
                if (match) {
                    changedBlocks.add(match[1]);
                }
            });
        }

        changedBlocks.forEach(blockName => {
            const jsonSource = `./src/blocks/${blockName}/block.json`;
            const jsonDest = `./framework/block/${blockName}/block.json`;

            if (fs.existsSync(jsonSource)) {
                try {
                    if (fs.existsSync(jsonDest)) {
                        fs.unlinkSync(jsonDest);
                    }

                    fs.mkdirSync(path.dirname(jsonDest), { recursive: true });
                    fs.copyFileSync(jsonSource, jsonDest);
                    console.log(`Updating Core block.json: \x1b[31m${blockName}\x1b[0m`);
                } catch (err) {
                    console.error(`Error copying block.json for ${blockName}:`, err);
                }
            }
        });

        callback();
    }
}

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
        ...coreExternals
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
                        "./framework/assets/js//blocks.js*",
                        "./framework/lib/dependencies/blocks.asset.php"
                    ]
                },
                onEnd: {
                    copy: [
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
        new BlockJsonCopyPlugin(),
    ],
};

module.exports = {
    blocks,
};
