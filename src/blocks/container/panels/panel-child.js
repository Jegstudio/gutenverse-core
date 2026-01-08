import { __ } from '@wordpress/i18n';
import { NumberControl, SVGRadioControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import {
    IconAlignSelfStart,
    IconAlignSelfCenter,
    IconAlignSelfEnd,
    IconAlignSelfStretch,
    IconOrderStart,
    IconOrderEnd,
    IconOrderDot,
    IconSizeInitial,
    IconSizeGrow,
    IconSizeShrink,
    IconSizeDot
} from '../icons';

export const childPanel = (props) => {
    const {
        flexOrder = {},
        flexSize = {},
    } = props;

    const deviceType = getDeviceType();
    const isOrderCustom = flexOrder[deviceType] === 'custom';
    const isSizeCustom = flexSize[deviceType] === 'custom';

    return [
        {
            id: 'flexAlignSelf',
            label: __('Align Self', '--gctd--'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    tooltips: __('Start', '--gctd--'),
                    value: 'flex-start',
                    svg: <IconAlignSelfStart />
                },
                {
                    tooltips: __('Center', '--gctd--'),
                    value: 'center',
                    svg: <IconAlignSelfCenter />
                },
                {
                    tooltips: __('End', '--gctd--'),
                    value: 'flex-end',
                    svg: <IconAlignSelfEnd />
                },
                {
                    tooltips: __('Stretch', '--gctd--'),
                    value: 'stretch',
                    svg: <IconAlignSelfStretch />
                },
            ]
        },
        {
            id: 'flexOrder',
            label: __('Order', '--gctd--'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    tooltips: __('Start', '--gctd--'),
                    value: 'start',
                    svg: <IconOrderStart />
                },
                {
                    tooltips: __('End', '--gctd--'),
                    value: 'end',
                    svg: <IconOrderEnd />
                },
                {
                    tooltips: __('Custom', '--gctd--'),
                    value: 'custom',
                    svg: <IconOrderDot />
                },
            ]
        },
        {
            id: 'flexCustomOrder',
            label: __('Custom Order', '--gctd--'),
            allowDeviceControl: true,
            component: NumberControl,
            show: isOrderCustom,
            step: 1
        },
        {
            id: 'flexSize',
            label: __('Size', '--gctd--'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    tooltips: __('None', '--gctd--'),
                    value: 'none',
                    svg: <IconSizeInitial />
                },
                {
                    tooltips: __('Grow', '--gctd--'),
                    value: 'grow',
                    svg: <IconSizeGrow />
                },
                {
                    tooltips: __('Shrink', '--gctd--'),
                    value: 'shirnk',
                    svg: <IconSizeShrink />
                },
                {
                    tooltips: __('Custom', '--gctd--'),
                    value: 'custom',
                    svg: <IconSizeDot />
                },
            ]
        },
        {
            id: 'flexSizeGrow',
            label: __('Flex Grow', '--gctd--'),
            allowDeviceControl: true,
            component: NumberControl,
            show: isSizeCustom,
            min: 0,
            step: 1
        },
        {
            id: 'flexSizeShrink',
            label: __('Flex Shrink', '--gctd--'),
            allowDeviceControl: true,
            component: NumberControl,
            show: isSizeCustom,
            min: 0,
            step: 1
        },
    ];
};
