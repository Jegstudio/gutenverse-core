import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import {
    BlockControls,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    useBlockProps,
    useInnerBlocksProps
} from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { URLToolbar } from 'gutenverse-core/toolbars';
import { useCallback } from '@wordpress/element';
import { Image } from 'react-feather';
import { imagePlaceholder } from 'gutenverse-core/config';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { dispatch, useSelect } from '@wordpress/data';
import { isEmpty } from 'lodash';

const NEW_TAB_REL = 'noreferrer noopener';

export const ImageBoxFigure = attributes => {
    const { image, imageAlt } = attributes;
    const { media = {}, size } = image || {};
    const { imageId, sizes = {} } = media || {};

    const imageAltText = imageAlt || null;

    // Handle if empty, pick the 'full' size. If 'full' size also not exist, return placeholder image.

    if (isEmpty(sizes)) {
        return <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={imageAltText} />;
    }

    let imageSrc = sizes[size];

    if (isEmpty(imageSrc)) {
        if (isEmpty(sizes['full'])) {
            return <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={imageAltText} />;
        }

        imageSrc = sizes['full'];
    }

    if (imageId && imageSrc) {
        return <img className="gutenverse-image-box-filled" src={imageSrc.url} height={imageSrc.height} width={imageSrc.width} alt={imageAltText} />;
    }

    return <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={imageAltText} />;
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

const ImageBoxBody = ({ setAttributes, attributes, clientId }) => {
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
        title,
        titleIconPosition,
        description,
        titleIcon,
        hoverBottom,
        hoverBottomDirection,
        url,
        rel,
        linkTarget,
        separateButtonLink
    } = attributes;

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
                <RichText
                    tagName={'span'}
                    aria-label={__('Image Box Title', 'gutenverse')}
                    placeholder={__('Image Box Title', 'gutenverse')}
                    value={title}
                    onChange={value => setAttributes({ title: value })}
                    withoutInteractiveFormatting
                />
                {titleIconPosition === 'after' && titleIcon !== '' && <i className={titleIcon} />}
            </TitleTag>
            <RichText
                className={'body-description'}
                tagName="p"
                aria-label={__('Image Box Description', 'gutenverse')}
                placeholder={__('Image Box Description', 'gutenverse')}
                value={description}
                onChange={value => setAttributes({ description: value })}
                withoutInteractiveFormatting
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
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setAttributes,
        isSelected,
        setElementRef
    } = props;

    const {
        elementId,
        url,
        rel,
        linkTarget,
        contentStyle,
    } = attributes;

    const imageBoxRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            elementId,
            animationClass,
            displayClass,
            'gutenverse-image-box',
            'guten-element',
            'no-margin',
            `style-${contentStyle}`
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

    return <>
        <BlockControls>
            <ToolbarGroup>
                <URLToolbar
                    url={url}
                    setAttributes={setAttributes}
                    isSelected={isSelected}
                    opensInNewTab={linkTarget === '_blank'}
                    onToggleOpenInNewTab={onToggleOpenInNewTab}
                    anchorRef={blockProps.ref}
                />
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
            <div className="image-box-header">
                <ImageBoxFigure {...attributes} />
            </div>
            <ImageBoxBody {...props} />
        </div>
    </>;
});

export default ImageBoxBlock;