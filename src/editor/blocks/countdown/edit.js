import { compose } from '@wordpress/compose';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEffect, useState, useRef } from '@wordpress/element';
import { withAnimationAdvance, withCopyElementToolbar, withCustomStyle, withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useDisplayEditor, useAnimationEditor } from 'gutenverse-core/hooks';

const CountDownBlock = compose(
    withAnimationAdvance('countdown'),
    withCopyElementToolbar(),
    withMouseMoveEffect,
    withCustomStyle(panelList)
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
        showDays,
        showLabelDays,
        labelDays,
        showHours,
        showLabelHours,
        labelHours,
        showMinutes,
        showLabelMinutes,
        labelMinutes,
        showSeconds,
        showLabelSeconds,
        labelSeconds,
        dueDate,
        showDivider,
        dividerType,
        labelPosition
    } = attributes;

    const [days, setDays] = useState('0');
    const [hours, setHours] = useState('0');
    const [minutes, setMinutes] = useState('0');
    const [seconds, setSeconds] = useState('0');

    const countDownRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-countdown',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: countDownRef
    });

    useEffect(() => {
        if (countDownRef.current) {
            setElementRef && setElementRef(countDownRef.current);
        }
    }, [countDownRef]);

    const handleTimer = (date) => {
        let targetDate = new Date(date);
        let now = new Date();
        let distance = targetDate - now;
        let day = Math.floor(distance / (1000 * 60 * 60 * 24));
        setDays(day);
        let hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setHours(hour);
        let minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setMinutes(minute);
        let second = Math.floor((distance % (1000 * 60)) / 1000);
        setSeconds(second);
    };


    useEffect(()=> {
        console.log(showDays)
        console.log(days)
    },[days])

    useEffect(() => {
        const countDownInterval = setInterval(() => {
            if(dueDate){
                handleTimer(dueDate);
            }
        },1000);
        return () => clearInterval(countDownInterval);
    }, []);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div {...blockProps}>
            {showDays && <div className="child-wrapper days-wrapper">
                { ( showLabelDays && (labelPosition === 'left' || labelPosition === 'top' ) ) && <div className="countdown-label">{labelDays}</div> }
                <div className="countdown-value">{days}</div>
                { ( showLabelDays && (labelPosition === 'right' || labelPosition === 'bottom' ) ) && <div className="countdown-label">{labelDays}</div> }
            </div>}
            {showDivider && <div className="countdown-divider">{dividerType}</div>}
            {showHours && <div className="child-wrapper hours-wrapper">
                { ( showLabelHours && (labelPosition === 'left' || labelPosition === 'top' ) ) && <div className="countdown-label">{labelHours}</div> }
                <div className="countdown-value">{hours}</div>
                { ( showLabelHours && (labelPosition === 'right' || labelPosition === 'bottom' ) ) && <div className="countdown-label">{labelHours}</div> }
            </div>}
            {showDivider && <div className="countdown-divider">{dividerType}</div>}
            {showMinutes && <div className="child-wrapper minutes-wrapper">
                { ( showLabelMinutes && (labelPosition === 'left' || labelPosition === 'top' ) ) && <div className="countdown-label">{labelMinutes}</div> }
                <div className="countdown-value">{minutes}</div>
                { ( showLabelMinutes && (labelPosition === 'right' || labelPosition === 'bottom' ) ) && <div className="countdown-label">{labelMinutes}</div> }
            </div>}
            {showDivider && <div className="countdown-divider">{dividerType}</div>}
            {showSeconds && <div className="child-wrapper seconds-wrapper">
                { ( showLabelSeconds && (labelPosition === 'left' || labelPosition === 'top' ) ) && <div className="countdown-label">{labelSeconds}</div> }
                <div className="countdown-value">{seconds}</div>
                { ( showLabelSeconds && (labelPosition === 'right' || labelPosition === 'bottom' ) ) && <div className="countdown-label">{labelSeconds}</div> }
            </div>}
        </div>
    </>;
});

export default CountDownBlock;