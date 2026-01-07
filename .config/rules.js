module.exports = [
    {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "esbuild-loader",
        options: {
            loader: "jsx",
            target: "es2015",
        },
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: "esbuild-loader",
                options: {
                    loader: "jsx",
                    target: "es2015",
                },
            },
            {
                loader: "@svgr/webpack",
                options: { babel: false },
            },
        ],
    },
    {
        test: /\.(png|jpg|gif)$/,
        use: [
            {
                loader: "file-loader",
                options: {
                    outputPath: "images",
                    publicPath: "dist/images",
                    regExp: /\/([^\/]+)\/([^\/]+)\/images\/(.+)\.(.*)?$/,
                    name: "[1]-[2]-[3].[hash:hex:7].[ext]",
                },
            },
        ],
    },
];
