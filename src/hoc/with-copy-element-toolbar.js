import { useEffect, useRef, useState } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const withCopyElementToolbar = () => (BlockElement) => {
    return (props) => {
        const { attributes } = props;
        const { elementId } = attributes;
        const [dummyID, setDummyID] = useState(elementId);

        const copyRef = useRef();

        const copyText = async () => {
            await navigator.clipboard.writeText(elementId);

            setDummyID(__('Copied...', 'gutenverse'));
            setTimeout(() => {
                setDummyID(elementId);
            }, 500);
        };

        useEffect(() => {
            setDummyID(elementId);
        }, [elementId]);

        return <>
            <BlockElement {...props} />
            <BlockControls>
                <ToolbarGroup>
                    <Tooltip text={__('Click to Copy Element Id', 'gutenverse')}>
                        <div className="copy-clipboard">
                            <input className="copy-wrapper" onClick={copyText} ref={copyRef} value={dummyID} readOnly={true} type={'text'} />
                        </div>
                    </Tooltip>
                </ToolbarGroup>
            </BlockControls>
        </>;
    };
};