import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle, withMouseMoveEffect } from 'gutenverse-core/hoc';
import {
    BlockControls,
    MediaUpload,
    MediaUploadCheck,
    useBlockProps,
    useInnerBlocksProps
} from '@wordpress/block-editor';
import { RichTextComponent, classnames } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { HighLightToolbar, URLToolbar } from 'gutenverse-core/toolbars';
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

const ImageBoxBody = ({ setAttributes, attributes, clientId, titleRef, descRef, elementRef, setPanelState }) => {
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
        separateButtonLink
    } = attributes;

    const isGlobalLinkSet = url !== undefined && url !== '';

    if (isGlobalLinkSet) {
        setAttributes({ hasGlobalLink: isGlobalLinkSet });
    } else setAttributes({ hasGlobalLink: false });

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
            <div {...innerBlockProps} />
            {hoverBottom && <div className={'border-bottom'}>
                <div className={`animated ${hoverBottomDirection}`}></div>
            </div>}
        </div>
    </div>;
};

const ImageBoxBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('image-box'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        setAttributes,
        isSelected,
        setElementRef,
        setPanelState
    } = props;

    const {
        elementId,
        url,
        rel,
        linkTarget,
        contentStyle,
        dynamicUrl,
    } = attributes;
    HighLightToolbar(props);
    const imageBoxRef = useRef();
    const descRef = useRef();
    const titleRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [dynamicHref, setDynamicHref] = useState();
    applyFilters(
        'gutenverse.pro.dynamic.toolbar',
    );

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
        ref: imageBoxRef
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

    useEffect(() => {
        if (imageBoxRef.current) {
            setElementRef(imageBoxRef.current);
        }
    }, [imageBoxRef]);

    const panelState = {
        panel: 'setting',
        section: 3,
    };

    useEffect(() => {
        const dynamicUrlcontent = applyFilters(
            'gutenverse.dynamic.fetch-url',
            dynamicUrl
        );

        dynamicUrlcontent && dynamicUrlcontent
            .then(result => {
                if ((!Array.isArray(result) || result.length > 0) && result !== undefined && result !== dynamicHref) {
                    setDynamicHref(result);
                } else if (result !== dynamicHref) setDynamicHref(undefined);
            }).catch(error => {
                console.error(error);
            });
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
        <PanelController panelList={panelList} {...props} />
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