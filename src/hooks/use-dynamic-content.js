
import { useState, useEffect, useMemo } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { isOnEditor } from '../helper';

export const useDynamicContent = (dynamicContent) => {
    const [dynamicText, setDynamicText] = useState();

    const memoizedDynamicContent = useMemo(() => dynamicContent, [JSON.stringify(dynamicContent)]);

    useEffect(() => {
        const dynamicTextContent = isEmpty(dynamicContent) || !isOnEditor() ? dynamicContent : applyFilters(
            'gutenverse.dynamic.fetch-text',
            dynamicContent
        );

        if ((typeof dynamicTextContent.then === 'function') && !isEmpty(dynamicContent)) {
            dynamicTextContent.then(result => {
                if ((!Array.isArray(result) || result.length > 0) && result !== undefined && result !== dynamicText) {
                    setDynamicText(result);
                }
            }).catch(() => { });
        }
    }, [memoizedDynamicContent]);

    return { dynamicText };
};

export const useDynamicUrl = (dynamicUrl) => {
    const [dynamicHref, setDynamicHref] = useState();

    const memoizedDynamicUrl = useMemo(() => dynamicUrl, [JSON.stringify(dynamicUrl)]);

    useEffect(() => {
        const dynamicUrlcontent = isEmpty(dynamicUrl) || !isOnEditor() ? dynamicUrl : applyFilters(
            'gutenverse.dynamic.fetch-url',
            dynamicUrl
        );

        if ((typeof dynamicUrlcontent.then === 'function') && !isEmpty(dynamicUrl)) {
            dynamicUrlcontent.then(result => {
                if ((!Array.isArray(result) || result.length > 0) && result !== undefined && result !== dynamicHref) {
                    setDynamicHref(result);
                } else if (result !== dynamicHref) {
                    setDynamicHref(undefined);
                }
            }).catch(() => { });
        }
    }, [memoizedDynamicUrl]);

    return { dynamicHref };
};
