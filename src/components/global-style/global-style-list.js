import { __ } from '@wordpress/i18n';
import { Edit3 } from 'react-feather';
import { applyFilters } from '@wordpress/hooks';
import { AlertControl, ProLock } from 'gutenverse-core/controls';

const GlobalVariableList = ({ setStage }) => {
    return <>
        <AlertControl>
            <span>{__('Current color and font variables are tied to your current active theme.', '--gctd--')}</span>
        </AlertControl>
        <h3>{__('CSS Variable', '--gctd--')}</h3>
        <div className={'global-style-options'}>
            <ul>
                <li onClick={() => setStage('color')}>
                    {__('Color Variable', '--gctd--')}
                    <Edit3 size={12} />
                </li>
                <li onClick={() => setStage('font')}>
                    {__('Font Variable', '--gctd--')}
                    <Edit3 size={12} />
                </li>
            </ul>
        </div>
    </>;
};

const GlobalStyleList = (props) => {
    const { stage, setStage } = props;
    const additionalSettings = [
        'custom_css',
        'custom_js'
    ];

    const lockedSettings = <>
        <div className={'global-style-options'}>
            <ul>
                <li className="upgrade-locked" onClick={() => setStage('custom_css_locked')} >
                    {__('Custom CSS', '--gctd--')}
                </li>
                <li className="upgrade-locked" onClick={() => setStage('custom_js_locked')}>
                    {__('Custom JS', '--gctd--')}
                </li>
            </ul>
        </div>
    </>;

    return <div className="drawer-content-wrapper">
        {!additionalSettings.includes(stage) && <GlobalVariableList {...props} />}
        <h3>{__('Additional Settings', 'gutenverse-pro')}</h3>
        <div className={'global-style-options'}>
            {applyFilters('gutenverse.after.global.style', lockedSettings, {additionalSettings, ...props})}
        </div>
    </div>;
};

export default GlobalStyleList;
