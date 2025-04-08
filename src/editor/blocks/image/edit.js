import { useCallback, useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { Image } from 'gutenverse-core/components';
import { BlockControls, useBlockProps, MediaUploadCheck, MediaUpload, } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { classnames } from 'gutenverse-core/components';
import { useSelect } from '@wordpress/data';
import { panelList } from './panels/panel-list';
import { BlockPanelController } from 'gutenverse-core/controls';
import { URLToolbar } from 'gutenverse-core/toolbars';
import { imagePlaceholder } from 'gutenverse-core/config';
import { useEffect } from '@wordpress/element';
import { useRef } from '@wordpress/element';
import { isEmpty } from 'lodash';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';
import { isOnEditor } from 'gutenverse-core/helper';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { useRichTextParameter } from 'gutenverse-core/helper';
import { CopyElementToolbar } from 'gutenverse-core/components';

const NEW_TAB_REL = 'noreferrer noopener';

export const ImageBoxFigure = attributes => {
    const { imgSrc, altType, altOriginal, altCustom, lazyLoad } = attributes;
    const { media = {}, size } = imgSrc || {};
    const { imageId, sizes = {} } = media || {};

    let imageAltText = null;

    switch (altType) {
        case 'original':
            imageAltText = altOriginal;
            break;
        case 'custom':
            imageAltText = altCustom;
            break;
    }
    const imageLazyLoad = () => {
        if (lazyLoad) {
            return <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={imageAltText} loading="lazy" />;
        } else {
            return <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={imageAltText} />;
        }
    };
    // Handle if empty, pick the 'full' size. If 'full' size also not exist, return placeholder image.

    if (isEmpty(sizes)) {
        return imageLazyLoad();
    }

    let imageSrc = sizes[size];

    if (isEmpty(imageSrc)) {
        if (isEmpty(sizes['full'])) {
            return imageLazyLoad();
        }

        imageSrc = sizes['full'];
    }

    if (imageId && imageSrc) {
        if (lazyLoad) {
            return <img className="gutenverse-image-box-filled" src={imageSrc.url} height={imageSrc.height} width={imageSrc.width} alt={imageAltText} loading="lazy" />;
        } else {
            return <img className="gutenverse-image-box-filled" src={imageSrc.url} height={imageSrc.height} width={imageSrc.width} alt={imageAltText} />;
        }
    }

    return imageLazyLoad();
};

const ImagePicker = (props) => {
    const {
        attributes = {},
        setAttributes,
        children,
    } = props;

    const { imgSrc = {} } = attributes;
    const { media = {} } = imgSrc;
    const { imageId } = media;

    const onImageSelect = (media) => {
        setAttributes({
            imgSrc: {
                media: {
                    imageId: media.id,
                    sizes: media.sizes
                },
                size: 'full'
            },
            altOriginal: media.alt,
            captionOriginal: media.caption
        });
    };

    return (
        <MediaUploadCheck>
            <MediaUpload
                onSelect={onImageSelect}
                allowedTypes={['image']}
                value={imageId}
                render={children} />
        </MediaUploadCheck>
    );
};

const ImageBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('image'),
    withMouseMoveEffect
)((props) => {
    const {
        getBlock,
        getBlockRootClientId
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        clientId,
        attributes,
        setAttributes,
        isSelected,
        setBlockRef,
    } = props;

    const {
        elementId,
        imgSrc,
        url,
        linkTarget,
        rel,
        captionType,
        captionOriginal,
        captionCustom,
        ariaLabel,
        dynamicUrl,
    } = attributes;

    const {
        panelState,
        setPanelState,
        setPanelIsClicked,
        panelIsClicked
    } = useRichTextParameter();

    const defaultSrc = imagePlaceholder;
    const rootBlockId = getBlockRootClientId(clientId);
    const rootBlock = rootBlockId ? getBlock(rootBlockId) : null;
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef(null);
    const [dynamicHref, setDynamicHref] = useState();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-image',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            {
                'select-image': !imgSrc,
            },
        ),
        ref: elementRef
    });

    const onToggleOpenInNewTab = useCallback(
        (value) => {
            const newLinkTarget = value ? '_blank' : undefined;

            let updatedRel = rel;
            if (newLinkTarget && !rel) {
                updatedRel = NEW_TAB_REL;
            } else if (!newLinkTarget && rel === NEW_TAB_REL) {
                updatedRel = undefined;
            }

            setAttributes({
                linkTarget: newLinkTarget,
                rel: updatedRel,
            });
        },
        [rel, setAttributes]
    );

    const caption = () => {
        switch (captionType) {
            case 'original':
                return <span className="guten-caption">{captionOriginal}</span>;
            case 'custom':
                return <span className="guten-caption">{captionCustom}</span>;
            default:
                return null;
        }
    };

    const urlAriaLabel = () => {
        if (ariaLabel) {
            return <a className="guten-image-wrapper" aria-label={ariaLabel} href={url} target={linkTarget} rel={rel} ><ImageBoxFigure {...attributes} /></a>;
        } else {
            return <a className="guten-image-wrapper" href={url} target={linkTarget} rel={rel}><ImageBoxFigure {...attributes} /></a>;
        }
    };

    const blockElement = <div {...blockProps}>
        {!isEmpty(imgSrc) ? urlAriaLabel() : <ImagePicker {...props}>{({ open }) => <img src={defaultSrc} onClick={open} />}</ImagePicker>}
        {caption()}
    </div>;

    const imagePanelState = {
        panel: 'setting',
        section: 2,
    };

    useEffect(() => {
        const dynamicUrlcontent = isEmpty(dynamicUrl) || !isOnEditor() ? dynamicUrl : applyFilters(
            'gutenverse.dynamic.fetch-url',
            dynamicUrl
        );

        (typeof dynamicUrlcontent.then === 'function') && !isEmpty(dynamicUrl) && dynamicUrlcontent
            .then(result => {
                if ((!Array.isArray(result) || result.length > 0) && result !== undefined && result !== dynamicHref) {
                    setDynamicHref(result);
                } else if (result !== dynamicHref) setDynamicHref(undefined);
            }).catch(() => { });
        if (dynamicHref !== undefined) {
            setAttributes({ url: dynamicHref, isDynamic: true });
        } else { setAttributes({ url: url }); }
    }, [dynamicUrl, dynamicHref]);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const ImageToolbar = () => {
        return applyFilters('gutenverse.button.url-toolbar',
            <URLToolbar
                url={url}
                setAttributes={setAttributes}
                isSelected={isSelected}
                opensInNewTab={linkTarget === '_blank'}
                onToggleOpenInNewTab={onToggleOpenInNewTab}
                anchorRef={blockProps.ref}
                usingDynamic={true}
                setPanelState={setPanelState}
                panelState={imagePanelState}
                title="Item Link"
                panelIsClicked={panelIsClicked}
                setPanelIsClicked={setPanelIsClicked}
            />,
            props,
            imagePanelState
        );
    };

    return <>
        <CopyElementToolbar {...props}/>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} panelState={panelState} setPanelIsClicked={setPanelIsClicked} />
        {imgSrc && <BlockControls>
            <ToolbarGroup>
                <ImagePicker {...props}>
                    {({ open }) => <ToolbarButton
                        name="pick"
                        icon={<Image style={{ color: '#000', fill: '#fff' }} />}
                        title={__('Change Image', 'gutenverse')}
                        onClick={open}
                    />}
                </ImagePicker>
                <ImageToolbar />
            </ToolbarGroup>
        </BlockControls>}
        {rootBlock && rootBlock.name === 'gutenverse/client-logo' ? <div id={elementId}>{blockElement}</div> : blockElement}
    </>;
});

export default ImageBlock;