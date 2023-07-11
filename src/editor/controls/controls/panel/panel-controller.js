import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useEffect, useState, useCallback } from '@wordpress/element';
import { BlockController } from 'gutenverse-core-editor/controls';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import { PanelSequence } from 'gutenverse-core-editor/controls';
import { Tooltip } from '@wordpress/components';

const PanelController = ({ ...props }) => {
    const {
        panelProps,
        panelList,
        elementRef
    } = props;

    const [activeTab, setActiveTab] = useState(null);
    const [openTab, setOpenTab] = useState(0);

    useEffect(() => {
        setOpenTab(0);
    }, [activeTab]);

    const onRefChange = useCallback(node => {
        if (node !== null && tabPanel.length > 1) {
            const blockInspector = node.closest('.block-editor-block-inspector');
            if (blockInspector) {
                blockInspector.setAttribute('data-gutenverse-tab', activeTab === null ? tabPanel[0].id : activeTab);
            }
        }
    }, [activeTab]);


    const updateToggleTab = index => {
        setOpenTab(value => {
            if (value === index) {
                return null;
            } else {
                return index;
            }
        });
    };

    const tabPanel = PanelSequence.filter(detail => {
        const { id } = detail;
        const numberPanel = panelList().reduce((accumulator, panel) => {
            const { tabRole = false } = panel;
            if (tabRole) {
                const { id: tabRoleId } = tabRole;
                if (tabRoleId === id) {
                    return accumulator += 1;
                } else {
                    return accumulator;
                }
            } else {
                return accumulator;
            }
        }, 0);

        return numberPanel > 0;
    });

    return <>
        <InspectorControls>
            <div className='gutenverse-panel-wrapper' ref={onRefChange}>
                {applyFilters('gutenverse.inspectorcontrol.before', null, props)}
                {tabPanel.length > 1 && <>
                    <div className='gutenverse-tab-list'>
                        {tabPanel.map((detail, index) => {
                            const { id, name, icon } = detail;
                            return <Tooltip text={name}>
                                <div className={classnames('gutenverse-tab-item', {
                                    active: activeTab === id || (activeTab === null && index === 0)
                                })} onClick={() => setActiveTab(id)}>
                                    {icon}
                                </div>
                            </Tooltip>
                        })}
                    </div>
                    {panelList().filter(panel => {
                        let active = activeTab === null ? tabPanel[0].id : activeTab;
                        const { tabRole, title } = panel;
                        if (tabRole) {
                            const { id: tabId } = tabRole;
                            return tabId === active
                        } else {
                            return tabPanel[0].id === active;
                        }
                    }).map((panel, index) => {
                        const panelBody = classnames('gutenverse-panel', {
                            [`panel-${panel.id}`]: undefined !== panel.id,
                            pro: panel.pro
                        });
                        const { id } = panel;
                        return <PanelBody
                            scrollAfterOpen={false}
                            className={panelBody}
                            key={index}
                            title={panel.title}
                            opened={openTab === index}
                            onToggle={() => updateToggleTab(index)}
                        >
                            <BlockController
                                panelArray={panel.panelArray}
                                panelProps={panelProps}
                                elementRef={elementRef}
                            />
                        </PanelBody>;
                    })}
                </>}
                {tabPanel.length === 0 && panelList().map((panel, index) => {
                    const panelBody = classnames('gutenverse-panel', {
                        [`panel-${panel.id}`]: undefined !== panel.id,
                        pro: panel.pro
                    });
                    const { id } = panel;
                    return <PanelBody
                        scrollAfterOpen={false}
                        className={panelBody}
                        key={index}
                        title={panel.title}
                        opened={openTab === index}
                        onToggle={() => updateToggleTab(index)}
                    >
                        <BlockController
                            panelArray={panel.panelArray}
                            panelProps={panelProps}
                            elementRef={elementRef}
                        />
                    </PanelBody>;
                })}
                {applyFilters('gutenverse.inspectorcontrol.after', null, props)}
            </div>
        </InspectorControls>
    </>;
};

export default PanelController;