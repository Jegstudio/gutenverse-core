import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { NumberControl, RangeControl, SelectSearchControl, SelectControl, CheckboxControl } from 'gutenverse-core/controls';
import { addQueryArgs } from '@wordpress/url';
import { searchAuthor, searchCategory, searchTag } from 'gutenverse-core/requests';
import { isOnEditor } from 'gutenverse-core/helper';

export const settingPanel = ({ postType }) => {
    const path = () => {
        switch (postType) {
            case 'page':
                return '/wp/v2/pages';
            case 'post':
            default:
                return '/wp/v2/posts';
        }
    };

    const searchPosts = isOnEditor() ? input => new Promise(resolve => {
        apiFetch({
            path: addQueryArgs(path(), {
                search: input,
            }),
        }).then(data => {
            const promiseOptions = data.map(item => {
                return {
                    label: item.title.rendered,
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
            id: 'inheritQuery',
            label: __('Inherit Query from Template', 'gutenverse'),
            description: __('Enable this option to use the default query based on the template. Useful for archive pages like blog, category, tag pages, etc.', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'postType',
            label: __('Post Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Post', 'gutenverse'),
                    value: 'post'
                },
                {
                    label: __('Page', 'gutenverse'),
                    value: 'page'
                },
            ]
        },
        {
            id: 'numberPost',
            label: __('Posts Per Page', 'gutenverse'),
            description: __('Number of posts to display', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 30,
            step: 1,
            isParseFloat: false
        },
        {
            id: 'postOffset',
            label: __('Offset', 'gutenverse'),
            description: __('Number of posts to skip', 'gutenverse'),
            component: NumberControl,
        },
        {
            id: 'sortBy',
            label: __('Order By', 'gutenverse'),
            component: SelectControl,
            options: [
                { value: 'latest', label: __('Newest to Oldest', 'gutenverse') },
                { value: 'oldest', label: __('Oldest to Newest', 'gutenverse') },
                { value: 'alphabet_asc', label: __('A → Z', 'gutenverse') },
                { value: 'alphabet_desc', label: __('Z → A', 'gutenverse') },
            ]
        },
        {
            id: 'includePost',
            label: __('Include Posts', 'gutenverse'),
            description: __('Search and select specific posts to include', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchPosts
        },
        {
            id: 'excludePost',
            label: __('Exclude Posts', 'gutenverse'),
            description: __('Search and select specific posts to exclude', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchPosts
        },
        {
            id: 'includeCategory',
            label: __('Categories', 'gutenverse'),
            description: __('Filter posts by category', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: isOnEditor() ? searchCategory : () => []
        },
        {
            id: 'includeAuthor',
            label: __('Authors', 'gutenverse'),
            description: __('Filter posts by author', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: isOnEditor() ? searchAuthor : () => []
        },
        {
            id: 'includeTag',
            label: __('Tags', 'gutenverse'),
            description: __('Filter posts by tag', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: isOnEditor() ? searchTag : () => []
        },
    ];
};
