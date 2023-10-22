/* External dependencies */
import { useEffect, useRef, useState } from '@wordpress/element';
import classnames from 'classnames';

/* WordPress dependencies */
import { __ } from '@wordpress/i18n';
import { BlockControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { compose } from '@wordpress/compose';

/* Gutenverse dependencies */
import { withCustomStyle, withAnimationAdvance, withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelController } from 'gutenverse-core/controls';

/* Local dependencies */
import { panelList } from './panels/panel-list';
import HeadingTypeToolbar from './components/heading-type-toolbar';
import { DeviceLoop, handleTransform, handleTransformHover } from 'gutenverse-core/styling';
import { isEmptyString } from 'gutenverse-core/helper';

const HeadingBlockControl = ({ attributes, setAttributes }) => {
    const {
        type,
    } = attributes;

    return <BlockControls>
        <ToolbarGroup>
            <HeadingTypeToolbar
                type={type}
                onChange={(newType) =>
                    setAttributes({ type: newType })
                }
            />
        </ToolbarGroup>
    </BlockControls>;
};

const HeadingInspection = (props) => {
    const { panelProps, isSelected } = props;

    const defaultPanelProps = {
        ...panelProps,
        ...props.attributes
    };

    return <PanelController
        panelList={panelList}
        panelProps={defaultPanelProps}
        isSelected={isSelected}
        {...props}
    />;
};

export const isEmptyStyle = (style) => {
    if (style === undefined) {
        return true;
    } else {
        let flag = true;
        const { adminStyle } = style;

        DeviceLoop(device => {
            flag = flag && isEmptyString(adminStyle[device]);
        });

        return flag;
    }
};

export const canRenderTransform = (transform) => {
    const normal = handleTransform(transform);
    const hover = handleTransformHover(transform);

    return !(isEmptyStyle(normal) && isEmptyStyle(hover));
};

const HeadingBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('heading'),
    withCopyElementToolbar()
)(props => {
    const {
        attributes,
        setAttributes,
        setElementRef,
    } = props;

    const {
        elementId,
        type,
        content,
        transform
    } = attributes;

    const tagName = 'h' + type;
    const headingRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const [theTransform, setTheTransform] = useState(false);

    useEffect(() => {
        setTheTransform(canRenderTransform(transform));
    }, [transform]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            elementId,
            animationClass,
            displayClass,
            {
                'gutenverse-transform': theTransform
            }
        ),
        ref: headingRef
    });

    useEffect(() => {
        if (headingRef.current) {
            setElementRef(headingRef.current);
        }
    }, [headingRef]);

    return <>
        <HeadingInspection {...props} />
        <HeadingBlockControl {...props} />
        <RichText
            ref={headingRef}
            identifier="content"
            tagName={tagName}
            value={content}
            onChange={(value) => setAttributes({ content: value })}
            placeholder={__('Write heading…')}
            multiline={false}
            {...blockProps}
        />
    </>;
});

export default HeadingBlock;
