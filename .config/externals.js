const fs = require('fs');
const { depDir } = require("./config");

/**
 * Given a string, returns a new string with dash separators converted to
 * camel-case equivalent. This is not as aggressive as `_.camelCase`, which
 * which would also upper-case letters following numbers.
 *
 * @param {string} string Input dash-delimited string.
 *
 * @return {string} Camel-cased string.
 */
const camelCaseDash = string => string.replace(
	/-([a-z])/g,
	(match, letter) => letter.toUpperCase()
);

/**
 * Create deps external from deps/ folder
 */
const getDepsExternal = () => {
	const files = fs.readdirSync(depDir).filter(file => file.endsWith('.js'));
	const names = {};

	files.forEach(file => {
		const name = file.replace('.js', '');
		names[name] = name;
	});

	return names;
}

/**
 * Create deps external config for webpack extraction plugin
 */
const configDepsExtractExternals = () => {
	const frontendDeps = getDepsExternal();
	const makeDepsFunc = (frmt) => {
		return (request) => {
			for (const name of Object.keys(frontendDeps)) {
				if (request === name) {
					return frmt(frontendDeps[name]);
				}
			}
			return undefined;
		}
	};
	return {
		requestToExternal: makeDepsFunc((val) => val),
		requestToHandle: makeDepsFunc((val) => `gutenverse-dep-${val}-script`),
	};
}

/**
 * Define externals to load components through the wp global.
 */
const wpExternals = [
	'ajax',
	'api',
	'api-fetch',
	'block-editor',
	'blocks',
	'codeEditor',
	'components',
	'compose',
	'core-data',
	'data',
	'date',
	'editor',
	'element',
	'escape-html',
	'html-entities',
	'hooks',
	'i18n',
	'keyboard-shortcuts',
	'keycodes',
	'plugins',
	'rich-text',
	'token-list',
	'url',
	'viewport',
].reduce((externals, name) => ({
	...externals,
	[`@wordpress/${name}`]: `wp.${camelCaseDash(name)}`,
}), {});

const coreExternals = [
	'config',
    'styling',
    'icons',
    'backend',
    'router',
    'toolbars',
    'hoc',
    'hooks',
    'store',
    'components',
    'controls',
    'requests',
    'helper',
    'editor-helper'
].reduce((externals, name) => ({
	...externals,
	[`gutenverse-core/${name}`]: `gutenverseCore.${camelCaseDash(name)}`,
}), {});

const coreFrontendExternals = {
	'gutenverse-core-frontend': 'gutenverseCoreFrontend'
};

const externals = {
	wp: 'wp',
	lodash: 'lodash', // WP loads lodash already.
	fetch: 'fetch', // Used in our debugger sidebar.
	// react: 'wp.element', // Use the bundled React in Gutenberg. (not working see https://github.com/WordPress/gutenberg/issues/33674)
	// 'react-dom': 'wp.element', // Use the bundled ReactDom in Gutenberg.
	...wpExternals,
	...getDepsExternal(),
}

module.exports = {
	camelCaseDash,
	externals,
	coreExternals,
	coreFrontendExternals,
	configDepsExtractExternals,
};
