import domReady from '@wordpress/dom-ready';
import { autoRecovery } from './auto-recovery';
import { editorWarn } from './editor-warn';

/* Other Editor Components */
import './hook';
import './data/block';

/* Copy & Paste Style */
import './copy-style/copy-style';
import './copy-style/paste-style';

domReady(() => {
    autoRecovery();
    editorWarn();
});

// GutenverseLibrary Plugin
export { default as gutenverseLibraryPlugin } from './library/library-plugin';


// Global Style Plugin
export { default as gutenverseGlobalStyle } from './global-style/global-style-plugin';