import { ReplaceCSS } from './blocks/replace-css';

export { Default } from './blocks/default';
export { default as u } from 'umbrellajs';
export { default as load } from 'load-script';
export { responsiveBreakpoint, renderIcon } from './helper/index';
export default (new ReplaceCSS()).init();
export * from './scroll';
