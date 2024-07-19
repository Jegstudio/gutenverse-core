import { select, dispatch, subscribe } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
    createBlock,
    parse,
    serialize,
    getBlockType,
    isReusableBlock,
} from '@wordpress/blocks';

// This scrip is from : https://github.com/shimotmk/auto-block-recovery/

export const isInvalid = (block) => {
    const { name, isValid, validationIssues } = block;

    if (!name) {
        return false;
    }

    if (isValid || !validationIssues.length) {
        return false;
    }

    return true;
};

export const autoAttemptRecovery = () => {
    setTimeout(() => {
        const unsubscribe = subscribe(() => {
            if (
                select('core').getEntityRecords('postType', 'wp_block') !==
                null
            ) {
                unsubscribe();
                const mainBlocks = recoverBlocks(
                    select('core/block-editor').getBlocks()
                );
                // Replace the recovered blocks with the new ones.
                mainBlocks.forEach((block) => {
                    if (block.isReusable && block.ref) {
                        // Update the reusable blocks.
                        dispatch('core')
                            .editEntityRecord(
                                'postType',
                                'wp_block',
                                block.ref,
                                { content: serialize(block.blocks) }
                            )
                            .then();
                    }

                    if (block.recovered && block.replacedClientId) {
                        dispatch('core/block-editor').replaceBlock(
                            block.replacedClientId,
                            block
                        );
                    }
                });
            }
        });
    }, 0);
};

const recursivelyRecoverInvalidBlockList = (blocks) => {
    const currentBlocks = [...blocks];
    let isRecovered = false;
    const recursivelyRecoverBlocks = (willRecoverBlocks) => {
        willRecoverBlocks.forEach((block) => {
            if (isInvalid(block)) {
                isRecovered = true;
                const newBlock = recoverBlock(block);
                for (const key in newBlock) {
                    block[key] = newBlock[key];
                }
            }

            if (block.innerBlocks.length) {
                recursivelyRecoverBlocks(block.innerBlocks);
            }
        });
    };

    recursivelyRecoverBlocks(currentBlocks);
    return [currentBlocks, isRecovered];
};

// start recovery blocks
export const recoverBlocks = (allBlocks) => {
    return allBlocks.map((block) => {
        const currentBlock = block;

        if (isReusableBlock(getBlockType(block.name))) {
            const {
                attributes: { ref },
            } = block;
            const parsedBlocks =
                parse(
                    select('core').getEntityRecords('postType', 'wp_block', {
                        include: [ref],
                    })?.[0]?.content?.raw
                ) || [];

            const [recoveredBlocks, isRecovered] =
                recursivelyRecoverInvalidBlockList(parsedBlocks);

            if (isRecovered) {
                consoleMessage(currentBlock);
                return {
                    blocks: recoveredBlocks,
                    isReusable: true,
                    ref,
                };
            }
        }

        if (currentBlock.innerBlocks && currentBlock.innerBlocks.length) {
            const newInnerBlocks = recoverBlocks(currentBlock.innerBlocks);
            if (
                newInnerBlocks.some((InnerBlock) => InnerBlock.recovered)
            ) {
                currentBlock.innerBlocks = newInnerBlocks;
                currentBlock.replacedClientId = currentBlock.clientId;
                currentBlock.recovered = true;
            }
        }

        if (isInvalid(currentBlock)) {
            const newBlock = recoverBlock(currentBlock);
            newBlock.replacedClientId = currentBlock.clientId;
            newBlock.recovered = true;
            consoleMessage(currentBlock);
            return newBlock;
        }

        return currentBlock;
    });
};

// Recovers one block.
export const recoverBlock = ({ name, attributes, innerBlocks }) => {
    return createBlock(name, attributes, innerBlocks);
};

// console message
const consoleMessage = (block) => {
    const message =
        '%c' +
        __('Notice: ', 'auto-block-recovery') +
        block.name +
        __(' was auto recovery.', 'auto-block-recovery') +
        '\n' +
        __(
            'Please check this page in preview and update this page.',
            'auto-block-recovery'
        );

    //eslint-disable-next-line no-console
    console.log(
        message,
        'width: 100%; padding: 6px 12px; background-color: #fef8ee; color: #1e1e1e;'
    );
};

export const initAutoAttemptRecovery = () => {
    if (window._wpLoadBlockEditor && window?.GutenverseConfig?.autoBlockRecovery) {
        window._wpLoadBlockEditor.then(() => {
            autoAttemptRecovery();
        });
    }
};