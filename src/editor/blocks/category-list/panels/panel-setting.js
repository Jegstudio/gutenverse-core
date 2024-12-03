
import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, IconControl, RangeControl, SelectControl, SelectSearchControl, SizeControl, SwitchControl, TextControl } from 'gutenverse-core/controls';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { isOnEditor } from 'gutenverse-core/helper';
import { handleColor, handleUnitPoint } from 'gutenverse-core/styling';

export const settingPanel = (props) => {
    const {
        elementId,
        showIcon,
        setSwitcher,
        switcher
    } = props;

    const searchCategory =  isOnEditor() ? input => new Promise(resolve => {
        apiFetch({
            path: addQueryArgs('/wp/v2/categories', {
                search: input,
            }),
        }).then(data => {
            const promiseOptions = data.map(item => {
                return {
                    label: item.name,
                    value: item.id
                };
            });

            resolve(promiseOptions);
        }).catch(() => {
            resolve([]);
        });
    }) : () => {
        return {
            label: '',
            value: ''
        };
    };

    return [
        {
            id: 'qty',
            label: __('Category Qty', 'gutenverse'),
            component : RangeControl,
            min: 0,
            max: 100,
            isParseFloat: true
        },
        {
            id: 'sortType',
            label: __('Sort Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Ascending', 'gutenverse'),
                    value: 'ASC'
                },
                {
                    label: __('Descending', 'gutenverse'),
                    value: 'DESC'
                },
            ],
        },
        {
            id: 'sortBy',
            label: __('Sort By', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Post Count', 'gutenverse'),
                    value: 'count'
                },
                {
                    label: __('Name', 'gutenverse'),
                    value: 'name'
                },
            ],
        },
        {
            id: 'hideEmpty',
            label: __('Hide Empty Category', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'includedCategory',
            label: __('Included Categories', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchCategory
        },
        {
            id: 'layout',
            label: __('Layout', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Vertical', 'gutenverse'),
                    value: 'column'
                },
                {
                    label: __('Horizontal', 'gutenverse'),
                    value: 'row'
                },
            ],
            style: [
                {
                    selector: `.${elementId} .category-list-wrapper`,
                    render: value => `flex-direction: ${value};`
                },
            ]
        },
        {
            id: 'showIcon',
            label: __('Show Icon', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'icon',
            show: showIcon,
            label: __('Icon', 'gutenverse'),
            component: IconControl
        },
        {
            id: 'iconSpace',
            component: SizeControl,
            show: showIcon,
            label: __('Icon Space', 'gutenverse'),
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vh',
                },
            },
            style: [
                {
                    selector: `.${elementId} .category-list-wrapper .icon-list`,
                    allowRender: () => true,
                    render: value => handleUnitPoint(value, 'margin-right')
                }
            ]
        },
        {
            id: 'iconSize',
            component: SizeControl,
            show: showIcon,
            label: __('Icon Size', 'gutenverse'),
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vh',
                },
            },
            style: [
                {
                    selector: `.${elementId} .category-list-wrapper .icon-list i`,
                    allowRender: () => true,
                    render: value => handleUnitPoint(value, 'font-size')
                }
            ]
        },
        {
            id: '__iconSwitch',
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
            onChange: ({ __iconSwitch }) => setSwitcher({ ...switcher, iconSwitch: __iconSwitch })
        },
        {
            id: 'iconColor',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            show: !switcher.iconSwitch || switcher.iconSwitch === 'normal',
            style: [
                {
                    selector: `.${elementId} .category-list-wrapper .category-list-item a .icon-list`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconColorHover',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.iconSwitch === 'hover',
            style: [
                {
                    selector: `.${elementId} .category-list-wrapper .category-list-item a:hover .icon-list`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
    ];
};
