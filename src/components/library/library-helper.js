import { saveLayoutLikeState, saveSectionLikeState } from 'gutenverse-core/requests';
import { isEmpty } from 'lodash';
import semver from 'semver';
import { dispatch } from '@wordpress/data';

const layoutFilter = (layoutData, filter) => {
    const { keyword, license, categories, author, like } = filter;

    layoutData = layoutData.filter((layout) => {
        const { data, author: layoutAuthor, categories: layoutCategories, like: layoutLike } = layout;
        const { name, pro } = data;
        const { name: authorName } = layoutAuthor;

        if (like) {
            if (false === layoutLike) {
                return false;
            }
        }

        if (keyword) {
            if (!name.toLowerCase().includes(keyword.toLowerCase())) {
                return false;
            }
        }

        if (license) {
            const proState = pro === '0' ? 'free' : 'pro';

            if (proState !== license) {
                return false;
            }
        }

        if (categories) {
            let categoryFlag = true;
            layoutCategories.map((category) => {
                if (category.id === categories) {
                    categoryFlag = categoryFlag && false;
                }
            });
            if (categoryFlag) return false;
        }

        if (author) {
            if (authorName !== author) {
                return false;
            }
        }

        return true;
    });

    return layoutData;
};

const dataPaging = (data, paging, perPage) => {
    if (perPage) {
        let startIndex = perPage * (paging - 1);
        let result = data.slice(startIndex, startIndex + perPage);
        let totalPage = Math.ceil(data.length / perPage);

        return {
            current: paging,
            data: result,
            total: totalPage,
        };
    } else {
        return {
            current: 1,
            data: data,
            total: 1,
        };
    }
};

export const filterLayout = (layoutData, filter, perPage) => {
    const { paging } = filter;
    const data = layoutFilter(layoutData, filter).map((layout) => {
        const { id, name, data, like, author, customAPI, customArgs } = layout;
        const { pro, slug, cover, demo, compatible_version: compatibleVersion, requirements } = data;

        return {
            id,
            pro: pro === '1',
            slug,
            title: name,
            cover,
            like,
            demo,
            compatibleVersion,
            requirements,
            customAPI,
            customArgs,
            author
        };
    });

    return dataPaging(data, paging, perPage);
};

export const getDistincAuthor = data => {
    let author = [];

    data.map(data => {
        if (author.indexOf(data.author.name)) {
            author = [
                ...author,
                data.author.name
            ];
        }
    });

    return author;
};

export const mapId = (data) => {
    const result = {};

    data.map((item) => {
        result[item.id] = item;
    });

    return result;
};

export const filterCategories = (data, categories, filter, type) => {
    let result;

    if ('layout' === type) {
        result = layoutFilter(data, filter);
    } else {
        result = sectionFilter(data, filter);
    }

    let theCategories = categories.map((category) => {
        category.count = categoryCount(result, category.id);
        return category;
    });

    return [
        {
            id: '',
            name: 'All',
            count: result.length,
        },
        ...theCategories,
    ].sort((a, b) => {
        return b.count - a.count;
    });
};

const categoryCount = (layouts, categoryId) => {
    let count = 0;

    layouts.map((layout) => {
        const { categories } = layout;
        categories.map((category) => {
            if (category.id === categoryId) count++;
        });
    });

    return count;
};

const sectionFilter = (sectionData, filter) => {
    const { license, categories, author, like } = filter;

    sectionData = sectionData.filter((section) => {
        const { data, author: sectionAuthor, categories: sectionCategories, like: sectionLike } = section;
        const { pro } = data;
        const { name: authorName } = sectionAuthor;

        if (like) {
            if (false === sectionLike) {
                return false;
            }
        }

        if (license) {
            const proState = pro === '0' ? 'free' : 'pro';

            if (proState !== license) {
                return false;
            }
        }

        if (categories) {
            let categoryFlag = true;
            sectionCategories.map((category) => {
                if (category.id === categories) {
                    categoryFlag = categoryFlag && false;
                }
            });
            if (categoryFlag) return false;
        }

        if (author) {
            if (authorName !== author) {
                return false;
            }
        }

        return true;
    });

    return sectionData;
};

const themeFilter = (themeData, filter) => {
    const { keyword, license } = filter;

    themeData = themeData.filter((layout) => {
        const { data } = layout;
        const { name, pro } = data;

        if (keyword) {
            if (!name.toLowerCase().includes(keyword.toLowerCase())) {
                return false;
            }
        }

        if (license) {
            const proState = pro === '0' ? 'free' : 'pro';

            if (proState !== license) {
                return false;
            }
        }

        return true;
    });

    return themeData;
};

export const filterTheme = (themeData, filter, perPage) => {
    const { paging } = filter;

    const data = themeFilter(themeData, filter).map((layout) => {
        const { id, name, data, author, customAPI, customArgs } = layout;
        const { pro, slug, cover, host, demo, compatible_version: compatibleVersion, requirements } = data;

        return {
            id,
            pro: pro === '1',
            slug,
            title: name,
            cover,
            host,
            demo,
            compatibleVersion,
            requirements,
            customAPI,
            customArgs,
            author
        };
    });

    return dataPaging(data, paging, perPage);
};

export const getPluginRequirementStatus = ({ plugins, requirements, compatibleVersion }) => {
    const { pluginVersions } = window['GutenverseConfig'] ? window['GutenverseConfig'] : window['GutenverseDashboard'];
    const pluginVersion = pluginVersions?.gutenverse?.version || '0.0.0';

    let pluginRequirement = requirements?.map(plugin => {
        const installed = plugins[plugin.slug];

        if (installed === undefined) {
            plugin.installed = false;
        } else {
            plugin.installed = true;
            plugin.active = installed.active;

            if (isEmpty(plugin.version)) {
                plugin.validVersion = true;
            } else {
                plugin.validVersion = semver.gte(installed.version, plugin.version || '0.0.0');
            }
        }

        return plugin;
    }).filter(plugin => {
        if (plugin.installed === false) {
            return true;
        } else {
            if (plugin.active === false || plugin.validVersion === false) {
                return true;
            }
        }

        return false;
    });

    if (!semver.gte(pluginVersion, compatibleVersion || '0.0.0')) {
        pluginRequirement = [
            {
                installed: true,
                name: 'Gutenverse',
                slug: 'gutenverse',
                version: pluginVersion
            },
            ...pluginRequirement
        ];
    }

    return pluginRequirement;
};

export const likeLayout = (slug, flag) => {
    dispatch( 'gutenverse/library' ).layoutLike({
        slug,
        flag
    });
    saveLayoutLikeState({
        slug,
        state: flag,
    });
};

export const filterSection = (sectionData, filter, perPage) => {
    const { paging } = filter;
    const data = sectionFilter(sectionData, filter).map((section) => {
        const { id, data, like, customAPI, customArgs, author } = section;
        const { pro, slug, cover, compatible_version: compatibleVersion, requirements } = data;

        return {
            id,
            pro: pro === '1',
            slug,
            cover,
            like,
            compatibleVersion,
            requirements,
            customAPI,
            customArgs,
            author
        };
    });

    return dataPaging(data, paging, perPage);
};

export const likeSection = (slug, flag) => {
    dispatch( 'gutenverse/library' ).sectionLike({
        slug,
        flag
    });
    saveSectionLikeState({
        slug,
        state: flag,
    });
};