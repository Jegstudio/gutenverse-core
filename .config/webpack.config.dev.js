const { blocks } = require('./scripts/blocks');
const { frontend } = require('./scripts/frontend');
const { dashboard } = require('./scripts/dashboard');
const { wizard } = require('./scripts/wizard');

module.exports = [
    blocks,
    frontend,
    dashboard,
    wizard
];
