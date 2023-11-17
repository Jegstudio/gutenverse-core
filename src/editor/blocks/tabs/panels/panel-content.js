import { SelectControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import isEmpty from 'lodash/isEmpty';

export const contentPanel = (props) => {
    const {
        clientId,
        elementId,
        selector,
    } = props;
    const blockName = select('core/block-editor').getBlockName(clientId);
    const checkSelector = !isEmpty(selector) ? selector : `.${elementId}.guten-element`;
    const customSelector = blockName !== 'gutenverse/section' ? checkSelector : `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`;
    return [
        {
            id: 'orientation',
            label: __('Tab Orientation', 'gutenverse'),
            component: (props) => {
                return SelectControl({
                    ...props,
                });
            },
            options: [
                {
                    label: __('Horizontal'),
                    value: 'horizontal'
                },
                {
                    label: __('Vertical'),
                    value: 'vertical'
                },
                {
                    label: __('Horizontal Center Align'),
                    value: 'horizontal-center'
                },
                {
                    label: __('Horizontal Right Align'),
                    value: 'horizontal-right'
                },

            ],
            style: [
                {
                    selector: customSelector,
                    allowRender: value => value,
                    render : value => {
                        if(value === 'horizontal'){
                            return 'display: block;'
                        }else if(value === 'vertical'){
                            return 'display: flex;'
                        }
                    }
                },
                {
                    selector: `${checkSelector} .tab-heading-item` ,
                    allowRender: value => value,
                    render : value => {
                        if(value === 'horizontal-center'){
                            return 'justify-content: center;'
                        }else if(value === 'horizontal-right'){
                            return 'justify-content: end;'
                        }
                    }
                }
            ]
        },
    ];
};