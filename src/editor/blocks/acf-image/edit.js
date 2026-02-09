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

const ACFImageBlock = compose(
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
                if (response?.type === 'image' && response?.value?.url) {
                    setApiFetchData(response.value);
                } else if (typeof response?.value === 'string' && response.value.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                    setApiFetchData({ url: response.value, alt: '' });
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
    }, [fieldKey, postId, entityValue]);

    // Parse entity value if available (could be URL, ID, or object).
    const parseImageData = (value) => {
        if (!value) return null;
        if (typeof value === 'object' && value.url) {
            return { url: value.url, alt: value.alt || '' };
        }
        if (typeof value === 'string' && value.match(/^https?:\/\//)) {
            return { url: value, alt: '' };
        }
        return null;
    };

    // Use entity value first, then API fallback.
    const imageData = entityValue !== undefined ? parseImageData(entityValue) : apiFetchData;

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-acf-image',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    // Render content.
    let content;
    if (isLoading && entityValue === undefined) {
        content = (
            <div className="guten-acf-image-placeholder">
                <span className="dashicons dashicons-format-image"></span>
                <p>{__('Loading...', 'gutenverse')}</p>
            </div>
        );
    } else if (imageData?.url) {
        content = <img src={imageData.url} alt={imageData.alt || ''} />;
    } else if (fieldKey) {
        content = (
            <div className="guten-acf-image-placeholder">
                <span className="dashicons dashicons-format-image"></span>
                <p>[ACF Image: {fieldKey}]</p>
            </div>
        );
    } else {
        content = (
            <div className="guten-acf-image-empty">
                <span className="dashicons dashicons-format-image"></span>
                <p>{__('Enter Field Key', 'gutenverse')}</p>
            </div>
        );
    }

    return <>
        <CopyElementToolbar {...props}/>
        <InspectorControls>
            {/* Additional Inspector Controls */}
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            <div className="guten-acf-image-container">
                {content}
            </div>
        </div>
    </>;
});

export default ACFImageBlock;
