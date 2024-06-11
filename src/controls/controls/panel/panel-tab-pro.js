import { applyFilters } from '@wordpress/hooks';
import React from 'react';
import { __ } from '@wordpress/i18n';
import { IconCrownBannerSVG, IconCrownSVG } from 'gutenverse-core/icons';
import isEmpty from 'lodash/isEmpty';
import { ButtonUpgradePro } from 'gutenverse-core/components';

const PanelTabPro = ({ activeTab }) => {
    const {
        upgradeProUrl
    } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};
    const ButtonProFirst = applyFilters(
        'gutenverse.pro-text-button', 
        () => isEmpty(window?.gprodata) &&
        <a href={upgradeProUrl} target="_blank" rel="noreferrer" className="guten-card-pro-button"><span>{__('Upgrade To PRO', 'gutenverse-pro')} <IconCrownBannerSVG transform="translate(0,3)" /> </span></a>, 
        {location, buttonType : 'first'});
    const ButtonProSecond = applyFilters(
        'gutenverse.pro-text-button', 
        () => isEmpty(window?.gprodata) &&
        <a href={upgradeProUrl} target="_blank" rel="noreferrer" className="guten-pro-bottom-button">{__('Upgrade To PRO', 'gutenverse-pro')} <IconCrownBannerSVG transform="translate(0,3)" /></a>, 
        {location, buttonType : 'second'});
    return applyFilters(
        'gutenverse.panel.tab.pro.content',
        (
            activeTab === 'pro' && <div className={'gutenverse-panel-pro'}>
                {window['GutenverseConfig'] &&
                    <>
                        <div className="guten-pro-themes-wrapper">
                            <div className="guten-card-pro-wrapper guten-pro-themes-full" style={{ backgroundImage: `url(${window['GutenverseConfig'].imgDir + '/pop-up-bg-popup-banner.png'})` }}>
                                <div className="guten-card-pro-image-wrapper">
                                    <img className="guten-card-pro-mockup-library" src={window['GutenverseConfig'].imgDir + '/pop-up-mockup-pro.png'} />
                                    <img className="guten-card-pro-3d-cube" src={window['GutenverseConfig'].imgDir + '/pop-up-3d-cube-2.png'} />
                                    <img className="guten-card-pro-icon-lottie" src={window['GutenverseConfig'].imgDir + '/pop-up-icon-element-3.png'} />
                                    <img className="guten-card-pro-icon-nav" src={window['GutenverseConfig'].imgDir + '/pop-up-icon-element-2.png'} />
                                </div>
                                <div className="guten-card-pro-content-wrapper">
                                    <div className="guten-card-pro-title">
                                        Unlock Extra Features with
                                        <span> Gutenverse PRO!</span>
                                        <img className="guten-card-pro-blink" src={window['GutenverseConfig'].imgDir + '/banner-graphic-blink.png'} alt="Guten Card Pro Blink" />
                                    </div>
                                    <img className="guten-card-pro-arrow" src={window['GutenverseConfig'].imgDir + '/banner-arrow-blue.png'} alt="Guten Card Pro Arrow" />
                                    <ButtonUpgradePro isBanner={true} location = "card-pro"/>
                                </div>
                            </div>
                            <div className="guten-pro-advance-animation-banner guten-pro-themes-full">
                                <div className="guten-pro-advance-animation-title">
                                    <p>Advanced <br /> Animation</p>
                                </div>
                                <img className="guten-pro-advance-animation-object" src={window['GutenverseConfig'].imgDir + '/pro/advance-animation/animations-object.png'} />
                                <img className="guten-pro-advance-animation-rotate" src={window['GutenverseConfig'].imgDir + '/pro/advance-animation/graphic-rotate.png'} />
                            </div>
                            <div className="guten-pro-background-animated-banner guten-pro-themes-half">
                                <div className="guten-pro-background-animated-title">
                                    <p>Background <br /> Animated</p>
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
                            <div className="guten-pro-text-clip-banner guten-pro-themes-half">
                                <div className="guten-pro-text-clip-title">
                                    <p>Text Clip</p>
                                </div>
                                <img className="guten-pro-text-clip-gradient" src={window['GutenverseConfig'].imgDir + '/pro/text-clip/text-gradient.png'} />
                                <img className="guten-pro-text-clip-image" src={window['GutenverseConfig'].imgDir + '/pro/text-clip/text-clip-image.png'} />
                            </div>
                            <div className="guten-pro-transform-banner guten-pro-themes-half">
                                <div className="guten-pro-transform-title">
                                    <p>Transform</p>
                                </div>
                                <div className="guten-pro-transform-image-wrapper">
                                    <img className="guten-pro-transform-arrow right" src={window['GutenverseConfig'].imgDir + '/pro/transform/arrow-4.png'} />
                                    <img className="guten-pro-transform-image" src={window['GutenverseConfig'].imgDir + '/pro/transform/graphic-transform.png'} />
                                    <img className="guten-pro-transform-arrow left" src={window['GutenverseConfig'].imgDir + '/pro/transform/arrow-4.png'} />
                                </div>
                            </div>
                            <div className="guten-pro-shape-divider-banner guten-pro-themes-half">
                                <div className="guten-pro-shape-divider-title">
                                    <p>Shape Divider <br /> Animated</p>
                                </div>
                                <img className="guten-pro-shape-divider-blink" src={window['GutenverseConfig'].imgDir + '/pro/shape-divider/blink-4.png'} />
                                <img className="guten-pro-shape-divider-wave" src={window['GutenverseConfig'].imgDir + '/pro/shape-divider/shape.png'} />
                            </div>
                            <div className="guten-pro-form-banner guten-pro-themes-half">
                                <div className="guten-pro-form-title">
                                    <p>Advanced <br /> Form</p>
                                </div>
                                <img className="guten-pro-form-image" src={window['GutenverseConfig'].imgDir + '/pro/form/graphic-form.png'} />
                            </div>
                            <div className="guten-pro-copy-paste-banner guten-pro-themes-half">
                                <div className="guten-pro-copy-paste-title">
                                    <p>Copy Paste <br /> Style</p>
                                </div>
                                <img className="guten-pro-copy-paste-image" src={window['GutenverseConfig'].imgDir + '/pro/copy-paste/graphic-copas.png'} />
                                <img className="guten-pro-copy-paste-arrow" src={window['GutenverseConfig'].imgDir + '/pro/copy-paste/arrow-small.png'} />
                            </div>
                            <div className="guten-pro-highlight-text-banner guten-pro-themes-half">
                                <h2 className="guten-pro-highlight-text-example"><span>Highlight </span> important details.</h2>
                                <p className="guten-pro-highlight-text-title" >Highlight Text</p>
                                <img className="guten-pro-highlight-text-crystal" src={window['GutenverseConfig'].imgDir + '/pro/highlight-text/graphic-gem.png'} />
                                <img className="guten-pro-highlight-text-blur" src={window['GutenverseConfig'].imgDir + '/pro/highlight-text/gem-blur.png'} />
                            </div>
                            <div className="guten-pro-bottom-banner guten-pro-themes-full">
                                <div className="guten-pro-bottom-title">
                                    <img className="guten-pro-bottom-blink" src={window['GutenverseConfig'].imgDir + '/pro/CTA/blink-cta.png'} />
                                    <h2>Powerful <span> Features</span></h2>
                                </div>
                                <p>Unlock the endless possibilities of the WordPress Editor with Gutenverse PRO.</p>
                                <img className="guten-pro-bottom-background" src={window['GutenverseConfig'].imgDir + '/pro/CTA/bg-cta.png'} />
                                <div className="guten-pro-bottom-button-wrapper">
                                    <ButtonProSecond/>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div >
        ),
        null
    );
};

export default PanelTabPro;