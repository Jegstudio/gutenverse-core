
import {useInstanceId} from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import {MediaUploadCheck, MediaUpload} from '@wordpress/block-editor';
import {Button} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {Trash} from 'react-feather';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { ucfirst } from 'gutenverse-core/helper';
import { SelectControl } from 'gutenverse-core/controls';

const ALLOWED_MEDIA_TYPES = ['image'];

const ImageSizeControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = {},
        onValueChange,
        onStyleChange,
        description = '',
    } = props;

    const {media = {}, size = 'full' } = value;
    const {imageId, sizes = {}} = media;

    const id = useInstanceId(ImageSizeControl, 'inspector-image-size-control');

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    const removeImage = (e) => {
        e.stopPropagation();
        onChange({});
    };

    const changeImage = media => {
        onChange({
            media: {
                imageId: media.id,
                sizes: media.sizes
            },
            size: size
        });
    };

    const getSize = () => {
        return Object.keys(sizes).map(key => {
            const detail = sizes[key];
            const title = ucfirst(key);
            return {
                label: `${title} (${detail.height}x${detail.width})`,
                value: key,
            };
        });
    };

    return <>
        <div className={'gutenverse-control-wrapper gutenverse-control-image'}>
            <ControlHeadingSimple
                id={`${id}-image`}
                label={label}
                description={description}
                allowDeviceControl={allowDeviceControl}
            />
            <div className={'control-body'}>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={changeImage}
                        allowedTypes={ALLOWED_MEDIA_TYPES}
                        value={imageId}
                        render={({open}) => {
                            if (imageId) {
                                return <>
                                    <div className={'image-placeholder'} onClick={open}>
                                        <div className={'image-remove'} onClick={e => removeImage(e)}>
                                            <Trash/>
                                        </div>
                                        <div className={'image-preview'} style={{backgroundImage: `url(${sizes.full.url})`}}/>
                                        <div className={'image-change'}>{__('Change Image', 'gutenverse')}</div>
                                    </div>
                                </>;
                            } else {
                                return <Button
                                    className={'select-image'}
                                    onClick={open}>
                                    {__('Select Image', 'gutenverse')}
                                </Button>;
                            }
                        }}/>
                </MediaUploadCheck>
            </div>
        </div>
        {imageId && <div className={'gutenverse-control-image-upload'}>
            <div className={'control-body'}>
                <SelectControl
                    label={__('Image Size', 'gutenverse')}
                    value={size}
                    onValueChange={size => onValueChange({...value, size})}
                    onStyleChange={size => onStyleChange({...value, size})}
                    options={getSize()}
                />
            </div>
        </div>}
    </>;
};

export default compose(withParentControl, withDeviceControl)(ImageSizeControl);