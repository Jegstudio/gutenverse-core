import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const withCopyElementToolbar = () => (BlockElement) => {
    return (props) => {
        const { attributes } = props;
        const { elementId } = attributes;
        const [dummyID, setDummyID] = useState(elementId);
        const [panelState, setPanelState] = useState({});
        const [panelIsClicked, setPanelIsClicked] = useState(false);

        const copyRef = useRef();

        const copyText = useCallback(() => {
            navigator.clipboard.writeText(elementId);

            setDummyID(__('Copied...', '--gctd--'));
            const timeoutId = setTimeout(() => {
                setDummyID(elementId);
            }, 500);

            return () => clearTimeout(timeoutId);
        }, [elementId]);

        useEffect(() => {
            setDummyID(elementId);
        }, [elementId]);

        return <>
            <BlockElement {...props} panelState={panelState} setPanelState={setPanelState} panelIsClicked={panelIsClicked} setPanelIsClicked={setPanelIsClicked} />
            <BlockControls>
                <ToolbarGroup>
                    <Tooltip text={__('Click to Copy Element Id', '--gctd--')}>
                        <div className="copy-clipboard">
                            <input className="copy-wrapper" onClick={copyText} ref={copyRef} value={dummyID} readOnly={true} type={'text'} />
                        </div>
                    </Tooltip>
                </ToolbarGroup>
            </BlockControls>
        </>;
    };
};