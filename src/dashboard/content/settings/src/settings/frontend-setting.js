import { __ } from '@wordpress/i18n';
import { ControlCheckbox } from 'gutenverse-core/backend';
import { AlertControl } from 'gutenverse-core/controls';
import apiFetch from '@wordpress/api-fetch';
import { useState } from '@wordpress/element';

const FrontEndSetting = ({ settingValues, updateSettingValues, updateValues, saving, saveData, setToast, setShowToast }) => {
    const {
        frontend_settings = {}
    } = settingValues;

    const [loading, setLoading] = useState('');
    const {
        remove_template_part_margin = true,
        remove_wp_emoji_script = false,
        disable_wp_lazyload = true,
        load_static_css_as_files = false,
        load_generated_css_as_virtual_url = false,
        legacy_cache_size = '0 B',
        payload_cache_size = '0 B',
        payload_cache_files = 0
    } = frontend_settings;
    const hasLegacyFiles = legacy_cache_size !== '0 B';
    const hasPayloadFiles = payload_cache_size !== '0 B' || payload_cache_files > 0;

    const updateValue = (id, value) => {
        updateSettingValues('frontend_settings', id, value);
    };

    const updateLegacyCacheInfo = (response) => {
        const nextSize = response?.legacy_cache_size || response?.unused_size;

        updateValues('frontend_settings', {
            ...frontend_settings,
            ...(nextSize ? { legacy_cache_size: nextSize } : {})
        });
    };

    const updatePayloadCacheInfo = (response) => {
        updateValues('frontend_settings', {
            ...frontend_settings,
            payload_cache_size: response?.payload_cache_size || '0 B',
            payload_cache_files: response?.payload_cache_files || 0
        });
    };

    const handleDeleteCache = () => {
        if (loading || !hasLegacyFiles) {
            return;
        }

        setLoading('legacy');
        apiFetch({
            path: 'gutenverse-client/v1/settings/remove-cache',
            method: 'GET',
        })
            .then((response) => {
                updateLegacyCacheInfo(response);
                setToast({
                    status: 'success',
                    message: 'Removed ' + (response?.removed_size || legacy_cache_size) + ' legacy frontend files'
                });
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            })
            .catch(() => {
                setToast({
                    status: 'failed',
                    message: 'Failed Removing Legacy Frontend Files'
                });
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            }).finally(() => {
                setTimeout(() => {
                    setLoading('');
                }, 1000);
            });
    };

    const handleClearPayloadCache = () => {
        if (loading || !hasPayloadFiles) {
            return;
        }

        setLoading('payload');
        apiFetch({
            path: 'gutenverse-client/v1/settings/clear-payload-cache',
            method: 'GET',
        })
            .then((response) => {
                updatePayloadCacheInfo(response);
                setToast({
                    status: 'success',
                    message: 'Cleared the internal CSS cache and ' + (response?.legacy_css_cache_removed || 0) + ' legacy CSS cache entries'
                });
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            })
            .catch(() => {
                setToast({
                    status: 'failed',
                    message: 'Failed Removing Internal Style Cache'
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
        <div className="template-tab-body frontend-css-loading">
            <h2>{__('Frontend CSS Loading', '--gctd--')}</h2>
            <ControlCheckbox
                id={'load_static_css_as_files'}
                title={__('Load Static CSS as Files', '--gctd--')}
                description={__('Load static CSS files separately instead of embedding them in the page.', '--gctd--')}
                value={load_static_css_as_files}
                updateValue={updateValue}
            />
            <ControlCheckbox
                id={'load_generated_css_as_virtual_url'}
                title={__('Load Generated CSS Separately', '--gctd--')}
                description={__('Load generated CSS separately from the page HTML. This does not create CSS files.', '--gctd--')}
                value={load_generated_css_as_virtual_url}
                updateValue={updateValue}
            />
        </div>
        <div className="template-tab-body legacy-cache-cleanup">
            <div className="legacy-cache-cleanup-header">
                <div>
                    <h2>{__('Legacy Generated Frontend CSS Files', '--gctd--')}</h2>
                    <p>{__('Remove CSS files left by older versions. The current generated CSS loading option does not create CSS files.', '--gctd--')}</p>
                </div>
                <div className="legacy-cache-cleanup-size">
                    <span>{__('File size', '--gctd--')}</span>
                    <strong>{legacy_cache_size}</strong>
                </div>
            </div>
            <AlertControl type="warning">
                <span>{__('Only clear these legacy files after purging page cache or CDN cache. Cached pages may still reference them.', '--gctd--')}</span>
            </AlertControl>
            <div className="legacy-cache-cleanup-actions">
                <div className={`gutenverse-button legacy-cache-cleanup-button ${loading === 'legacy' ? 'loading' : ''} ${!hasLegacyFiles ? 'disabled' : ''}`} onClick={handleDeleteCache}>
                    {loading === 'legacy' ? __('Clearing...', '--gctd--') : hasLegacyFiles ? __('Clear Legacy Files', '--gctd--') : __('No Legacy Files', '--gctd--')}
                </div>
            </div>
        </div>
        <div className="template-tab-body payload-cache-cleanup">
            <div className="payload-cache-cleanup-header">
                <div>
                    <h2>{__('Internal Generated CSS Cache', '--gctd--')}</h2>
                    <p>{__('Stores generated CSS with its source data. Separate stylesheet links read CSS from this cache.', '--gctd--')}</p>
                </div>
                <div className="payload-cache-cleanup-size">
                    <span>{__('Payload cache', '--gctd--')}</span>
                    <strong>{payload_cache_size}</strong>
                    <span>{payload_cache_files + ' ' + __('files', '--gctd--')}</span>
                </div>
            </div>
            <AlertControl type="warning">
                <span>{__('Purge page or CDN cache before clearing. Cached pages may still request CSS stored here.', '--gctd--')}</span>
            </AlertControl>
            <div className="payload-cache-cleanup-actions">
                <div className={`gutenverse-button payload-cache-cleanup-button ${loading === 'payload' ? 'loading' : ''} ${!hasPayloadFiles ? 'disabled' : ''}`} onClick={handleClearPayloadCache}>
                    {loading === 'payload' ? __('Clearing...', '--gctd--') : hasPayloadFiles ? __('Clear Internal Cache', '--gctd--') : __('No Internal Cache', '--gctd--')}
                </div>
            </div>
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
