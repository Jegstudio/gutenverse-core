import { useEffect } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { useGlobalStylesConfig } from 'gutenverse-core/editor-helper';
import GlobalStyleSidebar from './global-style-sidebar';
export { globalStyleStore } from 'gutenverse-core/store';

const GlobalStyle = () => {
    const { isUserConfigReady } = useGlobalStylesConfig();

    useEffect(() => {
        if (isUserConfigReady) {
            registerPlugin('gutenverse-global-style', { render: () => <GlobalStyleSidebar /> });
        }
    }, [isUserConfigReady]);

    return null;
};

export default GlobalStyle;