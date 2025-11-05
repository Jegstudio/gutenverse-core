export { Default } from './blocks/default';
export { default as u } from 'umbrellajs';
export { default as load } from 'load-script';
export { default as apiFetch } from '@wordpress/api-fetch';
export { responsiveBreakpoint } from './helper/index';
import { ReplaceCSS } from './blocks/replace-css';

export default (new ReplaceCSS()).init();

export * from '@wordpress/hooks';
export * from '@wordpress/url';

// Internal.
export * from './helper/fetch';
export * from './scroll';
