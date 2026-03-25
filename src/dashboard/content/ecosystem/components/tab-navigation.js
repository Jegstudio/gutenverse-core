import { __ } from '@wordpress/i18n';
import { Crown } from './icons';

const TabNavigation = ({ activeTab, setActiveTab }) => {
    return (
        <div className="ecosystem-tab-navigation">
            <button
                className={`ecosystem-tab${activeTab === 'all' ? ' active' : ''}`}
                onClick={() => setActiveTab('all')}
            >
                {__('All Plugins', '--gctd--')}
            </button>
            <button
                className={`ecosystem-tab${activeTab === 'free' ? ' active' : ''}`}
                onClick={() => setActiveTab('free')}
            >
                {__('Free Plugins', '--gctd--')}
            </button>
            <button
                className={`ecosystem-tab${activeTab === 'pro' ? ' active' : ''}`}
                onClick={() => setActiveTab('pro')}
            >
                <Crown /> {__('PRO Plugins', '--gctd--')}
            </button>
        </div>
    );
};

export default TabNavigation;
