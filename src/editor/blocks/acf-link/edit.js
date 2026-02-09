import { compose } from '@wordpress/compose';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef, useState, useEffect } from '@wordpress/element';
import { withPartialRender } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const ACFLinkBlock = compose(
    withPartialRender
)((props) => {
    const {
        attributes,
        clientId,
        context: { postId, postType }
    } = props;

    const {
        elementId,
        fieldKey,
        label,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();

    // Try to get ACF value from entity meta first.
    const [meta] = useEntityProp('postType', postType, 'meta', postId);
    const entityValue = meta?.[fieldKey];

    // State for API fallback.
    const [apiFetchData, setApiFetchData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fallback to API fetch if entity value is empty.
    useEffect(() => {
        if (!fieldKey || !postId || entityValue !== undefined) {
            setApiFetchData(null);
            return;
        }

        setIsLoading(true);
        apiFetch({
            path: `gutenverse/v1/acf-field-value?fieldKey=${encodeURIComponent(fieldKey)}&postId=${postId}`,
        })
            .then((response) => {
                if (response?.type === 'link') {
                    setApiFetchData(response.value);
                } else if (typeof response?.value === 'string') {
                    setApiFetchData({ url: response.value, title: label || response.value });
                } else {
                    setApiFetchData(null);
                }
            })
            .catch(() => {
                setApiFetchData(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [fieldKey, postId, entityValue, label]);

    // Parse entity value if available (could be string URL or link array).
    const parseLinkData = (value) => {
        if (!value) return null;
        if (typeof value === 'object' && value.url) {
            return { url: value.url, title: value.title || label };
        }
        if (typeof value === 'string') {
            return { url: value, title: label || value };
        }
        return null;
    };

    // Use entity value first, then API fallback.
    const linkData = entityValue !== undefined ? parseLinkData(entityValue) : apiFetchData;

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-acf-link',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    // Determine display text.
    let displayText;
    if (isLoading && entityValue === undefined) {
        displayText = __('Loading...', 'gutenverse');
    } else if (linkData?.title) {
        displayText = linkData.title;
    } else if (label) {
        displayText = label;
    } else if (fieldKey) {
        displayText = `[Link: ${fieldKey}]`;
    } else {
        displayText = __('Button Label', 'gutenverse');
    }

    return <>
        <CopyElementToolbar {...props}/>
        <InspectorControls>
            {/* Additional Inspector Controls */}
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            <div className="guten-acf-link-wrapper">
                <a className="guten-button" href="#" onClick={e => e.preventDefault()}>
                    <span>{displayText}</span>
                </a>
            </div>
        </div>
    </>;
});

export default ACFLinkBlock;
