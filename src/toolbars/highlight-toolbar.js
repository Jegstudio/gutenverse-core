import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

export const HighlightButton = ( { isActive, onChange, value } ) => {
    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    icon="editor-code"
                    title="Text Highlight"
                    onClick={ () => {
                        onChange(
                            toggleFormat( value, {
                                type: 'highlight-format/text-highlight',
                            } )
                        );
                    } }
                    isActive={ isActive }
                />
            </ToolbarGroup>
        </BlockControls>
    );
};

registerFormatType( 'highlight-format/text-highlight', {
    title: 'Text Highlight',
    tagName: 'span',
    className: null,
    edit: HighlightButton,
} );