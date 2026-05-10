import { useRef, useState } from '@wordpress/element';
import { createPortal } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { __ } from '@wordpress/i18n';
import { Trash } from 'react-feather';
import { MediaUpload } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { gutenverseRoot, svgAtob } from 'gutenverse-core/helper';
import IconLibrary from './icon-library';
import { convertIconToSvg } from './icon-svg-control';
import { Spinner } from '@wordpress/components';
import axios from 'axios';

const SVGControl = (props) => {
    const {
        label,
        allowDeviceControl,
        onValueChange,
        value
    } = props;

    const [openIconLibrary, setOpenIconLibrary] = useState(false);
    const [isSvgLoading, setSvgLoading] = useState(false);
    const abortControllerRef = useRef(null);
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

    const onCancelConvertSVG = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            setSvgLoading(false);
        }
    };

    const onSelectIcon = (iconName, retries = 5, delay = 50) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;
        setSvgLoading(true);

        convertIconToSvg(iconName, retries, delay, controller.signal).then(encodedSVG => {
            if (encodedSVG) {
                onChange(encodedSVG);
            } else {
                onChange('');
                alert('Cannot Fetch Related SVG');
            }
        }).catch((e) => {
            if (axios.isCancel(e)) {
                return;
            }

            if (0 === retries) {
                onChange('');
                alert('Cannot Fetch Related SVG');
            } else {
                setTimeout(() => onSelectIcon(iconName, retries - 1, delay), delay);
            }
        }).finally(() => {
            setSvgLoading(false);
        });
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
                        {value && <div className={'icon-remove'} onClick={e => removeSVG(e)}>
                            <Trash />
                        </div>}
                        <div className={'icon-preview'} style={{
                            backgroundSize: '20px 20px',
                            backgroundPosition: '0 0, 10px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {isSvgLoading ? <Spinner style={{ margin: 0 }} /> : value ? <div dangerouslySetInnerHTML={{ __html: svgAtob(value) }} style={{ display: 'flex' }} /> : null}
                        </div>
                        <div className={`icon-overlay ${!value ? 'always-show' : ''}`}>
                            {isSvgLoading ? (
                                <button className={'gutenverse-button'} onClick={onCancelConvertSVG}>
                                    {__('Cancel', '--gctd--')}
                                </button>
                            ) : (
                                <div className={'button-group'}>
                                    <button className={'gutenverse-button'} onClick={() => setOpenIconLibrary(true)}>
                                        {__('Icon Library', '--gctd--')}
                                    </button>
                                    <button className={'gutenverse-button'} onClick={open}>
                                        {__('Upload SVG', '--gctd--')}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className={'icon-change'}>
                            <div className={'upload-svg'} onClick={open}>
                                {__('Upload SVG', '--gctd--')}
                            </div>
                        </div>
                    </div>
                )}
            />
        </div>

        {openIconLibrary && createPortal(<IconLibrary
            closeLibrary={() => setOpenIconLibrary(false)}
            value={''}
            onChange={onSelectIcon}
        />, gutenverseRoot)}
    </div>;
};

export default compose(withParentControl, withDeviceControl)(SVGControl);
