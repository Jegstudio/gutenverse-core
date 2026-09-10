import { useState, useEffect } from '@wordpress/element';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { ControlHeadingSimple } from 'gutenverse-core/controls';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

const TrashSvg = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 8 10" fill="none">
        <path d="M5.33333 2.6V2.28C5.33333 1.83196 5.33333 1.60794 5.26067 1.43681C5.19676 1.28628 5.09477 1.16389 4.96933 1.08719C4.82672 1 4.64004 1 4.26667 1H3.73333C3.35996 1 3.17328 1 3.03067 1.08719C2.90523 1.16389 2.80324 1.28628 2.73933 1.43681C2.66667 1.60794 2.66667 1.83196 2.66667 2.28V2.6M3.33333 4.8V6.8M4.66667 4.8V6.8M1 2.6H7M6.33333 2.6V7.08C6.33333 7.75206 6.33333 8.0881 6.22434 8.34479C6.12847 8.57058 5.97549 8.75416 5.78732 8.86921C5.57341 9 5.29339 9 4.73333 9H3.26667C2.70661 9 2.42659 9 2.21268 8.86921C2.02451 8.75416 1.87153 8.57058 1.77566 8.34479C1.66667 8.0881 1.66667 7.75206 1.66667 7.08V2.6" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>;
};


const MultiImageControl = (props) => {

    const {
        id,
        label,
        description = '',
        onValueChange,
        value = [],
    } = props;

    const [imageUrls, setImageUrls] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!Array.isArray(value) || value.length === 0) {
            setImageUrls({});
            return;
        }

        const idsToFetch = value.filter(imgId => !imageUrls[imgId]);
        if (idsToFetch.length === 0) return;

        setLoading(true);
        apiFetch({
            path: addQueryArgs('/wp/v2/media', {
                include: idsToFetch.join(','),
                per_page: idsToFetch.length,
                _fields: 'id,source_url',
            }),
        }).then(data => {
            setImageUrls(prev => {
                const updated = { ...prev };
                data.forEach(item => {
                    updated[item.id] = item.source_url;
                });
                return updated;
            });
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [value]);

    const onSelectImages = (media) => {
        const ids = media.map(img => img.id);
        const urls = {};
        media.forEach(img => {
            urls[img.id] = img.url;
        });
        setImageUrls(prev => ({ ...prev, ...urls }));
        onValueChange(ids);
    };

    const removeImage = (imgId) => {
        const newValue = value.filter(item => item !== imgId);
        onValueChange(newValue);
    };

    const PreviewImages = () => {
        return Array.isArray(value) && value.length ? value.map((imgId) => {
            const url = imageUrls[imgId];
            return <div key={imgId} className="gvnews-with-image" style={{ backgroundImage: url ? `url(${url})` : 'none' }}>
                <div className="gvnews-image-control">
                    <div className="gvnews-remove-image" onClick={() => removeImage(imgId)}>
                        <TrashSvg />
                    </div>
                </div>
            </div>;
        }) : '';
    };

    return <div className={'gutenverse-control-wrapper gvnews-multi-image-control'}>
        <ControlHeadingSimple
            id={`${id}-text`}
            label={label}
            description={description}
            allowDeviceControl={false}
        />
        {Array.isArray(value) && value.length ? <div className="gvnews-image-control-preview-wrapper"><PreviewImages /></div> : ''}
        <MediaUploadCheck>
            <MediaUpload
                onSelect={onSelectImages}
                allowedTypes={['image']}
                multiple
                value={value}
                gallery={true}
                render={({ open }) => (
                    <Button onClick={open} isBusy={loading}>
                        {__('Choose Images', '--gctd--')}
                    </Button>
                )}
            />
        </MediaUploadCheck>
    </div>;
};

export default MultiImageControl;
