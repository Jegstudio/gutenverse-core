import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState,useEffect } from '@wordpress/element';

import { cryptoRandomString } from 'gutenverse-core/components';

var UNIQUE_ID = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });

export const HighlightButton = ({ isActive, onChange, value }) => {
    const selectedBlock = useSelect( ( select ) => {
        return select( 'core/block-editor' ).getSelectedBlock();
    }, [] );

    const [test, setTest] = useState(true);

    useEffect(()=>{
        console.log(selectedBlock);
    },[test]);

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
                        setTest(!test);
                        UNIQUE_ID = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
                        onChange(
                            toggleFormat(value, {
                                type: 'highlight-format/text-highlight',
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
    edit: HighlightButton,
    className: `${UNIQUE_ID}`,
});
