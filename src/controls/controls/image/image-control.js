
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

const ALLOWED_MEDIA_TYPES = ['image'];

const ImageControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = {},
        onValueChange,
        onStyleChange,
        description = '',
        useExternalValue = false,
        externalValue = {},
    } = props;

    const newValue = useExternalValue ? externalValue : value;
    const {id: imageId, image} = newValue;
    const id = useInstanceId(ImageControl, 'inspector-image-control');
    const previousUseExternalValue = useRef(useExternalValue);

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    const removeImage = (e) => {
        e.stopPropagation();
        onChange({});
    };

    useEffect(() => {
        if (useExternalValue) {
            onChange(externalValue);
        } else if (previousUseExternalValue.current) {
            onChange({});
        }

        previousUseExternalValue.current = useExternalValue;
    },[useExternalValue]);

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
                        id: useExternalValue ? imageId : media.id,
                        image: useExternalValue ? image : media.sizes.full.url
                    })}
                    allowedTypes={ALLOWED_MEDIA_TYPES}
                    value={imageId}
                    render={({open}) => {
                        if (imageId) {
                            return <>
                                <div className={'image-placeholder'} onClick={useExternalValue ? null : open} >
                                    <div className={'image-remove'} onClick={e => useExternalValue ? e.preventDefault() : removeImage(e)} >
                                        <Trash/>
                                    </div>
                                    <div className={'image-preview'} style={{ backgroundImage: `url(${image})` }} />
                                    <div className={'image-change'}>{__('Change Image', '--gctd--')}</div>
                                </div>
                            </>;
                        } else {
                            return <Button className={'select-image'} onClick={useExternalValue ? null : open} >
                                {__('Select Image', '--gctd--')}
                            </Button>;
                        }
                    }}/>
            </MediaUploadCheck>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(ImageControl);