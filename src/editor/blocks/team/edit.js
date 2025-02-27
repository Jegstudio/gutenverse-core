import { compose } from '@wordpress/compose';
// import { useState } from '@wordpress/element';
import { withMouseMoveEffect } from 'gutenverse-core/hoc';
import { classnames } from 'gutenverse-core/components';
// import { getSaveElement } from '@wordpress/blocks';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import TeamProfile from './components/team-profile';
// import TeamPopup from './components/team-popup';
// import { createPortal } from 'react-dom';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
// import { gutenverseRoot } from 'gutenverse-core/helper';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { HighLightToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const TeamBlock = compose(
    // withPartialRender,
    // withCustomStyle(panelList),
    // withAnimationAdvance('team'),
    withCopyElementToolbar(),
    // withMouseMoveEffect
)((props) => {

    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
    } = attributes;

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

    const innerBlocksProps = useInnerBlocksProps({}, {
        template: [['gutenverse/social-icons']],
        allowedBlocks: ['gutenverse/social-icons'],
        orientation: 'horizontal',
        __experimentalAppenderTagName: 'div',
    });

    const socialComponent = <div {...innerBlocksProps} />;

    HighLightToolbar(props);
    FilterDynamic(props);
    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <TeamProfile
                frontEnd={false}
                socialComponent={socialComponent}
                descRef={descRef}
                jobRef={jobRef}
                nameRef={nameRef}
                {...props}
            />
        </div>
    </>;
});

export default TeamBlock;