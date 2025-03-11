import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { BlockControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { panelList } from './panels/panel-list';
import { BlockPanelController } from 'gutenverse-core/controls';
import { useState } from '@wordpress/element';
import { createPortal } from 'react-dom';
import { IconLibrary } from 'gutenverse-core/controls';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { displayShortcut } from '@wordpress/keycodes';
import * as divider from './data/divider-style';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { LogoCircleColor24SVG } from 'gutenverse-core/icons';
import { useRef } from '@wordpress/element';
import { withAnimationAdvanceV2, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const DividerOnly = (props) => {
    const { dividerClass, dividerStyle } = props;

    return <div className={'guten-divider-wrapper'} style={dividerStyle}>
        <div {...dividerClass}></div>
    </div>;
};

const DividerContent = (props) => {
    const { attributes, setAttributes, dividerClass, dividerStyle, openIconLibrary, setOpenIconLibrary } = props;
    const { contentAlign, content, text, icon } = attributes;

    const renderContent = () => {
        switch (content) {
            case 'text':
                return <RichText
                    tagName={'span'}
                    value={text}
                    placeholder={'Divider Text'}
                    onChange={(text) => setAttributes({ text })}
                    multiline={false}
                    withoutInteractiveFormatting
                    identifier="text"
                />;
            case 'icon':
                return <i
                    className={`${icon}`}
                    onClick={() => setOpenIconLibrary(true)}
                />;
            default:
                return null;
        }
    };

    return <div className={'guten-divider-wrapper'} style={dividerStyle}>
        {content === 'icon' && openIconLibrary && createPortal(
            <IconLibrary
                closeLibrary={() => setOpenIconLibrary(false)}
                value={icon}
                onChange={icon => setAttributes({ icon })}
            />,
            gutenverseRoot
        )}
        {contentAlign !== 'left' && <div {...dividerClass}></div>}
        <span className={'guten-divider-content'}>{renderContent()}</span>
        {contentAlign !== 'right' && <div {...dividerClass}></div>}
    </div>;
};

const DividerBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('divider'),
    // withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef
    } = props;

    const {
        elementId,
        content,
        type,
    } = attributes;

    const elementRef = useRef(null);
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [dividerStyle, setDividerStyle] = useState(null);
    const [openIconLibrary, setOpenIconLibrary] = useState(false);

    const isRegular = ['default', 'double', 'dotted', 'dashed'].includes(type);
    const isTribal = ['fir', 'halfrounds', 'leaves', 'stripes', 'squares', 'trees', 'tribal', 'x'].includes(type);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            {
                ['guten-divider-tribal']: type && isTribal,
            },
        ),
        ref: elementRef
    });

    const dividerClass = {
        className: classnames(
            'guten-divider-line',
            `guten-divider-${type}`,
            {
                'guten-divider-regular': type && isRegular,
                'guten-divider-style': type && !isRegular,
            }
        )
    };

    useEffect(() => {
        if (divider[`divider_${type}`]) {
            setDividerStyle({
                ['--divider-pattern-url']: divider[`divider_${type}`]
            });
        } else {
            setDividerStyle(null);
        }
    }, [type]);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const Component = content && content !== 'none' ? DividerContent : DividerOnly;

    const theProps = {
        ...props,
        dividerClass,
        dividerStyle,
        openIconLibrary,
        setOpenIconLibrary
    };

    return <>
        <CopyElementToolbar {...props}/>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        {content === 'icon' && <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    name="icon"
                    icon={<LogoCircleColor24SVG />}
                    title={__('Choose Icon', 'gutenverse')}
                    shortcut={displayShortcut.primary('i')}
                    onClick={() => setOpenIconLibrary(true)}
                />
            </ToolbarGroup>
        </BlockControls>}
        <div {...blockProps}>
            <Component {...theProps} />
        </div>
    </>;
});

export default DividerBlock;
