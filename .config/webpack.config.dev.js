const { dashboard } = require('./scripts/dashboard');
const { blocks } = require('./scripts/blocks');
const { components } = require('./scripts/components');
const { core } = require('./scripts/core');
const { corefrontend } = require('./scripts/core-frontend');
const { reactJSXRuntimePolyfill } = require('./scripts/jsxpolyfil');

module.exports = [
    reactJSXRuntimePolyfill,
    blocks,
    dashboard,
    components,
    core,
    corefrontend,
];
