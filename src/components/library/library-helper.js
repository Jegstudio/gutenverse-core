import { saveLayoutLikeState, saveSectionLikeState } from 'gutenverse-core/requests';
import isEmpty from 'lodash/isEmpty';
import semver from 'semver';
import { dispatch, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as editorStore } from '@wordpress/editor';
import Notice from '../notice';

const layoutFilter = (layoutData, filter) => {
    let { keyword, license, categories, author, like, status: postStatus } = filter;
    let parents = {};

    if (categories) {
        categories?.forEach(element => {
            if (element.parent in parents) {
                parents[element.parent].push(element.id);
            } else {
                parents[element.parent] = [element.id];
            }
        });
    }
    layoutData = layoutData.filter((layout) => {
        const { data, author: layoutAuthor, categories: layoutCategories, like: layoutLike } = layout;
        const { name, status } = data;
        const { name: authorName } = layoutAuthor;
        const dev = '--dev_mode--';

        let licenseCheck = true;
        let keywordCheck = true;
        let likeCheck = true;
        let categoriesCheck = true;
        let devCheck = true;
        let authorCheck = true;

        if (like) {
            likeCheck = layoutLike;
        }

        if (keyword) {
            keywordCheck = name.toLowerCase().includes(keyword.toLowerCase());
        }

        if (license) {
            // const proState = pro === '0' ? 'free' : 'pro';

            // if (proState !== license) {
            //     return false;
            // }
            licenseCheck = (() => {
                const availablePlans = data?.available;
                if (!Array.isArray(license) || !Array.isArray(availablePlans)) {
                    return false;
                }
                if (availablePlans.length === 1) {
                    if (availablePlans[0] === '') {
                        return true;
                    }
                }
                return license.some(filterItem => availablePlans.includes(filterItem?.value));
            })();
        }

        if (!isEmpty(categories)) {
            categoriesCheck = (() => {
                let isTrue = false;
                Object.keys(parents).forEach(el => {
                    if (layoutCategories.some(category => parents[el].includes(category.id.toString()))) {
                        isTrue = true;
                    }
                });
                return isTrue;
            })();
        }

        if ('true' === dev) {
            if (postStatus) {
                devCheck = postStatus !== status;
            }
        }

        if (author) {
            authorCheck = authorName !== author;
        }

        return licenseCheck && keywordCheck && likeCheck && categoriesCheck && authorCheck && devCheck;
    });
    return layoutData;
};

const dataPaging = (data, paging, perPage) => {
    if (perPage) {
        let result = data.slice(0, perPage * paging);
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
        const { pro, tier, slug, cover, demo, compatible_version: compatibleVersion, requirements } = data;
        return {
            id,
            pro: pro === '1',
            licenseType: tier,
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
    let result, theCategories;
    if ('layout' === type) {
        result = layoutFilter(data, filter);
    } else {
        result = sectionFilter(data, filter);
    }
    if (categories) {
        theCategories = categories.map((category) => {
            category.count = categoryCount(result, category.id);
            if (category.childs) {
                category.childs = category.childs.map(child => {
                    child.count = categoryCount(result, parseInt(child.id));
                    return child;
                });
            }
            return category;
        });
    }

    return [
        ...theCategories,
    ].sort((a, b) => {
        return b.count - a.count;
    });
};

export const ExportNotice = (props) => {

    const width = () => {
        switch (props.progress) {
            case '1/4':
                return 'twenty-five';
            case '2/4':
                return 'fifty';
            case '3/4':
                return 'seventy-five';
            case '4/4':
                return 'hundred';
            default:
                return 'zero';
        }
    };
    return <div className="library-export-notice">
        <div className="library-export-notice-container">
            <div className="importing-notice">
                <div className="notice-inner">
                    <span>{props.message}</span>
                    <span>{props.progress}</span>
                </div>
                <div className="bar-progress-container">
                    <div className={'notice-bar-progress ' + `${width()}-percent`} />
                </div>
            </div>
        </div>
    </div>;
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
    let { license, categories, author, like, status: postStatus } = filter;
    let parents = {};

    if (categories) {
        categories?.forEach(element => {
            if (element.parent in parents) {
                parents[element.parent].push(element.id);
            } else {
                parents[element.parent] = [element.id];
            }
        });
    }

    sectionData = sectionData.filter((section) => {
        const { data, author: sectionAuthor, categories: sectionCategories, like: sectionLike } = section;
        const { status } = data;
        const { name: authorName } = sectionAuthor;
        const dev = '--dev_mode--';

        let licenseCheck = true;
        let devCheck = true;
        let categoriesCheck = true;
        let authorCheck = true;
        let likeCheck = true;

        if (like) {
            likeCheck = sectionLike;
        }
        if (license) {
            // const proState = pro === '0' ? 'free' : 'pro';

            // if (proState !== license) {
            //     return false;
            // }
            licenseCheck = (() => {
                const availablePlans = data?.available;

                if (!Array.isArray(license) || !Array.isArray(availablePlans)) {
                    return false;
                }
                if (availablePlans.length === 1) {
                    if (availablePlans[0] === '') {
                        return true;
                    }
                }
                return license.some(filterItem => availablePlans.includes(filterItem?.value));
            })();
        }

        if ('true' === dev) {
            if (postStatus) {
                devCheck = postStatus === status;
            }
        }

        if (!isEmpty(categories)) {
            categoriesCheck = (() => {
                let isTrue = 0;
                const keys = Object.keys(parents);
                keys.forEach(el => {
                    if (sectionCategories.some(category => parents[el].includes(category.id.toString()))) {
                        isTrue++;
                    }
                });
                return isTrue === keys.length;
            })();
        }

        if (author) {
            authorCheck = authorName === author;
        }

        return licenseCheck && devCheck && categoriesCheck && authorCheck && likeCheck;
    });
    return sectionData;
};

const themeFilter = (themeData, filter) => {
    const { keyword, license, status: postStatus } = filter;

    themeData = themeData.filter((layout) => {
        const { data } = layout;
        const { name, pro, status } = data;
        const dev = '--dev_mode--';

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

        if ('true' === dev) {
            if (postStatus) {
                if (postStatus !== status) {
                    return false;
                }
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
        const { pro, tier, slug, cover, host, demo, compatible_version: compatibleVersion, requirements, status } = data;

        return {
            id,
            pro: pro === '1',
            licenseType: tier,
            slug,
            title: name,
            cover,
            host,
            demo,
            compatibleVersion,
            requirements,
            customAPI,
            customArgs,
            author,
            status
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
    dispatch('gutenverse/library').layoutLike({
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
        const { id, data, like, customAPI, customArgs, author, name: unfilteredName, categories } = section;
        const { pro, tier, slug, cover, compatible_version: compatibleVersion, requirements } = data;
        let name = unfilteredName;
        name = name.replace('PRO', '').replace('&#8211;', '').replace('Dark', '- Dark').replace('Free', '');
        return {
            id,
            pro: pro === '1',
            licenseType: tier,
            categories,
            slug,
            cover,
            like,
            compatibleVersion,
            requirements,
            customAPI,
            customArgs,
            author,
            name
        };
    });

    return dataPaging(data, paging, perPage);
};

export const likeSection = (slug, flag) => {
    dispatch('gutenverse/library').sectionLike({
        slug,
        flag
    });
    saveSectionLikeState({
        slug,
        state: flag,
    });
};

export const ImportNotice = (props) => {
    const { resolve, blocks, setLibraryError, supportGlobalImport = false, processGlobalStyle = () => { } } = props;
    const { setRenderingMode } = useDispatch(editorStore);
    const { insertBlocks } = dispatch('core/block-editor');

    const editContent = () => {
        supportGlobalImport && processGlobalStyle();
        resolve();
        setLibraryError(false);
        setRenderingMode('post-only');
        setTimeout(() => {
            insertBlocks(blocks);
        }, 500);
    };

    const cancelImport = () => {
        setLibraryError(false);
        resolve();
    };

    return <Notice
        icon={<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.4286 0.517446C11.0653 -0.172482 9.93558 -0.172482 9.5723 0.517446L0.122776 18.4514C0.0377128 18.6121 -0.0044578 18.7922 0.000372931 18.9742C0.00520366 19.1562 0.0568709 19.3338 0.150341 19.4898C0.24381 19.6457 0.375894 19.7747 0.533723 19.8641C0.691551 19.9535 0.869741 20.0004 1.05093 20H19.95C20.131 20.0004 20.3091 19.9536 20.4668 19.8642C20.6246 19.7749 20.7565 19.646 20.8499 19.4901C20.9433 19.3342 20.9949 19.1567 20.9996 18.9749C21.0044 18.793 20.9622 18.613 20.8771 18.4524L11.4286 0.517446ZM11.5504 16.8352H9.45051V14.7253H11.5504V16.8352ZM9.45051 12.6154V7.34077H11.5504L11.5515 12.6154H9.45051Z" fill="#FFB200" />
        </svg>}
        title={__('Import Section Notice', '--gctd--')}
        description={__('We can\'t import content because the Post Content is missing from your Template. Would you like to switch to Post View instead in order to import the content?', '--gctd--')}
        buttonText={__('Keep Import', '--gctd--')}
        cancelButtonText={__('Dismiss', '--gctd--')}
        cancelButton={true}
        onClick={editContent}
        onClose={cancelImport}
    />;

};