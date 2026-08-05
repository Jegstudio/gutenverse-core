import { __ } from '@wordpress/i18n';
import { ControlSelect, ControlCheckbox } from 'gutenverse-core/backend';
import { AlertControl } from 'gutenverse-core/controls';
import apiFetch from '@wordpress/api-fetch';
import { useState } from '@wordpress/element';

const FrontEndSetting = ({ settingValues, updateSettingValues, updateValues, saving, saveData, setToast, setShowToast }) => {
    const {
        frontend_settings = {}
    } = settingValues;

    const [loading, setLoading] = useState('');
    const {
        renderSchedule
    } = window['GutenverseSettings'];
    const {
        render_mechanism = 'file',
        old_render_deletion_schedule = 'daily',
        remove_template_part_margin = true,
        remove_wp_emoji_script = false,
        disable_wp_lazyload = true,
        file_delete_mechanism = 'manual',
        unused_size = '0 B',
        cache_id = 'initial-cache'
    } = frontend_settings;

    const updateValue = (id, value) => {
        updateSettingValues('frontend_settings', id, value);
    };

    const updateCacheInfo = ({ cache_id, unused_size }) => {
        updateValues('frontend_settings', {
            ...frontend_settings,
            ...(cache_id ? { cache_id } : {}),
            ...(unused_size ? { unused_size } : {})
        });
    };

    const handleDeleteCache = () => {
        if (loading) {
            return;
        }

        setLoading('delete');
        apiFetch({
            path: 'gutenverse-client/v1/settings/remove-cache',
            method: 'GET',
        })
            .then((response) => {
                updateCacheInfo(response);
                setToast({
                    status: 'success',
                    message: 'You successfully freed ' + (response?.removed_size || unused_size) + ' cache files'
                });
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            })
            .catch(() => {
                setToast({
                    status: 'failed',
                    message: 'Failed Removing Cache Files'
                });
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            }).finally(() => {
                setTimeout(() => {
                    setLoading('');
                }, 1000);
            });
    };

    const handleResetCacheId = () => {
        if (loading) {
            return;
        }

        setLoading('reset');
        apiFetch({
            path: 'gutenverse-client/v1/settings/reset-cache-id',
            method: 'POST',
        })
            .then((response) => {
                updateCacheInfo(response);
                setToast({
                    status: 'success',
                    message: 'Cache ID reset successfully'
                });
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            })
            .catch(() => {
                setToast({
                    status: 'failed',
                    message: 'Failed Resetting Cache ID'
                });
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            }).finally(() => {
                setTimeout(() => {
                    setLoading('');
                }, 1000);
            });
    };

    return <div className="frontend-setting-dashboard">
        <div className="template-tab-body">
            <h2>{__('Fix Default Browser/WordPress Styles & Scripts', '--gctd--')}</h2>
            <ControlCheckbox
                id={'remove_template_part_margin'}
                title={__('Remove Template Parts Margin', '--gctd--')}
                description={__('This will remove margin styling added to template parts from WordPress by default.', '--gctd--')}
                value={remove_template_part_margin}
                updateValue={updateValue}
            />
            <ControlCheckbox
                id={'disable_wp_lazyload'}
                title={__('Disable WordPress Lazy Load', '--gctd--')}
                description={__('Our plugin already have lazyload functionality that is fully compatible with all our blocks.', '--gctd--')}
                value={disable_wp_lazyload}
                updateValue={updateValue}
            />
            <ControlCheckbox
                id={'remove_wp_emoji_script'}
                title={__('Disable WordPress default Twemoji script', '--gctd--')}
                description={__('This will disable WordPress default script for handling emojis, do this if you want faster speed and want to show the native device emoji instead. (Warning: some emoji might be rendered as text in some OS like Windows)', '--gctd--')}
                value={remove_wp_emoji_script}
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
