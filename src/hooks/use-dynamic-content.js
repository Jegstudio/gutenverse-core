
import { useState, useEffect, useMemo } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { isOnEditor } from '../helper';

const contentCache = {};
const urlCache = {};
const contentPromises = {};
const urlPromises = {};

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
