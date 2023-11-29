import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { BlockControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { panelList } from './panels/panel-list';
import { PanelController } from 'gutenverse-core/controls';
import { useState } from '@wordpress/element';
import { createPortal } from 'react-dom';
import { IconLibrary } from 'gutenverse-core/controls';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { displayShortcut } from '@wordpress/keycodes';
import * as divider from './data/divider-style';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { LogoCircleColor24SVG } from 'gutenverse-core/icons';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';

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
    withCustomStyle(panelList),
    withAnimationAdvance('divider'),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
        deviceType
    } = props;

    const {
        elementId,
        content,
        type,
    } = attributes;

    const dividerRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [dividerStyle, setDividerStyle] = useState(null);
    const [openIconLibrary, setOpenIconLibrary] = useState(false);

    const isRegular = ['default', 'double', 'dotted', 'dashed'].includes(type);

    const isTribal = ['fir', 'halfrounds', 'leaves', 'stripes', 'squares', 'trees', 'tribal', 'x'].includes(type);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            deviceType.toLowerCase(),
            {
                ['guten-divider-tribal']: type && isTribal,
            },
        ),
        ref: dividerRef
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
        if (dividerRef.current) {
            setElementRef(dividerRef.current);
        }
    }, [dividerRef]);

    useEffect(() => {
        if (divider[`divider_${type}`]) {
            setDividerStyle({
                ['--divider-pattern-url']: divider[`divider_${type}`]
            });
        } else {
            setDividerStyle(null);
        }
    }, [type]);

    const Component = content && content !== 'none' ? DividerContent : DividerOnly;

    const theProps = {
        ...props,
        dividerClass,
        dividerStyle,
        openIconLibrary,
        setOpenIconLibrary
    };

    return <>
        <PanelController panelList={panelList} {...props} />
        {content === 'icon' && <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    name="icon"
                    icon={<LogoCircleColor24SVG/>}
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
