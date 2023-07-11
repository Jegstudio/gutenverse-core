import { __ } from '@wordpress/i18n';

const GeneralSetting = ({ saving, saveData }) => {
    return <>
        <h2>{__('General Setting')}</h2>
        {saving ? <div className="gutenverse-button">
            {__('Saving...', 'gutenverse')}
        </div> : <div className="gutenverse-button" onClick={saveData}>
            {__('Save Changes', 'gutenverse')}
        </div>}
    </>;
};

export default GeneralSetting;