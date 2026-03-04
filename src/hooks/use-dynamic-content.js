
import { useState, useEffect, useMemo } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { isOnEditor } from '../helper';

if (!window.__gutenverseDynamicCache) {
    window.__gutenverseDynamicCache = {};
}
if (!window.__gutenverseDynamicCache.contentPromises) {
    window.__gutenverseDynamicCache.contentPromises = {};
}
if (!window.__gutenverseDynamicCache.urlPromises) {
    window.__gutenverseDynamicCache.urlPromises = {};
}
if (!window.__gutenverseDynamicCache.contentCache) {
    window.__gutenverseDynamicCache.contentCache = {};
}
if (!window.__gutenverseDynamicCache.urlCache) {
    window.__gutenverseDynamicCache.urlCache = {};
}
if (!window.__gutenverseDynamicCache.imageCache) {
    window.__gutenverseDynamicCache.imageCache = {};
}
if (!window.__gutenverseDynamicCache.imagePromises) {
    window.__gutenverseDynamicCache.imagePromises = {};
}
const { contentCache, urlCache, imageCache, contentPromises, urlPromises, imagePromises } = window.__gutenverseDynamicCache;

export const useDynamicContent = (dynamicContent) => {
    const [dynamicText, setDynamicText] = useState();

    const memoizedDynamicContent = useMemo(() => dynamicContent, [JSON.stringify(dynamicContent)]);

    useEffect(() => {
        if (isEmpty(memoizedDynamicContent) || !isOnEditor()) return;

        const key = JSON.stringify(memoizedDynamicContent);

        if (contentCache[key] !== undefined) {
            setDynamicText(contentCache[key]);
            return;
        }

        if (contentPromises[key]) {
            contentPromises[key].then((result) => {
                if (result !== undefined) {
                    setDynamicText(result);
                }
            });
            return;
        }

        const dynamicTextContent = applyFilters(
            'gutenverse.dynamic.fetch-text',
            memoizedDynamicContent
        );

        if (typeof dynamicTextContent.then === 'function') {
            contentPromises[key] = dynamicTextContent;
            dynamicTextContent.then(result => {
                if ((!Array.isArray(result) || result.length > 0) && result !== undefined) {
                    contentCache[key] = result;
                    setDynamicText(result);
                }
            }).catch(() => { }).finally(() => {
                delete contentPromises[key];
            });
        }
    }, [memoizedDynamicContent]);

    return { dynamicText };
};

export const useDynamicUrl = (dynamicUrl) => {
    const [dynamicHref, setDynamicHref] = useState();

    const memoizedDynamicUrl = useMemo(() => dynamicUrl, [JSON.stringify(dynamicUrl)]);

    useEffect(() => {
        if (isEmpty(memoizedDynamicUrl) || !isOnEditor()) return;

        const key = JSON.stringify(memoizedDynamicUrl);

        if (urlCache[key] !== undefined) {
            setDynamicHref(urlCache[key]);
            return;
        }

        if (urlPromises[key]) {
            urlPromises[key].then((result) => {
                if (result !== undefined) {
                    setDynamicHref(result);
                }
            });
            return;
        }

        const dynamicUrlcontent = applyFilters(
            'gutenverse.dynamic.fetch-url',
            memoizedDynamicUrl
        );

        if (typeof dynamicUrlcontent.then === 'function') {
            urlPromises[key] = dynamicUrlcontent;
            dynamicUrlcontent.then(result => {
                if ((!Array.isArray(result) || result.length > 0) && result !== undefined) {
                    urlCache[key] = result;
                    setDynamicHref(result);
                } else {
                    setDynamicHref(undefined);
                }
            }).catch(() => { }).finally(() => {
                delete urlPromises[key];
            });
        }
    }, [memoizedDynamicUrl]);

    return { dynamicHref };
};

export const useDynamicImage = (dynamicImage) => {
    const [dynamicImg, setDynamicImg] = useState();

    const memoizedDynamicImage = useMemo(() => dynamicImage, [JSON.stringify(dynamicImage)]);

    useEffect(() => {
        if (isEmpty(memoizedDynamicImage) || !isOnEditor()) return;

        const key = JSON.stringify(memoizedDynamicImage);

        if (imageCache[key] !== undefined) {
            setDynamicImg(imageCache[key]);
            return;
        }

        if (imagePromises[key]) {
            imagePromises[key].then((result) => {
                if (result !== undefined) {
                    setDynamicImg(result);
                }
            });
            return;
        }

        const dynamicImageContent = applyFilters(
            'gutenverse.dynamic.fetch-image',
            memoizedDynamicImage
        );

        if (typeof dynamicImageContent.then === 'function') {
            imagePromises[key] = dynamicImageContent;
            dynamicImageContent.then(result => {
                if ((!Array.isArray(result) || result.length > 0) && result !== undefined) {
                    imageCache[key] = result;
                    setDynamicImg(result);
                } else {
                    setDynamicImg(undefined);
                }
            }).catch(() => { }).finally(() => {
                delete imagePromises[key];
            });
        }
    }, [memoizedDynamicImage]);

    return { dynamicImg };
};
