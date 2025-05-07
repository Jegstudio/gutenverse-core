import { __ } from '@wordpress/i18n';
import { handleBorder, handleBorderResponsive, handleDimension } from 'gutenverse-core/styling';
import { BorderControl, BorderResponsiveControl, DimensionControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const avatarPanel = (props) => {
    const {
        elementId
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'avatarMargin',
            label: __('Avatar Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'avatarBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: {
                'type': 'border',
                'id': 'avatarBorder',
                'selector': `.${elementId} .comment-author img.avatar`,
            }
        },
        {
            id: 'avatarBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'borderResponsive',
                'id': 'avatarBorderResponsive',
                'selector': `.${elementId} .comment-author img.avatar`,
            }
        },
    ];
};

