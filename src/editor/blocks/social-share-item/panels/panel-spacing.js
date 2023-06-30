import { __ } from '@wordpress/i18n';
import { DimensionControl } from 'gutenverse-core/controls';
import { handleDimension } from 'gutenverse-core/controls';

export const panelSpacing = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'iconPading',
            label: __('Icon Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                '%': {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.editor-styles-wrapper #${elementId}.gutenverse-share-item .gutenverse-share-icon`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'textPading',
            label: __('Text Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                '%': {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.editor-styles-wrapper #${elementId}.gutenverse-share-item .gutenverse-share-text`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
    ];
};