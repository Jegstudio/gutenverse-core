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

const ACFTextBlock = compose(
    withPartialRender
)((props) => {
    const {
        attributes,
        clientId,
        context: { postId, postType }
    } = props;

    const {
        elementId,
        htmlTag: HtmlTag,
        placeholder,
        fieldKey,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();

    // Try to get ACF value from entity meta first (works if field has show_in_rest enabled).
    const [meta] = useEntityProp('postType', postType, 'meta', postId);
    const entityValue = meta?.[fieldKey];

    // State for API fallback.
    const [apiFetchValue, setApiFetchValue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fallback to API fetch if entity value is empty.
    useEffect(() => {
        // Only fetch via API if we have a fieldKey, postId, and no entity value.
        if (!fieldKey || !postId || entityValue !== undefined) {
            setApiFetchValue(null);
            return;
        }

        setIsLoading(true);
        apiFetch({
            path: `gutenverse/v1/acf-field-value?fieldKey=${encodeURIComponent(fieldKey)}&postId=${postId}`,
        })
            .then((response) => {
                if (response?.value !== undefined) {
                    setApiFetchValue(response.value);
                } else {
                    setApiFetchValue(null);
                }
            })
            .catch(() => {
                setApiFetchValue(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [fieldKey, postId, entityValue]);

    // Use entity value first, then API fallback.
    const fieldValue = entityValue !== undefined ? entityValue : apiFetchValue;

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-acf-text',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    // Determine what to display.
    let displayText;
    if (isLoading && entityValue === undefined) {
        displayText = 'Loading...';
    } else if (fieldValue !== null && fieldValue !== '' && fieldValue !== undefined) {
        displayText = typeof fieldValue === 'object' ? JSON.stringify(fieldValue) : fieldValue;
    } else if (fieldKey) {
        displayText = `[ACF: ${fieldKey}]`;
    } else {
        displayText = placeholder || 'ACF Text Field';
    }

    return <>
        <CopyElementToolbar {...props}/>
        <InspectorControls>
            {/* Additional Inspector Controls */}
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            <HtmlTag className="guten-acf-text-content">
                {displayText}
            </HtmlTag>
        </div>
    </>;
});

export default ACFTextBlock;
