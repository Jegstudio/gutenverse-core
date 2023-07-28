import { useCallback } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { Image } from 'react-feather';
import { withCustomStyle } from 'gutenverse-core/hoc';
// import ReactCrop from 'react-image-crop';
import { BlockControls, useBlockProps, MediaUploadCheck, MediaUpload, } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import classnames from 'classnames';
// import { createBlobURL, revokeBlobURL } from '@wordpress/blob';
import { useSelect } from '@wordpress/data';
import { panelList } from './panels/panel-list';
import { PanelController } from 'gutenverse-core/controls';
import { URLToolbar } from 'gutenverse-core/toolbars';
// import ImageRatioToolbar from './components/image-ratio-toolbar';
import { imagePlaceholder } from 'gutenverse-core/config';
import { useEffect } from '@wordpress/element';
import { useRef } from '@wordpress/element';
import { isEmpty } from 'lodash';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';

const NEW_TAB_REL = 'noreferrer noopener';

// const isCropValid = (crop = {}) => {
//     const { height = 0, width = 0 } = crop;

//     return height !== 0 && width !== 0;
// };

export const ImageBoxFigure = attributes => {
    const { imgSrc, altType, altOriginal, altCustom } = attributes;
    const { media = {}, size } = imgSrc || {};
    const { imageId, sizes = {} } = media || {};

    let alt = null;

    switch (altType) {
        case 'original':
            alt = altOriginal;
            break;
        case 'custom':
            alt = altCustom;
            break;
    }

    if (imageId) {
        const imageSrc = sizes[size];
        return <img className="gutenverse-image-box-filled" src={imageSrc.url} height={imageSrc.height} width={imageSrc.width} alt={alt} />;
    } else {
        return <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={alt} />;
    }
};

// const ImageCrop = (props) => {
//     const {
//         attributes,
//         crop,
//         setCrop,
//         setCroppedImageSrc
//     } = props;

//     const {
//         imgSrc
//     } = attributes;

//     const [imgRef, setImgRef] = useState(null);
//     const [fileSrc, setFileSrc] = useState(imgSrc);

//     const onCropComplete = crop => {
//         imageCrop(crop);
//     };

//     const getCroppedImg = (image, crop, filename) => {
//         const canvas = document.createElement('canvas');
//         const scaleX = image.naturalWidth / image.width;
//         const scaleY = image.naturalHeight / image.height;
//         canvas.width = crop.width;
//         canvas.height = crop.height;
//         const ctx = canvas.getContext('2d');

//         ctx.drawImage(
//             image,
//             crop.x * scaleX,
//             crop.y * scaleY,
//             crop.width * scaleX,
//             crop.height * scaleY,
//             0,
//             0,
//             crop.width,
//             crop.height
//         );

//         return new Promise((resolve, reject) => {
//             canvas.toBlob(blob => {
//                 if (!blob) {
//                     reject(new Error('Canvas is empty'));
//                     return;
//                 }

//                 blob.name = `${filename[0]}-cropped.${filename[1]}`;
//                 revokeBlobURL(fileSrc);
//                 const imgSrc = createBlobURL(blob);
//                 setFileSrc(imgSrc);
//                 resolve(imgSrc);
//             }, `image/${filename[1]}`);
//         });
//     };

//     const imageCrop = async (crop) => {
//         const filename = imgSrc.substring(imgSrc.lastIndexOf('/') + 1).split('.');

//         if (imgRef && isCropValid(crop)) {
//             const croppedImageSrc = await getCroppedImg(
//                 imgRef,
//                 crop,
//                 filename
//             );

//             setCroppedImageSrc(croppedImageSrc);
//         }
//     };

//     return <ReactCrop
//         src={imgSrc}
//         crop={crop}
//         onImageLoaded={setImgRef}
//         onChange={setCrop}
//         onComplete={onCropComplete}
//     />;
// };

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
    withCustomStyle(panelList),
    withAnimationAdvance('image'),
    withCopyElementToolbar()
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
        setElementRef,
        setAdanimRef
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
        // ratio
    } = attributes;

    const defaultSrc = imagePlaceholder;
    const rootBlockId = getBlockRootClientId(clientId);
    const rootBlock = rootBlockId ? getBlock(rootBlockId) : null;
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    // const [crop, setCrop] = useState({});
    /* const [cropping, setCropping] = useState(false); */
    // const [croppedImageSrc, setCroppedImageSrc] = useState(null);
    const imageRef = useRef();

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
            }
        ),
        ref: imageRef
    });

    // const mediaUpload = useSelect((select) => {
    //     const { getSettings } = select(blockEditorStore);
    //     return getSettings().mediaUpload;
    // });

    /* const reset = () => {
        setCrop({});
        setCropping(false);
    }; */

    // const imageProps = {
    //     ...props,
    //     crop,
    //     setCrop,
    //     croppedImageSrc,
    //     setCroppedImageSrc
    // };

    /* const saveCrop = () => {
        reset();
        setAttributes({ imgSrc: croppedImageSrc });
        const file = getBlobByURL(croppedImageSrc);

        if (file) {
            mediaUpload({
                filesList: [file],
                onFileChange: ([image]) => {
                    if (image && image.url) {
                        setAttributes({ imgSrc: image.url });
                    }
                },
                allowedTypes: ['image'],
                onError: () => { },
            });
        }
    }; */

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

    const blockElement = <div {...blockProps}>
        {!isEmpty(imgSrc) ? (
            /* cropping ? <ImageCrop {...imageProps} /> :  */<a className="guten-image-wrapper" href={url} target={linkTarget} rel={rel}><ImageBoxFigure {...attributes} /></a>
        ) : <ImagePicker {...props}>{({ open }) => <img src={defaultSrc} onClick={open} />}</ImagePicker>}
        {caption()}
    </div>;

    useEffect(() => {
        if (imageRef.current) {
            setElementRef(imageRef.current);
            setAdanimRef && setAdanimRef(imageRef.current);
        }
    }, [imageRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        {imgSrc && <BlockControls>
            <ToolbarGroup>
                {/* <ToolbarButton
                    name='crop'
                    icon={<Crop style={{ color: cropping ? "#0071a1" : "#000", fill: '#fff' }} />}
                    title={__('Crop Image', 'gutenverse')}
                    onClick={() => setCropping(true)}
                /> */}
                <ImagePicker {...props}>
                    {({ open }) => <ToolbarButton
                        name="pick"
                        icon={<Image style={{ color: '#000', fill: '#fff' }} />}
                        title={__('Change Image', 'gutenverse')}
                        onClick={open}
                    />}
                </ImagePicker>
                <URLToolbar
                    url={url}
                    setAttributes={setAttributes}
                    isSelected={isSelected}
                    opensInNewTab={linkTarget === '_blank'}
                    onToggleOpenInNewTab={onToggleOpenInNewTab}
                    anchorRef={blockProps.ref}
                />
            </ToolbarGroup>
            {/* {cropping && <ToolbarGroup>
                <ToolbarButton
                    name='save'
                    icon={<Check style={{ color: "#000", fill: '#fff' }} />}
                    title={__('Save Crop', 'gutenverse')}
                    isDisabled={!isCropValid(crop)}
                    onClick={saveCrop}
                />
                <ToolbarButton
                    name='cancel'
                    icon={<X style={{ color: "#000", fill: '#fff' }} />}
                    title={__('Cancel Crop', 'gutenverse')}
                    onClick={reset}
                />
                <ImageRatioToolbar
                    ratio={ratio}
                    setCrop={setCrop}
                    {...props}
                />
            </ToolbarGroup>} */}
        </BlockControls>}
        {rootBlock && rootBlock.name === 'gutenverse/client-logo' ? <div id={elementId}>{blockElement}</div> : blockElement}
    </>;
});

export default ImageBlock;