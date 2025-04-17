import { useState, useEffect, useRef } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { dispatch, select } from '@wordpress/data';
import isEmpty from 'lodash/isEmpty';
import { removeLiveStyle, updateLiveStyle } from 'gutenverse-core/styling';

const RangeColumnControl = (props) => {
    const {
        id: controlId,
        label,
        min,
        step,
        value = '',
        description = '',
        elementRef,
        clientId,
        values
    } = props;

    const {
        elementId,
        setAttributes
    } = values;

    const {
        getBlock,
        getBlockRootClientId,
        getNextBlockClientId,
        getPreviousBlockClientId,
        getBlockParents,
        getBlockOrder,
    } = select('core/block-editor');

    const {
        updateBlockAttributes,
    } = dispatch('core/block-editor');

    const deviceType = getDeviceType();
    const id = useInstanceId(RangeColumnControl, 'inspector-range-control');
    const rootClientId = getBlockRootClientId(clientId);
    const parentId = getBlockParents(clientId, true)[0];
    const blockOrder = getBlockOrder(parentId);
    const blockIndex = blockOrder.findIndex((id) => id === clientId);

    const [localValue, setLocalValue] = useState(value[deviceType]);
    const [dragging, setDragging] = useState(false);
    const [neightborClientId, setNightborClientId] = useState(null);
    const [totalWidth, setTotalWidth] = useState(100);
    const [onFocus, setOnFocus] = useState(false);
    const isFirstRender = useRef(true);

    useEffect(() => {
        setLocalValue(value[deviceType]);
    }, [value]);

    const onInputChange = (width) => {
        if (isEmpty(width) && 'Desktop' === deviceType) {
            width = value[deviceType];
        }

        const max = (deviceType === 'Desktop') && !(blockIndex === 0 && blockOrder.length === 1) ? totalWidth - min : 100;
        if (width > max) {
            width = max;
        } else if (width < min) {
            width = min;
        }

        // Update attribute
        let deviceWidth = width;

        if ('Tablet' === deviceType) {
            if (isEmpty(width)) {
                deviceWidth = value['Desktop'];
            }
        } else if ('Mobile' === deviceType) {
            if (isEmpty(width)) {
                deviceWidth = 100;
            }
        }

        let deviceCache = value;
        deviceCache[deviceType] = deviceWidth;

        setLocalValue(width);

        const attributes = {
            currentWidth: deviceCache
        };

        const styles = [
            {
                'type': 'plain',
                'id': 'currentWidth',
                'responsive': true,
                'selector': `.${elementId}`,
                'properties': [
                    {
                        'name': 'width',
                        'valueType': 'pattern',
                        'pattern': '{value}%',
                        'patternValues': {
                            'value': {
                                'type': 'direct',
                            },
                        }
                    }
                ],
            }
        ];

        if (neightborClientId && deviceType === 'Desktop') {
            const neightborElementId = getBlock(neightborClientId).attributes.elementId;
            const neightborWidth = getBlock(neightborClientId).attributes.width;
            neightborWidth[deviceType] = totalWidth - width;

            attributes.targetWidth = neightborWidth;
            styles.push({
                'type': 'plain',
                'id': 'targetWidth',
                'responsive': true,
                'selector': `.${neightborElementId}`,
                'properties': [
                    {
                        'name': 'width',
                        'valueType': 'pattern',
                        'pattern': '{value}%',
                        'patternValues': {
                            'value': {
                                'type': 'direct',
                            },
                        }
                    }
                ],
            });
        }

        updateLiveStyle({
            styleId: 'guten-column-range-editor',
            elementId,
            attributes,
            styles,
            elementRef,
            timeout: false
        });
    };

    const doChangeValue = () => {
        removeLiveStyle('guten-column-range-editor', elementRef, elementId);

        setAttributes({
            [controlId]: {
                ...value,
                [deviceType]: parseFloat(localValue)
            }
        });

        if (neightborClientId && deviceType === 'Desktop') {
            const neightborAttribute = getBlock(neightborClientId).attributes;
            const theTotalWidth = Math.floor((totalWidth - localValue) * 100) / 100;

            updateBlockAttributes(neightborClientId, {
                [controlId]: {
                    ...neightborAttribute[controlId],
                    [deviceType]: theTotalWidth
                }
            });
        }
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (!dragging && !onFocus) {
            doChangeValue();
        }
    }, [dragging, onFocus]);

    const cacheOption = () => {
        const columns = getBlock(rootClientId)?.innerBlocks;
        const totalColumn = columns?.length;
        let isOneForced100 = false;

        columns.forEach(column => {
            if (column?.attributes?.forceColumnHundred && column?.attributes?.forceColumnHundred['Desktop']) {
                isOneForced100 = true;
            }
        });

        if (!isOneForced100) {
            const nextColumnId = getNextBlockClientId(clientId, rootClientId);
            const previousColumnId = getPreviousBlockClientId(clientId, rootClientId);
            const neightborId = totalColumn > 1 ? nextColumnId === null ? previousColumnId : nextColumnId : null;
            setNightborClientId(neightborId);

            setTotalWidth(100 - columns.reduce((value, column) => {
                const { clientId: currentClientId, attributes } = column;
                const { width } = attributes;

                if (currentClientId !== clientId && neightborId !== currentClientId) {
                    return value + width[deviceType];
                } else {
                    return value;
                }
            }, 0));
        }
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-range'}>
        <ControlHeadingSimple
            id={`${id}-range`}
            label={label}
            description={description}
            allowDeviceControl={true}
        />
        <div className={'control-body'}>
            <div className={'control-slider-range'}>
                <input
                    id={`${id}-range`}
                    type="range"
                    className="control-input-range"
                    min={min}
                    max={(deviceType === 'Desktop') && !(blockIndex === 0 && blockOrder.length === 1) ? totalWidth - min : 100}
                    step={step}
                    value={onFocus || dragging ? localValue : value[deviceType]}
                    onMouseDown={() => {
                        cacheOption();
                        setDragging(true);
                    }}
                    onMouseUp={() => {
                        setDragging(false);
                    }}
                    onChange={(e) => {
                        onInputChange(e.target.value);
                    }}
                />
            </div>
            <div className={'control-slider-input'}>
                <input
                    type="number"
                    className="control-input-number"
                    min={min}
                    max={(deviceType === 'Desktop') && !(blockIndex === 0 && blockOrder.length === 1) ? totalWidth - min : 100}
                    step={step}
                    value={onFocus || dragging ? localValue : value[deviceType]}
                    onFocus={() => {
                        cacheOption();
                        setOnFocus(true);
                    }}
                    onChange={(e) => {
                        onInputChange(e.target.value);
                    }}
                    onBlur={() => {
                        setOnFocus(false);
                    }}
                />
            </div>
        </div>
    </div>;
};

export default compose(withParentControl)(RangeColumnControl);