import axios from 'axios';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import apiFetch from '@wordpress/api-fetch';
import { IconDocsSVG } from 'gutenverse-core/icons';
import { DashboardContent } from '../../components';

const httpClient = (libraryApi) => axios.create({
    baseURL: libraryApi
});

const subscribeNews = (data) => {
    const { libraryApi } = window['GutenverseDashboard'];
    return httpClient(libraryApi).post('/subscribe', data);
};

const DefaultDashboard = () => {
    const { imgDir, fseUrl, url, subscribed, pluginVersions, community, docs } = window['GutenverseDashboard'];

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [done, setDone] = useState(subscribed);
    const items = Array(5).fill(null);

    const resetInvalid = () => setTimeout(() => setInvalid(false), 4000);

    const invalidMessage = () => {
        resetInvalid();
        switch (invalid) {
            case 'error':
                return __('there is an error requesting subscription.', '--gctd--');
            case 'format':
                return __('please use a valid email address format.', '--gctd--');
            case 'empty':
            default:
                return __('please input an email address.', '--gctd--');
        }
    };

    const afterSubscribed = () => {
        apiFetch({
            path: 'gutenverse-client/v1/subscribed',
            method: 'POST',
            data: {
                subscribed: true,
                email,
            },
        })
            .then(() => {
                setDone(true);
                setEmail('');
            })
            .catch(() => { });
    };

    const onSubscribe = () => {
        if (isEmpty(email)) {
            setInvalid('empty');
            return;
        }

        const isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

        if (!isValid) {
            setInvalid('format');
            return;
        }

        if (isValid && !loading) {
            setLoading(true);

            subscribeNews({
                email,
                domain: url,
            })
                .then((result) => {
                    if (result.data) {
                        afterSubscribed();
                    } else {
                        setLoading(false);
                        setInvalid('error');
                    }
                })
                .catch(() => {
                    setLoading(false);
                    setInvalid('error');
                });
        }
    };

    useEffect(() => {
        if (done) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [done]);

    return (
        <DashboardContent>
            <div className="panel-wrapper first-wrapper">
                <div className="box-panel feature-panel">
                    <div>
                        <div>
                            <p className="welcome-to">{__('WELCOME TO 👋', '--gctd--')}</p>
                            <h2 className="title">{__('Gutenverse Ecosystem', '--gctd--')}</h2>
                            <span className="description">{__('Explore the unlimited possibilities of Gutenberg and Site Editing using various plugins of Gutenverse.', '--gctd--')}</span>
                            <a className="join-community-button" href={community} target="_blank" rel="noreferrer">
                                <div className="circle"><i className="fab fa-facebook-f" /></div>
                                <span>{__('Join Our Community', '--gctd--')}</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <img className="illustration" src={`${imgDir}/dashboard-landing-1.webp`} />
                    </div>
                </div>
                <div className="box-panel subscribe-panel">
                    {done && !loading ? (
                        <>
                            <div>
                                <img className="illustration" src={`${imgDir}/dashboard-landing-2.webp`} />
                            </div>
                            <div>
                                <div>
                                    <h2 className="title">{__('Thank You For Subscribing Our Newsletter', '--gctd--')}</h2>
                                    <span className="description">{__('We will inform you about updates, new themes, new features, and other infos related to Gutenverse.', '--gctd--')}</span>
                                    <div className="btn start-building" onClick={() => (window.location.href = fseUrl)}>
                                        {__('Start Building', '--gctd--')}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <img className="illustration" src={`${imgDir}/dashboard-landing-2.webp`} />
                            </div>
                            <div>
                                <div>
                                    <h2 className="title">{__('Sign up to our Newsletter', '--gctd--')}</h2>
                                    <span className="description">{__('Subscribe to our newsletter and be the first to get new features, latest update & new theme releases.', '--gctd--')}</span>
                                    <div id={'subcription-email'}>
                                        <div className="input">
                                            <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.6" d="M13.1427 0H2.13391C1.37499 0 0.757812 0.7176 0.757812 1.6V11.2C0.757812 12.0824 1.37499 12.8 2.13391 12.8H13.1427C13.9016 12.8 14.5187 12.0824 14.5187 11.2V1.6C14.5187 0.7176 13.9016 0 13.1427 0ZM13.1427 1.6V2.0088L7.63828 6.9872L2.13391 2.0096V1.6H13.1427ZM2.13391 11.2V4.0352L7.21582 8.6312C7.3363 8.74124 7.48507 8.80105 7.63828 8.80105C7.79149 8.80105 7.94026 8.74124 8.06074 8.6312L13.1427 4.0352L13.144 11.2H2.13391Z" fill="#99A2A9" />
                                            </svg>
                                            <input type="text" placeholder="Your Email Address" value={email} disabled={loading} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className={`btn ${done ? 'done' : ''}`} onClick={onSubscribe}>
                                            {loading ? done ? <div className="checkmark"></div> : <div className="loader"></div> : __('Subscribe', '--gctd--')}
                                        </div>
                                        {invalid && !done && <span className="warning">{invalidMessage()}</span>}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="panel-wrapper second-wrapper">
                <div className="plugins">
                    <h3>{__('Enjoy using our plugin?', '--gctd--')}</h3>
                    <div className="plugins-desc">
                        <p>{__('Sharing your kind words about us and our widget means a lot to us.', '--gctd--')}</p>
                        <svg width="59" height="41" viewBox="0 0 59 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.7502 2.37294L14.5529 2.83237L14.7502 2.37294ZM54.5923 40.3397C54.7799 40.5423 55.0963 40.5545 55.2989 40.3669L58.601 37.3097C58.8036 37.1221 58.8158 36.8058 58.6282 36.6031C58.4406 36.4005 58.1242 36.3883 57.9216 36.5759L54.9864 39.2934L52.2689 36.3582C52.0813 36.1556 51.765 36.1434 51.5624 36.331C51.3597 36.5186 51.3475 36.835 51.5351 37.0376L54.5923 40.3397ZM1.45525 7.39639C2.14998 5.86668 3.5839 3.92647 5.75244 2.77104C7.89728 1.62825 10.8106 1.22532 14.5529 2.83237L14.9475 1.91351C10.9441 0.19432 7.71145 0.594172 5.28221 1.8885C2.87668 3.1702 1.30838 5.30147 0.54475 6.98288L1.45525 7.39639ZM14.5529 2.83237C17.7904 4.22264 20.5311 6.74175 22.0715 9.00309C22.8463 10.1406 23.2832 11.1629 23.3647 11.9083C23.4049 12.2766 23.354 12.5351 23.2595 12.7057C23.1727 12.8624 23.0228 12.9942 22.7459 13.0684L23.0048 14.0343C23.5092 13.8991 23.8996 13.6139 24.1343 13.1902C24.3613 12.7804 24.4129 12.2948 24.3587 11.7996C24.2514 10.8178 23.7117 9.63467 22.898 8.44011C21.2612 6.03739 18.3768 3.38615 14.9475 1.91351L14.5529 2.83237ZM22.7459 13.0684C22.4718 13.1419 22.3112 13.0904 22.2093 13.0146C22.0929 12.9281 21.9674 12.7455 21.901 12.4102C21.767 11.7341 21.9198 10.6378 22.5443 9.34445C23.7798 6.78606 26.7872 3.62544 32.3988 1.88206L32.1022 0.927088C26.2553 2.74352 23.0126 6.07513 21.6438 8.90959C20.9663 10.3127 20.7285 11.638 20.92 12.6046C21.0164 13.0907 21.2327 13.5347 21.6127 13.8172C22.0072 14.1104 22.4976 14.1702 23.0048 14.0343L22.7459 13.0684ZM32.3988 1.88206C35.0911 1.04565 37.8422 1.61042 40.4791 3.31054C43.1244 5.01614 45.6342 7.85478 47.7834 11.5063C52.0811 18.808 54.8728 29.2511 54.4596 39.9808L55.4588 40.0192C55.879 29.1097 53.0456 18.4753 48.6452 10.9991C46.4454 7.26165 43.8379 4.28629 41.0209 2.47009C38.1955 0.648414 35.1391 -0.0164049 32.1022 0.927088L32.3988 1.88206Z" fill="#99A2A9" />
                        </svg>
                    </div>
                    <div className="plugin-list">
                        {Object.keys(pluginVersions).map(key => {
                            const pluginData = pluginVersions[key];
                            const supportUrl = pluginData?.supportUrl ? pluginData.supportUrl : `https://wordpress.org/support/plugin/${key}/#new-topic-0`;

                            return <div key={key} className="plugin">
                                <h4>{pluginData?.name.includes('Gutenverse') ? <>
                                    <span>{__('Gutenverse', '--gctd--')}</span>&nbsp;
                                    {pluginData?.name.split('Gutenverse').join('')}
                                </> : pluginData?.name}</h4>
                                <div className="actions">
                                    {key !== 'gutenverse-pro' && <div className="rate">
                                        <a href={`https://wordpress.org/support/plugin/${key}/reviews/#new-post`} target="_blank" rel="noreferrer">
                                            <span>{__('RATE US', '--gctd--')}</span>
                                            <svg width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 2.7C0.834315 2.7 0.7 2.83431 0.7 3C0.7 3.16569 0.834315 3.3 1 3.3L1 2.7ZM12.2121 3.21213C12.3293 3.09497 12.3293 2.90502 12.2121 2.78787L10.3029 0.878679C10.1858 0.761521 9.99584 0.761522 9.87868 0.878679C9.76152 0.995836 9.76152 1.18579 9.87868 1.30294L11.5757 3L9.87868 4.69706C9.76152 4.81421 9.76152 5.00416 9.87868 5.12132C9.99584 5.23848 10.1858 5.23848 10.3029 5.12132L12.2121 3.21213ZM1 3.3L12 3.3L12 2.7L1 2.7L1 3.3Z" fill="white"/>
                                            </svg>
                                            <div className="star-rating">
                                                {items.map((_, index) => (
                                                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.80607 1.98874L4.00739 1.73107L3.20333 0.124299C3.18137 0.0803064 3.14524 0.0446934 3.10061 0.0230463C2.98868 -0.0314206 2.85266 0.0139685 2.7967 0.124299L1.99264 1.73107L0.193955 1.98874C0.144365 1.99573 0.0990263 2.01877 0.0643136 2.05368C0.0223479 2.0962 -0.000777074 2.1534 1.99392e-05 2.21272C0.000816952 2.27203 0.0254708 2.32861 0.0685642 2.37001L1.36994 3.62066L1.06248 5.38664C1.05527 5.42772 1.05988 5.46997 1.07579 5.5086C1.0917 5.54723 1.11828 5.58069 1.1525 5.60519C1.18672 5.62969 1.22722 5.64425 1.26941 5.64721C1.3116 5.65018 1.35379 5.64143 1.39119 5.62197L3.00001 4.7882L4.60884 5.62197C4.65276 5.64501 4.70377 5.65269 4.75265 5.64431C4.87592 5.62336 4.9588 5.50814 4.93755 5.38664L4.63009 3.62066L5.93146 2.37001C5.96689 2.3358 5.99026 2.2911 5.99735 2.24222C6.01648 2.12002 5.93005 2.0069 5.80607 1.98874Z" fill="url(#paint0_linear_18693_8098)"/>
                                                        <defs>
                                                            <linearGradient id="paint0_linear_18693_8098" x1="3" y1="0" x2="3" y2="5.64778" gradientUnits="userSpaceOnUse">
                                                                <stop stop-color="#F4EF77"/>
                                                                <stop offset="1" stop-color="#C0BB38"/>
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                ))}
                                            </div>
                                        </a>
                                    </div>}
                                    <div className="support">
                                        <a href={supportUrl} target="_blank" rel="noreferrer">
                                            {key === 'gutenverse-pro' ? <div className="tech-support-pro">
                                                <div className="container">
                                                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.895 8.30265C10.37 7.21766 10.37 5.97266 9.895 4.89266L8.525 5.51266C8.825 6.20266 8.825 6.98766 8.53 7.68266L9.895 8.30265ZM7.71 2.70266C7.17141 2.46768 6.59012 2.34639 6.0025 2.34639C5.41488 2.34639 4.83359 2.46768 4.295 2.70266L4.915 4.06766C5.61 3.77266 6.395 3.77266 7.09 4.07266L7.71 2.70266ZM2.105 4.88766C1.87002 5.42712 1.74874 6.00923 1.74874 6.59766C1.74874 7.18608 1.87002 7.76819 2.105 8.30765L3.475 7.68266C3.175 6.99266 3.175 6.20266 3.475 5.50766L2.105 4.88766ZM4.295 10.4927C4.83362 10.728 5.41522 10.8491 6.00302 10.8482C6.59083 10.8474 7.17207 10.7246 7.71 10.4877L7.09 9.12265C6.74755 9.27063 6.37857 9.34739 6.00551 9.34825C5.63246 9.3491 5.26313 9.27405 4.92 9.12765L4.295 10.4927ZM6 1.59766C6.65661 1.59766 7.30679 1.72699 7.91342 1.97826C8.52004 2.22953 9.07124 2.59783 9.53553 3.06212C9.99983 3.52641 10.3681 4.07761 10.6194 4.68424C10.8707 5.29087 11 5.94105 11 6.59766C11 7.92374 10.4732 9.19551 9.53553 10.1332C8.59785 11.0709 7.32608 11.5977 6 11.5977C5.34339 11.5977 4.69321 11.4683 4.08658 11.2171C3.47995 10.9658 2.92876 10.5975 2.46447 10.1332C1.52678 9.19551 1 7.92374 1 6.59766C1 5.27157 1.52678 3.9998 2.46447 3.06212C3.40215 2.12444 4.67392 1.59766 6 1.59766ZM6 4.59766C5.46957 4.59766 4.96086 4.80837 4.58579 5.18344C4.21071 5.55851 4 6.06722 4 6.59766C4 7.12809 4.21071 7.6368 4.58579 8.01187C4.96086 8.38694 5.46957 8.59765 6 8.59765C6.53043 8.59765 7.03914 8.38694 7.41421 8.01187C7.78929 7.6368 8 7.12809 8 6.59766C8 6.06722 7.78929 5.55851 7.41421 5.18344C7.03914 4.80837 6.53043 4.59766 6 4.59766Z" fill="white" />
                                                    </svg>
                                                    {__('Technical Support', '--gctd--')}
                                                </div>
                                            </div> : <>
                                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.895 8.30265C10.37 7.21766 10.37 5.97266 9.895 4.89266L8.525 5.51266C8.825 6.20266 8.825 6.98766 8.53 7.68266L9.895 8.30265ZM7.71 2.70266C7.17141 2.46768 6.59012 2.34639 6.0025 2.34639C5.41488 2.34639 4.83359 2.46768 4.295 2.70266L4.915 4.06766C5.61 3.77266 6.395 3.77266 7.09 4.07266L7.71 2.70266ZM2.105 4.88766C1.87002 5.42712 1.74874 6.00923 1.74874 6.59766C1.74874 7.18608 1.87002 7.76819 2.105 8.30765L3.475 7.68266C3.175 6.99266 3.175 6.20266 3.475 5.50766L2.105 4.88766ZM4.295 10.4927C4.83362 10.728 5.41522 10.8491 6.00302 10.8482C6.59083 10.8474 7.17207 10.7246 7.71 10.4877L7.09 9.12265C6.74755 9.27063 6.37857 9.34739 6.00551 9.34825C5.63246 9.3491 5.26313 9.27405 4.92 9.12765L4.295 10.4927ZM6 1.59766C6.65661 1.59766 7.30679 1.72699 7.91342 1.97826C8.52004 2.22953 9.07124 2.59783 9.53553 3.06212C9.99983 3.52641 10.3681 4.07761 10.6194 4.68424C10.8707 5.29087 11 5.94105 11 6.59766C11 7.92374 10.4732 9.19551 9.53553 10.1332C8.59785 11.0709 7.32608 11.5977 6 11.5977C5.34339 11.5977 4.69321 11.4683 4.08658 11.2171C3.47995 10.9658 2.92876 10.5975 2.46447 10.1332C1.52678 9.19551 1 7.92374 1 6.59766C1 5.27157 1.52678 3.9998 2.46447 3.06212C3.40215 2.12444 4.67392 1.59766 6 1.59766ZM6 4.59766C5.46957 4.59766 4.96086 4.80837 4.58579 5.18344C4.21071 5.55851 4 6.06722 4 6.59766C4 7.12809 4.21071 7.6368 4.58579 8.01187C4.96086 8.38694 5.46957 8.59765 6 8.59765C6.53043 8.59765 7.03914 8.38694 7.41421 8.01187C7.78929 7.6368 8 7.12809 8 6.59766C8 6.06722 7.78929 5.55851 7.41421 5.18344C7.03914 4.80837 6.53043 4.59766 6 4.59766Z" fill="white" />
                                                </svg>
                                                {__('Technical Support', '--gctd--')}
                                            </>}
                                        </a>
                                    </div>
                                </div>
                            </div>;
                        })}
                    </div>
                </div>
                <div className="box-panel support-panel">
                    <div className="doc-details">
                        <h2>
                            <IconDocsSVG />
                            {__('Documentations', '--gctd--')}
                        </h2>
                        <span className="description">{__('If you have any difficulties using our plugin, please check our documentation.', '--gctd--')}</span>
                        <a href={docs} target={'_blank'} rel="noreferrer">
                            {__('Check Now', '--gctd--')}
                            <i className="fa fa-arrow-right" />
                        </a>
                    </div>
                </div>
            </div>
        </DashboardContent>
    );
};

const Dashboard = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            {!mounted && <div className="loader"></div>}
            {mounted && applyFilters('gutenverse.dashboard.page', <DefaultDashboard />)}
        </>
    );
};

export default Dashboard;
