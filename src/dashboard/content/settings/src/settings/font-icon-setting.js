import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch } from '@wordpress/data';
import { IconFontSVG, IconDownload2SVG, IconCheckSVG } from 'gutenverse-core/icons';
import apiFetch from '@wordpress/api-fetch';

const FontIconSetting = () => {
    const {
        fontIconExists
    } = window.GutenverseDashboard;

    const [downloading, setDownloading] = useState(false);
    const [isIconExists, setIsIconExists] = useState(fontIconExists);
    const { createInfoNotice, createErrorNotice } = useDispatch(noticesStore);

    const handleDownload = () => {
        setDownloading(true);
        apiFetch({
            path: 'gutenverse-client/v1/settings/font-icon',
            method: 'POST',
            data: {}
        }).then((data) => {
            setDownloading(false);
            setIsIconExists(data);
            createInfoNotice(__('Icon was Downloaded', '--gctd--'), {
                type: 'snackbar',
                isDismissible: true,
            });
        }).catch(() => {
            setDownloading(false);
            createErrorNotice(__('Download Error', '--gctd--'), {
                type: 'snackbar',
                isDismissible: true,
            });
        });
    };

    return <div>
        <div className="font-tab-body">
            <div className="setting-box">
                <div className="icon">
                    <div className="icon-wrapper">
                        <IconFontSVG />
                    </div>
                </div>
                <div className="info">
                    <h4>{__('Download Complete Font Icon', '--gctd--')}</h4>
                    <p>{__('Default font icon that come with plugin serve more than 98% of active browser, but you can download complete font icon to serve all active browser.', '--gctd--')}</p>
                </div>
                <div className="action">
                    {isIconExists ? <div className="icon check">
                        <IconCheckSVG />
                    </div> : <div className={`icon download ${downloading ? 'downloading' : ''}`} onClick={handleDownload}>
                        <IconDownload2SVG />
                    </div>}
                </div>
            </div>
        </div>
    </div>;
};

export default FontIconSetting;