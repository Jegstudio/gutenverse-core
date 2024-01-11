import { applyFilters } from '@wordpress/hooks';
import React from 'react';
import { __ } from '@wordpress/i18n';
import { CardPro } from 'gutenverse-core/components';
import { IconCrownSVG } from 'gutenverse-core/icons';

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
                            <div className="guten-card-pro-wrapper guten-pro-themes-full" style={{ backgroundImage: `url(${window['GutenverseConfig'].imgDir + '/pro/banner-global/bg-tab-pro.png'})` }}>
                                <div className="guten-card-pro-image-wrapper">
                                    <img className="guten-card-pro-mockup-library" src={window['GutenverseConfig'].imgDir + '/pro/banner-global/mockup-library.png'} />
                                    <img className="guten-card-pro-3d-cube" src={window['GutenverseConfig'].imgDir + '/pro/banner-global/3d-cube.png'} />
                                    <img className="guten-card-pro-icon-lottie" src={window['GutenverseConfig'].imgDir + '/pro/banner-global/icon-element-lottie.png'} />
                                    <img className="guten-card-pro-icon-nav" src={window['GutenverseConfig'].imgDir + '/pro/banner-global/icon-element-nav.png'} />
                                </div>
                                <div className="guten-card-pro-content-wrapper">
                                    <div className="guten-card-pro-title">
                                        Unlock Extra Features with
                                        <span> Gutenverse PRO!</span>
                                        <img className="guten-card-pro-blink" src={window['GutenverseConfig'].imgDir + '/pro/banner-global/blink-2.png'} alt="Guten Card Pro Blink" />
                                    </div>
                                    <img className="guten-card-pro-arrow" src={window['GutenverseConfig'].imgDir + '/pro/banner-global/arrow-blue.png'} alt="Guten Card Pro Arrow" />
                                    <a href="#" className="guten-card-pro-button">Upgrade To PRO <IconCrownSVG transform='translate(0,3)'/></a>
                                </div>
                            </div>
                            <div className="guten-pro-advance-animation-banner guten-pro-themes-full">
                                <div className="guten-pro-advance-animation-title">
                                    <p>Advanced <br/> Animation</p>
                                </div>
                                <img className="guten-pro-advance-animation-object" src={window['GutenverseConfig'].imgDir + '/pro/advance-animation/animations-object.png'} />
                                <img className="guten-pro-advance-animation-rotate" src={window['GutenverseConfig'].imgDir + '/pro/advance-animation/graphic-rotate.png'} />
                            </div>
                            <div className="guten-pro-background-animated-banner guten-pro-themes-half">
                                <div className="guten-pro-background-animated-title">
                                    <p>Background <br/> Animated</p>
                                </div>
                                <img className="guten-pro-background-animated-blink" src={window['GutenverseConfig'].imgDir + '/pro/background-animated/blink-3.png'} />
                                <img className="guten-pro-background-animated-circle" src={window['GutenverseConfig'].imgDir + '/pro/background-animated/circle-bg.png'} />
                            </div>
                            <div className="guten-pro-popup-builder-banner guten-pro-themes-half">
                                <img className="guten-pro-popup-builder-background" src={window['GutenverseConfig'].imgDir + '/pro/popup-builder/background-popup.png'} />
                                <img className="guten-pro-popup-builder-popup" src={window['GutenverseConfig'].imgDir + '/pro/popup-builder/graphic-popup.png'} />
                                <div className="guten-pro-popup-builder-title">
                                    <p>Pop Up Builder</p>
                                </div>
                            </div>
                            <div className="guten-pro-custom-font-banner guten-pro-themes-half">
                                <img className="guten-pro-custom-font-object" src={window['GutenverseConfig'].imgDir + '/pro/custom-font/custom-font.png'} />
                                <div className="guten-pro-custom-font-title">
                                    <p>Custom Font</p>
                                </div>
                            </div>
                            <div className="guten-pro-total-themes guten-pro-themes-half">
                                <h5 className="guten-pro-total-themes-number">650+</h5>
                                <p className="guten-pro-total-themes-title">Themes, Layouts,</p>
                                <p className="guten-pro-total-themes-title"> and Sections.</p>
                                <img className="guten-pro-total-themes-image" src={window['GutenverseConfig'].imgDir + '/pro/library/graphic-library.png'} />
                            </div>
                            <div className="guten-pro-element-pro-banner guten-pro-themes-full">
                                <div className="guten-pro-element-pro-title">
                                    <h2>Element PRO</h2>
                                    <p>We have element PRO like <span> Condition Filter, Lottie, Mega Menu </span> and other elements which will be released soon.</p>
                                </div>
                                <img className="guten-pro-element-pro-background" src={window['GutenverseConfig'].imgDir + '/pro/element/dotted-overlay.png'} />
                                <img className="guten-pro-element-pro-object" src={window['GutenverseConfig'].imgDir + '/pro/element/cube-gutenverse-2.png'} />
                            </div>
                             {/* <div className="guten-pro-popup-builder guten-pro-themes-half">
                                 <div className="guten-pro-popup-builder-row ">
                                     <p className="guten-pro-popup-builder-title">Pop Up <br/>Builder</p>
                                     <img className="guten-pro-popup-builder-arrow" src={window['GutenverseConfig'].imgDir + '/pro/popup-builder/arrow-dark.png'} />
                                 </div>
                                 <img className="guten-pro-popup-builder-mockup" src={window['GutenverseConfig'].imgDir + '/pro/popup-builder/mockup-popup.png'} />
                             </div>

                             <div className="guten-pro-form guten-pro-themes-half">
                                 <p className="guten-pro-form-title">Advanced <br/> Form</p>
                                 <img className="guten-pro-form-mockup" src={window['GutenverseConfig'].imgDir + '/pro/advanced-form/form-mockup.png'} />
                             </div>
                             <div className="guten-pro-premium-theme guten-pro-themes-half">
                                 <img className="guten-pro-premium-image" src={window['GutenverseConfig'].imgDir + '/pro/premium-themes/overlay-premium-themes.png'} />
                                 <h5 className="guten-pro-premium-number">25+</h5>
                                 <p className="guten-pro-premium-title">Premium <br/>Themes</p>
                             </div>
                             <div className="guten-pro-element-pro guten-pro-themes-full">
                                 <img className="guten-pro-element-pro-image" src={window['GutenverseConfig'].imgDir + '/pro/element-pro/overlay-gutenverse.png'} />
                                 <p className="guten-pro-element-pro-title">Element PRO</p>
                                 <p className="guten-pro-element-pro-description">We have element PRO like <b>Condition Filter, Lottie, Mega Menu</b> and other elements which will be released soon.</p>
                             </div>

                             <div className="guten-pro-shape-divider guten-pro-themes-half">
                                 <p className="guten-pro-shape-divider-title">Shape Divider <br/> Animated</p>
                                 <img className="guten-pro-shape-divider-icon" src={window['GutenverseConfig'].imgDir + '/pro/shape-divider-animated/icon-animation.png'} />
                                 <img className="guten-pro-shape-divider-image" src={window['GutenverseConfig'].imgDir + '/pro/shape-divider-animated/graphic-shape-divider.png'} />
                             </div>
                             <div className="guten-pro-background guten-pro-themes-half">
                                 <img className="guten-pro-background-image" src={window['GutenverseConfig'].imgDir + '/pro/background-animated/bg-background-animated.png'} />
                                 <p className="guten-pro-background-title">Background <br/> Animated</p>
                             </div>
                             <a className="detail-button " href={serverUrl} target="_blank" rel="noreferrer">{__('View Details', '--gctd--')}</a>
                             <a className="pro-button " href={proUrl} target="_blank" rel="noreferrer">{__('Upgrade Pro', '--gctd--')}</a>  */}
                        </div>
                    </>
                }
            </div >
        ),
        null
    );
};

export default PanelTabPro;