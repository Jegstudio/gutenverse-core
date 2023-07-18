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
            style: [
                {
                    selector: `.${elementId}.gutenverse-maps iframe`,
                    allowRender: props => props !== undefined,
                    render: ({ brightness, contrast, blur, saturation, hue }) => {
                        return `filter: 
                            brightness( ${!isEmptyString(brightness) ? brightness : 100}% )
                            contrast( ${!isEmptyString(contrast) ? contrast : 100}% )
                            saturate( ${!isEmptyString(saturation) ? saturation : 100}% )
                            blur( ${!isEmptyString(blur) ? blur : 0}px )
                            hue-rotate( ${!isEmptyString(hue) ? hue : 0}deg );`;
                    }
                }
            ]
        },
        {
            id: 'mapFilterHover',
            show: __mapHover === 'hover',
            label: __('Map Hover Filter', 'gutenverse'),
            component: ImageFilterControl,
            style: [
                {
                    selector: `.${elementId}.gutenverse-maps iframe:hover`,
                    allowRender: props => props !== undefined,
                    render: ({ brightness, contrast, blur, saturation, hue }) => {
                        return `filter: 
                            brightness( ${!isEmptyString(brightness) ? brightness : 100}% )
                            contrast( ${!isEmptyString(contrast) ? contrast : 100}% )
                            saturate( ${!isEmptyString(saturation) ? saturation : 100}% )
                            blur( ${!isEmptyString(blur) ? blur : 0}px )
                            hue-rotate( ${!isEmptyString(hue) ? hue : 0}deg );`;
                    }
                }
            ]
        },
    ];
};