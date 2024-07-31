import { select, subscribe } from '@wordpress/data';
import { render } from '@wordpress/element';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import debounce from 'lodash/debounce';

export const editorWarn = () => {
    const checkMissingBlock = debounce(() => {
        if (window?.GutenverseConfig?.missingBlocksWarn) {
            const missingBlock = checkForMissingBlocks(['gutenverse']);
            if (missingBlock && missingBlock.length > 0) {
                const root = document.getElementById('gutenverse-root');

                const warnRoot = document.createElement('div');
                warnRoot.id = 'gutenverse-warn';

                root.parentNode.insertBefore(warnRoot, root.nextSibling);
                render(<WarnModal missingBlock={missingBlock} />, warnRoot);
            }
        }
    }, 1000);

    let content = false;

    subscribe(() => {
        const temporaryContent = select('core/editor').getEditedPostContent();
        if (select('core').getEntityRecords('postType', 'wp_block') !== null && content !== temporaryContent) {
            content = temporaryContent;
            checkMissingBlock();
        }
    });
};

const checkForMissingBlocks = (unsupportedBlockNames, blocks = false) => {
    if (!blocks) {
        blocks = select('core/block-editor').getBlocks();
    }

    let unsupportedBlocks = [];

    blocks.forEach(block => {
        if (block.name === 'core/missing' && block.attributes && block.attributes.originalName) {
            const originalName = block.attributes.originalName;

            if (unsupportedBlockNames.some(partialName => originalName.startsWith(partialName)) && !unsupportedBlocks.includes(originalName)) {
                console.log(`Unsupported block found in content: ${originalName}`);
                unsupportedBlocks.push(originalName);
            }
        }

        if (block.innerBlocks && block.innerBlocks.length > 0) {
            const innerUnsupportedBlocks = checkForMissingBlocks(unsupportedBlockNames, block.innerBlocks);
            unsupportedBlocks = [...unsupportedBlocks, ...innerUnsupportedBlocks];
        }
    });

    return unsupportedBlocks;
};

const WarnModal = (props) => {
    const { missingBlock } = props;
    const [open, setOpen] = useState(true);
    const [doNotShowAgain, setDoNotShowAgain] = useState(false);

    const doNotShow = () => {
        setDoNotShowAgain(!doNotShowAgain);
    };

    const closeWarn = () => {
        setOpen(false);
        if (doNotShowAgain) {
            apiFetch({
                path: 'gutenverse-client/v1/settings/modify',
                method: 'POST',
                data: {
                    setting: {
                        editor_settings: {
                            missing_block_warn: false,
                        }
                    }
                }
            });
        }
    };

    return open ? (
        <div className="gutenverse-editor-warn">
            <div className="gutenverse-warn-wrapper">
                <div className="gutenverse-warn-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none"><path fill="#FFC908" d="M7.5 0a7.501 7.501 0 0 0 0 15 7.5 7.5 0 1 0 0-15m0 3.327a1.27 1.27 0 1 1 0 2.54 1.27 1.27 0 0 1 0-2.54m1.694 7.681c0 .2-.163.363-.363.363H6.169a.363.363 0 0 1-.363-.363v-.726c0-.2.163-.363.363-.363h.363V7.984H6.17a.363.363 0 0 1-.363-.363v-.726c0-.2.163-.363.363-.363h1.936c.2 0 .363.163.363.363V9.92h.363c.2 0 .363.163.363.363z"></path></svg>
                    <span>{__('Missing Gutenverse Block', '--gctd--')}</span>
                </div>
                <div className="gutenverse-warn-description">
                    {__('Some blocks are missing. They might be disabled or require the corresponding Gutenverse plugins to be installed and activated to restore these blocks:', '--gctd--')}
                </div>
                <ul className="gutenverse-warn-list">
                    {missingBlock.map((block, index) => (
                        <li key={index} style={{ marginBottom: '5px' }}>{block}</li>
                    ))}
                </ul>
                <div className="gutenverse-warn-footer">
                    <div className="warn-checkbox" onClick={doNotShow}>
                        {doNotShowAgain ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#3B57F7" />
                            <path d="M12 5L6.5 10.5L4 8" stroke="#3B57F7" strokeWidth="1.6666" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="white" />
                            <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#BDBEBF" />
                        </svg>
                        }
                        {__('Do not show this again', '--gctd--')}
                    </div>
                    <button
                        onClick={closeWarn}
                    >
                        {__('OK', '--gctd--')}
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};
