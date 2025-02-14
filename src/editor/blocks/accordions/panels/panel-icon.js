import { SelectControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { RangeControl } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';

export const panelIcon = (props) => {
    const {
        iconPosition,
        elementId,
        iconSpacing
    } = props;

    return [
        {
            id: 'iconPosition',
            label: __('Icon Position'),
            component: SelectControl,
            options: [
                {
                    label: __('Left', 'gutenverse'),
                    value: 'left'
                },
                {
                    label: __('Right', 'gutenverse'),
                    value: 'right'
                },
            ],
            liveStyle: [
                isNotEmpty(iconPosition) && isNotEmpty(iconSpacing) && iconPosition === 'left' && {
                    'type': 'plain',
                    'responsive': true,
                    'selector': `.${elementId} .accordion-item .accordion-icon`,
                    'properties': [
                        {
                            'name': 'margin-right',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                },
                            }
                        }
                    ],
                    'multiAttr': {
                        'iconSpacing': iconSpacing
                    }
                }
            ]
        },
        {
            id: 'iconSpacing',
            label: __('Icon Spacing', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                isNotEmpty(iconPosition) && isNotEmpty(iconSpacing) && iconPosition === 'left' && {
                    'type': 'plain',
                    'responsive': true,
                    'selector': `.${elementId} .accordion-item .accordion-icon`,
                    'properties': [
                        {
                            'name': 'margin-right',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                },
                            }
                        }
                    ],
                    'multiAttr': {
                        'iconSpacing': iconSpacing
                    }
                }
            ]
        },
    ];
};
