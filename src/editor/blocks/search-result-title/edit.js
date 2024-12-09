import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames, RichTextComponent } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEntityProp } from '@wordpress/core-data';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelTutorial } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';

const SearchResultTitleBlock = compose(
    withPartialRender,
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
    } = props;
    const {
        elementId,
        htmlTag: HtmlTag,
        staticText,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const searchResultTitleRef = useRef();

    useEffect(() => {
        searchResultTitleRef.current && setElementRef(searchResultTitleRef.current);
    }, [searchResultTitleRef]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-search-result-title',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: searchResultTitleRef
    });
    return <>
        <InspectorControls>
            <PanelTutorial
                title={__('How Search Result Title works?', 'gutenverse')}
                list={[
                    {
                        title: __('In Frontend', 'gutenverse'),
                        description: __('Search Input will be replaced by the data user inputed in search form', 'gutenverse')
                    },
                    {
                        title: __('Inside Editor', 'gutenverse'),
                        description: __('It will load placeholder data.', 'gutenverse')
                    },
                ]}
            />
        </InspectorControls>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <HtmlTag>{staticText} <span className="search-input-text">{__('<Search Input>', 'gutenverse')}</span></HtmlTag>
        </div>
    </>;
});

export default SearchResultTitleBlock;