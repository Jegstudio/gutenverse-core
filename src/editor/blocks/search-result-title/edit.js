import { compose } from '@wordpress/compose';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelTutorial } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const SearchResultTitleBlock = compose(
    // withPartialRender,
    // withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        clientId,
    } = props;
    const {
        elementId,
        htmlTag: HtmlTag,
        staticText,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-search-result-title',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

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
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <HtmlTag>{staticText} <span className="search-input-text">{__('<Search Input>', 'gutenverse')}</span></HtmlTag>
        </div>
    </>;
});

export default SearchResultTitleBlock;