import { applyFilters } from '@wordpress/hooks';
import React from 'react';
import { __ } from '@wordpress/i18n';
import { CardPro } from 'gutenverse-core/components';

const PanelTabPro = ({ activeTab }) => {
    const {
        serverUrl, proUrl
    } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};
    return applyFilters(
        'gutenverse.panel.tab.pro.content',
        (
            activeTab === 'pro' && <div className={'gutenverse-panel-pro'}>
                {window['GutenverseConfig'] &&
                    <>
                        <div className="guten-pro-themes-wrapper">
                            <CardPro/>
                            <div className="guten-pro-advance-animation-banner guten-pro-themes-full">
                                <div className="guten-pro-advance-animation-title">
                                    <p>Advanced <br/> Animation</p>
                                </div>
                                <div className="guten-pro-advance-animation-image">
                                    <img className="guten-pro-advance-animation-grid" src={window['GutenverseConfig'].imgDir + '/pro/Advance Animation/pattern-grid.png'} />
                                    <img className="guten-pro-advance-animation-arrow" src={window['GutenverseConfig'].imgDir + '/pro/Advance Animation/arrow-white.png'} />
                                    <img className="guten-pro-advance-animation-mockup" src={window['GutenverseConfig'].imgDir + '/pro/Advance Animation/mockup_animation.png'} />
                                </div>
                            </div>
                            <div className="guten-pro-total-themes guten-pro-themes-half">
                                <h5 className="guten-pro-total-themes-number">650+</h5>
                                <p className="guten-pro-total-themes-title">Themes, Layouts,</p>
                                <p className="guten-pro-total-themes-title"> and Sections.</p>
                                <img className="guten-pro-total-themes-image" src={window['GutenverseConfig'].imgDir + '/pro/Template Library/mockup_library.png'} />
                            </div>
                            <div className="guten-pro-popup-builder guten-pro-themes-half">
                                <div className="guten-pro-popup-builder-row ">
                                    <p className="guten-pro-popup-builder-title">Pop Up <br/>Builder</p>
                                    <img className="guten-pro-popup-builder-arrow" src={window['GutenverseConfig'].imgDir + '/pro/Popup Builder/arrow-dark.png'} />
                                </div>
                                <img className="guten-pro-popup-builder-mockup" src={window['GutenverseConfig'].imgDir + '/pro/Popup Builder/mockup-popup.png'} />
                            </div>

                            <div className="guten-pro-form guten-pro-themes-half">
                                <p className="guten-pro-form-title">Advanced <br/> Form</p>
                                <img className="guten-pro-form-mockup" src={window['GutenverseConfig'].imgDir + '/pro/Advanced Form/form-mockup.png'} />
                            </div>
                            <div className="guten-pro-premium-theme guten-pro-themes-half">
                                <img className="guten-pro-premium-image" src={window['GutenverseConfig'].imgDir + '/pro/Premium Themes/overlay-premium-themes.png'} />
                                <h5 className="guten-pro-premium-number">25+</h5>
                                <p className="guten-pro-premium-title">Premium <br/>Themes</p>
                            </div>
                            <div className="guten-pro-element-pro guten-pro-themes-full">
                                <img className="guten-pro-element-pro-image" src={window['GutenverseConfig'].imgDir + '/pro/Element PRO/overlay-gutenverse.png'} />
                                <p className="guten-pro-element-pro-title">Element PRO</p>
                                <p className="guten-pro-element-pro-description">We have element PRO like <b>Condition Filter, Lottie, Mega Menu</b> and other elements which will be released soon.</p>
                            </div>

                            <div className="guten-pro-shape-divider guten-pro-themes-half">
                                <p className="guten-pro-shape-divider-title">Shape Divider <br/> Animated</p>
                                <img className="guten-pro-shape-divider-icon" src={window['GutenverseConfig'].imgDir + '/pro/Shape Divider Animated/icon-animation.png'} />
                                <img className="guten-pro-shape-divider-image" src={window['GutenverseConfig'].imgDir + '/pro/Shape Divider Animated/graphic-shape-divider.png'} />
                            </div>
                            <div className="guten-pro-background guten-pro-themes-half">
                                <img className="guten-pro-background-image" src={window['GutenverseConfig'].imgDir + '/pro/Background Animated/bg-background-animated.png'} />
                                <p className="guten-pro-background-title">Background <br/> Animated</p>
                            </div>
                            <a className="detail-button " href={serverUrl} target="_blank" rel="noreferrer">{__('View Details', '--gctd--')}</a>
                            <a className="pro-button " href={proUrl} target="_blank" rel="noreferrer">{__('Upgrade Pro', '--gctd--')}</a>
                        </div>
                    </>
                }
            </div>
        ),
        null
    );
};

export default PanelTabPro;