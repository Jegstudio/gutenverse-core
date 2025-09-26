import { __ } from '@wordpress/i18n';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { useEffect, useRef, useState } from '@wordpress/element';
import { ChevronLeftSVG, ChevronRightSVG, IconEngageResultSVG, IconLimitlessDesignSVG, IconPauseSVG, IconPlaySVG, IconStarSVG, IconWorkFasterSVG } from '../icons';
import { Check } from 'react-feather';

export const UpgradePro = ({ updateProgress, requirement }) => {
    const [playing, setPlaying] = useState(true);
    const splideRef = useRef();
    const barsFill = useRef([]);
    const bars = useRef([]);
    const images = useRef([]);
    const pause = useRef([]);
    const {
        gutenverseImgDir,
        upgradeProUrl
    } = window['GutenverseWizard'];

    const animations = {
        slideInUp: 'slide-up',
        slideInLeft: 'slide-left',
        slideInRight: 'slide-right',
        slideInDown: 'slide-down',
        scaleIn: 'scale-in',
        rotateCw: 'rotate-cw',
        rotateCcw: 'rotate-ccw'
    };

    const togglePause = () => {
        const autoplay = splideRef?.current?.splide?.Components?.Autoplay;

        if (!autoplay) return;

        if (autoplay.isPaused()) {
            autoplay.play();
            setPlaying(true);
        } else {
            autoplay.pause();
            setPlaying(false);
        }
    };

    useEffect(() => {
        if (splideRef.current) {
            const splideInstance = splideRef.current.splide;
            const totalSlides = splideInstance.length - 1;

            barsFill.current = document.querySelectorAll('.slider-wrapper .progress-bar-fill');
            bars.current = document.querySelectorAll('.slider-wrapper .progress-bar');
            images.current = document.querySelectorAll('.slider-wrapper img.positioned');
            pause.current = document.querySelectorAll('.slider-wrapper .splide-autoplay-controls .splide-toggle-div');

            if (bars.current[0]) {
                bars.current[0].classList.add('is-done');
            }

            const runAnimation = () => {
                Object.entries(animations).forEach(([key, value]) => {
                    const currentImg = document.querySelectorAll('.slider-wrapper li.is-active .' + key);
                    currentImg.forEach(el => {
                        el.classList.remove(key);
                        el.classList.add(value);
                    });

                    const prevImg = document.querySelectorAll('.slider-wrapper li.is-prev .' + value);
                    prevImg.forEach(el => {
                        el.classList.remove(value);
                        el.classList.add(key);
                    });

                    const nextImg = document.querySelectorAll('.slider-wrapper li.is-next .' + value);
                    nextImg.forEach(el => {
                        el.classList.remove(value);
                        el.classList.add(key);
                    });
                });
            };

            runAnimation();

            splideInstance.on('moved', () => {
                runAnimation();
            });

            splideInstance.on('autoplay:playing', (rate) => {
                const index = splideInstance.index;
                if (barsFill.current[index]) {
                    barsFill.current[index].style.width = `${rate * 100}%`;

                    if (index === totalSlides && rate > 0.99) {
                        barsFill.current[index].style.width = '100%';
                        splideInstance.Components.Autoplay.pause();
                    } else {
                        barsFill.current[index].style.width = `${rate * 100}%`;
                    }
                }
            });

            splideInstance.on('move', (newIndex, prevIndex) => {
                if (barsFill.current[prevIndex]) {
                    if (newIndex < prevIndex) {
                        barsFill.current[prevIndex].style.width = '0%';
                    } else {
                        barsFill.current[prevIndex].style.width = '100%';
                    }
                }

                if (prevIndex > newIndex) {
                    bars.current[prevIndex].classList.remove('is-done');
                }
                if (bars.current[newIndex]) {
                    bars.current[newIndex].classList.add('is-done');
                }

                if (newIndex < totalSlides && splideInstance.Components.Autoplay.isPaused()) {
                    splideInstance.Components.Autoplay.play();
                    setPlaying(true);
                }
            });

            return () => {
                if (splideInstance) {
                    splideInstance.off('autoplay:playing');
                    splideInstance.off('moved');
                }
            };
        }
    }, []);

    return <div className="upgrade-pro-wrapper">
        <div className="slider-wrapper">
            <Splide
                ref={splideRef}
                aria-label="My Favorite Images"
                hasTrack={false}
                options={{
                    width: '860px',
                    height: '460px',
                    gap: '1rem',
                    autoplay: true,
                    interval: 5000,
                    pagination: false,
                    pauseOnHover: false,
                    pauseOnFocus: false,
                    resetProgress: false,
                }}>
                <SplideTrack>
                    <SplideSlide>
                        <div className="upgrade-pro-content">
                            <div className="content-left">
                                <h3 className="content-title">
                                    {__('Work Smarter, Build Faster', 'gutenverse')}
                                </h3>
                                <p className="content-desc">
                                    {__('Boost your productivity with powerful tools designed to speed up website creation.', 'gutenverse')}
                                </p>
                                <ul className="content-list">
                                    <li>
                                        <div className="circle"><Check size={12} /></div>
                                        <span>{__('1000+ Templates Library.', 'gutenverse')}</span>
                                    </li>
                                    <li>
                                        <div className="circle"><Check size={12} /></div>
                                        <span>{__('50+ Prebuilt Sites.', 'gutenverse')}</span>
                                    </li>
                                    <li>
                                        <div className="circle"><Check size={12} /></div>
                                        <span>{__('100+ Advanced Blocks.', 'gutenverse')}</span>
                                    </li>
                                    <li>
                                        <div className="circle"><Check size={12} /></div>
                                        <span>{__('1000+ Icons Selector.', 'gutenverse')}</span>
                                    </li>
                                </ul>
                                <div className="upgrade-pro-button" onClick={() => window.open(upgradeProUrl, '_blank')}>
                                    <div className="button-content-wrapper">
                                        <span>{__('Upgrade To PRO', 'gutenverse')}</span>
                                        <svg width={16} height={16} viewBox="0 0 15 15" fill={'white'} transform={'translate(0,0)'} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill={'white'} />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="content-right">
                                <img className="background" src={gutenverseImgDir + '/wizard-background-circle.png'} />
                                <img className="positioned slideInUp" src={gutenverseImgDir + '/work-faster-mockup-laptop-wizard.png'} style={{ width: '320px', top: '240px', left: '25px', zIndex: '5' }} />
                                <img className="positioned slideInUp" src={gutenverseImgDir + '/work-faster-mockup-demo-monify.png'} style={{ width: '70px', top: '116px', left: '110px', animationDelay: '0.4s' }} />
                                <img className="positioned slideInUp" src={gutenverseImgDir + '/work-faster-mockup-demo-aventra.png'} style={{ width: '70px', top: '145px', right: '40px', animationDelay: '0.5s' }} />
                                <img className="positioned slideInUp" src={gutenverseImgDir + '/work-faster-mockup-demo-mentori.png'} style={{ width: '70px', top: '230px', right: '30px', animationDelay: '0.6s' }} />
                                <img className="positioned scaleIn" src={gutenverseImgDir + '/work-faster-mockup-advanced-blocks.png'} style={{ width: '90px', top: '250px', right: '40px', zIndex: '99', animationDelay: '0.2s' }} />
                                <img className="positioned scaleIn" src={gutenverseImgDir + '/work-faster-mokcup-template-library.png'} style={{ width: '90px', top: '130px', left: '30px', animationDelay: '0.2s' }} />
                                <img className="positioned rotateCw slideInUp" src={gutenverseImgDir + '/work-faster-arrow-white.png'} style={{ width: '60px', top: '200px', left: '60px', transform: 'rotate(-90deg)', zIndex: '9' }} />
                            </div>
                            <div className="splide-autoplay-controls">
                                <div className="splide-toggle-div" onClick={togglePause}>
                                    {playing ? <IconPauseSVG /> : <IconPlaySVG />}
                                </div>
                            </div>
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="upgrade-pro-content">
                            <div className="content-left">
                                <h3 className="content-title">
                                    {__('Design Without Limits', 'gutenverse')}
                                </h3>
                                <p className="content-desc">
                                    {__('Unlock unlimited creative possibilities and craft a truly stunning website experience.', 'gutenverse')}
                                </p>
                                <div className="column">
                                    <ul className="content-list">
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Advanced Animation Effects.', 'gutenverse')}</span>
                                        </li>
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Transform.', 'gutenverse')}</span>
                                        </li>
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Text Clip.', 'gutenverse')}</span>
                                        </li>
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Highlight Styles.', 'gutenverse')}</span>
                                        </li>
                                    </ul>
                                    <ul className="content-list">
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Animated Shape Dividers.', 'gutenverse')}</span>
                                        </li>
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Mouse Move Effect.', 'gutenverse')}</span>
                                        </li>
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Fluid Background.', 'gutenverse')}</span>
                                        </li>
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Background Effects.', 'gutenverse')}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="upgrade-pro-button" onClick={() => window.open(upgradeProUrl, '_blank')}>
                                    <div className="button-content-wrapper">
                                        <span>{__('Upgrade To PRO', 'gutenverse')}</span>
                                        <svg width={16} height={16} viewBox="0 0 15 15" fill={'white'} transform={'translate(0,0)'} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill={'white'} />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="content-right">
                                <img className="background" src={gutenverseImgDir + '/wizard-background-circle.png'} />
                                <img className="positioned rotateCw slideInUp" src={gutenverseImgDir + '/limitless-design-mockup-arrow-animation.png'} style={{ width: '50px', top: '190px', left: '35px', zIndex: '9' }} />
                                <img className="positioned slideInUp" src={gutenverseImgDir + '/limitless-design-mockup-animation-wizard.png'} style={{ width: '200px', top: '205px', left: '90px' }} />
                                <img className="positioned slideInUp" src={gutenverseImgDir + '/limitless-design-mockup-blink.png'} style={{ width: '20px', top: '330px', right: '160px', animationDelay: '0.1s' }} />
                                <img className="positioned scaleIn" src={gutenverseImgDir + '/limitless-design-mockup-icon-animation.png'} style={{ width: '25px', top: '100px', left: '50px' }} />
                                <img className="positioned scaleIn" src={gutenverseImgDir + '/limitless-design-mockup-icon-star.png'} style={{ width: '25px', top: '60px', left: '100px', animationDelay: '0.2s' }} />
                                <img className="positioned slideInRight" src={gutenverseImgDir + '/limitless-design-mockup-fade-animation.png'} style={{ width: '80px', top: '130px', right: '10px' }} />
                                <img className="positioned slideInLeft" src={gutenverseImgDir + '/limitless-design-mockup-move-animation.png'} style={{ width: '80px', top: '295px', left: '85px', animationDelay: '0.2s' }} />
                                <img className="positioned slideInRight" src={gutenverseImgDir + '/limitless-design-mockup-animation-star.png'} style={{ width: '150px', top: '295px', right: '-65px', zIndex: '9' }} />
                            </div>
                            <div className="splide-autoplay-controls">
                                <div className="splide-toggle-div" onClick={togglePause}>
                                    {playing ? <IconPauseSVG /> : <IconPlaySVG />}
                                </div>
                            </div>
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="upgrade-pro-content">
                            <div className="content-left">
                                <h3 className="content-title">
                                    {__('Engage Visitors, Drive Results', 'gutenverse')}
                                </h3>
                                <p className="content-desc">
                                    {__('Turn your website into a lead-generation machine and keep your audience engaged.', 'gutenverse')}
                                </p>
                                <ul className="content-list">
                                    <li>
                                        <div className="circle"><Check size={12} /></div>
                                        <span>{__('Gutenverse Form.', 'gutenverse')}</span>
                                    </li>
                                    <li>
                                        <div className="circle"><Check size={12} /></div>
                                        <span>{__('Gutenverse Popup.', 'gutenverse')}</span>
                                    </li>
                                    <li>
                                        <div className="circle"><Check size={12} /></div>
                                        <span>{__('Gutenverse News.', 'gutenverse')}</span>
                                    </li>
                                </ul>
                                <div className="upgrade-pro-button" onClick={() => window.open(upgradeProUrl, '_blank')}>
                                    <div className="button-content-wrapper">
                                        <span>{__('Upgrade To PRO', 'gutenverse')}</span>
                                        <svg width={16} height={16} viewBox="0 0 15 15" fill={'white'} transform={'translate(0,0)'} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill={'white'} />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="content-right">
                                <img className="background" src={gutenverseImgDir + '/wizard-background-circle.png'} />
                                <img className="positioned scaleIn" src={gutenverseImgDir + '/engage-result-mockup-gutenverse-form.png'} style={{ width: '170px', top: '40px', left: '110px', zIndex: '99' }} />
                                <img className="positioned scaleIn" src={gutenverseImgDir + '/engage-result-mockup-gutenverse-popup.png'} style={{ width: '170px', top: '175px', left: '15px', zIndex: '99', animationDelay: '0.2s' }} />
                                <img className="positioned scaleIn" src={gutenverseImgDir + '/engage-result-mockup-gutenverse-news.png'} style={{ width: '170px', top: '230px', right: '15px', zIndex: '99', animationDelay: '0.4s' }} />
                            </div>
                            <div className="splide-autoplay-controls">
                                <div className="splide-toggle-div" onClick={togglePause}>
                                    {playing ? <IconPauseSVG /> : <IconPlaySVG />}
                                </div>
                            </div>
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="upgrade-pro-content">
                            <div className="content-left">
                                <h3 className="content-title">
                                    {__('Why Upgrade to PRO?', 'gutenverse')}
                                </h3>
                                <p className="content-desc">
                                    {__('With Gutenverse PRO, you\'re not just unlocking extra features—you\'re unlocking freedom. Freedom to design faster. Freedom to be more creative. Freedom to engage your audience at a whole new level.', 'gutenverse')}
                                </p>
                                <p className="content-desc bold">
                                    {__('Ready to take your website to the next stage?', 'gutenverse')}
                                </p>
                                <div className="upgrade-pro-button" onClick={() => window.open(upgradeProUrl, '_blank')}>
                                    <div className="button-content-wrapper">
                                        <span>{__('Upgrade To PRO', 'gutenverse')}</span>
                                        <svg width={16} height={16} viewBox="0 0 15 15" fill={'white'} transform={'translate(0,0)'} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill={'white'} />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="content-right">
                                <img className="background" src={gutenverseImgDir + '/wizard-background-circle.png'} />
                                <img className="positioned slideInUp" src={gutenverseImgDir + '/upgrade-pro-mockup-frame-pro.png'} style={{ width: '300px', top: '230px', left: '40px', zIndex: '2' }} />
                                <img className="positioned slideInRight" src={gutenverseImgDir + '/upgrade-pro-mockup-cube-gutenverse.png'} style={{ width: '160px', top: '250px', right: '-70px', zIndex: '99', animationDelay: '0.1s' }} />
                                <img className="positioned scaleIn" src={gutenverseImgDir + '/upgrade-pro-mockup-icon-lottie.png'} style={{ width: '50px', top: '280px', left: '30px', animationDelay: '0.4s' }} />
                                <img className="positioned scaleIn" src={gutenverseImgDir + '/upgrade-pro-mockup-icon-megamenu.png'} style={{ width: '50px', top: '90px', right: '40px', animationDelay: '0.3s' }} />
                                <img className="positioned scaleIn" src={gutenverseImgDir + '/upgrade-pro-mockup-icon-text-marquee.png'} style={{ width: '50px', top: '100px', left: '30px', animationDelay: '0.2s' }} />
                            </div>
                            <div className="splide-autoplay-controls">
                                <div className="splide-toggle-div" onClick={togglePause}>
                                    {playing ? <IconPauseSVG /> : <IconPlaySVG />}
                                </div>
                            </div>
                        </div>
                    </SplideSlide>
                </SplideTrack>
                <div className="splide__arrows">
                    <button className="splide__arrow splide__arrow--prev"><ChevronLeftSVG /></button>
                    <button className="splide__arrow splide__arrow--next"><ChevronRightSVG /></button>
                </div>
                <div className="progress-bars">
                    <div className="progress-bar">
                        <p className="progress-bar-title">
                            <IconWorkFasterSVG />
                            {__('Work Faster', 'gutenverse')}</p>
                        <div className="individual-progress-bar">
                            <div className="progress-bar-fill"></div>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <p className="progress-bar-title">
                            <IconLimitlessDesignSVG />
                            {__('Limitless Design', 'gutenverse')}
                        </p>
                        <div className="individual-progress-bar">
                            <div className="progress-bar-fill"></div>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <p className="progress-bar-title">
                            <IconEngageResultSVG />
                            {__('Engage Result', 'gutenverse')}
                        </p>
                        <div className="individual-progress-bar">
                            <div className="progress-bar-fill"></div>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <p className="progress-bar-title">
                            <IconStarSVG />
                            {__('Upgrade PRO', 'gutenverse')}
                        </p>
                        <div className="individual-progress-bar">
                            <div className="progress-bar-fill"></div>
                        </div>
                    </div>
                </div>
            </Splide>
        </div>
        <div className="upgrade-footer">
            <div className="upgrade-actions">
                <div onClick={() => requirement ? updateProgress('importTemplate', 2) : updateProgress('pluginAndTheme', 1)} className="button-back">
                    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 5.1C15.3314 5.1 15.6 4.83137 15.6 4.5C15.6 4.16863 15.3314 3.9 15 3.9V5.1ZM0.575736 4.07574C0.341421 4.31005 0.341421 4.68995 0.575736 4.92426L4.39411 8.74264C4.62843 8.97696 5.00833 8.97696 5.24264 8.74264C5.47696 8.50833 5.47696 8.12843 5.24264 7.89411L1.84853 4.5L5.24264 1.10589C5.47696 0.871573 5.47696 0.491674 5.24264 0.257359C5.00833 0.0230446 4.62843 0.0230446 4.39411 0.257359L0.575736 4.07574ZM15 3.9L1 3.9V5.1L15 5.1V3.9Z" fill="#99A2A9" />
                    </svg>
                    {__('Back', 'gutenverse')}
                </div>
                <div onClick={() => updateProgress('done', 4)} className="button-next">{__('Next', 'gutenverse')}</div>
            </div>
        </div>
    </div>;
};
