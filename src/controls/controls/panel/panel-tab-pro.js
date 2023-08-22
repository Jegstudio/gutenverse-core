import { applyFilters } from '@wordpress/hooks';
import React from 'react';

const PanelTabPro = ({ activeTab }) => {
    return applyFilters(
        'gutenverse.panel.tab.pro.content',
        (
            activeTab === 'pro' && <div className={'gutenverse-panel-pro'}>
                {window['GutenverseConfig'] && <img className="banner-image" src={window['GutenverseConfig'].imgDir + '/banner-pro-01.png'} />}
            </div>
        ),
        null
    );
};

export default PanelTabPro;