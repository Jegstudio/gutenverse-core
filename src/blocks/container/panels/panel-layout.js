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
    IconAlignItemsCenter,
    IconAlignItemsEnd,
    IconAlignItemsStart,
    IconAlignItemsStretch,
    IconJustifyContentCenter,
    IconJustifyContentEnd,
    IconJustifyContentSpaceAround,
    IconJustifyContentSpaceBetween,
    IconJustifyContentSpaceEvenly,
    IconJustifyContentStart,
    IconNoWrap,
    IconWrap,
    IconColumnJustifyStart,
    IconColumnJustifyContentCenter,
    IconColumnJustifyContentEnd,
    IconColumnJustifySpaceBetween,
    IconColumnJustifySpaceAround,
    IconColumnJustifySpaceEvently,
    IconColumnAlignItemsStretch,
    IconColumnAlignItemsStart,
    IconColumnAlignItemsCenter,
    IconColumnAlignItemsEnd,
} from '../icons';
import isEmpty from 'lodash/isEmpty';

const flexAlignItem = (direction) => {
    switch (direction) {
        case 'row':
            return [
                {
                    tooltips: __('Start', 'gutenverse'),
                    value: 'flex-start',
                    svg: <IconAlignItemsStart />
                },
                {
                    tooltips: __('Center', 'gutenverse'),
                    value: 'center',
                    svg: <IconAlignItemsCenter />
                },
                {
                    tooltips: __('End', 'gutenverse'),
                    value: 'flex-end',
                    svg: <IconAlignItemsEnd />
                },
                {
                    tooltips: __('Stretch', 'gutenverse'),
                    value: 'stretch',
                    svg: <IconAlignItemsStretch />
                },
            ];
        case 'column':
            return [
                {
                    tooltips: __('Start', 'gutenverse'),
                    value: 'flex-start',
                    svg: <IconColumnAlignItemsStart />
                },
                {
                    tooltips: __('Center', 'gutenverse'),
                    value: 'center',
                    svg: <IconColumnAlignItemsCenter />
                },
                {
                    tooltips: __('End', 'gutenverse'),
                    value: 'flex-end',
                    svg: <IconColumnAlignItemsEnd />
                },
                {
                    tooltips: __('Stretch', 'gutenverse'),
                    value: 'stretch',
                    svg: <IconColumnAlignItemsStretch />
                },
            ];
        case 'row-reverse':
            return [
                {
                    tooltips: __('Start', 'gutenverse'),
                    value: 'flex-start',
                    svg: <IconAlignItemsStart />
                },
                {
                    tooltips: __('Center', 'gutenverse'),
                    value: 'center',
                    svg: <IconAlignItemsCenter />
                },
                {
                    tooltips: __('End', 'gutenverse'),
                    value: 'flex-end',
                    svg: <IconAlignItemsEnd />
                },
                {
                    tooltips: __('Stretch', 'gutenverse'),
                    value: 'stretch',
                    svg: <IconAlignItemsStretch />
                },
            ];
        case 'column-reverse':
            return [
                {
                    tooltips: __('Start', 'gutenverse'),
                    value: 'flex-start',
                    svg: <IconAlignItemsStart />
                },
                {
                    tooltips: __('Center', 'gutenverse'),
                    value: 'center',
                    svg: <IconAlignItemsCenter />
                },
                {
                    tooltips: __('End', 'gutenverse'),
                    value: 'flex-end',
                    svg: <IconAlignItemsEnd />
                },
                {
                    tooltips: __('Stretch', 'gutenverse'),
                    value: 'stretch',
                    svg: <IconAlignItemsStretch />
                },
            ];
    }
};

const flexJustifyContent = (direction) => {
    switch (direction) {
        case 'row':
            return [
                {
                    tooltips: __('Start', 'gutenverse'),
                    value: 'flex-start',
                    svg: <IconJustifyContentStart />
                },
                {
                    tooltips: __('Center', 'gutenverse'),
                    value: 'center',
                    svg: <IconJustifyContentCenter />
                },
                {
                    tooltips: __('End', 'gutenverse'),
                    value: 'flex-end',
                    svg: <IconJustifyContentEnd />
                },
                {
                    tooltips: __('Space Between', 'gutenverse'),
                    value: 'space-between',
                    svg: <IconJustifyContentSpaceBetween />
                },
                {
                    tooltips: __('Space Around', 'gutenverse'),
                    value: 'space-around',
                    svg: <IconJustifyContentSpaceAround />
                },
                {
                    tooltips: __('Space Evenly', 'gutenverse'),
                    value: 'space-evenly',
                    svg: <IconJustifyContentSpaceEvenly />
                },
            ];
        case 'column':
            return [
                {
                    tooltips: __('Start', 'gutenverse'),
                    value: 'flex-start',
                    svg: <IconColumnJustifyStart />
                },
                {
                    tooltips: __('Center', 'gutenverse'),
                    value: 'center',
                    svg: <IconColumnJustifyContentCenter />
                },
                {
                    tooltips: __('End', 'gutenverse'),
                    value: 'flex-end',
                    svg: <IconColumnJustifyContentEnd />
                },
                {
                    tooltips: __('Space Between', 'gutenverse'),
                    value: 'space-between',
                    svg: <IconColumnJustifySpaceBetween />
                },
                {
                    tooltips: __('Space Around', 'gutenverse'),
                    value: 'space-around',
                    svg: <IconColumnJustifySpaceAround />
                },
                {
                    tooltips: __('Space Evenly', 'gutenverse'),
                    value: 'space-evenly',
                    svg: <IconColumnJustifySpaceEvently />
                },
            ];
        case 'row-reverse':
            return [
                {
                    tooltips: __('Start', 'gutenverse'),
                    value: 'flex-start',
                    svg: <IconJustifyContentEnd />
                },
                {
                    tooltips: __('Center', 'gutenverse'),
                    value: 'center',
                    svg: <IconJustifyContentCenter />
                },
                {
                    tooltips: __('End', 'gutenverse'),
                    value: 'flex-end',
                    svg: <IconJustifyContentStart />
                },
                {
                    tooltips: __('Space Between', 'gutenverse'),
                    value: 'space-between',
                    svg: <IconJustifyContentSpaceBetween />
                },
                {
                    tooltips: __('Space Around', 'gutenverse'),
                    value: 'space-around',
                    svg: <IconJustifyContentSpaceAround />
                },
                {
                    tooltips: __('Space Evenly', 'gutenverse'),
                    value: 'space-evenly',
                    svg: <IconJustifyContentSpaceEvenly />
                },
            ];
        case 'column-reverse':
            return [
                {
                    tooltips: __('Start', 'gutenverse'),
                    value: 'flex-start',
                    svg: <IconColumnJustifyContentEnd />
                },
                {
                    tooltips: __('Center', 'gutenverse'),
                    value: 'center',
                    svg: <IconColumnJustifyContentCenter />
                },
                {
                    tooltips: __('End', 'gutenverse'),
                    value: 'flex-end',
                    svg: <IconColumnJustifyStart />
                },
                {
                    tooltips: __('Space Between', 'gutenverse'),
                    value: 'space-between',
                    svg: <IconColumnJustifySpaceBetween />
                },
                {
                    tooltips: __('Space Around', 'gutenverse'),
                    value: 'space-around',
                    svg: <IconColumnJustifySpaceAround />
                },
                {
                    tooltips: __('Space Evenly', 'gutenverse'),
                    value: 'space-evenly',
                    svg: <IconColumnJustifySpaceEvently />
                },
            ];
    }
};

export const layoutPanel = (props) => {
    const {
        elementId,
        flexWrap = {},
        flexDirection = {},
        containerLayout
    } = props;

    const deviceType = getDeviceType();
    const isWrapEnabled = flexWrap[deviceType] === 'wrap';
    const selector = `.guten-flex-container.${elementId}`;
    const direction = !isEmpty(flexDirection[deviceType]) ? flexDirection[deviceType] : 'row';

    return [
        {
            id: 'containerLayout',
            label: __('Container Layout', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Boxed', 'gutenverse'),
                    value: 'boxed'
                },
                {
                    label: __('Full Width', 'gutenverse'),
                    value: 'full-width'
                },
            ],
        },
        {
            id: 'containerWidth',
            label: __('Container Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 0,
                    max: 2800,
                    step: 1
                },
                '%': {
                    text: '%',
                    min: 0,
                    max: 100,
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
                    'selector': containerLayout === 'full-width' ? selector : `${selector} > .guten-container-resizeable > .guten-inner-container`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'minHeight',
            label: __('Min Height', 'gutenverse'),
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
            label: __('Items', 'gutenverse'),
        },
        {
            id: 'flexDirection',
            label: __('Direction', 'gutenverse'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    tooltips: __('Row', 'gutenverse'),
                    value: 'row',
                    svg: <IconDirectionRow />
                },
                {
                    tooltips: __('Column', 'gutenverse'),
                    value: 'column',
                    svg: <IconDirectionColumn />
                },
                {
                    tooltips: __('Row Reverse', 'gutenverse'),
                    value: 'row-reverse',
                    svg: <IconDirectionRowReversed />
                },
                {
                    tooltips: __('Column Reverse', 'gutenverse'),
                    value: 'column-reverse',
                    svg: <IconDirectionColumnReversed />
                },
            ]
        },
        {
            id: 'justifyContent',
            label: __('Justify Content', 'gutenverse'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: flexJustifyContent(direction)
        },
        {
            id: 'alignItems',
            label: __('Align Items', 'gutenverse'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: flexAlignItem(direction)
        },
        {
            id: 'columnGap',
            label: __('Column Gap', 'gutenverse'),
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
            label: __('Row Gap', 'gutenverse'),
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
            label: __('Wrap', 'gutenverse'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    tooltips: __('No Wrap', 'gutenverse'),
                    value: 'nowrap',
                    svg: <IconNoWrap />
                },
                {
                    tooltips: __('Wrap', 'gutenverse'),
                    value: 'wrap',
                    svg: <IconWrap />
                },
            ]
        },
        {
            id: 'alignContent',
            label: __('Align Content', 'gutenverse'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            show: isWrapEnabled,
            options: [
                {
                    tooltips: __('Start', 'gutenverse'),
                    value: 'flex-start',
                    svg: <IconAlignContentStart />
                },
                {
                    tooltips: __('Center', 'gutenverse'),
                    value: 'center',
                    svg: <IconAlignContentMiddle />
                },
                {
                    tooltips: __('End', 'gutenverse'),
                    value: 'flex-end',
                    svg: <IconAlignContentEnd />
                },
                {
                    tooltips: __('Space Between', 'gutenverse'),
                    value: 'space-between',
                    svg: <IconAlignContentSpaceBetween />
                },
                {
                    tooltips: __('Space Around', 'gutenverse'),
                    value: 'space-around',
                    svg: <IconAlignContentSpaceAround />
                },
                {
                    tooltips: __('Space Evenly', 'gutenverse'),
                    value: 'space-evenly',
                    svg: <IconAlignContentSpaceEvenly />
                },
            ]
        },
        {
            id: 'advancedHeading',
            component: HeadingControl,
            label: __('Others', 'gutenverse'),
        },
        {
            id: 'overflow',
            label: __('Overflow', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Default', 'gutenverse'),
                    value: 'visible'
                },
                {
                    label: __('Hidden', 'gutenverse'),
                    value: 'hidden'
                },
                {
                    label: __('Scroll', 'gutenverse'),
                    value: 'scroll'
                },
                {
                    label: __('Auto', 'gutenverse'),
                    value: 'auto'
                },
            ]
        },
    ];
};
