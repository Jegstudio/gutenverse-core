
import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, IconControl, RangeControl, SelectControl, SelectSearchControl, SizeControl, SwitchControl, TextControl } from 'gutenverse-core/controls';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { isOnEditor } from 'gutenverse-core/helper';
import { handleColor, handleUnitPoint } from 'gutenverse-core/styling';

export const settingPanel = (props) => {
    const {
        elementId,
        layout
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

    const searchTaxonomy =  isOnEditor() ? input => new Promise(resolve => {
        apiFetch({
            path: addQueryArgs('/wp/v2/taxonomies', {
                search: input,
            }),
        }).then(data => {
            const promiseOptions = Object.keys(data).map(item => {
                return {
                    label: data[item].name,
                    value: data[item].slug
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
            id: 'taxonomyType',
            label: __('Taxonomy Type', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: false,
            onSearch: searchTaxonomy
        },
        {
            id: 'qty',
            label: __('Number of Category', 'gutenverse'),
            component : RangeControl,
            min: 1,
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
                    selector: `.${elementId} .taxonomy-list-wrapper`,
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
            id: 'showDivider',
            label: __('Show Divider', 'gutenverse'),
            component: CheckboxControl
        }
    ];
};
