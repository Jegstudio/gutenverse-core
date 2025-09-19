import { __ } from '@wordpress/i18n';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { useEffect, useRef } from '@wordpress/element';
import { ChevronLeftSVG, ChevronRightSVG, IconEngageResultSVG, IconLimitlessDesignSVG, IconStarSVG, IconWorkFasterSVG } from '../icons';

export const UpgradePro = ({ updateProgress, requirement }) => {
    const splideRef = useRef();
    const barsFill = useRef([]);
    const bars = useRef([]);
    const {
        gutenverseImgDir,
    } = window['GutenverseWizard'];

    useEffect(() => {
        if (splideRef.current) {
            const splideInstance = splideRef.current.splide;
            const totalSlides = splideInstance.length - 1;

            barsFill.current = document.querySelectorAll('.slider-wrapper .progress-bar-fill');
            bars.current = document.querySelectorAll('.slider-wrapper .progress-bar');

            if (bars.current[0]) {
                bars.current[0].classList.add('is-done');
            }

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
                // Logic to update the fill bar width on slide change
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
                }}>
                <SplideTrack>
                    <SplideSlide>
                        <div className="upgrade-pro-content">
                            <img className="background" src={gutenverseImgDir + '/bg-upgrade-wizard.png'} />
                            <h3 className="content-title">
                                {__('Unlock Limitless Possibilities with ', 'gutenverse')}
                                <span className="gradient-text">{__('Gutenverse PRO', 'gutenverse')}</span>
                            </h3>
                            <p className="content-desc">
                                {__('Empowering you to build a website that truly stands out with advanced features and seamless integration.', 'gutenverse')}
                            </p>
                            <div className="upgrade-pro-button" onClick={() => window.open('https://gutenverse.com/pro', '_blank')}>
                                <div className="button-content-wrapper">
                                    <span>{__('Upgrade To PRO', 'gutenverse')}</span>
                                    <svg width={16} height={16} viewBox="0 0 15 15" fill={'white'} transform={'translate(0,0)'} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill={'white'} />
                                    </svg>
                                </div>
                            </div>
                            <img className="upgrade-image" src={gutenverseImgDir + '/upgrade-content.png'} />
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="upgrade-pro-content">
                            <img className="background" src={gutenverseImgDir + '/bg-upgrade-wizard.png'} />
                            <h3 className="content-title">
                                {__('Unlock Limitless Possibilities with ', 'gutenverse')}
                                <span className="gradient-text">{__('Gutenverse PRO', 'gutenverse')}</span>
                            </h3>
                            <p className="content-desc">
                                {__('Empowering you to build a website that truly stands out with advanced features and seamless integration.', 'gutenverse')}
                            </p>
                            <div className="upgrade-pro-button" onClick={() => window.open('https://gutenverse.com/pro', '_blank')}>
                                <div className="button-content-wrapper">
                                    <span>{__('Upgrade To PRO', 'gutenverse')}</span>
                                    <svg width={16} height={16} viewBox="0 0 15 15" fill={'white'} transform={'translate(0,0)'} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill={'white'} />
                                    </svg>
                                </div>
                            </div>
                            <img className="upgrade-image" src={gutenverseImgDir + '/upgrade-content.png'} />
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="upgrade-pro-content">
                            <img className="background" src={gutenverseImgDir + '/bg-upgrade-wizard.png'} />
                            <h3 className="content-title">
                                {__('Unlock Limitless Possibilities with ', 'gutenverse')}
                                <span className="gradient-text">{__('Gutenverse PRO', 'gutenverse')}</span>
                            </h3>
                            <p className="content-desc">
                                {__('Empowering you to build a website that truly stands out with advanced features and seamless integration.', 'gutenverse')}
                            </p>
                            <div className="upgrade-pro-button" onClick={() => window.open('https://gutenverse.com/pro', '_blank')}>
                                <div className="button-content-wrapper">
                                    <span>{__('Upgrade To PRO', 'gutenverse')}</span>
                                    <svg width={16} height={16} viewBox="0 0 15 15" fill={'white'} transform={'translate(0,0)'} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill={'white'} />
                                    </svg>
                                </div>
                            </div>
                            <img className="upgrade-image" src={gutenverseImgDir + '/upgrade-content.png'} />
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="upgrade-pro-content">
                            <img className="background" src={gutenverseImgDir + '/bg-upgrade-wizard.png'} />
                            <h3 className="content-title">
                                {__('Unlock Limitless Possibilities with ', 'gutenverse')}
                                <span className="gradient-text">{__('Gutenverse PRO', 'gutenverse')}</span>
                            </h3>
                            <p className="content-desc">
                                {__('Empowering you to build a website that truly stands out with advanced features and seamless integration.', 'gutenverse')}
                            </p>
                            <div className="upgrade-pro-button" onClick={() => window.open('https://gutenverse.com/pro', '_blank')}>
                                <div className="button-content-wrapper">
                                    <span>{__('Upgrade To PRO', 'gutenverse')}</span>
                                    <svg width={16} height={16} viewBox="0 0 15 15" fill={'white'} transform={'translate(0,0)'} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill={'white'} />
                                    </svg>
                                </div>
                            </div>
                            <img className="upgrade-image" src={gutenverseImgDir + '/upgrade-content.png'} />
                        </div>
                    </SplideSlide>
                </SplideTrack>
                <div className="splide__arrows">
                    <button className="splide__arrow splide__arrow--prev"><ChevronLeftSVG/></button>
                    <button className="splide__arrow splide__arrow--next"><ChevronRightSVG/></button>
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
