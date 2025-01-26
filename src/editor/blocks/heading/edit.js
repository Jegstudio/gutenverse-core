/* External dependencies */
import { useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { RichTextComponent, classnames } from 'gutenverse-core/components';

/* WordPress dependencies */
import { __ } from '@wordpress/i18n';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { compose } from '@wordpress/compose';

/* Gutenverse dependencies */
import { withCustomStyle, withAnimationAdvance, withCopyElementToolbar, withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelController } from 'gutenverse-core/controls';

/* Local dependencies */
import { panelList } from './panels/panel-list';
import HeadingTypeToolbar from './components/heading-type-toolbar';
import { HighLightToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import blockStyle from './styles/block';

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

const cssDeviceString = (elementId, attribute, prefix) => {
    let css = [];

    if (attribute['Desktop']) {
        css.push(`.${elementId} { ${prefix}: ${attribute['Desktop']}; }`);
    } else {
        css.push(null);
    }

    if (attribute['Tablet']) {
        css.push(`.${elementId} { ${prefix}: ${attribute['Tablet']}; }`);
    } else {
        css.push(null);
    }

    if (attribute['Mobile']) {
        css.push(`.${elementId} { ${prefix}: ${attribute['Mobile']}; }`);
    } else {
        css.push(null);
    }

    return css;
};

const generateCSSString = (Desktop, Tablet, Mobile) => {
    let css = [];

    if (Desktop.length) {
        css.push(Desktop.join(' '));
    }

    if (Tablet.length) {
        css.push('@media only screen and (max-width: 781px) {' + Tablet.join(' ') + '}');
    }

    if (Mobile.length) {
        css.push('@media only screen and (max-width: 361px) {' + Mobile.join(' ') + '}');
    }

    return css.join(' ');
};

const useDynamicStyle = (elementId, attributes, blockStyle) => {
    const { generatedCSS, fontUsed } = useMemo(() => {
        const deviceTypeDesktop = [];
        const deviceTypeTablet = [];
        const deviceTypeMobile = [];
        const fontUsed = [];

        blockStyle.forEach((style) => {
            const { id, prefix, responsive } = style;
            if (attributes[id]) {
                const css = cssDeviceString(elementId, attributes[id], prefix);
                if (responsive) {
                    css[0] && deviceTypeDesktop.push(css[0]);
                    css[1] && deviceTypeTablet.push(css[1]);
                    css[2] && deviceTypeMobile.push(css[2]);
                }
            }
        });

        const generatedCSS = generateCSSString(deviceTypeDesktop, deviceTypeTablet, deviceTypeMobile);

        return { generatedCSS, fontUsed };
    }, [elementId, attributes]);

    return [generatedCSS, fontUsed];
};

const HeadingBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar(),
)(props => {

    const {
        attributes,
        setAttributes,
        setElementRef,
        clientId,
        setPanelState,
    } = props;

    const {
        elementId,
        type,
    } = attributes;

    const [generatedCSS, fontUsed] = useDynamicStyle(elementId, attributes, blockStyle);

    const tagName = 'h' + type;
    const headingRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: headingRef
    });

    useEffect(() => {
        if (headingRef.current) {
            setElementRef(headingRef.current);
        }
    }, [headingRef]);

    return <>
        <style id={elementId}>{generatedCSS}</style>
        <HeadingInspection {...props} />
        <HeadingBlockControl {...props} />
        <RichTextComponent
            isBlockProps={true}
            blockProps={blockProps}
            ref={headingRef}
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
