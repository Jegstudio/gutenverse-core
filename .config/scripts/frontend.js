const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const rules = require("gutenverse-core/.config/rules");
const { output } = require('../config');
const { stats, plugins } = require("gutenverse-core/.config/config");
const { externals, coreFrontendExternals } = require("gutenverse-core/.config/externals");
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

let copyPath = [
    {
        source: "./build/frontend.asset.php",
        destination: "./gutenverse/lib/dependencies/",
    },
];

if (process.env.NODE_ENV === 'development') {
    copyPath = [
        ...copyPath,
        {
            source: "./build/vendors*",
            destination: "./gutenverse/assets/js/",
        },
    ];
} else {
    copyPath = [
        ...copyPath,
        {
            source: "./build/chunk-shufflejs.js",
            destination: "./gutenverse/assets/js/",
        },
        {
            source: "./build/chunk-swiper.js",
            destination: "./gutenverse/assets/js/",
        },
    ];
}

const frontend = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        frontend: {
            import: path.resolve(__dirname, "../../src/frontend/index.js"),
        },
    },
    externals: {
        ...externals,
        ...coreFrontendExternals
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
                        "./gutenverse/assets/js/frontend.js*",
                        "./gutenverse/assets/js/vendor*",
                        "./gutenverse/assets/js/chunk-shufflejs.js",
                        "./gutenverse/assets/js/chunk-swiper.js",
                        "./gutenverse/lib/dependencies/frontend.asset.php"
                    ]
                },
                onEnd: {
                    copy: [
                        ...copyPath,
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/frontend.js*" : "./build/frontend.js",
                            destination: "./gutenverse/assets/js/",
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
