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
        missing_block_warn = true,
        editor_lazy_load = true,
        editor_lazy_load_block_height = 150,
        editor_lazy_load_block_threshold = 0,
        editor_lazy_load_extend_viewport = 250
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
        <div className="template-tab-body" style={{paddingTop: '30px'}}>
            <h2>{__('Editor Lazy Loading', '--gctd--')}</h2>
            <ControlCheckbox
                id={'editor_lazy_load'}
                title={__('Enable Editor Lazy Loading', '--gctd--')}
                description={__('Enable lazy loading in the editor to improve load times by only loading content as needed, especially when dealing with large amounts of content.', '--gctd--')}
                value={editor_lazy_load}
                updateValue={updateValue}
            />
            {editor_lazy_load && <>
                <ControlNumber
                    id={'editor_lazy_load_block_height'}
                    title={__('Block Placeholder Height (px)', '--gctd--')}
                    description={__('Adjust the height of the block placeholder for lazy loading to optimize loading performance.', '--gctd--')}
                    min={0}
                    max={500}
                    step={1}
                    value={editor_lazy_load_block_height}
                    updateValue={updateValue}
                />
                <ControlNumber
                    id={'editor_lazy_load_block_threshold'}
                    title={__('Block Placeholder Threshold (%)', '--gctd--')}
                    description={__('Set the threshold for the percentage of the block that must be visible before it is rendered.', '--gctd--')}
                    min={0}
                    max={100}
                    step={1}
                    value={editor_lazy_load_block_threshold}
                    updateValue={updateValue}
                />
                <ControlNumber
                    id={'editor_lazy_load_extend_viewport'}
                    title={__('Block Placeholder Extend Viewport (%)', '--gctd--')}
                    description={__('Define the viewport extension distance to trigger detection when the block enters the visible area.', '--gctd--')}
                    min={0}
                    max={1000}
                    step={1}
                    value={editor_lazy_load_extend_viewport}
                    updateValue={updateValue}
                />
            </>}
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