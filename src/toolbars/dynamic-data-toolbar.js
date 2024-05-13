import { registerFormatType, toggleFormat} from '@wordpress/rich-text';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useSelect, select } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { cryptoRandomString } from 'gutenverse-core/components';
import { IconDinamicSVG } from 'gutenverse-core/icons';

export const FilterDynamic = (props) => {
    const formatTypes = select( 'core/rich-text' ).getFormatTypes();
    const hasDynamicData = formatTypes.some(object => object.name === 'dynamic-format/dynamic-data');
    if(!hasDynamicData){
        registerFormatType('dynamic-format/dynamic-data', {
            title: 'Dynamic Data',
            tagName: 'span',
            className: 'guten-dynamic-data',
            edit: DynamicDataButton,
        });
    }
};

const DynamicDataButton = (props) => {
    const { isActive, onChange, value } = props;
    const [ uniqueId, setUniqueId ] = useState( 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' }) );
    const arrBlockName = [
        'gutenverse/text-paragraph',
        'gutenverse/heading',
        'gutenverse/team',
        'gutenverse/image-box',
        'gutenverse/icon-list-item',
        'gutenverse/icon-box',
        'gutenverse/advanced-heading',
        'gutenverse/accordion'
    ];
    const selectedBlock = useSelect( ( select ) => {
        return select( 'core/block-editor' ).getSelectedBlock();
    }, []);
    if (!selectedBlock || !arrBlockName.includes(selectedBlock.name)) {
        return null;
    }
    const textInsert = 'Dynamic Content';
    const start = value.start;
    const end = value.end;
    var newValue;

    if ( end - start === 0 ) {

        const firstText = value.text.substring(0, start);
        const secondText = value.text.substring(end);
        const newText = firstText + textInsert + secondText;

        const firstArray = value.formats.slice(0, start);
        const secondArray = value.formats.slice(end);
        var insertFormat = [];
        insertFormat = firstArray;

        if ( value.formats[start-1] === value.formats[end] ){
            if ( value.formats[start] !== undefined ) {
                textInsert.split('').forEach(function(){
                    insertFormat.push(value.formats[start]);
                });
            }
        }

        insertFormat.length += 15;

        for (var i = 0; i < secondArray.length; i++) {
            if (secondArray[i] === undefined ) {
                insertFormat.length += 1;
            } else {
                insertFormat.push(secondArray[i]);
            }
        }

        newValue = {...value,
            formats: insertFormat,
            text: newText,
            end: value.end + 15,
        };
    } else newValue = value;

    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    icon={<IconDinamicSVG/>}
                    title="Dynamic Data"
                    onClick={() => {
                        setUniqueId( 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' }) );
                        onChange(
                            toggleFormat(newValue, {
                                type: 'dynamic-format/dynamic-data',
                                attributes: {
                                    id: uniqueId,
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
export default FilterDynamic;