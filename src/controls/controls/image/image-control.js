
import {useInstanceId} from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import {MediaUploadCheck, MediaUpload} from '@wordpress/block-editor';
import {Button} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {Trash} from 'react-feather';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core-editor/hoc';
import { withDeviceControl } from 'gutenverse-core-editor/hoc';

const ALLOWED_MEDIA_TYPES = ['image'];

const ImageControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = {},
        onValueChange,
        onStyleChange,
        description = '',
    } = props;

    const {id: imageId, image} = value;
    const id = useInstanceId(ImageControl, 'inspector-image-control');

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    const removeImage = (e) => {
        e.stopPropagation();
        onChange({});
    };

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
                        image: media.sizes.full.url
                    })}
                    allowedTypes={ALLOWED_MEDIA_TYPES}
                    value={value.id}
                    render={({open}) => {
                        if (imageId) {
                            return <>
                                <div className={'image-placeholder'} onClick={open}>
                                    <div className={'image-remove'} onClick={e => removeImage(e)}>
                                        <Trash/>
                                    </div>
                                    <div className={'image-preview'} style={{backgroundImage: `url(${image})`}}/>
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
    </div>;
};

export default compose(withParentControl, withDeviceControl)(ImageControl);