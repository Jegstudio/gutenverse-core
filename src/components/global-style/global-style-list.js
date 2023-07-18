import { __ } from '@wordpress/i18n';
import { Edit3 } from 'react-feather';
import { applyFilters } from '@wordpress/hooks';
import { AlertControl } from 'gutenverse-core/controls';

const GlobalVariableList = ({ setStage }) => {
    return <>
        <AlertControl>
            <span>{__('Current color and font variables are tied to your current active theme.', 'gutenverse')}</span>
        </AlertControl>
        <h3>{__('CSS Variable', 'gutenverse')}</h3>
        <div className={'global-style-options'}>
            <ul>
                <li onClick={() => setStage('color')}>
                    {__('Color Variable', 'gutenverse')}
                    <Edit3 size={12} />
                </li>
                <li onClick={() => setStage('font')}>
                    {__('Font Variable', 'gutenverse')}
                    <Edit3 size={12} />
                </li>
            </ul>
        </div>
    </>;
};

const GlobalStyleList = (props) => {
    return <div className="drawer-content-wrapper">
        <GlobalVariableList {...props} />
        {applyFilters('gutenverse.after.global.style', null, props)}
    </div>;
};

export default GlobalStyleList;
