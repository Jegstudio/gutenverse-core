import { sprintf,__ } from '@wordpress/i18n';
import { IconInfoGraySVG } from 'gutenverse-core/icons';

export const ProUpdateNotice = () => {
    const { requireProUpdate } = window['GutenverseDashboard'];

    if (requireProUpdate.need_update) {
        return <div className="pro-update">
            <div className="pro-update-wrapper">
                <span>
                    <IconInfoGraySVG />
                </span>
                <p dangerouslySetInnerHTML={{
                    __html: sprintf(__('Some of your plugin need more advance version of <strong>%s</strong>. Please update your <strong>%s</strong> Plugin.', '--gctd--'), 'Gutenverse Pro', 'Gutenverse Pro')
                }}/>
            </div>
        </div>;
    }

    return null;
};