import { __ } from '@wordpress/i18n';
import { ControlCheckbox } from 'gutenverse-core/backend';

const TemplateSetting = ({ settingValues, updateSettingValues, saving, saveData }) => {
    const {
        template_page = {}
    } = settingValues;

    const updateValue = (id, value) => {
        updateSettingValues('template_page', id, value);
    };

    return <div>
        <div className="template-tab-body">
            <ControlCheckbox
                id={'use_setting_homepage'}
                title={__('Use Reading Homepage Setting', '--gctd--')}
                description={__('Enable this option to use WordPress Reading Homepage Setting instead of themes front-page template..', '--gctd--')}
                value={template_page.use_setting_homepage}
                updateValue={updateValue}
            />
        </div>
        <div className="template-tab-body">
            <ControlCheckbox
                id={'inherit_layout'}
                title={__('Inherit Layout', '--gctd--')}
                description={__('Section\'s width inside post content will inherit your theme layout content size.', '--gctd--')}
                value={template_page.inherit_layout}
                updateValue={updateValue}
            />
        </div>
        <div className="actions">
            {saving ? <div className="gutenverse-button">
                {__('Saving...', '--gctd--')}
            </div> : <div className="gutenverse-button" onClick={() => saveData(['template_page'])}>
                {__('Save Changes', '--gctd--')}
            </div>}
        </div>
    </div>;
};

export default TemplateSetting;