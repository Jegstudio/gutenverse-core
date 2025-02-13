import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import {
    BlockControls,
    MediaUpload,
    MediaUploadCheck,
    useBlockProps,
    useInnerBlocksProps
} from '@wordpress/block-editor';
import { RichTextComponent, classnames } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { HighLightToolbar, URLToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import { useCallback } from '@wordpress/element';
import { Image } from 'gutenverse-core/components';
import { imagePlaceholder } from 'gutenverse-core/config';
import { useRef, useState } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { dispatch, useSelect } from '@wordpress/data';
import { isEmpty } from 'lodash';
import { applyFilters } from '@wordpress/hooks';
import { isOnEditor } from 'gutenverse-core/helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const NEW_TAB_REL = 'noreferrer noopener';

export const ImageBoxFigure = attributes => {
    const { image, imageAlt, lazyLoad } = attributes;
    const { media = {}, size } = image || {};
    const { imageId, sizes = {} } = media || {};

    const imageAltText = imageAlt || null;

    // Handle if empty, pick the 'full' size. If 'full' size also not exist, return placeholder image.
    const imageLazyLoad = () => {
        if (lazyLoad) {
            return <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={imageAltText} loading="lazy" />;
        } else {
            return <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={imageAltText} />;
        }
    };
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

const ImageBoxPicker = (props) => {
    const {
        attributes = {},
        setAttributes,
        children,
    } = props;

    const { image = {} } = attributes;
    const { media = {} } = image;
    const { imageId } = media;

    const onImageSelect = (media) => {
        setAttributes({
            image: {
                media: {
                    imageId: media.id,
                    sizes: media.sizes
                },
                size: 'full'
            }
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

const ImageBoxBody = ({ setAttributes, attributes, clientId, titleRef, descRef, setPanelState }) => {
    const {
        getBlocks
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        updateBlockAttributes
    } = dispatch('core/block-editor');

    const {
        titleTag: TitleTag,
        titleIconPosition,
        titleIcon,
        hoverBottom,
        hoverBottomDirection,
        url,
        rel,
        linkTarget,
        separateButtonLink,
        includeButton
    } = attributes;

    const isGlobalLinkSet = url !== undefined && url !== '';

    const hasInnerBlocks = useSelect(select => {
        const block = select('core/block-editor').getBlock(clientId);
        return block && block.innerBlocks.length > 0;
    }, [clientId]);

    const buttonUrl = useSelect(select => {
        const block = select('core/block-editor').getBlock(clientId);
        return block && block.innerBlocks[0]?.attributes.url;
    }, [clientId]);

    useEffect(() => {
        setAttributes({
            hasInnerBlocks,
            separateButtonLink: hasInnerBlocks,
            buttonUrl,
            hasGlobalLink: isGlobalLinkSet ? isGlobalLinkSet : false,
        });
    }, [hasInnerBlocks, buttonUrl, isGlobalLinkSet]);

    const blockProps = useBlockProps({
        className: classnames(
            'button-wrapper',
        ),
    });

    const innerBlockProps = useInnerBlocksProps(
        blockProps,
        {
            template: [['gutenverse/button']],
            allowedBlocks: ['gutenverse/button'],
        }
    );

    useEffect(() => {
        !separateButtonLink && getBlocks(clientId).map(block => {
            updateBlockAttributes(block.clientId, { url, rel, linkTarget });
        });
    }, [url, rel, linkTarget, separateButtonLink]);

    return <div className="image-box-body">
        <div className="body-inner">
            <TitleTag className={classnames(
                'body-title',
                `icon-position-${titleIconPosition}`
            )}>
                {titleIconPosition === 'before' && titleIcon !== '' && <i className={titleIcon} />}
                <RichTextComponent
                    ref={titleRef}
                    tagName={'span'}
                    aria-label={__('Image Box Title', 'gutenverse')}
                    placeholder={__('Image Box Title', 'gutenverse')}
                    onChange={value => setAttributes({ title: value })}
                    multiline={false}
                    setAttributes={setAttributes}
                    attributes={attributes}
                    clientId={clientId}
                    panelDynamic={{ panel: 'setting', section: 4 }}
                    panelPosition={{ panel: 'style', section: 1 }}
                    contentAttribute={'title'}
                    setPanelState={setPanelState}
                    textChilds={'titleChilds'}
                    dynamicList={'titleDynamicList'}
                    isUseDinamic={true}
                    isUseHighlight={true}
                    parentHasLink={isGlobalLinkSet}
                />
                {titleIconPosition === 'after' && titleIcon !== '' && <i className={titleIcon} />}
            </TitleTag>
            <RichTextComponent
                ref={descRef}
                classNames={'body-description'}
                tagName={'p'}
                aria-label={__('Image Box Description', 'gutenverse')}
                placeholder={__('Image Box Description', 'gutenverse')}
                onChange={value => setAttributes({ description: value })}
                multiline={false}
                setAttributes={setAttributes}
                attributes={attributes}
                clientId={clientId}
                panelDynamic={{ panel: 'setting', section: 4 }}
                panelPosition={{ panel: 'style', section: 1 }}
                contentAttribute={'description'}
                setPanelState={setPanelState}
                textChilds={'descriptionChilds'}
                dynamicList={'descriptionDynamicList'}
                isUseDinamic={true}
                isUseHighlight={true}
                parentHasLink={isGlobalLinkSet}
            />
            {includeButton && <div {...innerBlockProps} />}
            {hoverBottom && <div className={'border-bottom'}>
                <div className={`animated ${hoverBottomDirection}`}></div>
            </div>}
        </div>
    </div>;
};

const ImageBoxBlock = compose(
    withPartialRender,
    withAnimationAdvance('image-box'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        setAttributes,
        isSelected,
        clientId,
        setPanelState,
        panelIsClicked,
        setPanelIsClicked
    } = props;

    const {
        elementId,
        url,
        rel,
        linkTarget,
        contentStyle,
        dynamicUrl,
    } = attributes;

    FilterDynamic(props);
    HighLightToolbar(props);
    const elementRef = useRef();
    const descRef = useRef();
    const titleRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [dynamicHref, setDynamicHref] = useState();
    const [localAttr, setLocalAttr] = useState({});
    applyFilters(
        'gutenverse.pro.dynamic.toolbar',
    );

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef, localAttr);

    const blockProps = useBlockProps({
        className: classnames(
            elementId,
            animationClass,
            displayClass,
            'gutenverse-image-box',
            'guten-element',
            'no-margin',
            `style-${contentStyle}`,
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

    const panelState = {
        panel: 'setting',
        section: 3,
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

    return <>
        <BlockControls>
            <ToolbarGroup>
                {applyFilters('gutenverse.button.url-toolbar',
                    <URLToolbar
                        url={url}
                        setAttributes={setAttributes}
                        isSelected={isSelected}
                        opensInNewTab={linkTarget === '_blank'}
                        onToggleOpenInNewTab={onToggleOpenInNewTab}
                        anchorRef={blockProps.ref}
                        usingDynamic={true}
                        setPanelState={setPanelState}
                        panelState={panelState}
                        title="Item Link"
                        panelIsClicked={panelIsClicked}
                        setPanelIsClicked={setPanelIsClicked}
                    />,
                    props,
                    panelState
                )}
                <ImageBoxPicker {...props}>
                    {({ open }) => <ToolbarButton
                        name="pick"
                        icon={<Image style={{ color: '#000', fill: '#fff' }} />}
                        title={__('Change Image', 'gutenverse')}
                        onClick={open}
                    />}
                </ImageBoxPicker>
            </ToolbarGroup>
        </BlockControls>
        <BlockPanelController panelList={panelList} props={props} setLocalAttr={setLocalAttr} />
        <div {...blockProps}>
            <div className="inner-container">
                <div className="image-box-header">
                    <ImageBoxFigure {...attributes} />
                </div>
                <ImageBoxBody {...props} titleRef={titleRef} descRef={descRef} />
            </div>
        </div>
    </>;
});

export default ImageBoxBlock;