import { useState, useEffect, useRef } from '@wordpress/element';
import { withSelect, dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';
import throttle from 'lodash/throttle';
import { IconLibraryThemeListSVG, IconLoadingSVG } from 'gutenverse-core/icons';
import { installAndActivateTheme, installingPlugins } from 'gutenverse-core/helper';

const ThemesContentNoLicense = (props) => {
    const {adminUrl, modalData} = props;
    const [demoList, setDemoList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalItem, setTotalItem] = useState(0);
    const [templateList, setTemplateList] = useState([]);
    const loader = useRef();
    const demoSkeleton = ['','','','','','','','','','','','','','','','','','','','','','','',''];

    useEffect(() => {
        const handleIntersect = throttle((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setPage(prevPage => {
                    if (totalPage > prevPage) {
                        const lengthInitial = totalItem - templateList.filter(item => item !== 'initial').length;
                        const initialItem = lengthInitial < 24 ? lengthInitial : 24;

                        const arrSkeleton = Array(initialItem).fill('initial');
                        setTemplateList(prev => [...prev, ...arrSkeleton]);

                        return prevPage + 1;
                    }
                    return prevPage;
                });
            }
        }, 800);

        const observer = new IntersectionObserver(handleIntersect, { threshold: 1 });

        if (loader.current) observer.observe(loader.current);

        return () => {
            if (loader.current) observer.unobserve(loader.current);
            observer.disconnect();
            handleIntersect.cancel();
        };
    }, [loader, totalPage, totalItem]);

    const getDemo = (param) => {
        return new Promise(resolve => {
            apiFetch({
                path: 'gutenverse-companion/v1/demo/get',
                method: 'POST',
                data: applyFilters(
                    'gutenverse.library.import.parameter',
                    {
                        theme_slug: 'unibiz',
                        ...param
                    }
                )
            })
                .then((data) => {
                    const newData = data.demo_list;
                    const contentData = modalData.themeContentData?.data || demoList;
                    dispatch('gutenverse/library').initialModalData({
                        ...modalData,
                        themeContentData: {data: [...contentData, ...newData], totalDemo: data.total_item}
                    });
                    setDemoList(prev => [...prev, ...newData]);
                    resolve(data);
                })
                .catch((e) => {
                    alert(e.message);
                    resolve([]);
                });
        });
    };

    useEffect(() => {
        let isMounted = true;
        const themeData = modalData.themeContentData?.data;
        const total = modalData.themeContentData?.totalDemo;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getDemo({
                    page,
                    perpage: 24,
                });

                if (isMounted) {
                    setTotalPage(response?.total_page);
                    setTotalItem(response?.total_item);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        if (modalData.themeContentData && themeData?.length === total) {
            setDemoList(themeData);
        } else {
            fetchData();
        }

        return () => {
            isMounted = false;
        };
    }, [templateList]);

    return <div id="gutenverse-library-themes-content-wrapper" className="no-license">
        <div className="gutenverse-library-themes-content-body">
            <h2>{__('Explore Prebuilt Sites', '--gctd--')}</h2>
            <p>
                {__('Explore 50+ prebuilt sites designed to fit any website need, including blogs, portfolios, and business sites. Please note, this library is for preview only—to import a demo, go to the ', '--gctd--')}
                <a href={adminUrl + 'admin.php?page=gutenverse-companion-dashboard'}>{__('Unibiz Dashboard', '--gctd--')}</a>.
            </p>
            <div className="library-themes-demo-container">
                {
                    ( demoList.length > 0 || !loading ) ?
                        demoList?.map((demo) => {
                            return <div key={demo.demo_id} className="library-themes-demo-card">
                                <div className="library-themes-demo-card-image" style={{ backgroundImage: `url(${demo.cover})` }} >
                                    {demo.pro && <div className="pro-flag">PRO</div>}
                                </div>
                                <div className="library-themes-demo-card-footer" >
                                    <span>{demo.title}</span>
                                </div>
                            </div>;
                        }) :
                        demoSkeleton.map((demo, index) => {
                            return <div key={index} className="library-themes-demo-card">
                                <div className="library-themes-demo-card-image layout" />
                                <div className="library-themes-demo-card-footer" />
                            </div>;
                        })
                }
            </div>
        </div>
        <div ref={loader}></div>
        <div className="gutenverse-library-themes-content-footer">
            <p>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0C3.13428 0 0 3.13541 0 7C0 10.8668 3.13428 14 7 14C10.8657 14 14 10.8668 14 7C14 3.13541 10.8657 0 7 0ZM7 3.10484C7.65473 3.10484 8.18548 3.6356 8.18548 4.29032C8.18548 4.94505 7.65473 5.47581 7 5.47581C6.34527 5.47581 5.81452 4.94505 5.81452 4.29032C5.81452 3.6356 6.34527 3.10484 7 3.10484ZM8.58064 10.2742C8.58064 10.4612 8.42899 10.6129 8.24193 10.6129H5.75806C5.57101 10.6129 5.41935 10.4612 5.41935 10.2742V9.59677C5.41935 9.40972 5.57101 9.25806 5.75806 9.25806H6.09677V7.45161H5.75806C5.57101 7.45161 5.41935 7.29996 5.41935 7.1129V6.43548C5.41935 6.24843 5.57101 6.09677 5.75806 6.09677H7.56452C7.75157 6.09677 7.90323 6.24843 7.90323 6.43548V9.25806H8.24193C8.42899 9.25806 8.58064 9.40972 8.58064 9.59677V10.2742Z" fill="#3B57F7"/>
                </svg>
                {__('This library only shows the demo list. To import a demo, go to the Unibiz Dashboard.', '--gctd--')}
            </p>
            <button
                onClick={() => {
                    window.location.href = adminUrl + 'admin.php?page=gutenverse-companion-dashboard';
                }}
            >
                <a>{__('Go To Unibiz Dashboard', '--gctd--')}</a>
            </button>
        </div>
    </div >;
};

const ThemesContentUnibizCTA = () => {
    const { imgDir, proDemoUrl, domainURL } = window['GutenverseConfig'] || window['GutenverseDashboard'] ||{};
    const [buttonText, setButtonText] = useState(__('Install Unibiz Theme', 'gutenverse'));
    const activateTheme = () => {
        setButtonText(<IconLoadingSVG />);
        const themeSlug = 'unibiz'; // change this to your theme slug
        const pluginsList = [
            { name: 'Gutenverse Companion', slug: 'gutenverse-companion', version: '', url: '' },
        ];

        // Step 1: Install + Activate Theme
        installAndActivateTheme(themeSlug)
            .then(themeResponse => {
                console.log('Theme installed and activated:', themeResponse);
                // Step 2: Install + Activate Plugins
                return installingPlugins(pluginsList);
            })
            .then(() => {
                console.log('All plugins installed and activated!');
                window.location.replace(`${domainURL}/wp-admin/admin.php?page=gutenverse-companion-dashboard&path=demo`);
            })
            .catch(err => {
                console.error('Installation failed:', err);
                alert('Something went wrong during installation.');
                setButtonText(__('Install Unibiz Theme', 'gutenverse'));
            });
    };
    return <>
        <div id="gutenverse-library-themes-content-wrapper">
            <div className="banner-wrapper">
                <img className="background-banner" src={`${imgDir}/wizard-bg-cta-companion.png`} alt="background" />
                <div className="banner-content">
                    <div className="banner-glitter" style={{ backgroundImage: `url(${imgDir}/wizard-bg-confetti-unibiz.png)` }}></div>
                    <div className="col-1">
                        <div className="title-wrapper">
                            <h2 className="title">{__('Supercharge Gutenverse', 'gutenverse')}</h2>
                            <h2 className="title">{__('With', 'gutenverse')} <span className="highlight-title">{__('Unibiz Theme!', 'gutenverse')}</span></h2>
                            <div className="list-row">
                                <IconLibraryThemeListSVG />
                                <span className="list-text">{__('50+ Stunning Demo Sites', 'gutenverse')}</span>
                            </div>
                            <div className="list-row">
                                <IconLibraryThemeListSVG />
                                <span className="list-text">{__('One-Click Full Site Import', 'gutenverse')}</span>
                            </div>
                            <div className="list-row">
                                <IconLibraryThemeListSVG />
                                <span className="list-text">{__('Exclusive Template Library', 'gutenverse')}</span>
                            </div>
                            <div className="list-row">
                                <IconLibraryThemeListSVG />
                                <span className="list-text">{__('2x Faster Site Performance', 'gutenverse')}</span>
                            </div>
                            <div className="list-row">
                                <IconLibraryThemeListSVG />
                                <span className="list-text">{__('Experience a Next-Level FSE Theme', 'gutenverse')}</span>
                            </div>
                            <div className="action-wrapper">
                                <div className="button-install-theme" onClick={activateTheme}>{buttonText}</div>
                                <a className="button-learn-more" href={`${proDemoUrl}/unibiz/`} target="_blank" rel="noreferrer">{__('Learn More', 'gutenverse')}</a>
                            </div>
                            <p className="notice-text">{__('By clicking “Install Unibiz Theme” I agree to install & activate Gutenverse Companion plugin.', 'gutenverse')}</p>
                        </div>
                    </div>
                    <div className="col-2" style={{ backgroundImage: `url(${imgDir}/wizard-bg-list-demo.png)` }}>
                        <img className="mockup-demo-image" src={`${imgDir}/wizard-mockup-demo-companion-with-shadow.png`} alt="computer" />
                    </div>
                </div>
            </div>
        </div >
    </>;
}

const ThemesContent = (props) => {
    const {modalData} = props;
    const {emptyLicense, companionActive} = modalData?.libraryData?.attributes || {};
    const { activeTheme, adminUrl } = window['GutenverseConfig'] || {};
    const flag = activeTheme === 'unibiz' && emptyLicense && companionActive;

    return flag ?
        <ThemesContentNoLicense adminUrl={adminUrl} modalData={modalData} /> :
        <ThemesContentUnibizCTA /> ;
};

export default withSelect(select => {
    const { getLibraryData, getModalData } = select('gutenverse/library');

    return {
        modalData: getModalData(),
        libraryData: getLibraryData()
    };
})(ThemesContent);