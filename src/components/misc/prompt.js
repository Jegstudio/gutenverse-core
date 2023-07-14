import { cloneElement, Children } from '@wordpress/element';
import { createPortal } from '@wordpress/element';
import classnames from 'classnames';
import { EscListener } from 'gutenverse-core-editor/components';

export const PromptHeader = ({ children, ...props }) => {
    return cloneElement(children, { ...props });
};

export const PromptContent = ({ children, ...props }) => {
    return cloneElement(children, { ...props });
};

const PromptWrapper = (props) => {
    const { className, closePrompt, children } = props;
    let TheHeader = null;
    let TheBody = null;

    Children.map(children, (child) => {
        if (child) {
            if (child.type === PromptHeader) {
                TheHeader = child;
            }

            if (child.type === PromptContent) {
                TheBody = child;
            }
        }
    });

    return <>
        <EscListener execute={() => closePrompt()} />
        <div className={classnames('gutenverse-prompt-wrapper', className)}>
            <div className={'gutenverse-prompt-overlay'} onClick={() => closePrompt()} />
            <div className={'gutenverse-prompt-container'}>
                <div className={'gutenverse-prompt-header'}>
                    {TheHeader}
                </div>
                <div className={'gutenverse-prompt-body'}>
                    {TheBody}
                </div>
            </div>
        </div>
    </>;
};

const Prompt = (props) => {
    const body = document.getElementsByTagName('body')[0];
    const element = <PromptWrapper {...props} />;
    return createPortal(element, body);
};

export default Prompt;