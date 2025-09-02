import DefaultLayout from '../../controls/controls/locked/default-layout';
import GlobalStyleList from './global-style-list';
import GlobalVariableColor from './global-variable-color';
import GlobalVariableFont from './global-variable-font';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { useEffect } from '@wordpress/element';

const GlobalStyleContent = (props) => {
    let { stage, setStage } = props;
    const params = new URLSearchParams(window.location.search);

    useEffect(() => {
        const global = params.get('gutenverse-state-global');
        const openGlobal = params.get('gutenverse-global-sidebar');

        if (openGlobal === 'open' && global) {
            setStage(global);
        }
    }, []);

    switch (stage) {
        case 'color':
            return <GlobalVariableColor {...props} stage={stage} />;
        case 'font':
            return <GlobalVariableFont {...props} stage={stage} />;
        case 'custom_css_locked':
            return <div className={'gutenverse-control-wrapper gutenverse-control-locked gutenverse-control-locked-layout'}>
                {applyFilters(
                    'gutenverse.custom.css.locked',
                    <DefaultLayout
                        title={__('Unlock Custom CSS', '--gctd--')}
                        description={__('Have a styling you need to fix? You can do your own custom CSS for each page.', '--gctd--')}
                        isOpen={true}
                        permaLink={__('animation-effects/')}
                    />,
                    { ...props }
                )}
            </div>;
        case 'custom_js_locked':
            return <div className={'gutenverse-control-wrapper gutenverse-control-locked gutenverse-control-locked-layout'}>
                {applyFilters(
                    'gutenverse.custom.js.locked',
                    <DefaultLayout
                        title={__('Unlock Custom JS', '--gctd--')}
                        description={__('Need to run a specific script? You can do your own custom JS for each page.', '--gctd--')}
                        isOpen={true}
                        permaLink={__('animation-effects/')}
                    />,
                    { ...props }
                )}
            </div>;
        default:
            return <GlobalStyleList {...props} />;
    }
};

export default GlobalStyleContent;