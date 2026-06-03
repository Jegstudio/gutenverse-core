import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { DashboardBody, DashboardContent, DashboardHeader } from '../../components';
import { BannerPro } from 'gutenverse-core/components';
import { activeTheme, clientUrl, upgradeProUrl } from 'gutenverse-core/config';
import PluginItem from './components/plugin-item';
import TabNavigation from './components/tab-navigation';

const PluginLists = ({ pluginEcosystem, fetching, activeTab, ...props }) => {
    if (fetching) {
        return <>
            <div className="ecosystem-data fetching" />
            <div className="ecosystem-data fetching" />
            <div className="ecosystem-data fetching" />
            <div className="ecosystem-data fetching" />
        </>;
    }

    const sortedEcosystem = pluginEcosystem ? [...pluginEcosystem].sort((a, b) => {
        if (a.host === 'server-pro' && b.host !== 'server-pro') return 1;
        if (b.host === 'server-pro' && a.host !== 'server-pro') return -1;
        return 0;
    }) : null;

    const filteredEcosystem = sortedEcosystem ? sortedEcosystem.filter((plugin) => {
        if (activeTab === 'free') return plugin.host !== 'server-pro';
        if (activeTab === 'pro') return plugin.host === 'server-pro';
        return true;
    }) : null;

    return filteredEcosystem && filteredEcosystem.map((plugin, i) => (
        <PluginItem key={i} plugin={plugin} {...props} />
    ));
};

const Ecosystem = props => {
    const { library = null, plugins, installPlugin, activatePlugin, updatePlugin } = props;
    const { pluginEcosystem } = library;
    const [fetching, setFetching] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        if (library?.pluginEcosystem) {
            setFetching(false);
        }
    }, [library]);

    const pluginsData = {
        fetching,
        activeTab,
        plugins: plugins?.installedPlugin,
        pluginEcosystem,
        installPlugin,
        activatePlugin,
        updatePlugin,
    };

    return (
        <DashboardContent>
            <DashboardHeader>
                <h2>{__('Gutenverse Ecosystem', '--gctd--')}</h2>
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </DashboardHeader>
            <DashboardBody>
                <BannerPro
                    title={<>{__('Make Your ', '--gctd--')}<span>{__(' Workflow More Efficient ', '--gctd--')}</span><br />{__(' by Using Gutenverse PRO!', '--gctd--')}</>}
                    customStyles={{ margin: '0 0 40px' }}
                    container="ecosystem"
                    leftBannerImg="ecosystem-graphic-ecosystem-left.png"
                    rightBannerImg="ecosystem-graphic-ecosystem-right.png"
                    backgroundGradient="banner-dasboard-bg.png"
                    link={`${upgradeProUrl}?utm_source=gutenverse&utm_medium=dashboard&utm_client_site=${clientUrl}&utm_client_theme=${activeTheme}`}
                />
                <div className="ecosystem-wrapper">
                    <PluginLists {...pluginsData} />
                </div>
            </DashboardBody>
        </DashboardContent>
    );
};

export default compose(
    withSelect(select => {
        const {
            getLibraryData,
            getPluginData,
        } = select('gutenverse/library');

        return {
            library: getLibraryData(),
            plugins: getPluginData()
        };
    }),
    withDispatch((dispatch) => {
        const {
            installPlugin,
            activatePlugin,
            updatePlugin
        } = dispatch('gutenverse/library');

        return {
            installPlugin,
            activatePlugin,
            updatePlugin
        };
    }),
)(Ecosystem);