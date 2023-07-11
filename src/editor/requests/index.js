import axios from 'axios';
import apiFetch from '@wordpress/api-fetch';
import { serverUrl, serverEndpoint } from 'gutenverse-core/config';
import isEmpty from 'lodash/isEmpty';
import { addQueryArgs } from '@wordpress/url';

export const httpClient = (api = null) => {
    const baseURL = !isEmpty(api) ? api.url + api.endpoint : serverUrl + serverEndpoint

    return axios.create({baseURL});
};

export const searchTermsTaxonomy = (input, values) => new Promise(resolve => {
    const { taxonomy } = values;
    apiFetch({
        path: addQueryArgs('gutenverse-client/v1/taxonomies', {
            search: input,
            taxonomy: taxonomy
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
});

export const searchPostSinglePostType = (input, values) => new Promise(resolve => {
    const { post_type_single: postType } = values;
    apiFetch({
        path: addQueryArgs('gutenverse-client/v1/singles', {
            search: input,
            post_type: postType
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
});

export const searchTag = input => new Promise(resolve => {
    apiFetch({
        path: addQueryArgs('/wp/v2/tags', {
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
});

export const searchCategory = input => new Promise(resolve => {
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
});

export const searchAuthor = input => new Promise(resolve => {
    apiFetch({
        path: addQueryArgs('/wp/v2/users', {
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
});

export const getInstalledThemes = () => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'wp/v2/themes',
            method: 'GET'
        }).then(data => {
            resolve(data);
        }).catch(error => {
            reject(error);
        });
    });
};

export const fetchLikeLayout = (params) => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/layout/like-list',
            method: 'POST',
            data: {
                ...params
            }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const saveLayoutLikes = (params) => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/layout/set-like',
            method: 'POST',
            data: { likes: params.likes }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const saveLayoutLikeState = (params) => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/layout/like-state',
            method: 'POST',
            data: {
                ...params
            }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const saveSectionLikeState = (params) => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/section/like-state',
            method: 'POST',
            data: {
                ...params
            }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};


export const fetchLikeSection = (params) => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/section/like-list',
            method: 'POST',
            data: {
                ...params
            }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};


export const saveSectionLikes = (params) => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/section/set-like',
            method: 'POST',
            data: { likes: params.likes }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const searchSection = (params) => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/section/search',
            method: 'POST',
            data: {
                ...params
            }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const sectionCategories = (params) => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/section/categories',
            method: 'POST',
            data: {
                ...params
            }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const searchLayout = (params) => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/layout/search',
            method: 'POST',
            data: {
                ...params
            }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const layoutCategories = (params) => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/layout/categories',
            method: 'POST',
            data: {
                ...params
            }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const singleLayoutDetail = params => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/layout/single',
            method: 'POST',
            data: {
                ...params
            }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const importSingleLayoutContent = (params, api = null) => {
    return new Promise((resolve, reject) => {
        const route = api?.route ? api.route : '/layout/import';

        httpClient(api)
            .post(route, params)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(response.statusText);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const importSingleSectionContent = (params, api = null) => {
    return new Promise((resolve, reject) => {
        const route = api?.route ? api.route : '/section/import';

        httpClient(api)
            .post(route, params)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(response.statusText);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const importImage = params => {
    const { images, contents } = params;
    return new Promise((resolve, reject) => {
        if (isEmpty(images)) {
            resolve(params);
        } else {
            apiFetch({
                path: 'gutenverse-client/v1/import/images',
                method: 'POST',
                data: {
                    images,
                    contents
                }
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        }
    });
};

export const templateNotification = params => {
    const { userId, templates } = params;
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/template/notification',
            method: 'POST',
            data: {
                id: userId,
                templates
            }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const increaseImportLayoutCount = (param) => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/layout/count',
            method: 'POST',
            data: param
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const increaseImportSectionCount = (id) => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/section/count',
            method: 'POST',
            data: { id }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const saveTemplatingType = params => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/templating/save-type',
            method: 'POST',
            data: params
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const modifyGlobalStyle = params => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/globalstyle/modify',
            method: 'POST',
            data: params
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const modifyGlobalVariable = params => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/globalvariable/modify',
            method: 'POST',
            data: params
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const fetchLibraryData = () => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: 'gutenverse-client/v1/library/data',
            method: 'GET'
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};