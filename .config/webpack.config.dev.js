const { dashboard } = require('./scripts/dashboard');
const { frontend } = require('./scripts/frontend');
const { blocks } = require('./scripts/blocks');
const { components } = require('./scripts/components');
const { core } = require('./scripts/core');
const { coreeditor } = require('./scripts/core-editor');
const { corefrontend } = require('./scripts/core-frontend');

module.exports = [
    blocks,
    dashboard,
    components,
    frontend,
    core,
    coreeditor,
    corefrontend,
];
