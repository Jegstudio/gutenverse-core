import { compose } from '@wordpress/compose';
import { useEffect, useRef } from '@wordpress/element';
import { withCustomStyle, withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import TextStyleZoom from './components/text-style-zoom';
import TextStyleFade from './components/text-style-fade';
import TextStyleJump from './components/text-style-jump';
import TextStyleBend from './components/text-style-bend';
import TextStyleDrop from './components/text-style-drop';
import TextStyleFlip from './components/text-style-flip';
import TextStylePop from './components/text-style-pop';
import TextStyleSlide from './components/text-style-slide';
import TextStyleRising from './components/text-style-rising';
import TextStyleFall from './components/text-style-fall';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useDisplayEditor } from 'gutenverse-core/hooks';

const AnimatedTextBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
        style,
        text,
        titleTag: TitleTag,
    } = attributes;

    const animatedTextRef = useRef();
    const displayClass = useDisplayEditor(attributes);

    useEffect(() => {
        if (animatedTextRef.current) {
            setElementRef(animatedTextRef.current);
        }
    }, [animatedTextRef]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-animated-text',
            'no-margin',
            elementId,
            displayClass,
            {
                [`style-${style}`]: style && style !== 'none'
            },
        ),
        ref: animatedTextRef
    });

    const animationProps = {
        ...attributes,
        animatedTextRef
    };

    const loadAnimatedtext = () => {
        switch (style) {
            case 'zoom':
                return <TextStyleZoom {...animationProps} />;
            case 'fade':
                return <TextStyleFade {...animationProps} />;
            case 'jump':
                return <TextStyleJump {...animationProps} />;
            case 'bend':
                return <TextStyleBend {...animationProps} />;
            case 'drop':
                return <TextStyleDrop {...animationProps} />;
            case 'flip':
                return <TextStyleFlip {...animationProps} />;
            case 'pop':
                return <TextStylePop {...animationProps} />;
            case 'slide':
                return <TextStyleSlide {...animationProps} />;
            case 'rising':
                return <TextStyleRising {...animationProps} />;
            case 'fall':
                return <TextStyleFall {...animationProps} />;
            default:
                return <TitleTag>{text}</TitleTag>;
        }
    };

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            {loadAnimatedtext()}
        </div>
    </>;
});

export default AnimatedTextBlock;