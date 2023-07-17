const { core } = require('./scripts/core');
const { dashboard } = require('./scripts/dashboard');
const { corefrontend } = require('./scripts/core-frontend');
const { blocks } = require('./scripts/blocks');
const { components } = require('./scripts/components');
const { coreeditor } = require('./scripts/core-editor');

module.exports = [
    blocks,
    dashboard,
    components,
    core,
    coreeditor,
    corefrontend,
];
