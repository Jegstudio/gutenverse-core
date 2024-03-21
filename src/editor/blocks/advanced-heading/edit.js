import { compose } from '@wordpress/compose';
import { useEffect, useRef } from '@wordpress/element';
import { withCustomStyle, withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames, RichText } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { __ } from '@wordpress/i18n';

const AdvancedHeadingBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('advance-heading'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        setElementRef,
        setAttributes
    } = props;

    const {
        elementId,
        titleTag: TitleTag,
        subTag: SubTag,
        text,
        focusText,
        subText,
        showSub,
        showLine,
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

    const richTextContent = (data, tag, classes, identifier ) => {
        return <RichText
            identifier={identifier}
            tagName={tag}
            value={data}
            onChange={value => setAttributes({ [identifier]: value })}
            placeholder={__('Write heading…')}
            multiline={false}
            className={classes}
        />;
    };
    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            {showLine === 'top' && <div className="heading-line top"></div>}
            {showSub === 'top' && richTextContent(subText,SubTag,'heading-subtitle','subText')}
            {showSub === 'top' && showLine === 'between' && <div className="heading-line between"></div>}
            <div className={`heading-section ${['top', 'bottom', 'between'].includes(showLine) ? 'outside-line' : ''}`}>
                {showLine === 'before' && <div className="heading-line before"></div>}
                <TitleTag className="heading-title">
                    {richTextContent(text,'span','heading-title','text')}
                    {richTextContent(focusText,'span','heading-focus','focusText')}
                </TitleTag>
                {showLine === 'after' && <div className="heading-line after"></div>}
            </div>
            {showSub === 'bottom' && showLine === 'between' && <div className="heading-line between"></div>}
            {showSub === 'bottom' && richTextContent(subText,SubTag,'heading-subtitle','subText')}
            {showLine === 'bottom' && <div className="heading-line bottom"></div>}
        </div>
    </>;
});

export default AdvancedHeadingBlock;