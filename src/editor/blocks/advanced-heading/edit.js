import { compose } from '@wordpress/compose';
import { useEffect, useRef } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';

const AdvancedHeadingBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('advance-heading'),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
        titleTag: TitleTag,
        subTag: SubTag,
        text,
        focusText,
        subText,
        showSub,
        showLine
    } = attributes;

    const advHeadingRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-advanced-heading',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: advHeadingRef
    });

    useEffect(() => {
        if (advHeadingRef.current) {
            setElementRef(advHeadingRef.current);
        }
    }, [advHeadingRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            {showLine === 'top' && <div className="heading-line top"></div>}
            {showSub === 'top' && <SubTag className="heading-subtitle">{subText}</SubTag>}
            {showSub === 'top' && showLine === 'between' && <div className="heading-line between"></div>}
            <div className={`heading-section ${['top', 'bottom', 'between'].includes(showLine) ? 'outside-line' : ''}`}>
                {showLine === 'before' && <div className="heading-line before"></div>}
                <TitleTag className="heading-title">
                    {text}
                    <span className="heading-focus">{focusText}</span>
                </TitleTag>
                {showLine === 'after' && <div className="heading-line after"></div>}
            </div>
            {showSub === 'bottom' && showLine === 'between' && <div className="heading-line between"></div>}
            {showSub === 'bottom' && <SubTag className="heading-subtitle">{subText}</SubTag>}
            {showLine === 'bottom' && <div className="heading-line bottom"></div>}
        </div>
    </>;
});

export default AdvancedHeadingBlock;