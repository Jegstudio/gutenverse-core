import { useState } from '@wordpress/element';
import { createPortal } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { __ } from '@wordpress/i18n';
import { Trash2 } from 'react-feather';
import { MediaUpload } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { svgAtob, gutenverseRoot } from 'gutenverse-core/helper';
import { IconLibrary } from './icon-control';
import { isEmpty } from 'lodash';
import { libraryApi } from 'gutenverse-core/config';
import axios from 'axios';

const IconSVGControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = '',
        onValueChange,
        attributes,
        setAttributes,
        id,
        values,
        isSubAttribute = false,
        parentAttribute,
    } = props;

    const [openIconLibrary, setOpenIconLibrary] = useState(false);
    const instanceId = useInstanceId(IconSVGControl, 'inspector-icon-control');

    const typeAttribute = id ? `${id}Type` : '';
    const svgAttribute = id ? `${id}SVG` : '';

    const iconType = (attributes && attributes[typeAttribute]) ? attributes[typeAttribute] : (values && values[typeAttribute] ? values[typeAttribute] : (isSubAttribute && parentAttribute && parentAttribute[typeAttribute]) ? parentAttribute[typeAttribute] : 'icon');
    const svgValue = (attributes && attributes[svgAttribute]) ? attributes[svgAttribute] : (values && values[svgAttribute] ? values[svgAttribute] : (isSubAttribute && parentAttribute && parentAttribute[svgAttribute]) ? parentAttribute[svgAttribute] : {});

    const updateAttributes = (newAttributes) => {
        if (setAttributes) {
            if (isSubAttribute && parentAttribute?.id) {
                setAttributes({
                    [parentAttribute.id]: {
                        ...parentAttribute,
                        ...newAttributes
                    }
                });
            } else setAttributes(newAttributes);
        } else if (values && values.setAttributes) {
            values.setAttributes(newAttributes);
        }
    };

    const onChange = value => {
        onValueChange(value);
    };

    const removeIcon = (e) => {
        e.stopPropagation();
        onChange('');
    };

    const removeSVG = (e) => {
        e.stopPropagation();
        if (svgAttribute) {
            updateAttributes({ [svgAttribute]: '' });
        }
    };

    const onSelectSVG = (media) => {
        if (svgAttribute && media.url) {
            // Fetch SVG content and store as string
            fetch(media.url)
                .then(response => response.text())
                .then(svgContent => {
                    const encodedSVG = btoa(svgContent);
                    updateAttributes({ [svgAttribute]: encodedSVG });
                })
                .catch((error) => {
                    console.error('Failed to fetch SVG content:', error);
                    updateAttributes({ [svgAttribute]: '' });
                });
        }
    };

    const setType = async (type, retries = 5, delay = 50, force = false, justAttr = true) => {
        if (typeAttribute) {
            updateAttributes({ [typeAttribute]: type });

            if ('svg' === type && (isEmpty(svgValue) || force) && !isEmpty(value) && !justAttr) {
                axios.get(libraryApi + '/get-svg-font', {
                    params: {
                        name: value.toLowerCase()
                    }
                }).then(response => {
                    const { data } = response;
                    if (false !== data.data) {
                        const encodedSVG = btoa(data.data);
                        updateAttributes({ [svgAttribute]: encodedSVG });
                    } else {
                        console.error('cannot find the icon', value);
                    }
                }).catch(() => {
                    if (0 === retries) {
                        updateAttributes({ [svgAttribute]: '' });
                        alert('Cannot Fetch Related SVG');
                    } else {
                        setTimeout(() => setType(type, retries - 1, delay, force, justAttr), delay);
                    }
                });
            }
        }
    };

    return <div id={instanceId} className={'gutenverse-control-wrapper gutenverse-control-icon'}>
        <ControlHeadingSimple
            id={`${instanceId}-icon`}
            label={label}
            description={__('Using the icon library may increase your frontend size. For best performance, use uploaded SVGs for all icons.', '--gctd--')}
            allowDeviceControl={allowDeviceControl}
        />

        {iconType === 'icon' ? (
            <div className={'control-body'}>
                <div>
                    <div className={'icon-wrapper'}>
                        {value !== '' && <div className={'icon-remove'} onClick={e => removeIcon(e)}>
                            <Trash2 />
                        </div>}
                        <div className={'icon-preview'}>
                            <i className={value} />
                        </div>
                        <div className={`icon-overlay ${value === '' ? 'always-show' : ''}`}>
                            {value === '' ? (
                                <button className={'gutenverse-button'} onClick={() => setOpenIconLibrary(true)}>
                                    {__('Choose Icon', '--gctd--')}
                                </button>
                            ) : (
                                <div className={'button-group'}>
                                    <button className={'gutenverse-button'} onClick={() => setOpenIconLibrary(true)}>
                                        {__('Change Icon', '--gctd--')}
                                    </button>
                                    <button className={'gutenverse-button'} onClick={() => setType('svg', 5, 50, true, false)}>
                                        {__('Convert to SVG', '--gctd--')}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className={'icon-change'}>
                            <div className={'choose-icon active'} onClick={() => setType('icon')}>
                                {__('Icon Library', '--gctd--')}
                            </div>
                            <div className={'upload-svg'} onClick={() => setType('svg')}>
                                {__('SVG File', '--gctd--')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className={'control-body'}>
                <MediaUpload
                    onSelect={onSelectSVG}
                    allowedTypes={['image/svg+xml']}
                    value={undefined}
                    render={({ open }) => (
                        <div className={'icon-wrapper'}>
                            {iconType === 'svg' && <div className={'svg-tag'}>
                                {__('SVG', '--gctd--')}
                            </div>}
                            {svgValue && <div className={'icon-remove'} onClick={e => removeSVG(e)}>
                                <Trash2 />
                            </div>}
                            <div className={'icon-preview'} style={{
                                backgroundSize: '20px 20px',
                                backgroundPosition: '0 0, 10px 10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {svgValue ? <div dangerouslySetInnerHTML={{ __html: svgAtob(svgValue) }} style={{ display: 'flex' }} /> : null}
                            </div>
                            <div className={`icon-overlay ${!svgValue ? 'always-show' : ''}`}>
                                <button className={'gutenverse-button'} onClick={open}>
                                    {__('Upload SVG', '--gctd--')}
                                </button>
                            </div>
                            <div className={'icon-change'}>
                                <div className={'choose-icon'} onClick={() => setType('icon')}>
                                    {__('Icon Library', '--gctd--')}
                                </div>
                                <div className={'upload-svg active'} onClick={() => setType('svg')}>
                                    {__('SVG File', '--gctd--')}
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
        )}

        {openIconLibrary && createPortal(<IconLibrary
            closeLibrary={() => setOpenIconLibrary(false)}
            value={value}
            onChange={onChange}
        />, gutenverseRoot)}
    </div>;
};

export default compose(withParentControl, withDeviceControl)(IconSVGControl);