import { __ } from '@wordpress/i18n';
import { CheckboxControl, RangeControl, SelectControl, SizeControl } from 'gutenverse-core/controls';
import { sectionLayoutControls } from '../components/section-layout-toolbar';
import { handleUnitPoint } from 'gutenverse-core/styling';
import { getDeviceType } from 'gutenverse-core/editor-helper';

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
            label: __('Content Width', '--gctd--'),
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
            label: __('Container Width', '--gctd--'),
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
            label: __('Wrap Column 100%', '--gctd--'),
            description: __('If the current wrap is unchecked, it will use the higher resolution\'s wrap value.', '--gctd--'),
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
            label: __('Column Gap', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    label: __('Default', '--gctd--'),
                    value: 'default'
                },
                {
                    label: __('No gap', '--gctd--'),
                    value: 'no'
                },
                {
                    label: __('Narrow', '--gctd--'),
                    value: 'narrow'
                },
                {
                    label: __('Extended', '--gctd--'),
                    value: 'extended'
                },
                {
                    label: __('Wide', '--gctd--'),
                    value: 'wide'
                },
                {
                    label: __('Wider', '--gctd--'),
                    value: 'wider'
                }
            ],
        },
        {
            id: 'heightControl',
            label: __('Height', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    label: __('Default', '--gctd--'),
                    value: 'default'
                },
                {
                    label: __('Minimum Height', '--gctd--'),
                    value: 'min'
                },
                {
                    label: __('Fit Screen', '--gctd--'),
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
            label: __('Minimum Height', '--gctd--'),
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
            label: __('Column Position', '--gctd--'),
            show: ['fit', 'min'].includes(heightControl),
            component: SelectControl,
            options: [
                {
                    label: __('Stretch', '--gctd--'),
                    value: 'stretch'
                },
                {
                    label: __('Top', '--gctd--'),
                    value: 'top'
                },
                {
                    label: __('Middle', '--gctd--'),
                    value: 'middle'
                },
                {
                    label: __('Bottom', '--gctd--'),
                    value: 'bottom'
                },
            ],
        },
        {
            id: 'verticalAlign',
            label: __('Vertical Align', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    label: ('Default', '--gctd--'),
                    value: 'default'
                },
                {
                    label: ('Top', '--gctd--'),
                    value: 'flex-start'
                },
                {
                    label: ('Middle', '--gctd--'),
                    value: 'center'
                },
                {
                    label: ('Bottom', '--gctd--'),
                    value: 'flex-end'
                },
                {
                    label: ('Space Between', '--gctd--'),
                    value: 'space-between'
                },
                {
                    label: ('Space Around', '--gctd--'),
                    value: 'space-around'
                },
                {
                    label: ('Space Evenly', '--gctd--'),
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
            label: __('Overflow', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    label: ('Default', '--gctd--'),
                    value: 'none'
                },
                {
                    label: ('Hidden', '--gctd--'),
                    value: 'hidden'
                },
                {
                    label: ('Auto', '--gctd--'),
                    value: 'auto'
                },
            ],
        },
    ];
};