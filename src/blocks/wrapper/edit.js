import { compose } from '@wordpress/compose';
import { withAnimationAdvance, withCursorEffect, withAnimationBackground, withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useSelect } from '@wordpress/data';
import { isAnimationActive } from 'gutenverse-core/helper';
import { FluidCanvas } from 'gutenverse-core/components';

const WrapperContainer = ({ attributes, blockProps }) => {
    const {
        elementId,
        backgroundAnimated = {}
    } = attributes;

    const dataId = elementId ? elementId.split('-')[1] : '';

    return (
        <div {...blockProps}>
            <FluidCanvas attributes={attributes} />
            <div className="guten-background-overlay" />
            <div className="guten-inner-wrap">
                {isAnimationActive(backgroundAnimated) && <div className={'guten-background-animated'}><div className={`animated-layer animated-${dataId}`}></div></div>}
                <InnerBlocks />
            </div>
        </div>
    );
};

const WrapperPlaceholder = ({ attributes, blockProps, clientId }) => {
    return (
        <div {...blockProps}>
            <FluidCanvas attributes={attributes} />
            <div className="guten-background-overlay" />
            <div className="guten-inner-wrap">
                <InnerBlocks
                    renderAppender={InnerBlocks.ButtonBlockAppender}
                    clientId={clientId}
                />
            </div>
        </div>
    );
};

const FlexibleWrapper = compose(
    withCursorEffect,
    withCustomStyle(panelList),
    withAnimationBackground(),
    withCopyElementToolbar(),
    withAnimationAdvance('wrapper'),
)((props) => {
    const {
        getBlockOrder
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        clientId,
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
        displayType,
        backgroundAnimated = {},
    } = attributes;

    const wrapperRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const hasChildBlocks = getBlockOrder(clientId).length > 0;

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-wrap-helper',
            'no-margin',
            elementId,
            animationClass,
            displayType,
            {
                'background-animated': isAnimationActive(backgroundAnimated),
            }
        ),
        ref: wrapperRef
    });

    const Component = hasChildBlocks ? WrapperContainer : WrapperPlaceholder;

    useEffect(() => {
        if (wrapperRef.current) {
            setElementRef(wrapperRef.current);
        }
    }, [wrapperRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <Component blockProps={blockProps} attributes={attributes} clientId={clientId} />
    </>;
});

export default FlexibleWrapper;