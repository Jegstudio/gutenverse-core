import domReady from '@wordpress/dom-ready';
import { editorWarn } from './editor-warn';

/* Other Editor Components */
import './hook';
import './data/block';

domReady(() => {
    editorWarn();
});

/* Copy & Paste Style */
export { default as gutenverseCopyPlugin } from './copy-style/copy-style-plugin';
export { default as gutenversePastePlugin } from './copy-style/paste-style-plugin';

// GutenverseLibrary Plugin
export { default as gutenverseLibraryPlugin } from './library/library-plugin';

// Global Style Plugin
export { default as gutenverseGlobalStyle } from './global-style/global-style-plugin';

// Autorecovery
export { default as gutenverseAutoRecovery } from './auto-recovery/auto-recovery-plugin';