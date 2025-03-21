import { createRoot } from '@wordpress/element';
import GlobalStyle from './global-style';
import domReady from '@wordpress/dom-ready';
import GutenverseLibrary from './library';
import elementChange from 'element-change';
import { applyFilters } from '@wordpress/hooks';
import { autoRecovery } from './auto-recovery';
import { editorWarn } from './editor-warn';

/* Other Editor Components */
import './hook';
import './data/block';

/* Copy & Paste Style */
import './copy-style/copy-style';
import './copy-style/paste-style';

let gutenverseRoot = null;

elementChange('#site-editor', () => {
    const library = document.getElementById('gutenverse-library-button');

    if (library === null) {
        const Content = applyFilters(
            'gutenverse.site.editor.content',
            <>
                <GlobalStyle />
                <GutenverseLibrary />
            </>,
            null
        );

        gutenverseRoot.render(Content);
    }
});

domReady(() => {
    autoRecovery();
    editorWarn();

    const rootElement = document.getElementById('gutenverse-root');
    if (rootElement) {
        const Content = applyFilters(
            'gutenverse.site.editor.content',
            <>
                <GlobalStyle />
                <GutenverseLibrary />
            </>,
            null
        );

        gutenverseRoot = createRoot(rootElement);
        gutenverseRoot.render(Content);
    }
});

export { gutenverseRoot };