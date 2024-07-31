import { __ } from '@wordpress/i18n';
import { ControlNumber, ControlCheckbox } from 'gutenverse-core/backend';

const EditorSetting = ({ settingValues, updateSettingValues, saving, saveData }) => {
    const {
        editor_settings = {}
    } = settingValues;

    const {
        tablet_breakpoint = 1024,
        mobile_breakpoint = 767,
        autoblock_recovery = true,
        missing_block_warn = true
    } = editor_settings;

    const updateValue = (id, value) => {
        updateSettingValues('editor_settings', id, value);
    };

    return <div>
        <div className="form-tab-body">
            <h2>{__('Responsive Breakpoints', '--gctd--')}</h2>
            <ControlNumber
                id={'tablet_breakpoint'}
                title={__('Tablet Breakpoint (px)', '--gctd--')}
                min={780}
                max={1024}
                step={1}
                value={tablet_breakpoint}
                updateValue={updateValue}
            />
            <ControlNumber
                id={'mobile_breakpoint'}
                title={__('Mobile Breakpoint (px)', '--gctd--')}
                min={0}
                max={779}
                step={1}
                value={mobile_breakpoint}
                updateValue={updateValue}
            />
        </div>
        <div className="template-tab-body" style={{paddingTop: '30px'}}>
            <h2>{__('Editor Helper', '--gctd--')}</h2>
            <ControlCheckbox
                id={'autoblock_recovery'}
                title={__('Enable Autoblock Recovery', '--gctd--')}
                description={__('Recover block automatically.', '--gctd--')}
                value={autoblock_recovery}
                updateValue={updateValue}
            />
            <ControlCheckbox
                id={'missing_block_warn'}
                title={__('Enable Missing Block Warning', '--gctd--')}
                description={__('Enable warning popup when Gutenverse block is unsupported or disabled.', '--gctd--')}
                value={missing_block_warn}
                updateValue={updateValue}
            />
        </div>
        <div className="actions">
            {saving ? <div className="gutenverse-button">
                {__('Saving...', '--gctd--')}
            </div> : <div className="gutenverse-button" onClick={() => saveData(['editor_settings'])}>
                {__('Save Changes', '--gctd--')}
            </div>}
        </div>
    </div>;
};

export default EditorSetting;