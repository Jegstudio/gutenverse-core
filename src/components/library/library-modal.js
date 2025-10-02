import { withSelect, dispatch } from '@wordpress/data';
import classnames from 'classnames';
import { LogoFullColorSVG, IconCloseSVG, IconHamburgerSVG } from 'gutenverse-core/icons';
import { __ } from '@wordpress/i18n';
import LayoutContent from './layout-content';
import SectionContent from './section-content';
import FavoriteContent from './favorite-content';
import { useState, useEffect } from '@wordpress/element';
import { Snackbar } from '@wordpress/components';
import { IconInfoGraySVG } from 'gutenverse-core/icons';
import ThemesContent from './themes-content';
import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';

const LibraryModal = props => {
    const {
        open,
        visible,
        setVisibility,
        setLibraryError,
        loading,
        modalData,
        importer
    } = props;

    const { importNotice } = importer;
    const { activeTheme, plugins, adminUrl } = window['GutenverseConfig'] || {};
    const [page, setPage] = useState(1);
    const [demoList, setDemoList] = useState([]);

    let isStale = false;

    if ( 'themes' !== modalData.libraryData?.active ) {
        isStale = true;
    }

    const closeImporter = () => {
        setVisibility(false);
    };
    const [style, setStyle] = useState({
        display: ''
    });
    const handleBurger = () => {
        setBurger(!burger);
        if (burger) {
            setStyle({
                display: 'block !important'
            });
        } else {
            setStyle({
                display: 'none !important'
            });
        }
    };

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
                    if (isStale) return resolve([]);

                    const newData = data.demo_list;
                    const contentData = modalData.themeContentData?.data || demoList;
                    const existingIds = new Set(contentData.map(item => item.demo_id));
                    const filteredNewData = newData.filter(item => !existingIds.has(item.demo_id));

                    dispatch('gutenverse/library').initialModalData({
                        ...modalData,
                        themeContentData: {
                            data: [...contentData, ...filteredNewData],
                            totalDemo: data.total_item,
                            currentPage: page
                        }
                    });
                    setDemoList(() => [...contentData, ...filteredNewData]);
                    resolve(data);
                })
                .catch((e) => {
                    if (!isStale) alert(e.message);
                    resolve([]);
                });
        });
    };

    const SnackbarNotice = ({ message }) => {
        const [visible, setVisible] = useState(true);

        useEffect(() => {
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(() => {
                    dispatch('gutenverse/library').setImportNotice(null);
                }, 300);
            }, 10000);

            return () => clearTimeout(timer);
        }, []);

        const handleDismiss = () => {
            setVisible(false);
        };

        return (
            <div
                className={`gutenverse-library-notice ${!visible ? 'notice-hidden' : ''}`}
                onClick={handleDismiss}
            >
                <Snackbar>
                    <IconInfoGraySVG />
                    <span>{__('Import Failed!', '--gctd--')}</span>
                    {message}
                </Snackbar>
            </div>
        );
    };

    const [burger, setBurger] = useState(false);
    const importerClass = classnames('gutenverse-library-wrapper', {
        'visible': visible
    });

    return (open && !loading) ? <>
        <div className={importerClass}>
            <div className={'gutenverse-library-overlay'} onClick={closeImporter} />
            <div className={'gutenverse-library-container'}>
                <div className={'gutenverse-library-header'}>
                    <div className="gutenverse-header-burger" onClick={handleBurger} >
                        {
                            burger ? <IconCloseSVG /> : <IconHamburgerSVG size={16} />
                        }
                    </div>
                    <div className="gutenverse-header-logo">
                        <LogoFullColorSVG />{__('Library', '--gctd--')}
                    </div>

                    <div className="gutenverse-section-switcher">
                        {modalData.libraryData.tabs.map((type, index) => {
                            const active = type.id === modalData.libraryData.active ? 'active' : '';
                            const {emptyLicense, companionActive} = modalData.libraryData.attributes;
                            const flag = emptyLicense && companionActive;

                            return <>
                                {
                                    (activeTheme === 'unibiz' && type.id === 'themes') ?
                                        flag ? <div key={index}
                                            className={`gutenverse-library-type ${active}`}
                                            onClick={() => {
                                                dispatch('gutenverse/library').setActiveLiblary(type.id);
                                                dispatch('gutenverse/library').setCategories([]);
                                                dispatch('gutenverse/library').setAuthor('');
                                                dispatch('gutenverse/library').setLicense('');
                                                dispatch('gutenverse/library').setStatus('');
                                                dispatch('gutenverse/library').setPaging(1);
                                            }}
                                        >
                                            {type.icon}
                                            <span>{type.label}</span>
                                        </div> :
                                            <a key={index}
                                                className={`gutenverse-library-type ${active}`} href={`${adminUrl}admin.php?page=gutenverse-companion-dashboard&path=demo`} target="_blank" rel="noreferrer">
                                                {type.icon}
                                                <span>{type.label}</span>
                                            </a>  : <div
                                            key={index}
                                            className={`gutenverse-library-type ${active}`}
                                            onClick={() => {
                                                dispatch('gutenverse/library').setActiveLiblary(type.id);
                                                dispatch('gutenverse/library').setCategories([]);
                                                dispatch('gutenverse/library').setAuthor('');
                                                dispatch('gutenverse/library').setLicense('');
                                                dispatch('gutenverse/library').setStatus('');
                                                dispatch('gutenverse/library').setPaging(1);
                                            }}
                                        >
                                            {type.icon}
                                            <span>{type.label}</span>
                                        </div>
                                }
                            </>;
                        })}
                    </div>
                    <div className="gutenverse-close-wrapper">
                        <div className="gutenverse-close" onClick={closeImporter}>
                            <IconCloseSVG />
                        </div>
                    </div>
                </div>
                <div className={`gutenverse-library-body ${modalData.libraryData.active}`}>
                    <LibraryContent
                        modalData={modalData}
                        setPage={setPage}
                        page={page}
                        active={modalData.libraryData.active}
                        closeImporter={closeImporter}
                        burger={burger}
                        setLibraryError={setLibraryError}
                        getDemo={getDemo}
                        demoList={demoList}
                        setDemoList={setDemoList}
                    />
                </div>
            </div>
        </div>
        {importNotice && <SnackbarNotice message={importNotice} />}
    </> : false;
};

const LibraryContent = (props) => {
    let template = null;
    const { active } = props;
    switch (active) {
        case 'favorite':
            template = <FavoriteContent {...props} />;
            break;
        case 'section':
            template = <SectionContent {...props} />;
            break;
        case 'themes':
            template = <ThemesContent {...props} />;
            break;
        default:
            template = <LayoutContent {...props} />;
            break;
    }

    return template;
};

export default withSelect(select => {
    const { getModalData, getImporterData } = select('gutenverse/library');

    return {
        modalData: getModalData(),
        importer: getImporterData()
    };
})(LibraryModal);