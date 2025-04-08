import { __ } from '@wordpress/i18n';
import { BackgroundControl, BoxShadowControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleDimension } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const thumbnailContainerPanel = ({elementId}) => {
    return [
        {
            id: 'thumbnailHeight',
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 1000,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-thumb .thumbnail-container`,
                    render: value => `height: ${value}px; padding-bottom: 0;`
                }
            ]
        },
        {
            id: 'thumbnailContainerBackground',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-thumb .thumbnail-container`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'thumbnailRadius',
            label: __('Border Radius', 'gutenverse'),
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
            },
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-thumb .thumbnail-container`,
                    render: value => handleDimension(value, 'border-radius', false)
                }
            ]
        },
        {
            id: 'thumbnailContainerShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-thumb .thumbnail-container`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};