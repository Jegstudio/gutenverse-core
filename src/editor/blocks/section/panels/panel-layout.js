import { __ } from '@wordpress/i18n';
import { CheckboxControl, RangeControl, SelectControl, SizeControl } from 'gutenverse-core-editor/controls';
import { sectionLayoutControls } from '../components/section-layout-toolbar';
import { handleUnitPoint } from 'gutenverse-core-editor/controls';
import { getDeviceType } from 'gutenverse-core-editor/helper';

export const layoutPanel = (props) => {
    const {
        width,
        elementId,
        layout,
        height,
        heightControl,
    } = props;

    const layoutControls = Object.keys(sectionLayoutControls).map(key => {
        return {
            label: sectionLayoutControls[key].title,
            value: key
        };
    });

    const deviceType = getDeviceType();

    return [
        {
            id: 'layout',
            label: __('Content Width', 'gutenverse'),
            component: SelectControl,
            options: layoutControls,
            style: [
                {
                    selector: `section.guten-section.${elementId}.layout-boxed > .guten-container`,
                    updateID: 'width-style-0',
                    allowRender: value => value === 'boxed',
                    render: () => `max-width: ${width[deviceType]}px;`
                }
            ]
        },
        {
            id: 'width',
            label: __('Container Width', 'gutenverse'),
            show: layout === 'boxed',
            component: RangeControl,
            min: 500,
            max: 1600,
            allowDeviceControl: true,
            style: [
                {
                    selector: `section.guten-section.${elementId}.layout-boxed > .guten-container`,
                    allowRender: () => layout === 'boxed',
                    render: value => `max-width: ${value}px;`
                }
            ]
        },
        {
            id: 'wrapColumn',
            label: __('Wrap Column 100%', 'gutenverse'),
            description: __('If the current wrap is unchecked, it will use the higher resolution\'s wrap value.', 'gutenverse'),
            allowDeviceControl: true,
            component: CheckboxControl,
            style: [
                {
                    selector: `.${elementId} > .guten-container`,
                    render: () => 'flex-wrap: wrap;'
                },
                {
                    selector: `.${elementId} > .guten-container > .guten-column`,
                    render: () => 'width: 100%;'
                }
            ]
        },
        {
            id: 'gap',
            label: __('Column Gap', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Default'),
                    value: 'default'
                },
                {
                    label: __('No gap'),
                    value: 'no'
                },
                {
                    label: __('Narrow'),
                    value: 'narrow'
                },
                {
                    label: __('Extended'),
                    value: 'extended'
                },
                {
                    label: __('Wide'),
                    value: 'wide'
                },
                {
                    label: __('Wider'),
                    value: 'wider'
                }
            ],
        },
        {
            id: 'heightControl',
            label: __('Height', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Default'),
                    value: 'default'
                },
                {
                    label: __('Minimum Height'),
                    value: 'min'
                },
                {
                    label: __('Fit Screen'),
                    value: 'fit'
                },
            ],
            style: [
                {
                    selector: `.${elementId}`,
                    allowRender: value => value && value === 'fit',
                    render: () => 'height: 100vh;'
                },
                {
                    selector: `.${elementId} > .guten-container`,
                    allowRender: value => value && value === 'fit',
                    render: () => 'height: 100%;'
                },
                {
                    selector: `.${elementId} > .guten-container`,
                    allowRender: value => value && value === 'min',
                    updateID: 'height-style-0',
                    render: () => handleUnitPoint(height, 'min-height')
                },
            ]
        },
        {
            id: 'height',
            label: __('Minimum Height', 'gutenverse'),
            show: heightControl === 'min',
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 58,
                    max: 1440,
                    step: 1
                },
                vh: {
                    text: 'vh',
                    min: 5,
                    max: 100,
                    step: 1
                },
                vw: {
                    text: 'vw',
                    min: 5,
                    max: 100,
                    step: 1
                },
            },
            style: [
                {
                    selector: `.${elementId} > .guten-container`,
                    allowRender: () => heightControl && heightControl === 'min',
                    render: value => handleUnitPoint(value, 'min-height')
                },
            ]
        },
        {
            id: 'align',
            label: __('Column Position', 'gutenverse'),
            show: ['fit', 'min'].includes(heightControl),
            component: SelectControl,
            options: [
                {
                    label: 'Stretch',
                    value: 'stretch'
                },
                {
                    label: 'Top',
                    value: 'top'
                },
                {
                    label: 'Middle',
                    value: 'middle'
                },
                {
                    label: 'Bottom',
                    value: 'bottom'
                },
            ],
        },
        {
            id: 'verticalAlign',
            label: __('Vertical Align', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'Default',
                    value: 'default'
                },
                {
                    label: 'Top',
                    value: 'flex-start'
                },
                {
                    label: 'Middle',
                    value: 'center'
                },
                {
                    label: 'Bottom',
                    value: 'flex-end'
                },
                {
                    label: 'Space Between',
                    value: 'space-between'
                },
                {
                    label: 'Space Around',
                    value: 'space-around'
                },
                {
                    label: 'Space Evenly',
                    value: 'space-evenly'
                },
            ],
            style: [
                {
                    selector: `section.guten-element.${elementId} > .guten-container`,
                    allowRender: value => value && value !== 'default',
                    render: value => {
                        if (value === 'default') {
                            return null;
                        } else {
                            return `align-content: ${value}; align-items: ${value};`;
                        }
                    }
                }
            ]
        },
        {
            id: 'overflow',
            label: __('Overflow', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'Default',
                    value: 'none'
                },
                {
                    label: 'Hidden',
                    value: 'hidden'
                },
                {
                    label: 'Auto',
                    value: 'auto'
                },
            ],
        },
    ];
};