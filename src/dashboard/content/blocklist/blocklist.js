import { __ } from '@wordpress/i18n';
import { useRef } from '@wordpress/element';
import { ControlCheckbox } from 'gutenverse-core/backend';
import { select } from '@wordpress/data';
import { DashboardBody, DashboardContent, DashboardHeader } from '../../components';

const BlockList = ({ saving, saveData, settingValues, updateValues, updateSettingValues }) => {
    const { imgDir } = window['GutenverseDashboard'];
    const { active_blocks = {} } = settingValues;
    const { blockCategories } = window['GutenverseSettings'];
    const controlRef = useRef();
    const blocks = select('gutenverse/blocklist').getList();

    blocks.map((block) => {
        if (!(block?.name in active_blocks) && !block?.parent) {
            active_blocks[block.name] = true;
        }
    });

    const updateValue = (id, value) => {
        updateSettingValues('active_blocks', id, value);
    };

    const enableCategory = (category) => {
        blocks.map((block) => {
            if (block.category === category) {
                active_blocks[block.name] = true;
            }
        });

        updateValues('active_blocks', active_blocks);
    };

    const disableCategory = (category) => {
        blocks.map((block) => {
            if (block.category === category) {
                active_blocks[block.name] = false;
            }
        });

        updateValues('active_blocks', active_blocks);
    };

    const updateAll = (value) => {
        Object.keys(active_blocks).map((name) => {
            active_blocks[name] = value;
        });

        updateValues('active_blocks', active_blocks);
    };

    const checkAll = (checkValue) => {
        let checkAll = true;

        Object.keys(active_blocks).map(key => {
            if (active_blocks[key] !== checkValue) {
                checkAll = false;
            }
        });

        return checkAll;
    };

    const checkAllCategory = (category, checkValue) => {
        let checkAll = true;

        const blockNames = blocks
            .filter((block) => {
                return category?.slug === block?.category;
            }).map(block => {
                return block.name || '';
            });

        const activeBlocks = Object.keys(active_blocks).
            filter((key) => blockNames.includes(key)).
            reduce((cur, key) => { return Object.assign(cur, { [key]: active_blocks[key] }); }, {});

        Object.keys(activeBlocks).map(key => {
            if (activeBlocks[key] !== checkValue) {
                checkAll = false;
            }
        });

        return checkAll;
    };

    return (
        <DashboardContent>
            <DashboardHeader>
                <div className="header-control">
                    <h2>{__('Global Control', 'gutenverse')}</h2>
                    <div className="block-enable-disable-all">
                        <div className={`disable-all ${checkAll(false) ? 'active' : ''}`} onClick={() => updateAll(false)}>
                            {__('Disable All', 'gutenverse')}
                        </div>
                        <div className={`enable-all ${checkAll(true) ? 'active' : ''}`} onClick={() => updateAll(true)}>
                            {__('Enable All', 'gutenverse')}
                        </div>
                    </div>
                </div>
                {saving ? <div className="gutenverse-button">{__('Saving...', 'gutenverse')}</div> : <div className="gutenverse-button" onClick={() => saveData(['active_blocks'])}>
                    {__('Save Changes', 'gutenverse')}
                </div>}
            </DashboardHeader>
            <DashboardBody>
                <div className="wrapper">
                    <div className="block-notice">
                        <div className="icon">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.68652 0 0 2.68749 0 6C0 9.31444 2.68652 12 6 12C9.31348 12 12 9.31444 12 6C12 2.68749 9.31348 0 6 0ZM6 2.66129C6.56119 2.66129 7.01613 3.11623 7.01613 3.67742C7.01613 4.23861 6.56119 4.69355 6 4.69355C5.43881 4.69355 4.98387 4.23861 4.98387 3.67742C4.98387 3.11623 5.43881 2.66129 6 2.66129ZM7.35484 8.80645C7.35484 8.96678 7.22485 9.09677 7.06452 9.09677H4.93548C4.77515 9.09677 4.64516 8.96678 4.64516 8.80645V8.22581C4.64516 8.06548 4.77515 7.93548 4.93548 7.93548H5.22581V6.3871H4.93548C4.77515 6.3871 4.64516 6.2571 4.64516 6.09677V5.51613C4.64516 5.3558 4.77515 5.22581 4.93548 5.22581H6.48387C6.6442 5.22581 6.77419 5.3558 6.77419 5.51613V7.93548H7.06452C7.22485 7.93548 7.35484 8.06548 7.35484 8.22581V8.80645Z" fill="#FFC908" />
                            </svg>
                        </div>
                        <div className="info">
                            <div>{__('Element Disable', 'gutenverse')}</div>
                            <span></span>
                            <div>
                                {__('if you disable an element that you have used in the WordPress editor, it will appear like ', 'gutenverse')}
                                <span>
                                    this
                                    <img src={`${imgDir}/block-tooltip.webp`} />
                                </span>
                            </div>
                        </div>
                    </div>
                    {blockCategories.map((category) => (
                        <>
                            <div className="block-category">
                                <div className="block-category-info">
                                    <span>{category.title}</span>
                                    <span>
                                        <a className={checkAllCategory(category, false) ? 'active' : ''} onClick={() => disableCategory(category.slug)}>
                                            {__('Disable All', 'gutenverse')}
                                        </a>
                                        <a className={checkAllCategory(category, true) ? 'active' : ''} onClick={() => enableCategory(category.slug)}>
                                            {__('Enable All', 'gutenverse')}
                                        </a>
                                    </span>
                                </div>
                                <div className="block-items">
                                    {blocks
                                        .filter((block) => {
                                            return category?.slug === block?.category;
                                        })
                                        .map((block) => {
                                            if (block?.parent) {
                                                return null;
                                            }

                                            return (
                                                <div key={block.name} className={`block-item ${active_blocks[block.name] ? ' active' : ''}`}>
                                                    <div className="block-info">
                                                        <span className="block-icon">{block?.icon}</span>
                                                        <p className="block-title">{block?.title}</p>
                                                    </div>
                                                    <div className="block-control" ref={controlRef}>
                                                        <ControlCheckbox id={block.name} value={active_blocks[block.name]} updateValue={updateValue} />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </DashboardBody>
        </DashboardContent>
    );
};

export default BlockList;
