/* External dependencies */
import { useEffect, useRef, useState } from '@wordpress/element';
import { classnames } from 'gutenverse-core/components';
import { u } from 'gutenverse-core-frontend';
import { cryptoRandomString } from 'gutenverse-core/components';

/* WordPress dependencies */
import { __ } from '@wordpress/i18n';
import { BlockControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { useSelect, subscribe } from '@wordpress/data';

/* Gutenverse dependencies */
import { withCustomStyle, withAnimationAdvance, withCopyElementToolbar, withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelController } from 'gutenverse-core/controls';

/* Local dependencies */
import { panelList } from './panels/panel-list';
import HeadingTypeToolbar from './components/heading-type-toolbar';

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

const HeadingBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('heading'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)(props => {
    const {
        attributes,
        setAttributes,
        setElementRef,
        clientId,
    } = props;
    const {
        elementId,
        type,
        content,
    } = attributes;
    const [headingContent, setHeadingContent] = useState(content);
    const {
        getBlockAttributes
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );
    const getContent = (clientId) => {
        const block = getBlockAttributes(clientId);
        let content = '';
        if (block) {
            content = block.content;
        }
        return content;
    };
    useEffect(() => {
        const unsubscribe = subscribe(() => {
            const theContent = getContent(clientId);
            if (headingContent !== theContent) {
                setHeadingContent(theContent);
            }
        });
        return () => unsubscribe();
    }, []);
    useEffect(() => {
        const child = getListOfChildTag(headingContent);
        let childs = attributes.textChilds;
        if (attributes.content) {
            const newChild = child.map(element => {
                const indexExist = childs.findIndex(item => element.id === item.id);
                if (indexExist !== -1) {
                    element.color = childs[indexExist].color;
                    element.colorHover = childs[indexExist].colorHover;
                    element.typography = childs[indexExist].typography;
                    element.typographyHover = childs[indexExist].typographyHover;
                    element.textClip = childs[indexExist].textClip;
                    element.textClipHover = childs[indexExist].textClipHover;
                    element.background = childs[indexExist].background;
                    element.backgroundHover = childs[indexExist].backgroundHover;
                    element.padding = childs[indexExist].padding;
                    element.paddingHover = childs[indexExist].paddingHover;
                    element.margin = childs[indexExist].margin;
                    element.marginHover = childs[indexExist].marginHover;
                }
                return element;
            });
            setAttributes({ textChilds: newChild });
        }
    }, [headingContent]);

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

    const getListOfChildTag = () => {
        if (headingRef?.current) {
            const newElement = u(headingRef?.current).children().map(child => {
                const newChild = u(child).children().map(grandChild => {
                    if( u(grandChild).nodes[0].localName === 'strong' || u(grandChild).nodes[0].localName === 'em'){
                        return {
                            color: {},
                            colorHover: {},
                            typography: {},
                            typographyHover: {},
                            textClip:{},
                            textClipHover:{},
                            background: {},
                            backgroundHover: {},
                            padding:{},
                            paddingHover:{},
                            margin:{},
                            marginHover:{},
                            value: child,
                            id: u(grandChild).attr('id'),
                            spanId: u(child).attr('id')
                        };
                    }
                });
                return newChild;
            });
            return newElement.nodes;
        } else {
            return [];
        }
    };
    useEffect(() => {
        if (headingRef.current) {
            setElementRef(headingRef.current);
        }
    }, [headingRef]);

    const handleOnChange = (value) => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = value;
        const contentArray = [];
        newDiv.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                contentArray.push(node.textContent);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                contentArray.push(node.outerHTML);
            }
        });
        const newValue = contentArray.map(element => {
            const regex = /id="([^"]+)"/;
            const match = element.match(regex);
            let index = element.indexOf('>');
            if (!match && index !== -1) {
                let part1 = element.slice(1, index);
                const uniqeidChild = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
                const uniqeidSpan = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
                const child = `<span id=${uniqeidSpan}>` + element.replace(`<${part1}>`, `<${part1} id=${uniqeidChild}>`) + '</span>';
                return child;
            } else {
                return element;
            }
        });
        return setAttributes({ content: newValue.join('') });
    };

    return <>
        <HeadingInspection {...props} />
        <HeadingBlockControl {...props} />
        <RichText
            ref={headingRef}
            identifier="content"
            tagName={tagName}
            value={content}
            onChange={handleOnChange}
            placeholder={__('Write heading…')}
            multiline={false}
            {...blockProps}
        />
    </>;
});

export default HeadingBlock;
