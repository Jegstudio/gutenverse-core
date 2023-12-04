import { __ } from '@wordpress/i18n';
import { handleBorderResponsive } from 'gutenverse-core/styling';
import { BorderControl } from 'gutenverse-core/controls';

export const avatarPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'avatarBorder_v2',
            label: __('Avatar Border', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .comment-author img.avatar`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
    ];
};

