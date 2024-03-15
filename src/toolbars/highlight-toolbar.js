import { registerFormatType, toggleFormat, unregisterFormatType, removeFormat, getActiveFormat, applyFormat } from '@wordpress/rich-text';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useSelect, select } from '@wordpress/data';
import { speak } from '@wordpress/a11y';
import { __, sprintf } from '@wordpress/i18n';

import { cryptoRandomString } from 'gutenverse-core/components';

export const HighLightToolbar = (props, blockName) => {
    /** select block with RichText to display new format */

    const selectedBlock = useSelect( ( select ) => {
        return select( 'core/block-editor' ).getSelectedBlock();
    }, []);
    const formatTypes = select( 'core/rich-text' ).getFormatTypes();
    const hasDynamicData = formatTypes.some(object => object.name === 'highlight-format/text-highlight');
    if ( selectedBlock && selectedBlock.name !== blockName ) {
        if (hasDynamicData) {
            unregisterFormatType('highlight-format/text-highlight');
        }
    }else {
        if ( !hasDynamicData ){
            registerFormatType('highlight-format/text-highlight', {
                title: 'Text Highlight',
                tagName: 'span',
                className: 'guten-text-highlight',
                edit: HighlightButton,
            });
        }
    }
    return <HighlightButton {...props}/>;
}
export const HighlightButton = (props) => {
    const {
        isActive,
        value,
        onChange
    } = props
    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    icon="editor-code"
                    title="Text Highlight"
                    onClick={() => {
                        const hasElement = value.formats.some((val,key) => {
                            const num = Number(key);
                            if(!isNaN(num) && num >= value.start && num <= value.end - 1){
                                return num;
                            }
                        });
                        const removeTagHtml = (value, formats) => {
                            let newVal = value;
                            formats.map(format => {
                                if ( getActiveFormat( newVal, format.type ) ) {
                                    // For screen readers, will announce if formatting control is disabled.
                                    if ( format.title ) {
                                        // translators: %s: title of the formatting control
                                        speak( sprintf( __( '%s removed.' ), format.title ), 'assertive' );
                                    }
                                    newVal = removeFormat( newVal, format.type );
                                }
                            });
                            return newVal;
                        };
                        if(isActive){
                            if(hasElement){
                                onChange(
                                    removeTagHtml(value, [{type:'highlight-format/text-highlight'}, {type:'core/underline'}])
                                );
                            }
                        }else{
                            if(!hasElement){
                                const uniqueId = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
                                onChange(
                                    toggleFormat(value, {
                                        type: 'highlight-format/text-highlight',
                                        attributes: {
                                            class: uniqueId,
                                        },
                                    })
                                );
                            }
                        }
                    }}
                    isActive={isActive}
                />
            </ToolbarGroup>
        </BlockControls>
    );
};

