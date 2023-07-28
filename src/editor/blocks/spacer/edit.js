
import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEffect } from '@wordpress/element';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { __ } from '@wordpress/i18n';

const SpacerBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('spacer'),
    withCopyElementToolbar()
)(props => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
    } = attributes;

    const spacerRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-spacer',
            'no-margin',
            elementId,
            animationClass,
            displayClass
        ),
        ref: spacerRef
    });

    useEffect(() => {
        if (spacerRef.current) {
            setElementRef(spacerRef.current);
        }
    }, [spacerRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
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