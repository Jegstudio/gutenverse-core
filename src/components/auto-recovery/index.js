import debounce from 'lodash/debounce';
import { select, subscribe, dispatch } from '@wordpress/data';
import { sprintf, __ } from '@wordpress/i18n';
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
export const recoverBlocks = (allBlocks, invalidBlock) => {
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
                invalidBlock();
                consoleMessage(currentBlock);
                return {
                    blocks: recoveredBlocks,
                    isReusable: true,
                    ref,
                };
            }
        }

        if (currentBlock.innerBlocks && currentBlock.innerBlocks.length) {
            const newInnerBlocks = recoverBlocks(currentBlock.innerBlocks, invalidBlock);
            if (
                newInnerBlocks.some((InnerBlock) => InnerBlock.recovered)
            ) {
                currentBlock.innerBlocks = newInnerBlocks;
                currentBlock.replacedClientId = currentBlock.clientId;
                currentBlock.recovered = true;
            }
        }

        if (isInvalid(currentBlock)) {
            invalidBlock();
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

export const autoRecovery = () => {
    const checkInvalid = debounce(() => {
        if (window?.GutenverseConfig?.autoBlockRecovery) {
            let recoveredCount = 0;
            const invalidBlock = () => {
                recoveredCount ++;
            };
            const mainBlocks = recoverBlocks(
                select('core/block-editor').getBlocks(),
                invalidBlock
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
            if (recoveredCount) {
                dispatch('core/notices').createNotice(
                    'info',
                    sprintf(__('%s Block%s Recovered', '--gctd--'), recoveredCount, recoveredCount === 1 ? '' : 's'),
                    {
                        type: 'snackbar',
                        isDismissible: true,
                    }
                );
            }
        }
    }, 1000);

    let content = false;

    subscribe(() => {
        const temporaryContent = select('core/editor').getEditedPostContent();
        if (select('core').getEntityRecords('postType', 'wp_block') !== null && content !== temporaryContent) {
            content = temporaryContent;
            checkInvalid();
        }
    });
};