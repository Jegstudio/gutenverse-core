import { __ } from '@wordpress/i18n';
import { handleBorderV2 } from 'gutenverse-core/styling';
import { BorderControl } from 'gutenverse-core/controls';

export const avatarPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'avatarBorderResponsive',
            label: __('Avatar Border', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .comment-author img.avatar`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
    ];
};

