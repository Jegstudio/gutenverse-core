const { core } = require('./scripts/core');
const { dashboard } = require('./scripts/dashboard');
const { corefrontend } = require('./scripts/core-frontend');
const { blocks } = require('./scripts/blocks');
const { components } = require('./scripts/components');

module.exports = [
    core,
    blocks,
    dashboard,
    components,
    corefrontend,
];
