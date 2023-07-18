import { useState, useEffect } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { CheckboxControl, RangeControl, NumberControl, SelectControl, SizeControl, SwitchControl, SizeDoubleControl, ElementSelectorControl } from '../../index';
import { Button } from '@wordpress/components';
import { Plus, X, Monitor, Tablet, Smartphone } from 'react-feather';
import { IconDimensionXSVG, IconDimensionYSVG, IconDimensionZSVG, IconChevronDownSVG } from 'gutenverse-core/icons';
import Select from 'react-select';
import classnames from 'classnames';
import ControlHeadingSimple from '../part/control-heading-simple';
import cryptoRandomString from 'crypto-random-string';

const customStyles = {
    input: () => {
        return {
            padding: 0,
            margin: 0
        };
    },
    control: (provided, state) => {
        const data = {
            ...provided,
            border: 'none',
            boxShadow: 'none',
            borderRadius: '3px',
            color: state.isFocused ? '#ffffff' : '#1c1d21',
            backgroundColor: state.isFocused ? '#5e81f4' : '#ffffff',
        };

        return data;
    },
    menu: (provided) => {
        return {
            ...provided,
            zIndex: 999
        };
    },
    singleValue: (provided, state) => {
        return {
            ...provided,
            color: state.selectProps.menuIsOpen ? '#ffffff' : '#1c1d21',
        };
    },
    dropdownIndicator: (provided, state) => {
        return {
            ...provided,
            color: state.selectProps.menuIsOpen ? '#ffffff' : '#1c1d21',
        };
    },
    indicatorSeparator: () => {
        return {};
    }
};

const typeOptions = (customOptions) => {
    const options =  [
        { label: __('Move', 'gutenverse'), value: 'move' },
        { label: __('Scale', 'gutenverse'), value: 'scale' },
        { label: __('Rotate', 'gutenverse'), value: 'rotate' },
        { label: __('Skew', 'gutenverse'), value: 'skew' },
        { label: __('Opacity', 'gutenverse'), value: 'opacity' },
    ];

    customOptions.forEach(custom => {
        options.push({ label: custom.label, value: custom.value });
    });

    return options;
};

const ActionItem = ({
    values,
    elementValue,
    index,
    onValueChange,
    onStyleChange,
    onRemove,
    open,
    setOpen,
    customOptions
}) => {
    const [switcher, setSwitcher] = useState('from');

    const onClickHeader = () => {
        if (open) {
            setOpen(-1);
        } else {
            setOpen(index);
        }
    };

    const id = useInstanceId(ActionItem, 'inspector-select-control');
    const itemClass = classnames('repeater-item', open ? 'open' : 'close');

    const types = typeOptions(customOptions);
    const selectType = types.map(option => {
        if (option.value === values[index].type) {
            return option;
        }
    });

    const onUpdateIndexValue = (val) => {
        const newValue = values.map((item, idx) => index === idx ? val : item);
        onValueChange(newValue);
    };

    const onUpdateIndexStyle = (val) => {
        const newValue = values.map((item, idx) => index === idx ? val : item);
        onStyleChange(newValue);
    };

    return <div className={itemClass}>
        <div className={'repeater-header'}>
            <div className={classnames('repeater-expand', {
                expand: open
            })} onClick={(e) => onClickHeader(e)}>
                <IconChevronDownSVG />
            </div>
            <div className={'repeater-title'}>
                <div id={`${id}-select`} className={'gutenverse-control-wrapper gutenverse-control-select'}>
                    <div className={'control-body'}>
                        {/* <Select
                            id={`${id}-select`}
                            value={selectType}
                            styles={customStyles}
                            options={types}
                            onChange={option => {
                                onUpdateIndexValue({ ...values[index], type: option.value });
                                onUpdateIndexStyle({ ...values[index], type: option.value });
                            }}
                        /> */}
                    </div>
                </div>
            </div>
            <div className={'repeater-remove'} onClick={() => onRemove()}>
                <X />
            </div>
        </div>
        {open && <div className={'repeater-body'}>
            <>
                {elementValue.type === 'page' &&
                    <>
                        <NumberControl
                            label={__('Duration', 'gutenverse')}
                            value={values[index].duration}
                            min={0}
                            max={60}
                            step={0.1}
                            onValueChange={duration => onUpdateIndexValue({ ...values[index], duration })}
                            onStyleChange={duration => onUpdateIndexStyle({ ...values[index], duration })}
                        />
                        <NumberControl
                            label={__('Delay', 'gutenverse')}
                            value={values[index].delay}
                            min={0}
                            max={60}
                            step={0.1}
                            onValueChange={delay => onUpdateIndexValue({ ...values[index], delay })}
                            onStyleChange={delay => onUpdateIndexStyle({ ...values[index], delay })}
                        />
                    </>
                }
                {elementValue.type === 'scroll' &&
                    <SizeDoubleControl
                        value={values[index].timeline}
                        labelStart={__('Start Animation', 'gutenverse')}
                        labelEnd={__('End Animation', 'gutenverse')}
                        onValueChange={timeline => onUpdateIndexValue({ ...values[index], timeline })}
                        onStyleChange={timeline => onUpdateIndexStyle({ ...values[index], timeline })}
                        units={{
                            ['%']: {
                                text: '%',
                                min: 0,
                                max: 100,
                                step: 1,
                                unit: '%',
                            },
                        }}
                    />
                }
                <SelectControl
                    label={__('Ease', 'gutenverse')}
                    value={values[index].ease}
                    onValueChange={ease => onUpdateIndexValue({ ...values[index], ease })}
                    onStyleChange={ease => onUpdateIndexStyle({ ...values[index], ease })}
                    options={[
                        { label: __('None', 'gutenverse'), value: 'none' },
                        { label: __('Power1 In', 'gutenverse'), value: 'power1.in' },
                        { label: __('Power1 In Out', 'gutenverse'), value: 'power1.inOut' },
                        { label: __('Power1 Out', 'gutenverse'), value: 'power1.out' },
                        { label: __('Power2 In', 'gutenverse'), value: 'power2.in' },
                        { label: __('Power2 In Out', 'gutenverse'), value: 'power2.inOut' },
                        { label: __('Power2 Out', 'gutenverse'), value: 'power2.out' },
                        { label: __('Power3 In', 'gutenverse'), value: 'power3.in' },
                        { label: __('Power3 In Out', 'gutenverse'), value: 'power3.inOut' },
                        { label: __('Power3 Out', 'gutenverse'), value: 'power3.out' },
                        { label: __('Power4 In', 'gutenverse'), value: 'power4.in' },
                        { label: __('Power4 In Out', 'gutenverse'), value: 'power4.inOut' },
                        { label: __('Power4 Out', 'gutenverse'), value: 'power4.out' },
                        { label: __('Back In', 'gutenverse'), value: 'back.in(1.7)' },
                        { label: __('Back In Out', 'gutenverse'), value: 'back.inOut(1.7)' },
                        { label: __('Back Out', 'gutenverse'), value: 'back.out(1.7)' },
                        { label: __('Elastic In', 'gutenverse'), value: 'elastic.in(1, 0.3)' },
                        { label: __('Elastic In Out', 'gutenverse'), value: 'elastic.inOut(1, 0.3)' },
                        { label: __('Elastic Out', 'gutenverse'), value: 'elastic.out(1, 0.3)' },
                        { label: __('Bounce In', 'gutenverse'), value: 'bounce.in' },
                        { label: __('Bounce In Out', 'gutenverse'), value: 'bounce.inOut' },
                        { label: __('Bounce Out', 'gutenverse'), value: 'bounce.out' },
                        { label: __('Rough', 'gutenverse'), value: 'rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false})' },
                        { label: __('Slow', 'gutenverse'), value: 'slow(0.7, 0.7, false)' },
                        { label: __('Steps', 'gutenverse'), value: 'steps(12)' },
                        { label: __('Circ In', 'gutenverse'), value: 'circ.in' },
                        { label: __('Circ In Out', 'gutenverse'), value: 'circ.inOut' },
                        { label: __('Circ Out', 'gutenverse'), value: 'circ.out' },
                        { label: __('Expo In', 'gutenverse'), value: 'expo.in' },
                        { label: __('Expo In Out', 'gutenverse'), value: 'expo.inOut' },
                        { label: __('Expo Out', 'gutenverse'), value: 'expo.out' },
                        { label: __('Sine In', 'gutenverse'), value: 'sine.in' },
                        { label: __('Sine In Out', 'gutenverse'), value: 'sine.inOut' },
                        { label: __('Sine Out', 'gutenverse'), value: 'sine.out' },
                    ]}
                />
                <SwitchControl
                    value={switcher}
                    onValueChange={value => setSwitcher(value)}
                    onStyleChange={value => setSwitcher(value)}
                    options={[
                        {
                            value: 'from',
                            label: __('From', 'gutenverse'),
                        },
                        {
                            value: 'to',
                            label: __('To', 'gutenverse'),
                        },
                    ]}
                />
                {switcher === 'from' &&
                    <>
                        {values[index].type === 'move' &&
                            <>
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionXSVG />
                                            {__('Move X', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].moveXFrom}
                                    onValueChange={moveXFrom => onUpdateIndexValue({ ...values[index], moveXFrom })}
                                    onStyleChange={moveXFrom => onUpdateIndexStyle({ ...values[index], moveXFrom })}
                                    units={{
                                        px: {
                                            text: 'px',
                                            min: -500,
                                            max: 500,
                                            step: 1,
                                            unit: 'px',
                                        },
                                        ['%']: {
                                            text: '%',
                                            min: -200,
                                            max: 200,
                                            step: 1,
                                            unit: '%',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionYSVG />
                                            {__('Move Y', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].moveYFrom}
                                    onValueChange={moveYFrom => onUpdateIndexValue({ ...values[index], moveYFrom })}
                                    onStyleChange={moveYFrom => onUpdateIndexStyle({ ...values[index], moveYFrom })}
                                    units={{
                                        px: {
                                            text: 'px',
                                            min: -500,
                                            max: 500,
                                            step: 1,
                                            unit: 'px',
                                        },
                                        ['%']: {
                                            text: '%',
                                            min: -200,
                                            max: 200,
                                            step: 1,
                                            unit: '%',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionZSVG />
                                            {__('Move Z', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].moveZFrom}
                                    onValueChange={moveZFrom => onUpdateIndexValue({ ...values[index], moveZFrom })}
                                    onStyleChange={moveZFrom => onUpdateIndexStyle({ ...values[index], moveZFrom })}
                                    units={{
                                        px: {
                                            text: 'px',
                                            min: -500,
                                            max: 500,
                                            step: 1,
                                            unit: 'px',
                                        },
                                        ['%']: {
                                            text: '%',
                                            min: -200,
                                            max: 200,
                                            step: 1,
                                            unit: '%',
                                        },
                                    }}
                                />
                            </>
                        }
                        {values[index].type === 'scale' &&
                            <>
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionXSVG />
                                            {__('Scale X', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].scaleXFrom}
                                    onValueChange={scaleXFrom => onUpdateIndexValue({ ...values[index], scaleXFrom })}
                                    onStyleChange={scaleXFrom => onUpdateIndexStyle({ ...values[index], scaleXFrom })}
                                    units={{
                                        px: {
                                            min: 0,
                                            max: 2,
                                            step: 0.1,
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionYSVG />
                                            {__('Scale Y', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].scaleYFrom}
                                    onValueChange={scaleYFrom => onUpdateIndexValue({ ...values[index], scaleYFrom })}
                                    onStyleChange={scaleYFrom => onUpdateIndexStyle({ ...values[index], scaleYFrom })}
                                    units={{
                                        px: {
                                            min: 0,
                                            max: 2,
                                            step: 0.1,
                                        },
                                    }}
                                />
                            </>
                        }
                        {values[index].type === 'rotate' &&
                            <>
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionZSVG />
                                            {__('Rotate', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].rotateZFrom}
                                    onValueChange={rotateZFrom => onUpdateIndexValue({ ...values[index], rotateZFrom })}
                                    onStyleChange={rotateZFrom => onUpdateIndexStyle({ ...values[index], rotateZFrom })}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -180,
                                            max: 180,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionXSVG />
                                            {__('Rotate X', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].rotateXFrom}
                                    onValueChange={rotateXFrom => onUpdateIndexValue({ ...values[index], rotateXFrom })}
                                    onStyleChange={rotateXFrom => onUpdateIndexStyle({ ...values[index], rotateXFrom })}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -180,
                                            max: 180,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionYSVG />
                                            {__('Rotate Y', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].rotateYFrom}
                                    onValueChange={rotateYFrom => onUpdateIndexValue({ ...values[index], rotateYFrom })}
                                    onStyleChange={rotateYFrom => onUpdateIndexStyle({ ...values[index], rotateYFrom })}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -180,
                                            max: 180,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                            </>
                        }
                        {values[index].type === 'skew' &&
                            <>
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionXSVG />
                                            {__('Skew X', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].skewXFrom}
                                    onValueChange={skewXFrom => onUpdateIndexValue({ ...values[index], skewXFrom })}
                                    onStyleChange={skewXFrom => onUpdateIndexStyle({ ...values[index], skewXFrom })}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -80,
                                            max: 80,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionYSVG />
                                            {__('Skew Y', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].skewYFrom}
                                    onValueChange={skewYFrom => onUpdateIndexValue({ ...values[index], skewYFrom })}
                                    onStyleChange={skewYFrom => onUpdateIndexStyle({ ...values[index], skewYFrom })}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -80,
                                            max: 80,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                            </>
                        }
                        {values[index].type === 'opacity' &&
                            <>
                                <SizeControl
                                    label={__('Opacity', 'gutenverse')}
                                    value={values[index].opacityFrom}
                                    onValueChange={opacityFrom => onUpdateIndexValue({ ...values[index], opacityFrom })}
                                    onStyleChange={opacityFrom => onUpdateIndexStyle({ ...values[index], opacityFrom })}
                                    units={{
                                        ['%']: {
                                            text: '%',
                                            min: 0,
                                            max: 100,
                                            step: 1,
                                            unit: '%',
                                        },
                                    }}
                                />
                            </>
                        }
                        {customOptions.map(custom => {
                            if (values[index].type === custom.value) {
                                return custom.controls.map((control, cidx) => {
                                    const { component: Component } = control;
                                    const controlId = `${control.id}From`;

                                    return <Component
                                        {...control}
                                        key={cidx}
                                        value={values[index][controlId]}
                                        onValueChange={value => onUpdateIndexValue({ ...values[index], [`${control.id}From`]: value })}
                                        onStyleChange={value => onUpdateIndexStyle({ ...values[index], [`${control.id}From`]: value })}
                                    />;
                                });
                            }
                        })}
                    </>
                }
                {switcher === 'to' &&
                    <>
                        {values[index].type === 'move' &&
                            <>
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionXSVG />
                                            {__('Move X', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].moveXTo}
                                    onValueChange={moveXTo => onUpdateIndexValue({ ...values[index], moveXTo })}
                                    onStyleChange={moveXTo => onUpdateIndexStyle({ ...values[index], moveXTo })}
                                    units={{
                                        px: {
                                            text: 'px',
                                            min: -500,
                                            max: 500,
                                            step: 1,
                                            unit: 'px',
                                        },
                                        ['%']: {
                                            text: '%',
                                            min: -200,
                                            max: 200,
                                            step: 1,
                                            unit: '%',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionYSVG />
                                            {__('Move Y', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].moveYTo}
                                    onValueChange={moveYTo => onUpdateIndexValue({ ...values[index], moveYTo })}
                                    onStyleChange={moveYTo => onUpdateIndexStyle({ ...values[index], moveYTo })}
                                    units={{
                                        px: {
                                            text: 'px',
                                            min: -500,
                                            max: 500,
                                            step: 1,
                                            unit: 'px',
                                        },
                                        ['%']: {
                                            text: '%',
                                            min: -200,
                                            max: 200,
                                            step: 1,
                                            unit: '%',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionZSVG />
                                            {__('Move Z', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].moveZTo}
                                    onValueChange={moveZTo => onUpdateIndexValue({ ...values[index], moveZTo })}
                                    onStyleChange={moveZTo => onUpdateIndexStyle({ ...values[index], moveZTo })}
                                    units={{
                                        px: {
                                            text: 'px',
                                            min: -500,
                                            max: 500,
                                            step: 1,
                                            unit: 'px',
                                        },
                                        ['%']: {
                                            text: '%',
                                            min: -200,
                                            max: 200,
                                            step: 1,
                                            unit: '%',
                                        },
                                    }}
                                />
                            </>
                        }
                        {values[index].type === 'scale' &&
                            <>
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionXSVG />
                                            {__('Scale X', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].scaleXTo}
                                    onValueChange={scaleXTo => onUpdateIndexValue({ ...values[index], scaleXTo })}
                                    onStyleChange={scaleXTo => onUpdateIndexStyle({ ...values[index], scaleXTo })}
                                    units={{
                                        px: {
                                            min: 0,
                                            max: 2,
                                            step: 0.1,
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionYSVG />
                                            {__('Scale Y', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].scaleYTo}
                                    onValueChange={scaleYTo => onUpdateIndexValue({ ...values[index], scaleYTo })}
                                    onStyleChange={scaleYTo => onUpdateIndexStyle({ ...values[index], scaleYTo })}
                                    units={{
                                        px: {
                                            min: 0,
                                            max: 2,
                                            step: 0.1,
                                        },
                                    }}
                                />
                            </>
                        }
                        {values[index].type === 'rotate' &&
                            <>
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionZSVG />
                                            {__('Rotate', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].rotateZTo}
                                    onValueChange={rotateZTo => onUpdateIndexValue({ ...values[index], rotateZTo })}
                                    onStyleChange={rotateZTo => onUpdateIndexStyle({ ...values[index], rotateZTo })}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -180,
                                            max: 180,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionXSVG />
                                            {__('Rotate X', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].rotateXTo}
                                    onValueChange={rotateXTo => onUpdateIndexValue({ ...values[index], rotateXTo })}
                                    onStyleChange={rotateXTo => onUpdateIndexStyle({ ...values[index], rotateXTo })}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -180,
                                            max: 180,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionYSVG />
                                            {__('Rotate Y', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].rotateYTo}
                                    onValueChange={rotateYTo => onUpdateIndexValue({ ...values[index], rotateYTo })}
                                    onStyleChange={rotateYTo => onUpdateIndexStyle({ ...values[index], rotateYTo })}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -180,
                                            max: 180,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                            </>
                        }
                        {values[index].type === 'skew' &&
                            <>
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionXSVG />
                                            {__('Skew X', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].skewXTo}
                                    onValueChange={skewXTo => onUpdateIndexValue({ ...values[index], skewXTo })}
                                    onStyleChange={skewXTo => onUpdateIndexStyle({ ...values[index], skewXTo })}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -80,
                                            max: 80,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionYSVG />
                                            {__('Skew Y', 'gutenverse')}
                                        </>
                                    }
                                    value={values[index].skewYTo}
                                    onValueChange={skewYTo => onUpdateIndexValue({ ...values[index], skewYTo })}
                                    onStyleChange={skewYTo => onUpdateIndexStyle({ ...values[index], skewYTo })}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -80,
                                            max: 80,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                            </>
                        }
                        {values[index].type === 'opacity' &&
                            <>
                                <SizeControl
                                    label={__('Opacity', 'gutenverse')}
                                    value={values[index].opacityTo}
                                    onValueChange={opacityTo => onUpdateIndexValue({ ...values[index], opacityTo })}
                                    onStyleChange={opacityTo => onUpdateIndexStyle({ ...values[index], opacityTo })}
                                    units={{
                                        ['%']: {
                                            text: '%',
                                            min: 0,
                                            max: 100,
                                            step: 1,
                                            unit: '%',
                                        },
                                    }}
                                />
                            </>
                        }
                        {customOptions.map(custom => {
                            if (values[index].type === custom.value) {
                                return custom.controls.map((control, cidx) => {
                                    const { component: Component } = control;
                                    const controlId = `${control.id}To`;

                                    return <Component
                                        {...control}
                                        key={cidx}
                                        value={values[index][controlId]}
                                        onValueChange={value => onUpdateIndexValue({ ...values[index], [`${control.id}To`]: value })}
                                        onStyleChange={value => onUpdateIndexStyle({ ...values[index], [`${control.id}To`]: value })}
                                    />;
                                });
                            }
                        })}
                    </>
                }
            </>
        </div>}
    </div>;
};

const ActionItemDummy = ({
    onValueChange,
    onStyleChange,
    repeaterDefault,
    setOpenLast,
    customOptions
}) => {
    return <div className={'repeater-item'}>
        <div className={'repeater-header'}>
            <div className={'repeater-title'}>
                <div className={'gutenverse-control-wrapper gutenverse-control-select'}>
                    <div className={'control-body'}>
                        <Select
                            id={'dummy-select'}
                            value={{ label: 'Select Animation Type', value: '' }}
                            styles={customStyles}
                            options={typeOptions(customOptions)}
                            onChange={option => {
                                const newValue = [{
                                    ...repeaterDefault,
                                    type: option.value,
                                }];

                                onValueChange(newValue);
                                onStyleChange(newValue);
                                setOpenLast(0);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

const ActionControl = ({
    label,
    repeaterDefault = {},
    value = [],
    titleFormat,
    elementValue,
    onValueChange,
    onStyleChange,
    customOptions
}) => {
    const id = useInstanceId(ActionControl, 'inspector-advance-animation-action-control');
    const [openLast, setOpenLast] = useState(null);

    useEffect(() => {
        const newValue = value.map(item => {
            if (item._key === undefined) {
                return {
                    ...item,
                    _key: cryptoRandomString({ length: 6, type: 'alphanumeric' })
                };
            } else {
                return item;
            }
        });

        onValueChange(newValue);
        onStyleChange(newValue);
    }, []);

    const removeIndex = index => {
        const newValue = value.filter((item, idx) => index !== idx);

        onValueChange(newValue);
        onStyleChange(newValue);
    };

    const addNewItem = () => {
        setOpenLast(value.length);

        const newValue = [
            ...value,
            repeaterDefault
        ];

        onValueChange(newValue);
        onStyleChange(newValue);
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-adanim-repeater'}>
        <ControlHeadingSimple
            id={`${id}-repeater`}
            label={label}
        />
        <div className={'control-body'}>
            <div className={'repeater-wrapper'}>
                <div className={'repeater-container'}>
                    {value.length === 0 ? <ActionItemDummy
                        onValueChange={onValueChange}
                        onStyleChange={onStyleChange}
                        repeaterDefault={repeaterDefault}
                        setOpenLast={setOpenLast}
                        customOptions={customOptions}
                    /> : value.map((item, index) =>
                        <ActionItem
                            key={item._key === undefined ? `${id}-${index}` : item._key}
                            id={item._key === undefined ? `${id}-${index}` : item._key}
                            index={index}
                            values={value}
                            elementValue={elementValue}
                            onValueChange={onValueChange}
                            onStyleChange={onStyleChange}
                            titleFormat={titleFormat}
                            onRemove={() => removeIndex(index)}
                            open={index === openLast}
                            setOpen={setOpenLast}
                            customOptions={customOptions}
                        />
                    )}
                </div>
            </div>
        </div>
        {value.length !== 0 && <div className={'control-add'}>
            <Button isPrimary={true} onClick={addNewItem}>
                <Plus />
                {__('Add Animation', 'gutenverse')}
            </Button>
        </div>}
    </div>;
};

const advanceAnimationOption = ({ id, value, onValueChange, onStyleChange, elementRef, customOptions }) => {
    const [hoverDevice, setHoverDevice] = useState('');

    const changeType = type => {
        if (value.type === type) {
            delete value.type;
            onValueChange({ ...value });
            onStyleChange({ ...value });
        } else {
            onValueChange({ ...value, type });
            onStyleChange({ ...value, type });
        }
    };

    const onOverMobile = () => {
        setHoverDevice('Mobile');
    };

    const onOverTablet = () => {
        setHoverDevice('Tablet');
    };

    const onLeaveDevice = () => {
        setHoverDevice('');
    };

    const onClickDesktop = () => {
        onValueChange({ ...value, breakpoint: 'Desktop' });
        onStyleChange({ ...value, breakpoint: 'Desktop' });
    };

    const onClickTablet = () => {
        onValueChange({ ...value, breakpoint: 'Tablet' });
        onStyleChange({ ...value, breakpoint: 'Tablet' });
    };

    const onClickMobile = () => {
        onValueChange({ ...value, breakpoint: 'Mobile' });
        onStyleChange({ ...value, breakpoint: 'Mobile' });
    };

    const isActiveTablet = () => {
        return value.breakpoint === 'Tablet'
            || value.breakpoint === 'Mobile'
            || hoverDevice === 'Tablet'
            || hoverDevice === 'Mobile';
    };

    const isActiveMobile = () => {
        return value.breakpoint === 'Mobile'
            || hoverDevice === 'Mobile';
    };

    return <div id={id}>
        <div id={`${id}-adanim-buttons`} className="gutenverse-control-wrapper gutenverse-control-adanim-buttons">
            <div className={'control-body'}>
                <Button
                    className={`button-page${value.type === 'page' ? ' checked' : ''}`}
                    onClick={() => changeType('page')}
                >
                    {__('Page Events', 'gutenverse')}
                </Button>
                <Button
                    className={`button-scroll${value.type === 'scroll' ? ' checked' : ''}`}
                    onClick={() => changeType('scroll')}
                >
                    {__('Scroll Trigger', 'gutenverse')}
                </Button>
            </div>
        </div>
        {value.type === 'scroll' &&
            <>
                <CheckboxControl
                    label={__('Pin', 'gutenverse')}
                    value={value.pin}
                    onValueChange={pin => onValueChange({ ...value, pin })}
                    onStyleChange={pin => onStyleChange({ ...value, pin })}
                />
                {value.pin &&
                    <ElementSelectorControl
                        label={__('Pin Element', 'gutenverse')}
                        description={__('Use Element id / class, or click Tree below to select', 'gutenverse')}
                        value={value.pinElement}
                        onValueChange={pinElement => onValueChange({ ...value, pinElement })}
                        onStyleChange={pinElement => onStyleChange({ ...value, pinElement })}
                        elementRef={elementRef}
                    />
                }
            </>
        }
        {(value.type === 'scroll' || (value.type === 'page' && value.loadOn === 'hover')) &&
            <ElementSelectorControl
                label={__('Anchor', 'gutenverse')}
                description={__('Use Element ID or Class, or click Tree below to select. Leave empty to use body.', 'gutenverse')}
                value={value.anchor}
                onValueChange={anchor => onValueChange({ ...value, anchor })}
                onStyleChange={anchor => onStyleChange({ ...value, anchor })}
                elementRef={elementRef}
            />
        }
        {value.type === 'scroll' &&
            <RangeControl
                label={__('Smoothness', 'gutenverse')}
                min={0}
                max={10}
                step={1}
                value={value.smoothness}
                onValueChange={smoothness => onValueChange({ ...value, smoothness })}
                onStyleChange={smoothness => onStyleChange({ ...value, smoothness })}
            />
        }
        {value.type === 'page' &&
            <>
                <SelectControl
                    label={__('Load On', 'gutenverse')}
                    value={value.loadOn}
                    default={'pageload'}
                    onValueChange={loadOn => onValueChange({ ...value, loadOn })}
                    onStyleChange={loadOn => onStyleChange({ ...value, loadOn })}
                    options={[
                        { label: __('Page Load', 'gutenverse'), value: 'pageload' },
                        { label: __('Viewport', 'gutenverse'), value: 'viewport' },
                        { label: __('Hover', 'gutenverse'), value: 'hover' },
                    ]}
                />
                {value.loadOn === 'viewport' &&
                    <>
                        <SizeControl
                            label={__('Offset', 'gutenverse')}
                            value={value.offset}
                            default={{ point: 50, unit: '%' }}
                            onValueChange={offset => onValueChange({ ...value, offset })}
                            onStyleChange={offset => onStyleChange({ ...value, offset })}
                            units={{
                                ['%']: {
                                    text: '%',
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    unit: '%',
                                },
                            }}
                        />
                        <CheckboxControl
                            label={__('Reset Animation', 'gutenverse')}
                            description={__('Reset animation on scroll back.', 'gutenverse')}
                            value={value.resetBack}
                            onValueChange={resetBack => onValueChange({ ...value, resetBack })}
                            onStyleChange={resetBack => onStyleChange({ ...value, resetBack })}
                        />
                    </>
                }
                {value.loadOn === 'hover' &&
                    <CheckboxControl
                        label={__('Reverse Animation', 'gutenverse')}
                        description={__('Reverse animation on mouse leave.', 'gutenverse')}
                        value={value.reverseMouseLeave}
                        onValueChange={reverseMouseLeave => onValueChange({ ...value, reverseMouseLeave })}
                        onStyleChange={reverseMouseLeave => onStyleChange({ ...value, reverseMouseLeave })}
                    />
                }
            </>
        }
        {value.type &&
            <>
                <ActionControl
                    label={__('Animation Action', 'gutenverse')}
                    value={value.actions}
                    elementValue={value}
                    titleFormat={'<strong><%= value.type%></strong>'}
                    onValueChange={actions => onValueChange({ ...value, actions })}
                    onStyleChange={actions => onStyleChange({ ...value, actions })}
                    customOptions={customOptions}
                    repeaterDefault={{
                        type: 'move',
                        ease: 'none',
                        timeline: {
                            start: 0,
                            end: 100,
                            unit: '%'
                        }
                    }}
                />
                <div id={`${id}-adanim-breakpoints`} className="gutenverse-control-wrapper gutenverse-control-adanim-breakpoints">
                    <ControlHeadingSimple
                        id={`${id}-adanim-breakpoints`}
                        label={__('Enabled Breakpoints', 'gutenverse')}
                    />
                    <div className={'control-body'}>
                        <div className={'devices'}>
                            <div
                                className={'device Desktop active'}
                                onClick={onClickDesktop}
                            >
                                <Monitor />
                                <span>{__('Desktop', 'gutenverse')}</span>
                            </div>
                            <div className={'separator'}>
                                <Plus />
                            </div>
                            <div
                                className={`device Tablet${isActiveTablet() ? ' active' : ''}`}
                                onMouseOver={onOverTablet}
                                onMouseLeave={onLeaveDevice}
                                onClick={onClickTablet}
                            >
                                <Tablet />
                                <span>{__('Tablet', 'gutenverse')}</span>
                            </div>
                            <div className={'separator'}>
                                <Plus />
                            </div>
                            <div
                                className={`device Mobile${isActiveMobile() ? ' active' : ''}`}
                                onMouseOver={onOverMobile}
                                onMouseLeave={onLeaveDevice}
                                onClick={onClickMobile}
                            >
                                <Smartphone />
                                <span>{__('Phone', 'gutenverse')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }
    </div>;
};

const AdvanceAnimationControl = (props) => {
    const {
        value = {},
        onValueChange,
        onStyleChange,
        elementRef,
        customOptions = [],
    } = props;

    const id = useInstanceId(AdvanceAnimationControl, 'inspector-advance-animation-control');
    const parameter = {
        id,
        value,
        onValueChange,
        onStyleChange,
        elementRef,
        customOptions
    };

    return applyFilters(
        'gutenverse.advanceanimation.options',
        advanceAnimationOption(parameter),
        parameter
    );
};

export default AdvanceAnimationControl;