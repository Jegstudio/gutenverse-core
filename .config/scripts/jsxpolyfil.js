
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");

const reactJSXRuntimePolyfill = {
    entry: {
        'react-jsx-runtime': {
            import: 'react/jsx-runtime',
        },
    },
    output: {
        path: path.resolve(__dirname, "../../build"),
        filename: 'react-jsx-runtime.js',
        library: {
            name: 'ReactJSXRuntime',
            type: 'window',
        },
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: [
                        "./gutenverse-form/assets/js/react-jsx-runtime.js*"
                    ]
                },
                onEnd: {
                    copy: [
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/react-jsx-runtime.js*" : "./build/react-jsx-runtime.js",
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
    reactJSXRuntimePolyfill
};
