import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useEffect, useState, useCallback } from '@wordpress/element';
import { BlockController, TabPro } from 'gutenverse-core/controls';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import { PanelSequence } from 'gutenverse-core/controls';
import { Tooltip } from '@wordpress/components';
import PanelTabPro from './panel-tab-pro';
import { u } from 'gutenverse-core/components';
import { dispatch, select } from '@wordpress/data';

export const BlockPanelController = ({ props, panelList, deviceType }) => {
    const { panelProps, isSelected, setAttributes } = props;
    const defaultPanelProps = {
        ...panelProps,
        ...props.attributes,
        setAttributes
    };
    return <PanelController
        panelList={panelList}
        panelProps={defaultPanelProps}
        isSelected={isSelected}
        deviceType={deviceType}
        {...props}
    />;
};
const PanelController = ({ ...props }) => {
    const {
        panelProps,
        panelList,
        elementRef,
        panelState,
        setPanelIsClicked,
    } = props;

    const [switcher, setSwitcher] = useState({});
    const [activeTab, setActiveTab] = useState(null);
    const [openTab, setOpenTab] = useState(0);
    useEffect(() => {
        setOpenTab(0);
    }, [activeTab]);

    useEffect(() => {
        const { panel = null, section = 0 } = panelState;

        if (null !== panel && 0 !== section) {
            const sidebarOpen = select('core/edit-post').getActiveGeneralSidebarName();
            if ('edit-post/block' !== sidebarOpen) {
                dispatch('core/edit-post').openGeneralSidebar('edit-post/block');
            }

            setActiveTab(panel);
            setTimeout(() => {
                setOpenTab(section);
                setTimeout(() => {
                    const opened = u('.gutenverse-panel.is-opened');
                    if (opened.length) {
                        u('.gutenverse-panel.is-opened').scroll();
                    }
                }, 100);
            }, 100);
        }
    }, [panelState]);

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

    const tabList = PanelSequence.filter(detail => {
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

    const tabPanel = applyFilters(
        'gutenverse.panel.tab.pro',
        (() => [
            ...tabList,
            TabPro
        ])(),
        tabList
    );

    const thePanelProps = {
        ...panelProps,
        switcher,
        setSwitcher,
    };

    return <>
        <InspectorControls>
            <div className="gutenverse-panel-wrapper" ref={onRefChange} onClick={() => setPanelIsClicked(true)} >
                {applyFilters('gutenverse.inspectorcontrol.before', null, props)}
                {tabPanel.length >= 1 && <>
                    <div className="gutenverse-tab-list">
                        {tabPanel.map((detail, index) => {
                            const { id, name, icon } = detail;
                            return <Tooltip key={id} text={name}>
                                <div className={classnames('gutenverse-tab-item', {
                                    active: activeTab === id || (activeTab === null && index === 0)
                                })} onClick={() => setActiveTab(id)}>
                                    {icon}
                                </div>
                            </Tooltip>;
                        })}
                    </div>
                    <PanelTabPro activeTab={activeTab} />
                    {panelList().filter(panel => {
                        let active = activeTab === null ? tabPanel[0].id : activeTab;
                        const { tabRole } = panel;

                        if (tabRole) {
                            const { id: tabId } = tabRole;
                            return tabId === active;
                        } else {
                            return tabPanel[0].id === active;
                        }
                    }).map((panel, index) => {
                        const panelBody = classnames('gutenverse-panel', {
                            [`panel-${panel.id}`]: undefined !== panel.id,
                            pro: panel.pro
                        });
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
                                panelProps={thePanelProps}
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
                            panelProps={thePanelProps}
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