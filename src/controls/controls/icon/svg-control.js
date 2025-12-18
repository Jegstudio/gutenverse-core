import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { __ } from '@wordpress/i18n';
import { Trash } from 'react-feather';
import { MediaUpload } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { svgAtob } from 'gutenverse-core/helper';

const SVGControl = (props) => {
    const {
        label,
        allowDeviceControl,
        onValueChange,
        value
    } = props;

    const instanceId = useInstanceId(SVGControl, 'inspector-icon-control');

    const onChange = value => {
        onValueChange(value);
    };

    const removeSVG = (e) => {
        e.stopPropagation();
        onChange('');
    };

    const onSelectSVG = (media) => {
        if (media.url) {
            // Fetch SVG content and store as string
            fetch(media.url)
                .then(response => response.text())
                .then(svgContent => {
                    const encodedSVG = btoa(svgContent);
                    onChange(encodedSVG);
                })
                .catch((error) => {
                    console.error('Failed to fetch SVG content:', error);
                    // Fallback: store empty string
                    onChange('');
                });
        }
    };

    return <div id={instanceId} className={'gutenverse-control-wrapper gutenverse-control-icon'}>
        <ControlHeadingSimple
            id={`${instanceId}-svg`}
            label={label}
            allowDeviceControl={allowDeviceControl}
        />

        <div className={'control-body'}>
            <MediaUpload
                onSelect={onSelectSVG}
                allowedTypes={['image/svg+xml']}
                value={undefined}
                render={({ open }) => (
                    <div className={'icon-wrapper'}>
                        <div className={'icon-remove'} onClick={e => removeSVG(e)}>
                            <Trash />
                        </div>
                        <div className={'icon-preview'} onClick={open} style={{
                            backgroundSize: '20px 20px',
                            backgroundPosition: '0 0, 10px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {value ? <div dangerouslySetInnerHTML={{ __html: svgAtob(value) }} style={{ display: 'flex' }} /> : null}
                        </div>
                        <div className={'icon-change'}>
                            <div className={'upload-svg'}>
                                {__('Upload SVG', '--gctd--')}
                            </div>
                        </div>
                    </div>
                )}
            />
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(SVGControl);