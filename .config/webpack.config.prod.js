const configs = require("./webpack.config.dev");

module.exports = configs.map((config) => ({
    ...config,
    mode: "production",
}));
