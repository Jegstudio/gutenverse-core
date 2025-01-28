import { useRef } from '@wordpress/element';
import { Helmet, RichTextComponent, classnames } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withCustomStyle, withAnimationAdvance, withCopyElementToolbar, withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import HeadingTypeToolbar from './components/heading-type-toolbar';
import { HighLightToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import getBlockStyle from './styles/block';
import { useDynamicStyle } from 'gutenverse-core/styling';

const HeadingBlockControl = (props) => {
    const {
        attributes,
        setAttributes,
    } = props;
    const {
        type,
    } = attributes;

    FilterDynamic(props);
    HighLightToolbar(props);

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
        ...props.attributes,
    };
    return <PanelController
        panelList={panelList}
        panelProps={defaultPanelProps}
        isSelected={isSelected}
        {...props}
    />;
};

const HeadingBlock = compose(
    // withPartialRender,
    withCustomStyle(panelList),
    // withAnimationAdvance('heading'),
    withCopyElementToolbar(),
    // withMouseMoveEffect
)(props => {

    const {
        attributes,
        setAttributes,
        clientId,
        setPanelState,
    } = props;

    const {
        elementId,
        type,
    } = attributes;

    const tagName = 'h' + type;
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const [generatedCSS, fontUsed] = useDynamicStyle(elementId, attributes, getBlockStyle);
    const styleRef = useRef(null);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            elementId,
            animationClass,
            displayClass,
        )
    });

    const getHeadElement = (styleRef) => {
        if (styleRef.current) {
            const windowEl = styleRef.current.ownerDocument.defaultView || styleRef.current.ownerDocument.parentWindow;
            if (windowEl?.document) {
                const headEl = windowEl.document.getElementsByTagName('head')[0];
                return headEl;
            }
        }

        return null;
    };

    return <>
        <style ref={styleRef} id={elementId}>{generatedCSS}</style>
        {fontUsed[0] && <Helmet head={getHeadElement(styleRef)}>
            <link href={fontUsed[0]} rel="stylesheet" type="text/css" />
        </Helmet>}
        <HeadingInspection {...props} />
        <HeadingBlockControl {...props} />
        <RichTextComponent
            isBlockProps={true}
            blockProps={blockProps}
            tagName={tagName}
            onChange={value => setAttributes({ content: value })}
            placeholder={__('Write heading…')}
            ariaLabel={__('Heading Paragraph')}
            multiline={false}
            setAttributes={setAttributes}
            attributes={attributes}
            clientId={clientId}
            panelPosition={{ panel: 'style', section: 2 }}
            panelDynamic={{ panel: 'setting', section: 1 }}
            contentAttribute={'content'}
            setPanelState={setPanelState}
            textChilds={'textChilds'}
            dynamicList={'dynamicDataList'}
            isUseDinamic={true}
            isUseHighlight={true}
        />
    </>;
});

export default HeadingBlock;
