const path = require("path");

const output = {
    filename: "[name].js",
    path: path.resolve(__dirname, "../build"),
};

module.exports = {
    output
}