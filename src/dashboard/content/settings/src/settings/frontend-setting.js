import { __ } from '@wordpress/i18n';
import { ControlSelect, ControlCheckbox } from 'gutenverse-core/backend';
import { AlertControl } from 'gutenverse-core/controls';
import apiFetch from '@wordpress/api-fetch';
import { useState } from '@wordpress/element';

const FrontEndSetting = ({ settingValues, updateSettingValues, saving, saveData, setToast, setShowToast }) => {
    const {
        frontend_settings = {}
    } = settingValues;

    const [loading, setLoading] = useState(false);
    const {
        renderSchedule
    } = window['GutenverseSettings'];
    const {
        render_mechanism = 'file',
        old_render_deletion_schedule = 'daily',
        remove_template_part_margin = true,
        file_delete_mechanism = 'manual',
        unused_size = '0 B',
    } = frontend_settings;

    const updateValue = (id, value) => {
        updateSettingValues('frontend_settings', id, value);
    };

    const handleDeleteCache = () => {
        setLoading(true);
        apiFetch({
            path: 'gutenverse-client/v1/settings/remove-cache',
            method: 'GET',
        })
            .then(() => {
                setToast({
                    status: 'success',
                    message: 'You successfully freed ' + unused_size + ' cache files'
                })
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            })
            .catch((e) => {
                setToast({
                    status: 'failed',
                    message: 'Failed Removing Cache Files'
                })
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            }).finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
    }

    return <div className="frontend-setting-dashboard">
        <div className="form-tab-body">
            <h2>{__('Frontend Render Settings', '--gctd--')}</h2>
            <AlertControl>
                <span>{__('Please Refresh the Page After Saving Your Settings', '--gctd--')}</span>
            </AlertControl>
            <ControlSelect
                id={'render_mechanism'}
                title={__('Render Mechanism', '--gctd--')}
                description={__('Pick Render Mechanism the System should implement when rendering frontend assets', '--gctd--')}
                value={render_mechanism}
                updateValue={updateValue}
                options={[
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
            {render_mechanism === 'file' && <>
                <div className="file-delete-mechanism-wrapper">
                    <AlertControl>
                        <span>{__('Use manual delete cache clean process instead of automatic if you are using other cache plugin', '--gctd--')}</span>
                    </AlertControl>
                    <ControlSelect
                        id={'file_delete_mechanism'}
                        title={__('Manual Deletion', '--gctd--')}
                        description={__('Use Manual File Delete if you are using other cache plugin. ', '--gctd--')}
                        value={file_delete_mechanism}
                        updateValue={updateValue}
                        options={[
                            {
                                label: __('Manual', '--gctd--'),
                                value: 'manual',
                            },
                            {
                                label: __('Auto', '--gctd--'),
                                value: 'auto'
                            },
                        ]}
                    />
                    {file_delete_mechanism === 'manual' && (
                        <div className="manual-button-wrapper" >
                            <div className="left">
                                <label>{__('Cache Clean Up', '--gctd--')}</label>
                                <p>Free up to <b>{unused_size}</b> by removing temporary cache files</p>
                            </div>
                            <div className="right">
                                {
                                    loading ? <div className="manual-delete-button loading">
                                        {__('Loading...', '--gctd--')}
                                    </div> : <div className="manual-delete-button" onClick={handleDeleteCache}>{__('Delete Cache', '--gctd--')}</div>
                                }
                            </div>
                        </div>
                    )}
                    {
                        file_delete_mechanism === 'auto' && <ControlSelect
                            id={'old_render_deletion_schedule'}
                            title={__('Old File Deletion Schedule', '--gctd--')}
                            description={__(`Set how long should the system store old css file for frontend style. This process need wp cron to be working. Next Schedule : ${renderSchedule}`, '--gctd--')}
                            value={old_render_deletion_schedule}
                            updateValue={updateValue}
                            options={[
                                {
                                    label: __('Every 5 Minutes', '--gctd--'),
                                    value: 'every_five_minutes',
                                },
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
                        />
                    }
                </div>
            </>
            }
        </div>
        <div className="template-tab-body" style={{ paddingTop: '30px' }}>
            <h2>{__('Remove Default Browser/WordPress Styles', '--gctd--')}</h2>
            <ControlCheckbox
                id={'remove_template_part_margin'}
                title={__('Remove Template Parts Margin', '--gctd--')}
                description={__('This will remove margin styling added to template parts from WordPress by default.', '--gctd--')}
                value={remove_template_part_margin}
                updateValue={updateValue}
            />
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