import { SelectControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import isEmpty from 'lodash/isEmpty';
import { handleUnitPoint, deviceStyleValue } from 'gutenverse-core/styling';

export const contentPanel = (props) => {
    const {
        clientId,
        elementId,
        positioningWidth,
        selector,
        inFlex = true,
    } = props;
    const blockName = select('core/block-editor').getBlockName(clientId);
    const deviceType = getDeviceType();
    const checkSelector = !isEmpty(selector) ? selector : `.${elementId}.guten-element`;
    const customSelector = blockName !== 'gutenverse/section' ? checkSelector : `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`;

    const setPositioning = (width = false) => {
        const value = 'custom';
        switch (value) {
            case 'full':
                return 'width: 100%!important;';
            case 'inline':
                return `width: auto!important; display: ${inFlex ? 'inline-block' : 'inline-flex'}!important;`;
            case 'custom':
                return `${handleUnitPoint(width, 'width', true)} display: ${inFlex ? 'inline-block' : 'inline-flex'}!important;`;
        }
    };
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
                    updateID: 'positioningWidth-style-0',
                    allowRender: value => value,
                    render: () => {
                        return setPositioning(deviceStyleValue(deviceType, positioningWidth));
                    }
                }
            ]
        },
    ];
};