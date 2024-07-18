import { render } from '@wordpress/element';
import GlobalStyle from './global-style';
import domReady from '@wordpress/dom-ready';
import GutenverseLibrary from './library';
import elementChange from 'element-change';
import { applyFilters } from '@wordpress/hooks';
import { autoRecovery } from './auto-recovery';

/* Other Editor Components */
import './hook';
import './data/block';

/* Copy & Paste Style */
import './copy-style/copy-style';
import './copy-style/paste-style';

elementChange('#site-editor', () => {
    const library = document.getElementById('gutenverse-library-button');
    // const globalStyle = document.getElementById('global-style-options');

    if (library === null) {
        const content = applyFilters(
            'gutenverse.site.editor.content',
            <>
                <GlobalStyle />
                <GutenverseLibrary />
            </>,
            null
        );

        render(content, document.getElementById('gutenverse-root'));
    }
});

domReady(() => {
    const content = applyFilters(
        'gutenverse.site.editor.content',
        <>
            <GlobalStyle />
            <GutenverseLibrary />
        </>,
        null
    );
    autoRecovery();
    render(content, document.getElementById('gutenverse-root'));
});

