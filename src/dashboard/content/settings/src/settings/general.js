import { __ } from '@wordpress/i18n';

const GeneralSetting = ({ saving, saveData }) => {
    return <>
        <h2>{__('General Setting', '--gctd--')}</h2>
        {saving ? <div className="gutenverse-button">
            {__('Saving...', '--gctd--')}
        </div> : <div className="gutenverse-button" onClick={saveData}>
            {__('Save Changes', '--gctd--')}
        </div>}
    </>;
};

export default GeneralSetting;