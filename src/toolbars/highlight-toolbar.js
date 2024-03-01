import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
// import { useSelect } from '@wordpress/data';

import { cryptoRandomString } from 'gutenverse-core/components';

export const HighlightButton = ({ isActive, onChange, value }) => {

    /** select block with RichText to display new format */

    // const selectedBlock = useSelect( ( select ) => {
    //     return select( 'core/block-editor' ).getSelectedBlock();
    // }, []);

    // if ( selectedBlock && selectedBlock.name !== 'core/paragraph' ) {
    //     return null;
    // }

    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    icon="editor-code"
                    title="Text Highlight"
                    onClick={() => {
                        const uniqueId = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
                        onChange(
                            toggleFormat(value, {
                                type: 'highlight-format/text-highlight',
                                attributes: {
                                    class: uniqueId,
                                },
                            })
                        );
                    }}
                    isActive={isActive}
                />
            </ToolbarGroup>
        </BlockControls>
    );
};

registerFormatType('highlight-format/text-highlight', {
    title: 'Text Highlight',
    tagName: 'span',
    className: 'guten-text-highlght',
    edit: HighlightButton,
});