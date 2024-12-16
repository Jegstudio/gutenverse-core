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
            style: [
                {
                    selector: `.${elementId} .comment-author img.avatar`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'avatarBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .comment-author img.avatar`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'avatarBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .comment-author img.avatar`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
    ];
};

