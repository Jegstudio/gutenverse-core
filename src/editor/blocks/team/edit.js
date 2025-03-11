import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import TeamProfile from './components/team-profile';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';
import { withAnimationAdvanceV2, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { HighLightToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { useRichTextParameter } from 'gutenverse-core/helper';
import { CopyElementToolbar } from 'gutenverse-core/components';

const TeamBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('team'),
    // withMouseMoveEffect
)((props) => {

    const {
        attributes,
        clientId,
        setBlockRef,
    } = props;

    const {
        elementId,
    } = attributes;

    const {
        panelState,
        setPanelState,
    } = useRichTextParameter();

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const nameRef = useRef();
    const descRef = useRef();
    const jobRef = useRef();
    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-team',
            'no-margin',
            elementId,
            displayClass,
            animationClass,
        ),
        ref: elementRef
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const innerBlocksProps = useInnerBlocksProps({}, {
        template: [['gutenverse/social-icons']],
        allowedBlocks: ['gutenverse/social-icons'],
        orientation: 'horizontal',
        __experimentalAppenderTagName: 'div',
    });

    const socialComponent = <div {...innerBlocksProps} />;

    HighLightToolbar(props);
    FilterDynamic(props);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    return <>
        <CopyElementToolbar {...props}/>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} panelState={panelState} />
        <div  {...blockProps}>
            <TeamProfile
                frontEnd={false}
                socialComponent={socialComponent}
                descRef={descRef}
                jobRef={jobRef}
                nameRef={nameRef}
                setPanelState={setPanelState}
                {...props}
            />
        </div>
    </>;
});

export default TeamBlock;