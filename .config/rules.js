module.exports = [
    {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: "babel-loader",
        },
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: "babel-loader",
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
