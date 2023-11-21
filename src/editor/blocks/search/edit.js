import { compose } from '@wordpress/compose';

import { withCustomStyle } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import { BlockControls, useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';


const SearchBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)(props => {
    const {
        attributes,
        setElementRef
    } = props;
    const {
        showButton,
        inputPlaceholder,
        elementId
    } = attributes;
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const searchRef = useRef();
    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: searchRef
    });
    console.log(attributes)
    const innerBlockProps = useInnerBlocksProps(
        {className: classnames('guten-search-button-wrapper')},
        {
            template: [['gutenverse/button', {
                role: 'submit',
                buttonSize: 'xs',
                content: 'Search',
                buttonBackground: {
                    color: {
                        r: 4,
                        g: 4,
                        b: 4,
                        a: 1
                    },
                    type: 'default'
                }
            }]],
            allowedBlocks: ['gutenverse/button'],
            renderAppender: false,
            __experimentalAppenderTagName: 'div',
        }
    );
    useEffect(() => {
        if (searchRef.current) {
            setElementRef(searchRef.current);
        }
    }, [searchRef]);
    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <div
                className="gutenverse-search-form"
            >
                <input type="search"
                    placeholder={inputPlaceholder}
                    name="s"
                    className={classnames(
                        'gutenverse-search',
                        'gutenverse-search-input',
                    )}
                />
                {
                    showButton && <div className="gutenverse-search-button" {...innerBlockProps} />
                }
            </div>
        </div>
    </>
});

export default SearchBlock;