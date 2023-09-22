import { applyFilters } from '@wordpress/hooks';
import { upgradeProUrl } from 'gutenverse-core/config';

const PanelTabPro = ({ activeTab }) => {
    return applyFilters(
        'gutenverse.panel.tab.pro.content',
        (
            activeTab === 'pro' && <div className={'gutenverse-panel-pro'}>
                <a href={upgradeProUrl}>
                    {window['GutenverseConfig'] && <img className="banner-image" src={window['GutenverseConfig'].imgDir + '/banner-pro-01.png'} />}
                </a>
            </div>
        ),
        null
    );
};

export default PanelTabPro;