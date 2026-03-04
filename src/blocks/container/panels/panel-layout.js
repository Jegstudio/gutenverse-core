import { __ } from '@wordpress/i18n';
import { HeadingControl, SelectControl, SizeControl, SVGRadioControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import {
    IconDirectionColumnReversed,
    IconDirectionColumn,
    IconDirectionRowReversed,
    IconDirectionRow,
    IconAlignContentEnd,
    IconAlignContentMiddle,
    IconAlignContentSpaceAround,
    IconAlignContentSpaceBetween,
    IconAlignContentSpaceEvenly,
    IconAlignContentStart,
    IconNoWrap,
    IconWrap,
} from '../icons';
import isEmpty from 'lodash/isEmpty';
import { flexAlignItem, flexJustifyContent } from 'gutenverse-core/helper';

export const layoutPanel = (props) => {
    const {
        elementId,
        flexWrap = {},
        flexDirection = {},
        containerLayout,
        containerWidth: oldContainerWidth,
        setAttributes,
        transientState,
        setTransientState
    } = props;

    const deviceType = getDeviceType();
    const isWrapEnabled = flexWrap[deviceType] === 'wrap';
    const selector = `.guten-flex-container-editor.${elementId}`;
    const direction = !isEmpty(flexDirection[deviceType]) ? flexDirection[deviceType] : 'row';

    return [
        {
            id: 'containerLayout',
            label: __('Container Layout', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    label: __('Boxed', '--gctd--'),
                    value: 'boxed'
                },
                {
                    label: __('Full Width', '--gctd--'),
                    value: 'full-width'
                },
            ],
            onChange: ({ containerLayout: newLayout }) => {
                const savedWidth = transientState?.[newLayout];

                if (setTransientState) {
                    setTransientState((prev) => ({
                        ...prev,
                        [containerLayout]: oldContainerWidth
                    }));
                }

                if (savedWidth) {
                    // Restore saved width for this layout
                    setAttributes({
                        containerWidth: savedWidth
                    });
                } else {
                    // Set defaults while preserving other device values
                    const defaultWidth = 'full-width' === newLayout
                        ? { unit: '%', point: '100' }
                        : { unit: 'px', point: '1200' };

                    setAttributes({
                        containerWidth: {
                            ...(oldContainerWidth || {}),
                            Desktop: defaultWidth
                        }
                    });
                }
            }
        },
        {
            id: 'containerWidth',
            label: __('Container Width', '--gctd--'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                '%': {
                    text: '%',
                    min: 0,
                    max: 100,
                    step: 1
                },
                px: {
                    text: 'px',
                    min: 0,
                    max: 2800,
                    step: 1
                },
                vw: {
                    text: 'vw',
                    min: 0,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'containerWidth',
                    'responsive': true,
                    'selector': {
                        'Desktop': containerLayout === 'full-width' ? selector : `${selector} > div > .guten-inner-container-editor`,
                        'Tablet': containerLayout === 'full-width' ? selector : `${selector} > div > .guten-inner-container-editor`,
                        'Mobile': containerLayout === 'full-width' ? `.guten-flex-container-editor > div > .guten-inner-container-editor > ${selector}` : `${selector} > div > .guten-inner-container-editor`,
                    },
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'function',
                            'functionName': 'handleContainerWidth'
                        }
                    ],
                }
            ],
            onChange: ({ containerWidth }) => {
                const { unit } = (containerWidth[deviceType]);
                const { unit: oldUnit } = oldContainerWidth[deviceType] || {};
                let point = null;
                let updatedWidth = containerWidth;

                if (unit !== oldUnit) {
                    switch (unit) {
                        case 'px':
                            point = 1200;
                            break;
                        case '%':
                            point = 100;
                            break;
                        case 'vw':
                            point = 100;
                            break;
                    }

                    updatedWidth = {
                        ...containerWidth,
                        [deviceType]: {
                            unit,
                            point
                        }
                    };

                    setAttributes({
                        containerWidth: updatedWidth
                    });
                }

                // Save to history for current layout
                if (setTransientState) {
                    setTransientState((prev) => ({
                        ...prev,
                        [containerLayout]: updatedWidth
                    }));
                }
            }
        },
        {
            id: 'minHeight',
            label: __('Min Height', '--gctd--'),
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
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'minHeight',
                    'responsive': true,
                    'selector': selector,
                    'properties': [
                        {
                            'name': 'min-height',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'itemsHeading',
            component: HeadingControl,
            label: __('Items', '--gctd--'),
        },
        {
            id: 'flexDirection',
            label: __('Direction', '--gctd--'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    tooltips: __('Row', '--gctd--'),
                    value: 'row',
                    svg: <IconDirectionRow />
                },
                {
                    tooltips: __('Column', '--gctd--'),
                    value: 'column',
                    svg: <IconDirectionColumn />
                },
                {
                    tooltips: __('Row Reverse', '--gctd--'),
                    value: 'row-reverse',
                    svg: <IconDirectionRowReversed />
                },
                {
                    tooltips: __('Column Reverse', '--gctd--'),
                    value: 'column-reverse',
                    svg: <IconDirectionColumnReversed />
                },
            ]
        },
        {
            id: 'justifyContent',
            label: __('Justify Content', '--gctd--'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: flexJustifyContent(direction)
        },
        {
            id: 'alignItems',
            label: __('Align Items', '--gctd--'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: flexAlignItem(direction)
        },
        {
            id: 'columnGap',
            label: __('Column Gap', '--gctd--'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 0,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0,
                    max: 10,
                    step: 0.1
                },
                '%': {
                    text: '%',
                    min: 0,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'columnGap',
                    'responsive': true,
                    'selector': selector,
                    'properties': [
                        {
                            'name': 'column-gap',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'rowGap',
            label: __('Row Gap', '--gctd--'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 0,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0,
                    max: 10,
                    step: 0.1
                },
                '%': {
                    text: '%',
                    min: 0,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'rowGap',
                    'responsive': true,
                    'selector': selector,
                    'properties': [
                        {
                            'name': 'row-gap',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'flexWrap',
            label: __('Wrap', '--gctd--'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            description: __('Items within the container can stay in a single line (No wrap), or break into multiple lines (Wrap).', '--gctd--'),
            options: [
                {
                    tooltips: __('No Wrap', '--gctd--'),
                    value: 'nowrap',
                    svg: <IconNoWrap />
                },
                {
                    tooltips: __('Wrap', '--gctd--'),
                    value: 'wrap',
                    svg: <IconWrap />
                },
            ]
        },
        {
            id: 'alignContent',
            label: __('Align Content', '--gctd--'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            show: isWrapEnabled,
            options: [
                {
                    tooltips: __('Start', '--gctd--'),
                    value: 'flex-start',
                    svg: <IconAlignContentStart />
                },
                {
                    tooltips: __('Center', '--gctd--'),
                    value: 'center',
                    svg: <IconAlignContentMiddle />
                },
                {
                    tooltips: __('End', '--gctd--'),
                    value: 'flex-end',
                    svg: <IconAlignContentEnd />
                },
                {
                    tooltips: __('Space Between', '--gctd--'),
                    value: 'space-between',
                    svg: <IconAlignContentSpaceBetween />
                },
                {
                    tooltips: __('Space Around', '--gctd--'),
                    value: 'space-around',
                    svg: <IconAlignContentSpaceAround />
                },
                {
                    tooltips: __('Space Evenly', '--gctd--'),
                    value: 'space-evenly',
                    svg: <IconAlignContentSpaceEvenly />
                },
            ]
        },
        {
            id: 'advancedHeading',
            component: HeadingControl,
            label: __('Additional Options', '--gctd--'),
        },
        {
            id: 'overflow',
            label: __('Overflow', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    label: __('Default', '--gctd--'),
                    value: 'visible'
                },
                {
                    label: __('Hidden', '--gctd--'),
                    value: 'hidden'
                },
                {
                    label: __('Scroll', '--gctd--'),
                    value: 'scroll'
                },
                {
                    label: __('Auto', '--gctd--'),
                    value: 'auto'
                },
            ]
        },
    ];
};
