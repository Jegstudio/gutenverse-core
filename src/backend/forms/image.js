
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Trash } from 'react-feather';
import { v4 as uuidv4 } from 'uuid';

const ControlImage = (props) => {
    const {
        id,
        title,
        description,
        value = {},
        customLabel,
        defaultValue = '',
        updateValue,
        isRequired = false,
        allowedMediaTypes = ['image']
    } = props;

    let uuid = uuidv4();
    const { id: imageId, image } = value;

    const onChange = value => {
        updateValue(id, value);
    };

    const removeImage = (e) => {
        e.stopPropagation();
        onChange({});
    };

    const frame = wp.media({
        title: 'Select Image',
        button: { text: 'Use image' },
        multiple: false
    });

    frame.on('select', function () {
        const attachment = frame.state().get('selection').first().toJSON();
        onChange({
            id: attachment?.id,
            image: attachment?.sizes.full.url,
            width: attachment?.sizes.full.width,
            height: attachment?.sizes.full.height,
            altOriginal: attachment?.alt,
        });
    });

    const EmptyWrapper = () => <div className="empty-wrapper" onClick={() => frame.open()}>
        <div className="gutenverse-icon-svg upload-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none"><path d="M6.66602 13.3333L9.99935 10M9.99935 10L13.3327 13.3333M9.99935 10V17.5M16.666 13.9524C17.6839 13.1117 18.3327 11.8399 18.3327 10.4167C18.3327 7.88536 16.2807 5.83333 13.7493 5.83333C13.5673 5.83333 13.3969 5.73833 13.3044 5.58145C12.2177 3.73736 10.2114 2.5 7.91602 2.5C4.46424 2.5 1.66602 5.29822 1.66602 8.75C1.66602 10.4718 2.36222 12.0309 3.48847 13.1613" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
        <span className="upload-text">
            <strong>{__('Click to upload', '--gctd--')}</strong>
            {__(' or drag and drop', '--gctd--')}
        </span>
        <span className="sugested-text">{__('Suggested max. file size : 1MB', '--gctd--')}</span>
    </div>;

    const FilledWrapper = () => <div className="filled-wrapper" style={{ backgroundImage: `url(${value.image})` }}>
        <div className="gutenverse-icon-svg trash-icon" onClick={removeImage}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 10" fill="none"><path d="M5.33333 2.6V2.28C5.33333 1.83196 5.33333 1.60794 5.26067 1.43681C5.19676 1.28628 5.09477 1.16389 4.96933 1.08719C4.82672 1 4.64004 1 4.26667 1H3.73333C3.35996 1 3.17328 1 3.03067 1.08719C2.90523 1.16389 2.80324 1.28628 2.73933 1.43681C2.66667 1.60794 2.66667 1.83196 2.66667 2.28V2.6M3.33333 4.8V6.8M4.66667 4.8V6.8M1 2.6H7M6.33333 2.6V7.08C6.33333 7.75206 6.33333 8.0881 6.22434 8.34479C6.12847 8.57058 5.97549 8.75416 5.78732 8.86921C5.57341 9 5.29339 9 4.73333 9H3.26667C2.70661 9 2.42659 9 2.21268 8.86921C2.02451 8.75416 1.87153 8.57058 1.77566 8.34479C1.66667 8.0881 1.66667 7.75206 1.66667 7.08V2.6" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
        <div class="choose-image" onClick={() => frame.open()}>
            <span>Choose Image</span>
        </div>
    </div>;

    return <div className="control-wrapper control-image">
        <label className="control-title" htmlFor={`${id}-${uuid}`} style={customLabel}>{title} {isRequired && <span style={{ color: 'red' }}> *</span>}</label>
        <div className={'control-body'}>
            {imageId && image ? <FilledWrapper /> : <EmptyWrapper />}
        </div>
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>;
};

export default ControlImage;