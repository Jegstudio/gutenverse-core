import axios from 'axios';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { isEmpty } from 'lodash';
import apiFetch from '@wordpress/api-fetch';
import { IconDocsSVG, IconSupportSVG } from 'gutenverse-core/icons';
import { DashboardBody, DashboardContent, DashboardHeader } from '../../components';

const httpClient = (apiUrl) => axios.create({
    baseURL: apiUrl
});

const subscribeNews = (data) => {
    const { apiUrl } = window['GutenverseDashboard'];
    return httpClient(apiUrl).post('/subscribe', data);
};

const DefaultDashboard = () => {
    const { imgDir, fseUrl, url, subscribed, pluginVersions, rating, support, community, docs } = window['GutenverseDashboard'];

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [done, setDone] = useState(subscribed);

    const resetInvalid = () => setTimeout(() => setInvalid(false), 4000);

    const invalidMessage = () => {
        resetInvalid();
        switch (invalid) {
            case 'error':
                return __('there is an error requesting subscription.', 'gutenverse');
            case 'format':
                return __('please use a valid email address format.', 'gutenverse');
            case 'empty':
            default:
                return __('please input an email address.', 'gutenverse');
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
                            <p className="welcome-to">{__('Welcome to', 'gutenverse')}</p>
                            <h2 className="title">{__('Gutenverse Ecosystem', 'gutenverse')}</h2>
                            <span className="description">{__('Explore the unlimited possibilities of Gutenberg and Site Editing using various plugins of Gutenverse.', 'gutenverse')}</span>
                            <a className="join-community-button" href={community} target="_blank" rel="noreferrer">
                                <div className="circle"><i className="fab fa-facebook-f" /></div>
                                <span>{__('Join Our Community', 'gutenverse')}</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <img className="illustration" src={`${imgDir}/asset_1.webp`} />
                    </div>
                </div>
                <div className="help-plugin-list">
                    <h3>{__('Enjoy using our plugin?', 'gutenverse')}</h3>
                    <p>{__('Sharing your kind words about us and our widget means a lot to us.', 'gutenverse')}</p>
                    <div className="plugins">
                        {Object.keys(pluginVersions).map(key => {
                            const pluginData = pluginVersions[key];

                            return <div key={key} className="plugin">
                                <h4>{pluginData?.name.includes('Gutenverse') ? <>
                                    <span>{__('Gutenverse', 'gutenverse')}</span>&nbsp;
                                    {pluginData?.name.split('Gutenverse').join('')}
                                </> : pluginData?.name}</h4>
                                <div className="rate">
                                    <a href={`https://wordpress.org/support/plugin/${key}/reviews/#new-post`} target="_blank" rel="noreferrer">
                                        <svg width="116" height="21" viewBox="0 0 116 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.542056 10.2991C0.542056 4.91042 4.91042 0.542056 10.2991 0.542056L105.701 0.542056C111.09 0.542056 115.458 4.91042 115.458 10.2991C115.458 15.6877 111.09 20.0561 105.701 20.0561H10.2991C4.91042 20.0561 0.542056 15.6877 0.542056 10.2991Z" fill="url(#paint0_linear_0_1)" fill-opacity="0.75" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.2991 5.27093e-08L105.701 0C111.389 -3.14266e-09 116 4.61105 116 10.2991C116 15.9871 111.389 20.5981 105.701 20.5981H10.2991C4.61105 20.5981 3.14266e-09 15.9871 0 10.2991C-3.14266e-09 4.61105 4.61105 5.58519e-08 10.2991 5.27093e-08ZM10.2991 0.542056C4.91042 0.542056 0.542056 4.91042 0.542056 10.2991C0.542056 15.6877 4.91042 20.0561 10.2991 20.0561H105.701C111.09 20.0561 115.458 15.6877 115.458 10.2991C115.458 4.91042 111.09 0.542056 105.701 0.542056L10.2991 0.542056Z" fill="url(#paint1_linear_0_1)" />
                                            <path d="M67.6124 9.58163L65.81 9.32342L65.0043 7.71334C64.9823 7.66926 64.9461 7.63357 64.9014 7.61188C64.7892 7.5573 64.6529 7.60278 64.5969 7.71334L63.7911 9.32342L61.9887 9.58163C61.9391 9.58862 61.8936 9.61171 61.8588 9.6467C61.8168 9.6893 61.7936 9.74662 61.7944 9.80606C61.7952 9.8655 61.8199 9.92219 61.8631 9.96368L63.1672 11.2169L62.8591 12.9865C62.8518 13.0277 62.8565 13.07 62.8724 13.1087C62.8883 13.1474 62.915 13.181 62.9493 13.2055C62.9836 13.2301 63.0241 13.2447 63.0664 13.2476C63.1087 13.2506 63.151 13.2418 63.1884 13.2223L64.8006 12.3869L66.4127 13.2223C66.4567 13.2454 66.5079 13.2531 66.5568 13.2447C66.6804 13.2237 66.7634 13.1083 66.7421 12.9865L66.434 11.2169L67.7381 9.96368C67.7736 9.92939 67.797 9.88461 67.8041 9.83563C67.8233 9.71318 67.7367 9.59982 67.6124 9.58163Z" fill="url(#paint2_linear_0_1)" />
                                            <path d="M76.8771 9.58163L75.0747 9.32342L74.269 7.71334C74.247 7.66926 74.2108 7.63357 74.1661 7.61188C74.0539 7.5573 73.9176 7.60278 73.8616 7.71334L73.0558 9.32342L71.2534 9.58163C71.2038 9.58862 71.1583 9.61171 71.1235 9.6467C71.0815 9.6893 71.0583 9.74662 71.0591 9.80606C71.0599 9.8655 71.0846 9.92219 71.1278 9.96368L72.4318 11.2169L72.1238 12.9865C72.1165 13.0277 72.1212 13.07 72.1371 13.1087C72.153 13.1474 72.1797 13.181 72.214 13.2055C72.2483 13.2301 72.2888 13.2447 72.3311 13.2476C72.3734 13.2506 72.4157 13.2418 72.4531 13.2223L74.0653 12.3869L75.6774 13.2223C75.7214 13.2454 75.7726 13.2531 75.8215 13.2447C75.9451 13.2237 76.0281 13.1083 76.0068 12.9865L75.6987 11.2169L77.0028 9.96368C77.0383 9.92939 77.0617 9.88461 77.0688 9.83563C77.088 9.71318 77.0014 9.59982 76.8771 9.58163Z" fill="url(#paint3_linear_0_1)" />
                                            <path d="M86.1418 9.58163L84.3394 9.32342L83.5337 7.71334C83.5117 7.66926 83.4755 7.63357 83.4308 7.61188C83.3186 7.5573 83.1823 7.60278 83.1262 7.71334L82.3205 9.32342L80.5181 9.58163C80.4685 9.58862 80.423 9.61171 80.3882 9.6467C80.3462 9.6893 80.323 9.74662 80.3238 9.80606C80.3246 9.8655 80.3493 9.92219 80.3925 9.96368L81.6966 11.2169L81.3885 12.9865C81.3812 13.0277 81.3859 13.07 81.4018 13.1087C81.4177 13.1474 81.4444 13.181 81.4787 13.2055C81.513 13.2301 81.5535 13.2447 81.5958 13.2476C81.6381 13.2506 81.6804 13.2418 81.7178 13.2223L83.33 12.3869L84.9421 13.2223C84.9861 13.2454 85.0373 13.2531 85.0862 13.2447C85.2098 13.2237 85.2928 13.1083 85.2715 12.9865L84.9634 11.2169L86.2675 9.96368C86.303 9.92939 86.3264 9.88461 86.3335 9.83563C86.3527 9.71318 86.2661 9.59982 86.1418 9.58163Z" fill="url(#paint4_linear_0_1)" />
                                            <path d="M95.4065 9.58163L93.6041 9.32342L92.7984 7.71334C92.7764 7.66926 92.7402 7.63357 92.6955 7.61188C92.5833 7.5573 92.447 7.60278 92.391 7.71334L91.5852 9.32342L89.7828 9.58163C89.7332 9.58862 89.6877 9.61171 89.6529 9.6467C89.6109 9.6893 89.5877 9.74662 89.5885 9.80606C89.5893 9.8655 89.614 9.92219 89.6572 9.96368L90.9612 11.2169L90.6532 12.9865C90.6459 13.0277 90.6506 13.07 90.6665 13.1087C90.6824 13.1474 90.7091 13.181 90.7434 13.2055C90.7777 13.2301 90.8182 13.2447 90.8605 13.2476C90.9028 13.2506 90.9451 13.2418 90.9825 13.2223L92.5947 12.3869L94.2068 13.2223C94.2508 13.2454 94.302 13.2531 94.3509 13.2447C94.4745 13.2237 94.5575 13.1083 94.5362 12.9865L94.2281 11.2169L95.5322 9.96368C95.5677 9.92939 95.5911 9.88461 95.5982 9.83563C95.6174 9.71318 95.5308 9.59982 95.4065 9.58163Z" fill="url(#paint5_linear_0_1)" />
                                            <path d="M104.671 9.58163L102.869 9.32342L102.063 7.71334C102.041 7.66926 102.005 7.63357 101.96 7.61188C101.848 7.5573 101.712 7.60278 101.656 7.71334L100.85 9.32342L99.0475 9.58163C98.9978 9.58862 98.9524 9.61171 98.9176 9.6467C98.8756 9.6893 98.8524 9.74662 98.8532 9.80606C98.854 9.8655 98.8787 9.92219 98.9219 9.96368L100.226 11.2169L99.9179 12.9865C99.9106 13.0277 99.9153 13.07 99.9312 13.1087C99.9471 13.1474 99.9738 13.181 100.008 13.2055C100.042 13.2301 100.083 13.2447 100.125 13.2476C100.167 13.2506 100.21 13.2418 100.247 13.2223L101.859 12.3869L103.472 13.2223C103.516 13.2454 103.567 13.2531 103.616 13.2447C103.739 13.2237 103.822 13.1083 103.801 12.9865L103.493 11.2169L104.797 9.96368C104.832 9.92939 104.856 9.88461 104.863 9.83563C104.882 9.71318 104.795 9.59982 104.671 9.58163Z" fill="url(#paint6_linear_0_1)" />
                                            <path d="M11.5432 8.02344H13.3035C13.6817 8.02344 14.0042 8.0804 14.2708 8.19434C14.5374 8.30827 14.7413 8.47689 14.8826 8.7002C15.0261 8.92122 15.0979 9.19466 15.0979 9.52051C15.0979 9.76888 15.0523 9.98763 14.9612 10.1768C14.87 10.3659 14.7413 10.5254 14.575 10.6553C14.4086 10.7829 14.2104 10.882 13.9802 10.9526L13.7205 11.0791H12.1379L12.1311 10.3989H13.3171C13.5222 10.3989 13.6931 10.3625 13.8298 10.2896C13.9666 10.2166 14.0691 10.1175 14.1375 9.99219C14.2081 9.86458 14.2434 9.72103 14.2434 9.56152C14.2434 9.38835 14.2092 9.23796 14.1409 9.11035C14.0748 8.98047 13.9723 8.88135 13.8333 8.81299C13.6943 8.74235 13.5177 8.70703 13.3035 8.70703H12.4011V13H11.5432V8.02344ZM14.3836 13L13.2146 10.7646L14.1135 10.7612L15.2996 12.9556V13H14.3836ZM18.3104 8.68652L16.8236 13H15.9246L17.7977 8.02344H18.3719L18.3104 8.68652ZM19.5545 13L18.0643 8.68652L17.9994 8.02344H18.577L20.4569 13H19.5545ZM19.4828 11.1543V11.8345H16.7757V11.1543H19.4828ZM23.0507 8.02344V13H22.1996V8.02344H23.0507ZM24.6127 8.02344V8.70703H20.6513V8.02344H24.6127ZM28.9463 12.3198V13H26.3042V12.3198H28.9463ZM26.5469 8.02344V13H25.689V8.02344H26.5469ZM28.6011 10.1016V10.7715H26.3042V10.1016H28.6011ZM28.9292 8.02344V8.70703H26.3042V8.02344H28.9292ZM35.0226 8.02344H35.8771V11.3491C35.8771 11.7274 35.7951 12.0441 35.631 12.2993C35.467 12.5545 35.2436 12.7471 34.9611 12.877C34.6808 13.0046 34.3675 13.0684 34.0212 13.0684C33.6634 13.0684 33.3444 13.0046 33.0641 12.877C32.7838 12.7471 32.5628 12.5545 32.401 12.2993C32.2415 12.0441 32.1618 11.7274 32.1618 11.3491V8.02344H33.0163V11.3491C33.0163 11.5884 33.0573 11.7855 33.1393 11.9404C33.2213 12.0931 33.3376 12.2059 33.4879 12.2788C33.6383 12.3517 33.8161 12.3882 34.0212 12.3882C34.2262 12.3882 34.4028 12.3517 34.5509 12.2788C34.7013 12.2059 34.8175 12.0931 34.8996 11.9404C34.9816 11.7855 35.0226 11.5884 35.0226 11.3491V8.02344ZM39.8484 11.7183C39.8484 11.6157 39.8324 11.5246 39.8005 11.4448C39.7709 11.3651 39.7174 11.2922 39.6399 11.2261C39.5624 11.16 39.453 11.0962 39.3118 11.0347C39.1728 10.9709 38.995 10.9059 38.7786 10.8398C38.5416 10.7669 38.3228 10.686 38.1223 10.5972C37.9241 10.506 37.7509 10.4012 37.6028 10.2827C37.4547 10.1619 37.3396 10.0241 37.2576 9.86914C37.1755 9.71191 37.1345 9.53076 37.1345 9.32568C37.1345 9.12288 37.1767 8.93831 37.261 8.77197C37.3476 8.60563 37.4695 8.46208 37.6267 8.34131C37.7862 8.21826 37.9742 8.1237 38.1907 8.05762C38.4071 7.98926 38.6464 7.95508 38.9084 7.95508C39.2776 7.95508 39.5954 8.02344 39.8621 8.16016C40.1309 8.29688 40.3371 8.48031 40.4807 8.71045C40.6265 8.94059 40.6995 9.19466 40.6995 9.47266H39.8484C39.8484 9.30859 39.8131 9.1639 39.7424 9.03857C39.6741 8.91097 39.5692 8.81071 39.428 8.73779C39.289 8.66488 39.1124 8.62842 38.8982 8.62842C38.6954 8.62842 38.5268 8.65918 38.3923 8.7207C38.2579 8.78223 38.1576 8.8654 38.0915 8.97021C38.0255 9.07503 37.9924 9.19352 37.9924 9.32568C37.9924 9.41911 38.0141 9.50456 38.0574 9.58203C38.1007 9.65723 38.1667 9.72786 38.2556 9.79395C38.3445 9.85775 38.4561 9.91813 38.5906 9.9751C38.725 10.0321 38.8834 10.0868 39.0657 10.1392C39.3414 10.2212 39.5818 10.3123 39.7869 10.4126C39.9919 10.5106 40.1628 10.6222 40.2996 10.7476C40.4363 10.8729 40.5388 11.0153 40.6072 11.1748C40.6755 11.332 40.7097 11.5109 40.7097 11.7114C40.7097 11.9211 40.6676 12.1102 40.5832 12.2788C40.4989 12.4451 40.3782 12.5876 40.2209 12.7061C40.066 12.8223 39.8791 12.9123 39.6604 12.9761C39.4439 13.0376 39.2024 13.0684 38.9358 13.0684C38.6965 13.0684 38.4607 13.0365 38.2283 12.9727C37.9981 12.9089 37.7885 12.812 37.5994 12.6821C37.4102 12.55 37.2598 12.3859 37.1482 12.1899C37.0365 11.9917 36.9807 11.7604 36.9807 11.4961H37.8386C37.8386 11.6579 37.866 11.7957 37.9206 11.9097C37.9776 12.0236 38.0562 12.117 38.1565 12.1899C38.2567 12.2606 38.373 12.313 38.5051 12.3472C38.6396 12.3813 38.7831 12.3984 38.9358 12.3984C39.1363 12.3984 39.3038 12.37 39.4382 12.313C39.5749 12.256 39.6775 12.1763 39.7458 12.0737C39.8142 11.9712 39.8484 11.8527 39.8484 11.7183Z" fill="white" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M54.5315 8.54252L56.6013 10.6123C56.7283 10.7393 56.7283 10.9452 56.6013 11.0722L54.5315 13.142C54.4045 13.269 54.1986 13.269 54.0716 13.142C53.9445 13.015 53.9445 12.8091 54.0716 12.6821L55.5861 11.1675L46.6143 11.1675C46.4347 11.1675 46.2891 11.0219 46.2891 10.8423C46.2891 10.6627 46.4347 10.517 46.6143 10.517L55.5861 10.517L54.0716 9.00247C53.9445 8.87546 53.9445 8.66954 54.0716 8.54252C54.1986 8.41551 54.4045 8.41551 54.5315 8.54252Z" fill="white" />
                                            <defs>
                                                <linearGradient id="paint0_linear_0_1" x1="28.6534" y1="-4.54371" x2="45.5389" y2="40.2752" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#3B58F7" stopOpacity="0.33" />
                                                    <stop offset="1" stopColor="#8FF4FF" stopOpacity="0.16" />
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_0_1" x1="7.49985" y1="0.542095" x2="116.215" y2="6.71338" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#9E70FF" stopOpacity="0.63" />
                                                    <stop offset="0.552083" stopColor="#91D9FF" />
                                                    <stop offset="1" stopColor="#7B83FF" stopOpacity="0.5" />
                                                </linearGradient>
                                                <linearGradient id="paint2_linear_0_1" x1="101.859" y1="7.58878" x2="101.859" y2="13.2482" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#F4EF77" />
                                                    <stop offset="1" stopColor="#C0BB38" />
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_0_1" x1="58" y1="0" x2="58" y2="20.5981" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#F4EF77" />
                                                    <stop offset="1" stopColor="#C0BB38" />
                                                </linearGradient>
                                                <linearGradient id="paint4_linear_0_1" x1="58" y1="0" x2="58" y2="20.5981" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#F4EF77" />
                                                    <stop offset="1" stopColor="#C0BB38" />
                                                </linearGradient>
                                                <linearGradient id="paint5_linear_0_1" x1="101.859" y1="7.58878" x2="101.859" y2="13.2482" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#F4EF77" />
                                                    <stop offset="1" stopColor="#C0BB38" />
                                                </linearGradient>
                                                <linearGradient id="paint6_linear_0_1" x1="101.859" y1="7.58878" x2="101.859" y2="13.2482" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#F4EF77" />
                                                    <stop offset="1" stopColor="#C0BB38" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </a>
                                </div>
                                <div className="support">
                                    <a href={`https://wordpress.org/support/plugin/${key}/#new-topic-0`} target="_blank" rel="noreferrer">
                                        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.895 8.30265C10.37 7.21766 10.37 5.97266 9.895 4.89266L8.525 5.51266C8.825 6.20266 8.825 6.98766 8.53 7.68266L9.895 8.30265ZM7.71 2.70266C7.17141 2.46768 6.59012 2.34639 6.0025 2.34639C5.41488 2.34639 4.83359 2.46768 4.295 2.70266L4.915 4.06766C5.61 3.77266 6.395 3.77266 7.09 4.07266L7.71 2.70266ZM2.105 4.88766C1.87002 5.42712 1.74874 6.00923 1.74874 6.59766C1.74874 7.18608 1.87002 7.76819 2.105 8.30765L3.475 7.68266C3.175 6.99266 3.175 6.20266 3.475 5.50766L2.105 4.88766ZM4.295 10.4927C4.83362 10.728 5.41522 10.8491 6.00302 10.8482C6.59083 10.8474 7.17207 10.7246 7.71 10.4877L7.09 9.12265C6.74755 9.27063 6.37857 9.34739 6.00551 9.34825C5.63246 9.3491 5.26313 9.27405 4.92 9.12765L4.295 10.4927ZM6 1.59766C6.65661 1.59766 7.30679 1.72699 7.91342 1.97826C8.52004 2.22953 9.07124 2.59783 9.53553 3.06212C9.99983 3.52641 10.3681 4.07761 10.6194 4.68424C10.8707 5.29087 11 5.94105 11 6.59766C11 7.92374 10.4732 9.19551 9.53553 10.1332C8.59785 11.0709 7.32608 11.5977 6 11.5977C5.34339 11.5977 4.69321 11.4683 4.08658 11.2171C3.47995 10.9658 2.92876 10.5975 2.46447 10.1332C1.52678 9.19551 1 7.92374 1 6.59766C1 5.27157 1.52678 3.9998 2.46447 3.06212C3.40215 2.12444 4.67392 1.59766 6 1.59766ZM6 4.59766C5.46957 4.59766 4.96086 4.80837 4.58579 5.18344C4.21071 5.55851 4 6.06722 4 6.59766C4 7.12809 4.21071 7.6368 4.58579 8.01187C4.96086 8.38694 5.46957 8.59765 6 8.59765C6.53043 8.59765 7.03914 8.38694 7.41421 8.01187C7.78929 7.6368 8 7.12809 8 6.59766C8 6.06722 7.78929 5.55851 7.41421 5.18344C7.03914 4.80837 6.53043 4.59766 6 4.59766Z" fill="white" />
                                        </svg>
                                        {__('Technical Support', 'gutenverse')}
                                    </a>
                                </div>
                            </div>;
                        })}
                    </div>
                </div>
            </div>
            <div className="panel-wrapper second-wrapper">
                <div className="box-panel subscribe-panel">
                    {done && !loading ? (
                        <>
                            <div>
                                <div>
                                    <h2 className="title">{__('Thank You For Subscribing Our Newsletter', 'gutenverse')}</h2>
                                    <span className="description">{__('We will inform you about updates, new themes, new features, and other infos related to Gutenverse.', 'gutenverse')}</span>
                                    <div className="btn start-building" onClick={() => (window.location.href = fseUrl)}>
                                        {__('Start Building', 'gutenverse')}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <div>
                                    <h2 className="title">{__('Sign up to our Newsletter', 'gutenverse')}</h2>
                                    <span className="description">{__('Subscribe to our newsletter and be the first to get new features, latest update & new theme releases.', 'gutenverse')}</span>
                                    <div id={'subcription-email'}>
                                        <div className="input">
                                            <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.6" d="M13.1427 0H2.13391C1.37499 0 0.757812 0.7176 0.757812 1.6V11.2C0.757812 12.0824 1.37499 12.8 2.13391 12.8H13.1427C13.9016 12.8 14.5187 12.0824 14.5187 11.2V1.6C14.5187 0.7176 13.9016 0 13.1427 0ZM13.1427 1.6V2.0088L7.63828 6.9872L2.13391 2.0096V1.6H13.1427ZM2.13391 11.2V4.0352L7.21582 8.6312C7.3363 8.74124 7.48507 8.80105 7.63828 8.80105C7.79149 8.80105 7.94026 8.74124 8.06074 8.6312L13.1427 4.0352L13.144 11.2H2.13391Z" fill="#99A2A9" />
                                            </svg>
                                            <input type="text" placeholder="Your Email Address" value={email} disabled={loading} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className={`btn ${done ? 'done' : ''}`} onClick={onSubscribe}>
                                            {loading ? done ? <div className="checkmark"></div> : <div className="loader"></div> : __('Subscribe', 'gutenverse')}
                                        </div>
                                        {invalid && !done && <span className="warning">{invalidMessage()}</span>}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {/* <div className="box-panel rating-panel" onClick={() => window.open(rating, '_blank')}>
                    <img className="illustration" src={`${imgDir}/asset_11.webp`} />
                </div> */}
                <div className="box-panel support-panel">
                    <div className="doc-details">
                        <h2>
                            <IconDocsSVG />
                            {__('Documentations', 'gutenverse')}
                        </h2>
                        <span className="description">{__('If you have any difficulties using our plugin, please check our documentation.', 'gutenverse')}</span>
                        <a href={docs} target={'_blank'} rel="noreferrer">
                            {__('Check Now', 'gutenverse')}
                            <i className="fa fa-arrow-right" />
                        </a>
                    </div>
                    {/* <div className="support-details">
                        <h2>
                            <IconSupportSVG />
                            {__('Technical Support', 'gutenverse')}
                        </h2>
                        <span className="description">{__('If you encounter any bugs/issues on our plugin, please contact us below.', 'gutenverse')}</span>
                        <a href={support} target={'_blank'} rel="noreferrer">
                            {__('Contact Us', 'gutenverse')}
                            <i className="fa fa-arrow-right" />
                        </a>
                    </div> */}
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
