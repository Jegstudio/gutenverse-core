import { __ } from '@wordpress/i18n';
import { ControlNumber } from 'gutenverse-core/backend';

const EditorSetting = ({ settingValues, updateSettingValues, saving, saveData }) => {
    const {
        editor_settings = {}
    } = settingValues;

    const {
        tablet_breakpoint = 1024,
        mobile_breakpoint = 767
    } = editor_settings;

    const updateValue = (id, value) => {
        updateSettingValues('editor_settings', id, value);
    };

    return <div>
        <div className="form-tab-body">
            <h2>{__('Responsive Breakpoints')}</h2>
            <ControlNumber
                id={'tablet_breakpoint'}
                title={__('Tablet Breakpoint (px)', 'gutenverse')}
                min={780}
                max={1024}
                step={1}
                value={tablet_breakpoint}
                updateValue={updateValue}
            />
            <ControlNumber
                id={'mobile_breakpoint'}
                title={__('Mobile Breakpoint (px)', 'gutenverse')}
                min={0}
                max={779}
                step={1}
                value={mobile_breakpoint}
                updateValue={updateValue}
            />
        </div>
        <div className="actions">
            {saving ? <div className="gutenverse-button">
                {__('Saving...', 'gutenverse')}
            </div> : <div className="gutenverse-button" onClick={() => saveData(['editor_settings'])}>
                {__('Save Changes', 'gutenverse')}
            </div>}
        </div>
    </div>;
};

export default EditorSetting;