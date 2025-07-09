import { __ } from '@wordpress/i18n';
import { useEffect, useState, useRef } from '@wordpress/element';
import isEmpty from 'lodash/isEmpty';
import { assignTemplates, fetchingDataImport, getDemo, importingPatterns, importMenus, importPages, installingPlugins, removingPrevious } from '../helper';
import { ImporterModal } from '../components/importer-modal';
import { DemoCard } from '../components/demo-card';

export const ImportTemplates = ({ updateProgress }) => {
    const [templateList, setTemplateList] = useState([]);
    const [isImport, setisImport] = useState(false);
    const [fetch, setFetch] = useState(true);
    const [importerStep, setImporterStep] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState('settings');
    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [importerNotice, setImporterNotice] = useState('');
    const [importerCurrent, setImporterCurrent] = useState(0);
    const [importerStatus, setImporterStatus] = useState(0);
    const [demoUsed, setDemoUsed] = useState(false);
    const loader = useRef();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);

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
        setImporterNotice(`Importing “${template.title}” demo in progress...`);

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
        if ((page <= totalPage || !totalPage)) {
            setFetch(true);
            setTimeout(() => {
                getDemo({
                    page,
                    filter: {
                        search: '',
                        proFilter: '',
                        categoryFilter: ''
                    }
                })
                    .then(response => {
                        if (response?.demo_list) {
                            response?.demo_list.forEach(el => {
                                if (el?.status?.using_template) {
                                    setDemoUsed(true);
                                    setModalContent('confirmation');
                                }
                            });
                            setTemplateList((prev) => {
                                if (!prev) {
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
                            setTotalPage(response?.total_page);
                            setFetch(false);
                        }
                    });
            }, 500);

        }
    }, [isImport, page]);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                if (totalPage > page) {
                    setTimeout(() => {
                        setPage((prev) => prev + 1);
                    }, 500);
                }
            }
        }, { threshold: 1, totalPage, page });

        if (loader.current) observer.observe(loader.current);

        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, [fetch]);

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
                setFetch(false);
                updateTemplateStatus(selectedTemplate.title);
            }}
            template={selectedTemplate}
            templateList={templateList}
            importTemplates={importTemplates}
            setSelectedTemplate={setSelectedTemplate}
            content={modalContent}
        />}
        <div className="template-title">
            <h1 className="content-title">{__('Choose Prebuilt Templates', 'gutenverse')}</h1>
            <p>{__('Discover a wide selection of themes, each carefully crafted to meet the unique needs of your website. Whether you\'re building a blog, portfolio, or business site.', 'gutenverse')}</p>
        </div>
        <div className="template-list">
            {!isEmpty(templateList) ? templateList?.map((template, key) => {
                return <DemoCard
                    key={template?.id}
                    template={template}
                    templateList={templateList}
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
        {
            fetch && <div className="loader-template"></div>
        }

        <div className="template-actions">
            <div onClick={() => updateProgress('upgradePro', 2)} className="button-next">{__('Next', 'gutenverse')}</div>
        </div>
    </div>;
};