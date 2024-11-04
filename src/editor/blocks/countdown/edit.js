import { compose } from '@wordpress/compose';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEffect, useState, useRef } from '@wordpress/element';
import { withAnimationAdvance, withCopyElementToolbar, withCustomStyle, withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useDisplayEditor, useAnimationEditor } from 'gutenverse-core/hooks';
import { __ } from '@wordpress/i18n';

const CountDownBlock = compose(
    withAnimationAdvance('countdown'),
    withCopyElementToolbar(),
    withMouseMoveEffect,
    withCustomStyle(panelList)
)((props) => {
    const {
        attributes,
        setElementRef,
        refreshStyle,
    } = props;

    const {
        elementId,
        showDays,
        labelDays,
        showHours,
        labelHours,
        showMinutes,
        labelMinutes,
        showSeconds,
        labelSeconds,
        dueDate,
        showDivider,
        dividerType,
        labelPosition,
        oneForAll,
        expiredAction
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

    const innerBlocksProps = useInnerBlocksProps({
        className: 'countdown-expired'
    }, {
        template: [['core/paragraph']]
    });

    const handleTimer = (distance) => {
        if(showDays){
            let day = Math.floor(distance / (1000 * 60 * 60 * 24));
            setDays(day);
            let hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            setHours(hour);
            let minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            setMinutes(minute);
            let second = Math.floor((distance % (1000 * 60)) / 1000);
            setSeconds(second);
        }else{
            if(showHours){
                let hour = Math.floor(distance / (1000 * 60 * 60));
                setHours(hour);
                let minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                setMinutes(minute);
                let second = Math.floor((distance % (1000 * 60)) / 1000);
                setSeconds(second);
            }else{
                if(showMinutes){
                    let minute = Math.floor(distance / (1000 * 60));
                    setMinutes(minute);
                    let second = Math.floor((distance % (1000 * 60)) / 1000);
                    setSeconds(second);
                }else{
                    let second = Math.floor(distance / 1000);
                    setSeconds(second);
                }
            }
        }
    };

    useEffect(() => {
        const countDownInterval = setInterval(() => {
            if(dueDate){
                let targetDate = new Date(dueDate);
                let now = new Date();
                let distance = targetDate - now;
                if( distance > 0 ){
                    handleTimer(distance);
                }else{
                    clearInterval(countDownInterval);
                }
            }
        },1000);
        return () => clearInterval(countDownInterval);
    }, [dueDate, showDays, showHours, showMinutes ]);

    useEffect(() => {
        refreshStyle();
    }, [oneForAll]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div {...blockProps}>
            <div className="guten-countdown-wrapper">
                {showDays && <>
                    <div className="time-container days-wrapper">
                        { ( labelDays && (labelPosition === 'left' || labelPosition === 'top' ) ) && <div className="countdown-label">{labelDays}</div> }
                        <div className="countdown-value">{days}</div>
                        { ( labelDays && (labelPosition === 'right' || labelPosition === 'bottom' ) ) && <div className="countdown-label">{labelDays}</div> }
                    </div>
                    {showDivider && <div className="countdown-divider">{dividerType}</div>}
                </>}
                {showHours && <>
                    <div className="time-container hours-wrapper">
                        { ( labelHours && (labelPosition === 'left' || labelPosition === 'top' ) ) && <div className="countdown-label">{labelHours}</div> }
                        <div className="countdown-value">{hours}</div>
                        { ( labelHours && (labelPosition === 'right' || labelPosition === 'bottom' ) ) && <div className="countdown-label">{labelHours}</div> }
                    </div>
                    {showDivider && <div className="countdown-divider">{dividerType}</div>}
                </>}
                {showMinutes && <>
                    <div className="time-container minutes-wrapper">
                        { ( labelMinutes && (labelPosition === 'left' || labelPosition === 'top' ) ) && <div className="countdown-label">{labelMinutes}</div> }
                        <div className="countdown-value">{minutes}</div>
                        { ( labelMinutes && (labelPosition === 'right' || labelPosition === 'bottom' ) ) && <div className="countdown-label">{labelMinutes}</div> }
                    </div>
                    {(showDivider && showSeconds) && <div className="countdown-divider">{dividerType}</div>}
                </>}
                {showSeconds && <div className="time-container seconds-wrapper">
                    { ( labelSeconds && (labelPosition === 'left' || labelPosition === 'top' ) ) && <div className="countdown-label">{labelSeconds}</div> }
                    <div className="countdown-value">{seconds}</div>
                    { ( labelSeconds && (labelPosition === 'right' || labelPosition === 'bottom' ) ) && <div className="countdown-label">{labelSeconds}</div> }
                </div>}
            </div>
            {
                expiredAction === 'section' && <div className="countdown-expired-wrapper">
                    <h3>{__('Expired Section', 'gutenverse')}</h3>
                    <div {...innerBlocksProps} />
                </div>
            }
        </div>
    </>;
});

export default CountDownBlock;