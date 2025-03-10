
import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import { useBlockProps } from '@wordpress/block-editor';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEffect, useRef } from '@wordpress/element';
import { withAnimationAdvanceV2, withCopyElementToolbar, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { __ } from '@wordpress/i18n';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const SpacerBlock = compose(
    withPartialRender,
    withPassRef,
    withCopyElementToolbar(),
    withAnimationAdvanceV2('spacer')
)(props => {
    const {
        attributes,
        clientId,
        setBlockRef
    } = props;

    const {
        elementId,
    } = attributes;

    const elementRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-spacer',
            'no-margin',
            elementId,
            animationClass,
            displayClass
        ),
        ref: elementRef
    });

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    return <>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            <div className="spacer-indicator">
                <i className="spacer-icon gtn gtn-arrow-up-solid"></i>
                <span>{__('SPACER', 'gutenverse')}</span>
                <i className="spacer-icon gtn gtn-arrow-down-solid"></i>
            </div>
        </div>
    </>;
});

export default SpacerBlock;