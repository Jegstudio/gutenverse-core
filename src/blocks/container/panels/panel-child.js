import { __ } from '@wordpress/i18n';
import { SVGRadioControl, TextControl } from 'gutenverse-core/controls';
import { IconDirectionColumn, IconDirectionColumnReversed, IconDirectionRow, IconDirectionRowReversed } from '../icons';

export const childPanel = (props) => {
    return [
        {
            id: 'alignSelf',
            label: __('Align Self', '--gctd--'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    tooltips: __('Start', '--gctd--'),
                    value: 'flex-start',
                    svg: <IconDirectionRow />
                },
                {
                    tooltips: __('Center', '--gctd--'),
                    value: 'center',
                    svg: <IconDirectionColumn />
                },
                {
                    tooltips: __('End', '--gctd--'),
                    value: 'flex-end',
                    svg: <IconDirectionRowReversed />
                },
                {
                    tooltips: __('Stretch', '--gctd--'),
                    value: 'stretch',
                    svg: <IconDirectionColumnReversed />
                },
            ]
        },
        {
            id: 'order',
            label: __('Order', '--gctd--'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    tooltips: __('Start', '--gctd--'),
                    value: '-9999',
                    svg: <IconDirectionRow />
                },
                {
                    tooltips: __('End', '--gctd--'),
                    value: '9999',
                    svg: <IconDirectionColumn />
                },
                {
                    tooltips: __('Custom', '--gctd--'),
                    value: '',
                    svg: <IconDirectionRowReversed />
                },
            ]
        },
        {
            id: 'customOrder',
            label: __('Custom Order', '--gctd--'),
            allowDeviceControl: true,
            component: TextControl,
        },
    ];
};
