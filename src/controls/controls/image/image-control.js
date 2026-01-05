
import {useInstanceId} from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import {MediaUploadCheck, MediaUpload} from '@wordpress/block-editor';
import {Button} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {Trash} from 'react-feather';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { useEffect, useRef } from '@wordpress/element';
import { getDeviceType } from 'gutenverse-core/editor-helper';

const ALLOWED_MEDIA_TYPES = ['image'];

const ImageControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = {},
        onValueChange,
        description = '',
        useExternalValue,
        externalValue = {},
    } = props;

    const newValue = useExternalValue ? externalValue : value;
    const deviceType = getDeviceType();
    const {id: imageId, image} = newValue;
    const id = useInstanceId(ImageControl, 'inspector-image-control');
    const prevUseExternalValue = useRef();
    const prevDevice = useRef();

    const onChange = value => {
        onValueChange(value);
    };

    const removeImage = (e) => {
        e.stopPropagation();
        onChange({});
    };

    const deviceTypeHierarchy = {
        Mobile: 1,
        Tablet: 2,
        Desktop: 3,
    };

    useEffect(() => {
        prevDevice.current = deviceType;
        if (prevUseExternalValue.current === true && (deviceTypeHierarchy[prevDevice.current] < deviceTypeHierarchy[deviceType])) {
            if (!useExternalValue) {
                onChange({});
            } else {
                onChange(newValue);
            }
        } else {
            if (useExternalValue) {
                onChange(newValue);
            }
        }

        prevDevice.current = deviceType;
        prevUseExternalValue.current = useExternalValue;
    },[deviceType, useExternalValue]);

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-image'}>
        <ControlHeadingSimple
            id={`${id}-image`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={(media) => onChange({
                        id: media.id,
                        image: media.sizes.full.url,
                        width: media.sizes.full.width,
                        height: media.sizes.full.height,
                        altOriginal: media.alt,
                    })}
                    allowedTypes={ALLOWED_MEDIA_TYPES}
                    value={imageId}
                    render={({open}) => {
                        if (imageId) {
                            return <>
                                <div className={'image-placeholder'} onClick={useExternalValue ? null : open} >
                                    {!useExternalValue && <div className={'image-remove'} onClick={e => removeImage(e)} >
                                        <Trash/>
                                    </div>}
                                    <div className={'image-preview'} style={{ backgroundImage: `url(${image})` }} />
                                    {!useExternalValue && <div className={'image-change'}>{__('Change Image', '--gctd--')}</div>}
                                </div>
                            </>;
                        } else {
                            return <Button className={'select-image'} onClick={open} >
                                {__('Select Image', '--gctd--')}
                            </Button>;
                        }
                    }}/>
            </MediaUploadCheck>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(ImageControl);