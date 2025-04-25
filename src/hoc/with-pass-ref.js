import { useState, createPortal } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Notice from '../components/notice';

/**
 * This is a generic hoc used for passing block ref to another hoc.
 * @param {*} BlockElement block element.
 * @returns BlockElement.
 */
export const withPassRef = BlockElement => {
    return (props) => {
        const [blockRef, setBlockRef] = useState(null);
        const [editorWarn, setEditorWarn] = useState(false);
        const [isChecked, setIsChecked] = useState(true);

        const addStyleFallback = () => {
            setEditorWarn(true);
        };

        const handleOnClose = () => {
            localStorage.setItem('dismissed_popup', isChecked);
            setEditorWarn(false);
        };

        return <>
            <BlockElement
                {...props}
                setBlockRef={setBlockRef}
                blockRef={blockRef}
                addStyle={addStyleFallback}
                removeStyle={addStyleFallback}
            />
            { editorWarn && (localStorage.getItem('dismissed_popup') === 'false') && createPortal(<Notice
                icon={<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.4286 0.517446C11.0653 -0.172482 9.93558 -0.172482 9.5723 0.517446L0.122776 18.4514C0.0377128 18.6121 -0.0044578 18.7922 0.000372931 18.9742C0.00520366 19.1562 0.0568709 19.3338 0.150341 19.4898C0.24381 19.6457 0.375894 19.7747 0.533723 19.8641C0.691551 19.9535 0.869741 20.0004 1.05093 20H19.95C20.131 20.0004 20.3091 19.9536 20.4668 19.8642C20.6246 19.7749 20.7565 19.646 20.8499 19.4901C20.9433 19.3342 20.9949 19.1567 20.9996 18.9749C21.0044 18.793 20.9622 18.613 20.8771 18.4524L11.4286 0.517446ZM11.5504 16.8352H9.45051V14.7253H11.5504V16.8352ZM9.45051 12.6154V7.34077H11.5504L11.5515 12.6154H9.45051Z" fill="#FFB200" />
                </svg>}
                title={__('Please Update Your Theme.', '--gctd--')}
                description={__('This warning means your theme isn\'t compatible with the latest Gutenverse version. If no update of the theme is available, please contact our support team.', '--gctd--')}
                buttonText={__('I Understand.', '--gctd--')}
                onClick={() => handleOnClose()}
                onClose={() => handleOnClose()}
                scheme="warning"
                confirmation={true}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
            />, document.getElementById('gutenverse-root'))}
        </>;
    };
};
