import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useState, useRef, useCallback } from '@wordpress/element';
import isEmpty from 'lodash/isEmpty';
import { assignTemplates, fetchingDataImport, getDemo, importingPatterns, importMenus, importPages, installingPlugins, removingPrevious } from '../helper';
import { ImporterModal } from '../components/importer-modal';
import { DemoCard } from '../components/demo-card';
import throttle from 'lodash/throttle';

export const ImportTemplates = ({ updateProgress, emptyLicense }) => {
    const [templateList, setTemplateList] = useState(['initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial']);
    const [isImport, setisImport] = useState(false);
    const [importerStep, setImporterStep] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState('settings');
    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [importerNotice, setImporterNotice] = useState('');
    const [importerCurrent, setImporterCurrent] = useState(0);
    const [importerStatus, setImporterStatus] = useState(0);
    const [demoUsed, setDemoUsed] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [filter, setFilter] = useState({
        proFilter: '',
        categoryFilter: ''
    });
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [totalItem, setTotalItem] = useState(0);
    const plans = [
        {
            value: '',
            label: 'All Plans'
        },
        {
            value: 'general',
            label: 'Free'
        },
        {
            value: 'basic',
            label: 'Basic'
        },
        {
            value: 'professional',
            label: 'Professional'
        },
        {
            value: 'agency',
            label: 'Agency'
        },
        {
            value: 'enterprise',
            label: 'Enterprise'
        },
    ];
    const [categories, setCategories] = useState([
        {
            name: 'All Categories',
            slug: ''
        }
    ]);

    const searchRef = useRef('');
    const loader = useRef();

    const updateTemplateStatus = (title) => {
        setTemplateList(prevTemplateList =>
            prevTemplateList.map(template => {
                if (template.title === title) {
                    setDemoUsed(true);
                    setModalContent('confirmation');
                    return {
                        ...template,
                        status: {
                            ...template.status,
                            using_template: true,
                        },
                    };
                } else {
                    return {
                        ...template,
                        status: {
                            ...template.status,
                            using_template: false,
                        },
                    };
                }
            })
        );
    };

    window.dispatcher && window.dispatcher.execute('gutenverse.server.after.construct',
        'gutenverse-pro/action/after/construct',
        () => {
            setisImport(!isImport);
        });

    const importTemplates = (template, active, steps, additional) => {
        const misc = [];
        additional.forEach(item => {
            if (item.checked) {
                misc.push(item.label
                    .toString()
                    .toLowerCase()
                    .trim()
                    .replace(/[\s\W-]+/g, '-')
                    .replace(/^-+|-+$/g, ''));
            }
        });
        setImporterNotice(
            sprintf(
                __('Importing "%s" demo in progress...', 'gutenverse'),
                `<strong>${template.title}</strong>`
            )
        );

        let promise = Promise.resolve();
        steps.forEach((el, index) => {
            promise = promise
                .then((result) => {
                    let installed = [];
                    if (!isEmpty(result) && result.installed) {
                        installed = result.installed;
                    }
                    setImporterCurrent(index + 1);
                    switch (el.type) {
                        case 'install-plugin':
                            setImporterStatus('Installing Plugin....');
                            return installingPlugins(template, setImporterStatus);
                        case 'fetching-data':
                            setImporterStatus(`Preparing Data: ${template.title}....`);
                            return fetchingDataImport(template, active);
                        case 'importing-pattern':
                            setImporterStatus('Preparing Patterns...');
                            return importingPatterns(template, misc, setImporterStatus);
                        case 'assigning-templates':
                            setImporterStatus('Assigning templates....');
                            return assignTemplates(installed, template, misc);
                        case 'importing-pages':
                            setImporterStatus('Importing pages....');
                            return importPages(installed, template, misc);
                        case 'importing-menus':
                            setImporterStatus('Importing menus....');
                            return importMenus(template, misc);
                        case 'removing-previous':
                            setImporterStatus('Uninstalling Previous Demo....');
                            return removingPrevious(template, active);
                        default:
                            console.warn(`Unknown step type: ${el.type}`);
                            return Promise.resolve(); // Continue the chain even if unknown
                    }
                })
                .catch((error) => {
                    console.error(`Step ${index + 1} failed:`, error);
                    // Optionally: stop the chain by rethrowing
                    // throw error;
                    return Promise.resolve(); // Continue to next step despite failure
                });
        });

        // This runs after all steps are done
        promise.then(() => {
            setModalContent('done');
        });
    };

    useEffect(() => {
        if (templateList?.length > 0) {
            let allDone = true;

            templateList?.map(template => {
                allDone = allDone && template?.status?.exists && template?.status?.using_template;
            });
        }
    }, [templateList]);

    useEffect(() => {
        setTimeout(() => {
            getDemo({
                page,
                filter: {
                    search: search,
                    ...filter
                },
                perpage: 12
            })
                .then(response => {

                    response?.demo_list.forEach(el => {
                        if (el?.status?.using_template) {
                            setDemoUsed(true);
                            setModalContent('confirmation');
                        }
                    });
                    if (page === 1) {
                        setTemplateList(response?.demo_list);
                    } else {
                        setTemplateList((prev) => {
                            if (!prev || prev[0] === 'initial') {
                                return response?.demo_list;
                            }
                            const updatedItems = response?.demo_list.map(newItem => {
                                const existingIndex = prev.findIndex(item => item.demo_id === newItem.demo_id);
                                if (existingIndex !== -1) {
                                    // Replace the existing item
                                    const updatedPrev = [...prev];
                                    updatedPrev[existingIndex] = newItem;
                                    return updatedPrev[existingIndex];
                                }
                                return newItem;
                            });

                            // Remove duplicates in prev and add updated/new ones
                            const nonUpdatedItems = prev.filter(
                                item => !response.demo_list.some(newItem => newItem.demo_id === item.demo_id)
                            );

                            // Final list: existing items that weren’t replaced + all new/updated items
                            return [...nonUpdatedItems, ...updatedItems];
                        });
                    }

                    setCategories((prev) => {

                        const newItems = response?.categories.filter(
                            post => !prev.some(existing => existing.slug === post.slug)
                        );
                        return [...prev, ...newItems];
                    });
                    setTotalPage(response?.total_page);
                    setTotalItem(response?.total_item);
                }).catch(() => { }).finally(() => {
                    setTemplateList((prev) => prev.filter(item => item !== 'initial'));
                });
        }, 500);
    }, [isImport, page, filter, search]);

    useEffect(() => {
        const handleIntersect = throttle((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setPage(prevPage => {
                    if (totalPage > prevPage) {
                        const lengthInitial = totalItem - templateList.filter(item => item !== 'initial').length;
                        const initialItem = lengthInitial < 12 ? lengthInitial : 12;

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
    }, [loader, totalPage, totalItem, templateList]);

    useEffect(() => {
        setPage(1);
        setTemplateList(['initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial']);
    }, [filter]);


    const handleChange = (e) => {
        searchRef.current = e.target.value;
        triggerDebounce();
    };

    const triggerDebounce = useCallback(() => {
        clearTimeout(triggerDebounce.timer);
        triggerDebounce.timer = setTimeout(() => {
            setDebouncedSearch(searchRef.current);
        }, 500);
    }, []);

    useEffect(() => {
        if (debouncedSearch !== null) {
            setSearch(debouncedSearch);
            setPage(1);
            setTemplateList(Array(12).fill('initial'));
        }
    }, [debouncedSearch]);

    const handleOpened = (type) => {
        if (type === selectedFilter) {
            setSelectedFilter('');
        } else {
            setSelectedFilter(type);
        }
    };

    const TemplateContent = (props) => {
        const {list} = props;
        return <>
            <div className="template-list">
                {!isEmpty(list) ? list?.map((template) => {
                    return <DemoCard
                        key={template?.id}
                        template={template}
                        templateList={list}
                        importTemplates={importTemplates}
                        setSelectedTemplate={setSelectedTemplate}
                        demoUsed={demoUsed}
                        setModal={setModal}
                    />;
                }) : <div className="no-template">
                    <div className="no-template">
                        <div>
                            <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_22672_9698)">
                                    <path d="M28.5 46.668C20.779 46.668 14.5 40.389 14.5 32.668C14.5 24.947 20.779 18.668 28.5 18.668C36.221 18.668 42.5 24.947 42.5 32.668C42.5 40.389 36.221 46.668 28.5 46.668ZM28.5 22.168C22.711 22.168 18 26.879 18 32.668C18 38.457 22.711 43.168 28.5 43.168C34.289 43.168 39 38.457 39 32.668C39 26.879 34.289 22.168 28.5 22.168Z" fill="#A2A5A9" />
                                    <path d="M25.5834 37.3351C25.1354 37.3351 24.6874 37.1647 24.3467 36.8217C23.6631 36.1381 23.6631 35.0297 24.3467 34.3461L30.1801 28.5128C30.8637 27.8291 31.9721 27.8291 32.6557 28.5128C33.3394 29.1964 33.3394 30.3047 32.6557 30.9884L26.8224 36.8217C26.4794 37.1647 26.0314 37.3351 25.5834 37.3351Z" fill="#A2A5A9" />
                                    <path d="M31.4167 37.3351C30.9687 37.3351 30.5207 37.1647 30.1801 36.8217L24.3467 30.9884C23.6631 30.3047 23.6631 29.1964 24.3467 28.5128C25.0304 27.8291 26.1387 27.8291 26.8224 28.5128L32.6557 34.3461C33.3394 35.0297 33.3394 36.1381 32.6557 36.8217C32.3127 37.1647 31.8647 37.3351 31.4167 37.3351Z" fill="#A2A5A9" />
                                    <path d="M50.0833 53.6654H6.91667C3.377 53.6654 0.5 50.7884 0.5 47.2487V8.7487C0.5 5.20903 3.377 2.33203 6.91667 2.33203H50.0833C53.623 2.33203 56.5 5.20903 56.5 8.7487V47.2487C56.5 50.7884 53.623 53.6654 50.0833 53.6654ZM6.91667 5.83203C5.309 5.83203 4 7.14103 4 8.7487V47.2487C4 48.8564 5.309 50.1654 6.91667 50.1654H50.0833C51.691 50.1654 53 48.8564 53 47.2487V8.7487C53 7.14103 51.691 5.83203 50.0833 5.83203H6.91667Z" fill="#A2A5A9" />
                                    <path d="M54.75 14H2.25C1.284 14 0.5 13.216 0.5 12.25C0.5 11.284 1.284 10.5 2.25 10.5H54.75C55.716 10.5 56.5 11.284 56.5 12.25C56.5 13.216 55.716 14 54.75 14Z" fill="#A2A5A9" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_22672_9698">
                                        <rect width="56" height="56" fill="white" transform="translate(0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <h3>{__('No Results Found!', 'gutenverse')}</h3>
                            <p>{__('It seems we can’t find any results based on your search.', 'gutenverse')}</p>
                        </div>

                    </div>
                </div>}
            </div>
            <div ref={loader}></div>
        </>;
    };

    return <div className="template-install">
        {modal && <ImporterModal
            setImporterStep={setImporterStep}
            importerStep={importerStep}
            importerNotice={importerNotice}
            importerCurrent={importerCurrent}
            importerStatus={importerStatus}
            selectedTemplate={selectedTemplate}
            updateTemplateStatus={updateTemplateStatus}
            setModal={setModal}
            close={() => {
                setModal(false);
                updateTemplateStatus(selectedTemplate.title);
            }}
            template={selectedTemplate}
            templateList={templateList}
            importTemplates={importTemplates}
            content={modalContent}
        />}
        <div className="template-title">
            <h1 className="content-title">{__('Choose Prebuilt Demo', 'gutenverse')}</h1>
            <p>{__('Discover a wide selection of themes, each carefully crafted to meet the unique needs of your website. Whether you\'re building a blog, portfolio, or business site.', 'gutenverse')}</p>
        </div>
        <div className="search-filter-wrapper">
            <div className="filter-wrapper">
                <div className={`plans-wrapper ${selectedFilter === 'plan' ? 'opened' : ''} ${filter.proFilter !== '' ? 'selected' : ''}`} onClick={() => handleOpened('plan')}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.625 11L2.375 4.125L5.8125 7.25L8 3.5L10.1875 7.25L13.625 4.125L12.375 11H3.625ZM12.375 12.875C12.375 13.25 12.125 13.5 11.75 13.5H4.25C3.875 13.5 3.625 13.25 3.625 12.875V12.25H12.375V12.875Z" fill={`${selectedFilter === 'plan' || filter.proFilter !== '' ? '#3b57f7' : '#00223D'}`} />
                    </svg>
                    {plans.find(el => el.value === filter.proFilter).label}
                    <div className="dropdown-wrapper">
                        {
                            plans.map(el => <div key={el.value} className="dropdown-item" onClick={() => setFilter({ ...filter, proFilter: el.value })}>{el.label}</div>)
                        }
                    </div>
                </div>
                <div className={`category-wrapper ${selectedFilter === 'category' ? 'opened' : '' } ${filter.categoryFilter !== '' ? 'selected' : ''}`} onClick={() => handleOpened('category')}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 6.999C2.36739 6.999 2.24021 6.94632 2.14645 6.85255C2.05268 6.75879 2 6.63161 2 6.499V2.5C2 2.36739 2.05268 2.24021 2.14645 2.14645C2.24021 2.05268 2.36739 2 2.5 2H6.5C6.63261 2 6.75979 2.05268 6.85355 2.14645C6.94732 2.24021 7 2.36739 7 2.5V6.499C7 6.63161 6.94732 6.75879 6.85355 6.85255C6.75979 6.94632 6.63261 6.999 6.5 6.999H2.5ZM9.5 6.999C9.36739 6.999 9.24021 6.94632 9.14645 6.85255C9.05268 6.75879 9 6.63161 9 6.499V2.5C9 2.36739 9.05268 2.24021 9.14645 2.14645C9.24021 2.05268 9.36739 2 9.5 2H13.499C13.6316 2 13.7588 2.05268 13.8526 2.14645C13.9463 2.24021 13.999 2.36739 13.999 2.5V6.499C13.999 6.63161 13.9463 6.75879 13.8526 6.85255C13.7588 6.94632 13.6316 6.999 13.499 6.999H9.5ZM2.5 13.999C2.36739 13.999 2.24021 13.9463 2.14645 13.8526C2.05268 13.7588 2 13.6316 2 13.499V9.499C2 9.36639 2.05268 9.23921 2.14645 9.14545C2.24021 9.05168 2.36739 8.999 2.5 8.999H6.5C6.63261 8.999 6.75979 9.05168 6.85355 9.14545C6.94732 9.23921 7 9.36639 7 9.499V13.499C7 13.6316 6.94732 13.7588 6.85355 13.8526C6.75979 13.9463 6.63261 13.999 6.5 13.999H2.5ZM9.5 13.999C9.36739 13.999 9.24021 13.9463 9.14645 13.8526C9.05268 13.7588 9 13.6316 9 13.499V9.499C9 9.36639 9.05268 9.23921 9.14645 9.14545C9.24021 9.05168 9.36739 8.999 9.5 8.999H13.499C13.6316 8.999 13.7588 9.05168 13.8526 9.14545C13.9463 9.23921 13.999 9.36639 13.999 9.499V13.499C13.999 13.6316 13.9463 13.7588 13.8526 13.8526C13.7588 13.9463 13.6316 13.999 13.499 13.999H9.5Z" fill={`${selectedFilter === 'category' || filter.categoryFilter !== '' ? '#3b57f7' : '#00223D'}`} />
                    </svg>
                    {categories.find(el => el.slug === filter.categoryFilter).name}
                    <div className="dropdown-wrapper">
                        {
                            categories.map(el => <div key={el.slug} className="dropdown-item" onClick={() => setFilter({ ...filter, categoryFilter: el.slug })}>{el.name}</div>)
                        }
                    </div>
                </div>
            </div>
            <div className="search-input-wrapper">
                <input type="text" name="search" className="search-form-field" onChange={handleChange} placeholder="Search demo..." />
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.79141 3.15435e-07C4.04195 0.000400896 3.30304 0.176619 2.63406 0.514491C1.96508 0.852363 1.3847 1.34246 0.939564 1.94541C0.494425 2.54835 0.196943 3.24731 0.0710301 3.98611C-0.0548833 4.72492 -0.00571694 5.48296 0.214578 6.19931C0.434872 6.91566 0.820151 7.57033 1.33945 8.11072C1.85874 8.65111 2.49757 9.06213 3.20459 9.31076C3.9116 9.55938 4.66709 9.63868 5.41032 9.54226C6.15355 9.44585 6.86379 9.17641 7.48397 8.75562L10.4448 11.7141C10.5271 11.8023 10.6262 11.8731 10.7364 11.9222C10.8466 11.9713 10.9656 11.9977 11.0862 11.9999C11.2068 12.002 11.3266 11.9798 11.4385 11.9346C11.5503 11.8894 11.652 11.8222 11.7373 11.7369C11.8226 11.6516 11.8898 11.55 11.935 11.4381C11.9802 11.3263 12.0024 11.2065 12.0002 11.0858C11.9981 10.9652 11.9717 10.8463 11.9226 10.7361C11.8735 10.6259 11.8027 10.5267 11.7145 10.4445L8.75599 7.4836C9.24544 6.76324 9.52927 5.9231 9.57699 5.05351C9.6247 4.18392 9.43448 3.31776 9.02678 2.54819C8.61908 1.77861 8.00932 1.13471 7.26307 0.685737C6.51682 0.23676 5.66231 -0.000315659 4.79141 3.15435e-07ZM1.79701 4.79104C1.79701 3.99687 2.11249 3.23524 2.67405 2.67368C3.23561 2.11212 3.99724 1.79664 4.79141 1.79664C5.58557 1.79664 6.34721 2.11212 6.90876 2.67368C7.47032 3.23524 7.7858 3.99687 7.7858 4.79104C7.7858 5.5852 7.47032 6.34684 6.90876 6.9084C6.34721 7.46995 5.58557 7.78543 4.79141 7.78543C3.99724 7.78543 3.23561 7.46995 2.67405 6.9084C2.11249 6.34684 1.79701 5.5852 1.79701 4.79104Z" fill="#99A2A9" />
                </svg>
            </div>
        </div>
        <TemplateContent list={templateList} />
        <div className="template-footer">
            <div className="template-actions">
                <div onClick={() => updateProgress('pluginAndTheme', 1)} className="button-back">
                    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 5.1C15.3314 5.1 15.6 4.83137 15.6 4.5C15.6 4.16863 15.3314 3.9 15 3.9V5.1ZM0.575736 4.07574C0.341421 4.31005 0.341421 4.68995 0.575736 4.92426L4.39411 8.74264C4.62843 8.97696 5.00833 8.97696 5.24264 8.74264C5.47696 8.50833 5.47696 8.12843 5.24264 7.89411L1.84853 4.5L5.24264 1.10589C5.47696 0.871573 5.47696 0.491674 5.24264 0.257359C5.00833 0.0230446 4.62843 0.0230446 4.39411 0.257359L0.575736 4.07574ZM15 3.9L1 3.9V5.1L15 5.1V3.9Z" fill="currentColor" />
                    </svg>
                    {__('Back', 'gutenverse')}
                </div>
                <div onClick={() => emptyLicense ? updateProgress('upgradePro', 3) : updateProgress('done', 4)} className="button-next">{__('Next', 'gutenverse')}</div>
            </div>
        </div>
    </div>;
};