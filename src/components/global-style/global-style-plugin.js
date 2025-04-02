import { registerPlugin } from '@wordpress/plugins';
import GlobalStyleSidebar from './global-style-sidebar';
export { globalStyleStore } from 'gutenverse-core/store';

const gutenverseGlobalStyle = registerPlugin('gutenverse-global-style', {
    render: () => {
        return <GlobalStyleSidebar />;
    }
});

export default gutenverseGlobalStyle;