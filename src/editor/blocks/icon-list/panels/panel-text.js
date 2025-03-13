import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, TypographyControl } from 'gutenverse-core/controls';

export const panelText = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'textColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textColor',
                    'selector': `.${elementId} .guten-icon-list-item .list-text`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'textColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textColorHover',
                    'selector': `.${elementId} .guten-icon-list-item:hover .list-text`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'textIndent',
            label: __('Text Indent', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 50,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'textIndent',
                    'responsive': true,
                    'selector': `.${elementId} .guten-icon-list-item a, .block-editor-block-list__layout .wp-block.${elementId} .guten-icon-list-item a`,
                    'properties': [
                        {
                            'name': 'gap',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'textTypography',
            label: __('Text Typography', 'gutenverse'),
            component: TypographyControl,
        },
    ];
};

