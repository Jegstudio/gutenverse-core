import { __ } from '@wordpress/i18n';
import { ControlSelect } from 'gutenverse-core/backend';
import { AlertControl } from 'gutenverse-core/controls';

const FrontEndSetting = ({ settingValues, updateSettingValues, saving, saveData }) => {
    const {
        frontend_settings = {}
    } = settingValues;

    const {
        renderSchedule
    } = window['GutenverseSettings'];
    const {
        render_mechanism = 'file',
        old_render_deletion_schedule = 'daily' 
    } = frontend_settings;

    const updateValue = (id, value) => {
        updateSettingValues('frontend_settings', id, value);
    };

    return <div className="frontend-setting-dashboard">
        <div className="form-tab-body">
            <h2>{__('Frontend Style Render Settings', '--gctd--')}</h2>
            <AlertControl>
                <span>{__('Please Refresh the Page After Saving Your Settings', '--gctd--')}</span>
            </AlertControl>
            <ControlSelect 
                id={'render_mechanism'}
                title={__('Render Mechanism', '--gctd--')}
                description={__('Pick Render Mechanism the System should implement when rendering frontend style', '--gctd--')}
                value={render_mechanism}
                updateValue={updateValue}
                options = {[
                    {
                        label: __('File', '--gctd--'),
                        value: 'file'
                    },
                    {
                        label: __('Inline', '--gctd--'),
                        value: 'direct'
                    },
                ]}
            />
            { render_mechanism === 'file' && <ControlSelect 
                id={'old_render_deletion_schedule'}
                title={__('Old File Deletion Schedule', '--gctd--')}
                description={__(`Set how long should the system store old css file for frontend style. Next Schedule : ${renderSchedule}`, '--gctd--')}
                value={old_render_deletion_schedule}
                updateValue={updateValue}
                options = {[
                    {
                        label: __('Daily', '--gctd--'),
                        value: 'daily'
                    },
                    {
                        label: __('Every 2 days', '--gctd--'),
                        value: 'every_two_days'
                    },
                    {
                        label: __('Weekly', '--gctd--'),
                        value: 'weekly'
                    },
                    {
                        label: __('Monthly', '--gctd--'),
                        value: 'monthly'
                    },
                    {
                        label: __('Yearly', '--gctd--'),
                        value: 'yearly'
                    },
                ]}
            />}
        </div>
        <div className="actions">
            {saving ? <div className="gutenverse-button">
                {__('Saving...', '--gctd--')}
            </div> : <div className="gutenverse-button" onClick={() => saveData(['frontend_settings'])}>
                {__('Save Changes', '--gctd--')}
            </div>}
        </div>
    </div>;
};

export default FrontEndSetting;