import { __ } from '@wordpress/i18n';
import { ImageFilterControl, SwitchControl } from 'gutenverse-core/controls';
import { isEmptyString } from 'gutenverse-core/helper';

export const panelStyle = (props) => {
    const {elementId, __mapHover} = props;

    return [
        {
            id: '__mapHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
        },
        {
            id: 'mapFilter',
            show: !__mapHover || __mapHover === 'normal',
            label: __('Map Filter', 'gutenverse'),
            component: ImageFilterControl,
        },
        {
            id: 'mapFilterHover',
            show: __mapHover === 'hover',
            label: __('Map Hover Filter', 'gutenverse'),
            component: ImageFilterControl,
        },
    ];
};