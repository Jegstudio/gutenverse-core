import { __ } from '@wordpress/i18n';
import { ControlTextHidden } from 'gutenverse-core/backend';

const ApiServices = ({ settingValues, updateSettingValues, saving, saveData }) => {
    const {
        api_services = {}
    } = settingValues;

    const updateValue = (id, value) => {
        updateSettingValues('api_services', id, value);
    };

    return <div>
        <div className="template-tab-body">
            <ControlTextHidden
                id={'gutenverse_ai_key'}
                title={__('Gutenverse AI Key', 'gutenverse-form')}
                description={__('This is the API Key that will be used to generate Gutenverse AI Content.', '--gctd--')}
                value={api_services.gutenverse_ai_key}
                updateValue={updateValue}
            />
        </div>
        <div className="actions">
            {saving ? <div className="gutenverse-button">
                {__('Saving...', '--gctd--')}
            </div> : <div className="gutenverse-button" onClick={() => saveData(['api_services'])}>
                {__('Save Changes', '--gctd--')}
            </div>}
        </div>
    </div>;
};

export default ApiServices;