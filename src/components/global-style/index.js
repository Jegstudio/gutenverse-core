import { useEffect } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { useGlobalStylesConfig } from 'gutenverse-core/editor-helper';
import GlobalStyleSidebar from './global-style-sidebar';
import { determineLocation } from 'gutenverse-core/helper';
export { globalStyleStore } from 'gutenverse-core/store';

const GlobalStyle = () => {
    const { isUserConfigReady } = useGlobalStylesConfig();

    useEffect(() => {
        if (isUserConfigReady) {
            const location = determineLocation();

            if ('editor' === location || 'post' === location) {
                registerPlugin('gutenverse-global-style', { render: () => <GlobalStyleSidebar /> });
            }
        }
    }, [isUserConfigReady]);

    return null;
};

export default GlobalStyle;