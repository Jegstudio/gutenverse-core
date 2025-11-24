const path = require("path");
const webpack = require("webpack");

const stats = {
    all: false,
    assets: true,
    colors: true,
    errors: true,
    performance: true,
    timings: true,
    warnings: true,
};

const output = {
    filename: "[name].js",
    path: path.resolve(__dirname, "../build"),
};

const plugins = [
];

// external dependencies location
const depDir = path.resolve(__dirname, "../src/frontend/deps/");

module.exports = {
    stats,
    output,
    plugins,
    depDir
};
