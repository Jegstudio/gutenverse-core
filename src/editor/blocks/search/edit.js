import { compose } from '@wordpress/compose';

import { withCustomStyle } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';

const HeadingBlockControl = ({ attributes, setAttributes }) => {
    const {
        type,
    } = attributes;

    return <BlockControls>
        <ToolbarGroup>
        </ToolbarGroup>
    </BlockControls>;
};

const SearchBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)(props => {
    const {
        attributes,
        setElementRef
    } = props;
    console.log(props);
    const {
        buttonMode,
        elementId
    } = attributes
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
    useEffect(() => {
        if (searchRef.current) {
            setElementRef(searchRef.current);
        }
    }, [searchRef]);
    return <>
        <PanelController panelList={panelList} {...props} />
        <BlockControls>
        </BlockControls>
        <form
            {...blockProps}
        >
            <input type="search"
                placeholder="Place Holder"
                name="search"
                className={classnames(
                    'gutenverse-search',
                    'gutenverse-search-input',
                )}
            />
            {
                buttonMode !== 'no-button' && <input type="submit" className="gutenverse-search-button " />
            }
        </form>
    </>
});

export default SearchBlock;