import { __ } from '@wordpress/i18n';
import cryptoRandomString from 'crypto-random-string';
import isEmpty from 'lodash/isEmpty';
import { PanelTutorial } from 'gutenverse-core/controls';
import { injectFont } from 'gutenverse-core/styling';
import { SortableComponent } from './global-style-sortable';

const handleFont = (typography, props, id) => {
    const weight = typography.weight && typography.style === 'italic' ? `${typography.weight}italic` : typography.weight;
    injectFont({
        controlId: id,
        addFont: props.addFont,
        font: typography.font,
        weight
    });
};

const GlobalVariableFont = (props) => {
    let { variableFont, addFontVar, editFontVar, deleteFontVar, addFont, setVariableFont } = props;

    if (typeof variableFont === 'object') {
        variableFont = Object.values(variableFont);
    }

    const addVariableFont = () => {
        const newFont = {
            id: cryptoRandomString({ length: 6, type: 'alphanumeric' }),
            name: __('Variable Font', '--gctd--'),
            font: {}
        };

        addFontVar(newFont);
    };

    const updateVariableFont = (font, index) => {
        editFontVar(font, index);

        if (font.font) {
            handleFont(font.font, { addFont: addFont }, font.id);
        }
    };

    const deleteVariableFont = id => {
        deleteFontVar(id);
    };

    return <>
        <PanelTutorial
            style={{ margin: '0 0 15px' }}
            title={__('Font Variable', '--gctd--')}
            list={[
                {
                    title: __('Where it shown?', '--gctd--'),
                    description: __('All Font Registered on this panel, will shown on each typography option of block.', '--gctd--')
                },
                {
                    title: __('What happened if i change this option.', '--gctd--'),
                    description: __('By Changing this option, you will also change every block typograhpy assigned to this option.', '--gctd--')
                },
                {
                    title: __('Save Behaviour', '--gctd--'),
                    description: __('Option will automatically saved after you change it.', '--gctd--')
                }
            ]}
        />
        {isEmpty(variableFont) ? <div className={'font-variable-wrapper'}>
            <div className="empty-variable" onClick={() => addVariableFont()}>
                {__('Empty Variable Font', '--gctd--')}
            </div>
            <div className={'font-variable-add'}>
                <div onClick={() => addVariableFont()} >
                    {__('Create Font', '--gctd--')}
                </div>
            </div>
        </div> : <div className={'font-variable-wrapper'}>
            <SortableComponent
                items={variableFont}
                isDragable={true}
                onValueChange={setVariableFont}
                updateValue={updateVariableFont}
                deleteValue={deleteVariableFont}
                {...props}
            />
            <div className={'font-variable-add'}>
                <div onClick={() => addVariableFont()}>
                    {__('Add Font', '--gctd--')}
                </div>
            </div>
        </div>}
    </>;
};

export default GlobalVariableFont;