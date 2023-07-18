import { BuildAdminStyle, DeviceLoop, deviceStyleValue, elementVar, normalAppender, responsiveAppender } from 'gutenverse-core/styling';
import { DividerControl, SwitchControl } from 'gutenverse-core-editor/controls';
import { getColor } from 'gutenverse-core-editor/controls';
import isEmpty from 'lodash/isEmpty';

export const dividerPanel = (props) => {
    const {
        elementId,
        addStyle,
        switcher,
        setSwitcher
    } = props;

    const setDivider = ({ divider = {}, sizeClass, colorClass }) => {
        const {
            type,
            width,
            height,
            color,
            colorMode
        } = divider;

        const elementStyle = elementVar();
        const elementColor = elementVar();

        if (type && type !== 'none') {
            if (width) {
                DeviceLoop(device => {
                    const _width = deviceStyleValue(device, width);

                    if (_width) {
                        responsiveAppender({
                            style: `width: calc(${_width}% + 1.3px);`,
                            device,
                            elementStyle: elementStyle
                        });
                    }
                });
            }

            if (height) {
                DeviceLoop(device => {
                    const _height = deviceStyleValue(device, height);

                    if (_height) {
                        responsiveAppender({
                            style: `height: ${_height}px;`,
                            device,
                            elementStyle: elementStyle
                        });
                    }
                });
            }

            if (!isEmpty(color) & ( isEmpty(colorMode) || colorMode === 'default' ) ) {
                const dividerColor = getColor(color);
                normalAppender({
                    style: `fill: ${dividerColor};`,
                    elementStyle: elementColor
                });
            }

            addStyle(
                sizeClass,
                BuildAdminStyle(elementStyle.adminStyle, sizeClass)
            );

            addStyle(
                colorClass,
                BuildAdminStyle(elementColor.adminStyle, colorClass)
            );
        }
    };

    return [
        {
            id: '__shapeLocation',
            component: SwitchControl,
            options: [
                {
                    value: 'top',
                    label: 'Top'
                },
                {
                    value: 'bottom',
                    label: 'Bottom'
                }
            ],
            onChange: ({ __shapeLocation }) => setSwitcher({ ...switcher, location: __shapeLocation })
        },
        {
            id: 'topDivider',
            show: !switcher.location || switcher.location === 'top',
            component: DividerControl,
            onChange: ({ topDivider }) => {
                setDivider({
                    divider: topDivider,
                    sizeClass: `section.guten-section.${elementId} .guten-shape-divider.guten-shape-divider-top svg`,
                    colorClass: `section.guten-section.${elementId} .guten-shape-divider.guten-shape-divider-top .guten-shape-fill path`
                });
            }
        },
        {
            id: 'bottomDivider',
            show: switcher.location === 'bottom',
            component: DividerControl,
            onChange: ({ bottomDivider }) => {
                setDivider({
                    divider: bottomDivider,
                    sizeClass: `section.guten-section.${elementId} .guten-shape-divider.guten-shape-divider-bottom svg`,
                    colorClass: `section.guten-section.${elementId} .guten-shape-divider.guten-shape-divider-bottom .guten-shape-fill path`
                });
            }
        },
    ];
};