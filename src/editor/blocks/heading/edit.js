/* External dependencies */
import { useEffect, useRef } from '@wordpress/element';
import { classnames } from 'gutenverse-core/components';

/* WordPress dependencies */
import { __ } from '@wordpress/i18n';
import { BlockControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { applyFilters } from '@wordpress/hooks';

/* Gutenverse dependencies */
import { withCustomStyle, withAnimationAdvance, withCopyElementToolbar, withMouseMoveEffect, withHighLightText, withDinamicContent } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelController } from 'gutenverse-core/controls';

/* Local dependencies */
import { panelList } from './panels/panel-list';
import HeadingTypeToolbar from './components/heading-type-toolbar';
import { HighLightToolbar } from 'gutenverse-core/toolbars';

const HeadingBlockControl = (props) => {
    const{
        attributes,
        setAttributes
    } = props;
    const {
        type,
        elementId
    } = attributes;

    const blockName = 'gutenverse/heading';

    applyFilters(
        'gutenverse.pro.dynamic.toolbar',
        { isActive: true },
        blockName,
        elementId,
    );
    HighLightToolbar (props);

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
    withMouseMoveEffect,
    withHighLightText('content'),
    withDinamicContent('content'),
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
    } = attributes;

    // const dynamicDataLists = getDynamicDataList(headingContent);
    //     let list = attributes.dynamicDataList;
    //     if (attributes.content) {
    //         const newList = dynamicDataLists.map(element => {
    //             const indexExist = list.findIndex(item => element.id === item.id);
    //             if (indexExist !== -1) {
    //                 element._key = list[indexExist]?._key;
    //                 element.dynamicContent = list[indexExist]?.dynamicContent;
    //                 element.dynamicUrl = list[indexExist]?.dynamicUrl;
    //             }
    //             return element;
    //         });
    //         setAttributes({dynamicDataList: newList});
    //     }
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
    // const getDynamicDataList = () => {
    //     if (headingRef?.current) {
    //         const newElement = u(headingRef?.current).children().map(child => {
    //             const isDynamic = u(child).nodes[0].classList.contains('guten-dynamic-data');
    //             if( isDynamic ){
    //                 return {
    //                     value: child,
    //                     id: u(child).attr('id')
    //                 };
    //             }
    //         });
    //         return newElement.nodes;
    //     } else {
    //         return [];
    //     }
    // };

    useEffect(() => {
        if (headingRef.current) {
            setElementRef(headingRef.current);
        }
    }, [headingRef]);

    // useEffect(() => {
    //     const newDiv = document.createElement('div');
    //     newDiv.innerHTML = content;
    //     const contentArray = [];
    //     newDiv.childNodes.forEach(node => {
    //         if (node.nodeType === Node.TEXT_NODE) {
    //             contentArray.push(node.textContent);
    //         } else if (node.nodeType === Node.ELEMENT_NODE) {
    //             contentArray.push(node.outerHTML);
    //         }
    //     });
    //     const selectedItems = [];
    //     for (const [index, item] of contentArray.entries()) {
    //         const parser = new DOMParser();
    //         const doc = parser.parseFromString(item, 'text/html');
    //         const selectElements = doc.querySelectorAll('span.guten-dynamic-data');
    //         const pushData = {
    //             key : index,
    //             element: selectElements
    //         };

    //         if (selectElements.length > 0) {
    //             selectedItems.push(pushData);
    //         }
    //     }

    //     if ( selectedItems.length > 0 && dynamicDataList.length > 0) {

    //         selectedItems.map((item, index)=>{
    //             const href = applyFilters(
    //                 'gutenverse.dynamic.generate-url',
    //                 '#',
    //                 'dynamicUrl',
    //                 dynamicDataList[index]
    //             );

    //             const title = applyFilters(
    //                 'gutenverse.dynamic.generate-content',
    //                 content,
    //                 'dynamicContent',
    //                 dynamicDataList[index]
    //             );

    //             if (href !== '#') {
    //                 const anchorElement = document.createElement('a');
    //                 item.element[0].setAttribute('dynamic-data-url', href);
    //                 if (title !== content) {
    //                     anchorElement.innerHTML = item.element[0].outerHTML;
    //                 } else anchorElement.innerHTML = item.element[0].innerHTML;
    //                 item.element[0].innerHTML = '';
    //                 item.element[0].appendChild(anchorElement);
    //             }
    //             if (title !== content){
    //                 item.element[0].setAttribute('dynamic-data-content', title);
    //             }
    //             contentArray[item.key] = item.element[0].outerHTML;
    //         });
    //         setAttributes({ content: contentArray.join('') });
    //     }

    // },[headingContent]);

    return <>
        <HeadingInspection {...props} />
        <HeadingBlockControl {...props} />
        <RichText
            ref={headingRef}
            identifier="content"
            tagName={tagName}
            value={content}
            onChange={value => setAttributes({ content: value })}
            placeholder={__('Write heading…')}
            multiline={false}
            {...blockProps}
        />
    </>;
});

export default HeadingBlock;
