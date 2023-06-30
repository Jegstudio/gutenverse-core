import { render } from '@wordpress/element';
import GlobalStyle from './global-style';
import domReady from '@wordpress/dom-ready';
import GutenverseLibrary from './library';
import elementChange from 'element-change';
/* Other Editor Components */
import './hook';
import './data/block';

elementChange('#site-editor', () => {
    const library = document.getElementById('gutenverse-library-button');
    // const globalStyle = document.getElementById('global-style-options');

    if (library === null) {
        render(
            <>
                <GlobalStyle />
                <GutenverseLibrary />
            </>
            , document.getElementById('gutenverse-root'));
    }
});

domReady(() => {
    render(
        <>
            <GlobalStyle />
            <GutenverseLibrary />
        </>
        , document.getElementById('gutenverse-root'));
});
