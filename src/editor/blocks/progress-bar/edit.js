import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import anime from 'animejs';
import ProgressContent from './components/progress-content';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const ProgressBarBlock = compose(
    // withPartialRender,
    // withCustomStyle(panelList),
    // withAnimationAdvance('progress-bar'),
    withCopyElementToolbar(),
    // withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
        style,
        percentage,
        duration,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-progress-bar',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const wrapperClass = classnames(
        'progress-group',
        {
            [`${style}`]: style && style !== 'default'
        }
    );

    useEffect(() => {
        const skillTrack = anime({
            targets: [...elementRef.current.getElementsByClassName('skill-track')],
            width: `${percentage}%`,
            easing: 'easeInOutQuart',
            duration,
        });

        const numPercentage = anime({
            targets: [...elementRef.current.getElementsByClassName('number-percentage')],
            innerHTML: `${percentage}%`,
            easing: 'easeInOutQuart',
            round: 1,
            duration,
        });

        return () => {
            skillTrack.remove();
            numPercentage.remove();
        };
    }, [percentage, duration]);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div className={wrapperClass}>
                <div className="progress-skill-bar">
                    <ProgressContent {...props} />
                </div>
            </div>
        </div>
    </>;
});

export default ProgressBarBlock;