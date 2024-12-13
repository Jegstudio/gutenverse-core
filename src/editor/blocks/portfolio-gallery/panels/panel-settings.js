import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconControl, RangeControl, SelectControl, SizeControl, TextControl } from 'gutenverse-core/controls';
import { handleUnitPoint } from 'gutenverse-core/styling';

export const settingsPanel = (props) => {
    const {
        elementId,
        showLink,
    } = props;
    return [
        {
            id: 'behavior',
            label: __('Active Behavior', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'onhover',
                    label: __('On Hover')
                },
                {
                    value: 'onClick',
                    label: __('On Click')
                }
            ]
        },
        {
            id: 'rowHeight',
            label: __('Row Height', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .content-items .row-item`,
                    allowRender: () => true,
                    render: value => handleUnitPoint(value, 'height')
                }
            ]
        },
        {
            id: 'column',
            label: __('Column', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 10,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .content-items .row-item`,
                    allowRender: () => true,
                    render: value => `flex: calc(100% / ${value}); max-width: calc(100% / ${value});`
                }
            ]
        },
        {
            id: 'reversePosition',
            label: __('Reverse Position', 'gutenverse'),
            component: CheckboxControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .content-items .row-item`,
                    allowRender: value => value,
                    render: value => 'flex-direction: column-reverse;'
                }
            ]
        },
        {
            id: 'showLink',
            label: __('Show Link', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'linkText',
            show: showLink,
            label: __('Link Text', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'linkIcon',
            show: showLink,
            label: __('Link Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'linkIconPosition',
            show: showLink,
            label: __('Link Icon Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'row',
                    label: __('Left')
                },
                {
                    value: 'row-reverse',
                    label: __('Right')
                }
            ],
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .content-items .row-item .row-link-wrapper a`,
                    allowRender: value => value,
                    render: value => `flex-direction: ${value};`
                }
            ]
        }
    ];
};