import { useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { select } from '@wordpress/data';
import { BlockIcon } from '@wordpress/block-editor';
import classnames from 'classnames';
import { Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { getOffset } from 'gutenverse-core/helper';
import { IconChevronDownSVG } from 'gutenverse-core/icons';

const TreeSelectorChild = ({ blocks, onChange, indent, elementRef }) => {
    return blocks.map(data => {
        const { clientId } = data;

        return <SelectorItem
            key={clientId}
            data={data}
            indent={indent}
            onChange={onChange}
            elementRef={elementRef}
        />;
    });
};

const SelectorItem = ({ data, indent, onChange, elementRef, showChild }) => {
    const [expand, setExpand] = useState(false);
    const { clientId, innerBlocks, attributes } = data;
    const { elementId } = attributes;
    const blockName = select('core/block-editor').getBlockName(clientId);
    const blockType = select('core/blocks').getBlockType(blockName);
    const { title, icon } = blockType;
    const text = elementId ? elementId : __('Not a Gutenverse Element', '--gctd--');

    const { toggleBlockHighlight } = useDispatch(blockEditorStore);

    const highlightBlock = () => {
        const doc = elementRef.ownerDocument;
        const win = doc.defaultView || doc.parentWindow;
        const scrollWindow = doc.getElementsByClassName('interface-interface-skeleton__content')[0] || win;
        const element = doc.getElementById(`block-${clientId}`);

        const scrollDiv = getOffset(element).top;
        scrollWindow.scrollTo({ top: scrollDiv - 90 });

        toggleBlockHighlight(clientId, true);
    };

    const cancelHighlightBlock = () => toggleBlockHighlight(clientId, false);
    const toggleExpand = () => setExpand(!expand);

    const changeValue = () => {
        elementId && onChange(elementId);
    };

    return <>
        <div data-indent={indent} className={classnames('gutenverse-tree-selector', {
            expand: expand
        })}>
            <Tooltip text={text}>
                <div className="gutenverse-tree-head"
                    onMouseOver={highlightBlock}
                    onMouseLeave={cancelHighlightBlock}
                >
                    {innerBlocks.length > 0 && <span className="gutenverse-tree-expander" onClick={toggleExpand}>
                        <IconChevronDownSVG />
                    </span>}
                    <span className="gutenverse-tree-icon" onClick={changeValue}>
                        <BlockIcon icon={icon} />
                    </span>
                    <span className="gutenverse-tree-title" onClick={changeValue}>
                        {title}
                    </span>
                </div>
            </Tooltip>
        </div>
        {expand && innerBlocks.length > 0 && showChild && <TreeSelectorChild
            blocks={innerBlocks}
            onChange={onChange}
            elementRef={elementRef}
            indent={indent + 1}
        />}
    </>;
};


const TreeSelector = ({ blocks, showChild, onChange, elementRef }) => {
    return blocks.map(data => {
        const { clientId } = data;

        return <div className="gutenverse-tree-section" key={clientId}>
            <SelectorItem
                data={data}
                indent={0}
                showChild={showChild}
                onChange={onChange}
                elementRef={elementRef}
            />
        </div>;
    });
};

const ElementSelectorControl = (props) => {
    const {
        label,
        allowDeviceControl,
        placeholder = '',
        value = allowDeviceControl ? {} : '',
        onValueChange,
        description = '',
        elementRef,
        blocks = select('core/block-editor').getBlocks(),
        showChild = true
    } = props;

    const [expand, setExpand] = useState();
    const id = useInstanceId(ElementSelectorControl, 'inspector-selector-control');

    const onChange = value => {
        onValueChange(value);
    };

    const toggleExpand = () => {
        setExpand(value => !value);
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-selector'}>
        <ControlHeadingSimple
            id={`${id}-selector`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'control-text'}>
                <input
                    id={`${id}-text`}
                    type="text"
                    className="control-input-text"
                    placeholder={placeholder}
                    value={value === undefined ? '' : value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
            <div className={classnames('control-selector', {
                expand: expand
            })}>
                <div className={'control-selector-heading'} onClick={toggleExpand}>
                    <h3>{__('Select Element', '--gctd--')}</h3>
                    <span>
                        <IconChevronDownSVG />
                    </span>
                </div>
                {expand && <div className="control-selector-content">
                    <TreeSelector
                        blocks={blocks}
                        showChild={showChild}
                        onChange={onChange}
                        selected={value}
                        elementRef={elementRef}
                    />
                </div>}
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(ElementSelectorControl);