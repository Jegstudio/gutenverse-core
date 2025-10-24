import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';

export const ImporterModal = ({
    importerStep = [],
    setImporterStep,
    importerNotice = __('Importing “Home” demo in progress...', 'gutenverse'),
    importerCurrent = 2,
    importerStatus = __('Import: Demo Home....', 'gutenverse'),
    headerText = __('Important Notice', 'gutenverse'),
    warnText = __('Please do not refresh or close the page while importing data is in progress.', 'gutenverse'),
    completeTitle = __('Import Demo Completed', 'gutenverse'),
    selectedTemplate = {},
    close = () => { },
    template = {},
    templateList = [],
    content,
    updateTemplateStatus,
    setModal,
    importTemplates
}) => {
    const [status, setStatus] = useState(content);
    useEffect(() => {
        setStatus(content);
    }, [content]);
    const [additional, setAdditional] = useState([
        {
            id: 1,
            label: 'Install Required Plugin',
            checked: false,
            desc: 'Install and activate the required plugins to ensure this demo functions correctly.',
            value: [
                {
                    'type': 'install-plugin',
                    'label': 'Install Required Plugin',
                }
            ]
        },
        {
            id: 2,
            label: 'Full Import',
            checked: false,
            desc: 'We will import all pages, contents, and menu for this demo.',
            value: [
                {
                    'type': 'fetching-data',
                    'label': 'Fetching Data',
                },
                {
                    'type': 'importing-pattern',
                    'label': 'Importing Pattern',
                },
                {
                    'type': 'assigning-templates',
                    'label': 'Assigning Templates',
                },
                {
                    'type': 'importing-pages',
                    'label': 'Importing Pages'
                },
                {
                    'type': 'importing-menus',
                    'label': 'Importing Menus'
                }
            ]
        },
    ]);

    const handleCheckboxChange = (id, multi = true) => {
        setAdditional((prevCheckboxes) =>
            multi ? prevCheckboxes.map((checkbox) =>
                checkbox.id === id
                    ? { ...checkbox, checked: !checkbox.checked }
                    : checkbox
            ) : prevCheckboxes.map((checkbox) =>
                checkbox.id === id
                    ? { ...checkbox, checked: true }
                    : { ...checkbox, checked: false }
            )
        );
    };
    return <div className="gutenverse-importer-wrapper-modal-wizard">
        <div className="importer-modal">
            <ModalContent
                importerStep={importerStep}
                setImporterStep={setImporterStep}
                importerNotice={importerNotice}
                importerCurrent={importerCurrent}
                importerStatus={importerStatus}
                headerText={headerText}
                warnText={warnText}
                completeTitle={completeTitle}
                selectedTemplate={selectedTemplate}
                status={status}
                setStatus={setStatus}
                template={template}
                templateList={templateList}
                close={close}
                additional={additional}
                handleCheckboxChange={handleCheckboxChange}
                updateTemplateStatus={updateTemplateStatus}
                setModal={setModal}
                importTemplates={importTemplates}
            />
        </div>
    </div>;
};

const ModalContent = ({
    importerStep,
    setImporterStep,
    importerNotice,
    importerCurrent,
    importerStatus,
    warnText,
    completeTitle,
    selectedTemplate,
    close,
    status,
    setStatus,
    template,
    templateList,
    updateTemplateStatus,
    additional,
    setModal,
    importTemplates
}) => {
    const [consent, setConsent] = useState(false);
    const siteLink = window.location.origin;

    const handleConfirmImport = () => {
        setStatus('importing');
        let importStep = [
            {
                'type': 'install-plugin',
                'label': 'Install Required Plugin',
            },
            {
                'type': 'fetching-data',
                'label': 'Fetching Data',
            },
            {
                'type': 'importing-pattern',
                'label': 'Importing Pattern',
            },
            {
                'type': 'assigning-templates',
                'label': 'Assigning Templates',
            },
            {
                'type': 'importing-pages',
                'label': 'Importing Pages'
            },
            {
                'type': 'importing-menus',
                'label': 'Importing Menus'
            }
        ];
        // additional.forEach(el => {
        //     if (el.checked) {
        //         importStep = [
        //             ...importStep,
        //             ...el.value,
        //         ];
        //     }
        // });
        if (consent) {
            importStep = [
                {
                    'type': 'removing-previous',
                    'label': 'Uninstalling Current Demo'
                },
                ...importStep
            ];
        }
        setImporterStep(importStep);
        importTemplates(selectedTemplate, templateList.find(template => template?.status?.using_template), importStep, additional);
    };
    const handleDone = () => {
        updateTemplateStatus(template?.title);
        close();
    };

    switch (status) {
        case 'done':
            return <>
                <div className="import-complete">
                    <div className="auth-icon-status-wrapper">
                        <svg viewBox="0 0 160 160">
                            <defs>
                                <circle id="circle-clip" cx="50%" cy="50%" r="18%" />
                                <clipPath id="avatar-clip">
                                    <use href="#circle-clip" />
                                </clipPath>
                            </defs>
                            <circle cx="50%" cy="50%" r="18%" fill="white" fillOpacity="1">
                                <animate attributeName="r" values="18%;50%" dur="4s" repeatCount="indefinite" />
                                <animate attributeName="fill-opacity" values="1;0" dur="4s" repeatCount="indefinite" />
                            </circle>

                            <circle cx="50%" cy="50%" r="18%" fill="white" fillOpacity="1">
                                <animate attributeName="r" values="18%;50%" dur="4s" begin="1s" repeatCount="indefinite" />
                                <animate attributeName="fill-opacity" values="1;0" dur="4s" begin="1s" repeatCount="indefinite" />
                            </circle>

                            <circle cx="50%" cy="50%" r="18%" fill="white" fillOpacity="1">
                                <animate attributeName="r" values="18%;50%" dur="4s" begin="2s" repeatCount="indefinite" />
                                <animate attributeName="fill-opacity" values="1;0" dur="4s" begin="2s" repeatCount="indefinite" />
                            </circle>

                            <circle cx="50%" cy="50%" r="18%" fill="white" fillOpacity="1">
                                <animate attributeName="r" values="18%;50%" dur="4s" begin="3s" repeatCount="indefinite" />
                                <animate attributeName="fill-opacity" values="1;0" dur="4s" begin="3s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                        <div className="auth-status-icon">
                            <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_b_1867_7047)">
                                    <path d="M29.9987 2.66689L9.9987 22.6669L0.832031 13.5002L3.18203 11.1502L9.9987 17.9502L27.6487 0.316895L29.9987 2.66689Z" fill="#1bc87f" />
                                </g>
                                <defs>
                                    <filter id="filter0_b_1867_7047" x="-3.16797" y="-3.68311" width="37.168" height="30.3501" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1867_7047" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1867_7047" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div className="complete-title">
                        {completeTitle}
                    </div>
                    <div className="complete-subtitle">
                        <p>Demo &quot;<b>{selectedTemplate?.title}</b>&quot; is successfully imported!</p>
                    </div>
                    <div className="complete-footer">
                        <div className="close-button" onClick={() => handleDone()}>
                            {__('Close', 'gutenverse')}
                        </div>
                        <a href={siteLink} className="view-button">{__('Visit Site', 'gutenverse')}</a>
                    </div>
                </div>
            </>;
        case 'importing':
            return <>
                <div className="importer-header">
                    <span>{template?.title}</span>
                </div>
                <div className="importer-body">
                    <div className="importer-warn">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0C4.47754 0 0 4.47915 0 10C0 15.5241 4.47754 20 10 20C15.5225 20 20 15.5241 20 10C20 4.47915 15.5225 0 10 0ZM10 4.43548C10.9353 4.43548 11.6935 5.19371 11.6935 6.12903C11.6935 7.06435 10.9353 7.82258 10 7.82258C9.06468 7.82258 8.30645 7.06435 8.30645 6.12903C8.30645 5.19371 9.06468 4.43548 10 4.43548ZM12.2581 14.6774C12.2581 14.9446 12.0414 15.1613 11.7742 15.1613H8.22581C7.95859 15.1613 7.74194 14.9446 7.74194 14.6774V13.7097C7.74194 13.4425 7.95859 13.2258 8.22581 13.2258H8.70968V10.6452H8.22581C7.95859 10.6452 7.74194 10.4285 7.74194 10.1613V9.19355C7.74194 8.92633 7.95859 8.70968 8.22581 8.70968H10.8065C11.0737 8.70968 11.2903 8.92633 11.2903 9.19355V13.2258H11.7742C12.0414 13.2258 12.2581 13.4425 12.2581 13.7097V14.6774Z" fill="#FFC908"></path>
                        </svg>
                        <span>
                            {warnText}
                        </span>
                    </div>
                    <div className="importer-step">
                        <div className="import-step-notice">
                            <p>{importerNotice}</p>
                        </div>
                        <div className="importer-inner-step">
                            {importerStep.map((step, index) => {
                                const item = index + 1;
                                return (
                                    <div key={index} className={`steps ${importerCurrent > item ? 'done' : importerCurrent == item ? 'current' : ''}`}>
                                        {importerCurrent > item ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="#3b57f7" />
                                            <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#3b57f7" />
                                            <path d="M12 5L6.5 10.5L4 8" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                            : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="white" />
                                                <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#D0D5DD" />
                                            </svg>}
                                        <div>{step.label}</div>
                                        {importerCurrent > item ? <span className="completed">{__('Completed', 'gutenverse')}</span> : importerCurrent == item ? <div className="loading">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 1C8.13261 1 8.25979 1.05268 8.35355 1.14645C8.44732 1.24021 8.5 1.36739 8.5 1.5V4.5C8.5 4.63261 8.44732 4.75979 8.35355 4.85355C8.25979 4.94732 8.13261 5 8 5C7.86739 5 7.74022 4.94732 7.64645 4.85355C7.55268 4.75979 7.5 4.63261 7.5 4.5V1.5C7.5 1.36739 7.55268 1.24021 7.64645 1.14645C7.74022 1.05268 7.86739 1 8 1ZM8 11C8.13261 11 8.25979 11.0527 8.35355 11.1464C8.44732 11.2402 8.5 11.3674 8.5 11.5V14.5C8.5 14.6326 8.44732 14.7598 8.35355 14.8536C8.25979 14.9473 8.13261 15 8 15C7.86739 15 7.74022 14.9473 7.64645 14.8536C7.55268 14.7598 7.5 14.6326 7.5 14.5V11.5C7.5 11.3674 7.55268 11.2402 7.64645 11.1464C7.74022 11.0527 7.86739 11 8 11ZM15 8C15 8.13261 14.9473 8.25979 14.8536 8.35355C14.7598 8.44732 14.6326 8.5 14.5 8.5H11.5C11.3674 8.5 11.2402 8.44732 11.1464 8.35355C11.0527 8.25979 11 8.13261 11 8C11 7.86739 11.0527 7.74022 11.1464 7.64645C11.2402 7.55268 11.3674 7.5 11.5 7.5H14.5C14.6326 7.5 14.7598 7.55268 14.8536 7.64645C14.9473 7.74022 15 7.86739 15 8ZM5 8C5 8.13261 4.94732 8.25979 4.85355 8.35355C4.75979 8.44732 4.63261 8.5 4.5 8.5H1.5C1.36739 8.5 1.24021 8.44732 1.14645 8.35355C1.05268 8.25979 1 8.13261 1 8C1 7.86739 1.05268 7.74022 1.14645 7.64645C1.24021 7.55268 1.36739 7.5 1.5 7.5H4.5C4.63261 7.5 4.75979 7.55268 4.85355 7.64645C4.94732 7.74022 5 7.86739 5 8ZM3.05 3.05C3.14376 2.95626 3.27092 2.90361 3.4035 2.90361C3.53608 2.90361 3.66324 2.95626 3.757 3.05L5.88 5.172C5.97108 5.2663 6.02148 5.3926 6.02034 5.5237C6.0192 5.6548 5.96661 5.7802 5.87391 5.87291C5.78121 5.96561 5.6558 6.0182 5.5247 6.01934C5.3936 6.02048 5.2673 5.97008 5.173 5.879L3.05 3.757C2.95626 3.66324 2.90361 3.53608 2.90361 3.4035C2.90361 3.27092 2.95626 3.14376 3.05 3.05ZM10.121 10.121C10.2148 10.0273 10.3419 9.97461 10.4745 9.97461C10.6071 9.97461 10.7342 10.0273 10.828 10.121L12.95 12.243C13.0411 12.3373 13.0915 12.4636 13.0903 12.5947C13.0892 12.7258 13.0366 12.8512 12.9439 12.9439C12.8512 13.0366 12.7258 13.0892 12.5947 13.0903C12.4636 13.0915 12.3373 13.0411 12.243 12.95L10.121 10.828C10.0273 10.7342 9.97461 10.6071 9.97461 10.4745C9.97461 10.3419 10.0273 10.2148 10.121 10.121ZM12.95 3.051C13.0434 3.14472 13.0959 3.27166 13.0959 3.404C13.0959 3.53634 13.0434 3.66328 12.95 3.757L10.828 5.88C10.7337 5.97108 10.6074 6.02148 10.4763 6.02034C10.3452 6.0192 10.2198 5.96661 10.1271 5.87391C10.0344 5.78121 9.9818 5.6558 9.98066 5.5247C9.97952 5.3936 10.0299 5.2673 10.121 5.173L12.243 3.051C12.3368 2.95726 12.4639 2.90461 12.5965 2.90461C12.7291 2.90461 12.8562 2.95726 12.95 3.051ZM5.879 10.121C5.97274 10.2148 6.02539 10.3419 6.02539 10.4745C6.02539 10.6071 5.97274 10.7342 5.879 10.828L3.757 12.95C3.6627 13.0411 3.5364 13.0915 3.4053 13.0903C3.2742 13.0892 3.14879 13.0366 3.05609 12.9439C2.96339 12.8512 2.9108 12.7258 2.90966 12.5947C2.90852 12.4636 2.95892 12.3373 3.05 12.243L5.172 10.121C5.26576 10.0273 5.39292 9.97461 5.5255 9.97461C5.65808 9.97461 5.78524 10.0273 5.879 10.121Z" fill="#3B57F7" />
                                            </svg>
                                        </div> : ''}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="importer-footer">
                    <div className="footer-info">
                        <span>{importerStatus}</span>
                        <span>{__(`${(importerCurrent - 1)}/${(importerStep.length)} Completed`, 'gutenverse')}</span>
                    </div>
                </div>
                <div className="footer-loading">
                    <div className="loading-status" style={{ width: `${((importerCurrent / (importerStep.length)) * 100)}%` }}></div>
                </div>
            </>;
        case 'settings':
            const importProcess = [
                {
                    label: 'Installing All Required Plugins',
                    desc: 'Install and activate all required plugins to ensure this demo functions correctly.'
                },
                {
                    label: 'Import All Pages & Contents',
                    desc: 'All demo pages and content will be imported to match the demo layout.'
                },
                {
                    label: 'Import Global Styles',
                    desc: 'The global styles for this demo will be imported to match the demo layout.'
                },
                {
                    label: 'Import Menu',
                    desc: 'Demo navigation menu will be automatically created and assigned.'
                }
            ];
            return <>
                <div className="importer-header">
                    <span>{template?.title}</span>
                    <div onClick={() => setModal(false)}>
                        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)">
                            <path d="M5.16378 6.8372L6.15044 5.85053C6.23815 5.76283 6.3239 5.76088 6.4077 5.84469L17.47 16.907C17.5538 16.9908 17.5519 17.0765 17.4642 17.1642L16.4775 18.1509C16.3898 18.2386 16.304 18.2406 16.2202 18.1568L5.15793 7.09446C5.07413 7.01065 5.07608 6.9249 5.16378 6.8372Z" fill="#7D8292" />
                            <path d="M5.19113 16.927L16.2417 5.87644C16.3294 5.78874 16.4152 5.78679 16.499 5.87059L17.4418 6.8134C17.5256 6.89721 17.5237 6.98296 17.4359 7.07067L6.38535 18.1213C6.29765 18.209 6.21189 18.2109 6.12809 18.1271L5.18528 17.1843C5.10147 17.1005 5.10342 17.0147 5.19113 16.927Z" fill="#7D8292" />
                        </svg>
                    </div>
                </div>
                <div className="importer-body">
                    <div className="importer-warn">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0C4.47754 0 0 4.47915 0 10C0 15.5241 4.47754 20 10 20C15.5225 20 20 15.5241 20 10C20 4.47915 15.5225 0 10 0ZM10 4.43548C10.9353 4.43548 11.6935 5.19371 11.6935 6.12903C11.6935 7.06435 10.9353 7.82258 10 7.82258C9.06468 7.82258 8.30645 7.06435 8.30645 6.12903C8.30645 5.19371 9.06468 4.43548 10 4.43548ZM12.2581 14.6774C12.2581 14.9446 12.0414 15.1613 11.7742 15.1613H8.22581C7.95859 15.1613 7.74194 14.9446 7.74194 14.6774V13.7097C7.74194 13.4425 7.95859 13.2258 8.22581 13.2258H8.70968V10.6452H8.22581C7.95859 10.6452 7.74194 10.4285 7.74194 10.1613V9.19355C7.74194 8.92633 7.95859 8.70968 8.22581 8.70968H10.8065C11.0737 8.70968 11.2903 8.92633 11.2903 9.19355V13.2258H11.7742C12.0414 13.2258 12.2581 13.4425 12.2581 13.7097V14.6774Z" fill="#FFC908"></path>
                        </svg>
                        <span>
                            {warnText}
                        </span>
                    </div>
                    <div className="importer-step">
                        <div className="import-step-notice">
                            <p>{__('Here’s what will be installed and imported:', 'gutenverse')}</p>
                        </div>
                        <div className="importer-inner-step">
                            {importProcess.map((process, key) => (
                                <div key={key} className="steps" style={{ alignItems: 'normal' }}>
                                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 1L4.75 9L1 5.36364" stroke="#7722FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div>
                                        <p className="option-label">{process.label}</p>
                                        <span className="option-desc">{process.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="importer-footer">
                    <button className="button-confirm" onClick={handleConfirmImport}>Start Import</button>
                </div>
            </>;
        case 'confirmation':
            const confirmationWarning = [
                {
                    label: 'All Imported Pages & Contents will be deleted',
                    desc: 'All demo pages, patterns, media files, and other imported content will be removed from your site.'
                },
                {
                    label: 'Change on Templates or Template Part will be lost',
                    desc: 'Any edits you’ve made to templates or template parts will be overwritten during the switch.'
                },
                {
                    label: 'Imported Global Styles will be removed',
                    desc: 'Global style settings from the previous demo will be deleted and replaced.'
                }
            ];
            return <>
                <div className="importer-header">
                    <span>{template?.title}</span>
                    <div onClick={() => setModal(false)}>
                        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)">
                            <path d="M5.16378 6.8372L6.15044 5.85053C6.23815 5.76283 6.3239 5.76088 6.4077 5.84469L17.47 16.907C17.5538 16.9908 17.5519 17.0765 17.4642 17.1642L16.4775 18.1509C16.3898 18.2386 16.304 18.2406 16.2202 18.1568L5.15793 7.09446C5.07413 7.01065 5.07608 6.9249 5.16378 6.8372Z" fill="#7D8292" />
                            <path d="M5.19113 16.927L16.2417 5.87644C16.3294 5.78874 16.4152 5.78679 16.499 5.87059L17.4418 6.8134C17.5256 6.89721 17.5237 6.98296 17.4359 7.07067L6.38535 18.1213C6.29765 18.209 6.21189 18.2109 6.12809 18.1271L5.18528 17.1843C5.10147 17.1005 5.10342 17.0147 5.19113 16.927Z" fill="#7D8292" />
                        </svg>
                    </div>
                </div>
                <div className="importer-body">
                    <div className="importer-warn">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0C4.47754 0 0 4.47915 0 10C0 15.5241 4.47754 20 10 20C15.5225 20 20 15.5241 20 10C20 4.47915 15.5225 0 10 0ZM10 4.43548C10.9353 4.43548 11.6935 5.19371 11.6935 6.12903C11.6935 7.06435 10.9353 7.82258 10 7.82258C9.06468 7.82258 8.30645 7.06435 8.30645 6.12903C8.30645 5.19371 9.06468 4.43548 10 4.43548ZM12.2581 14.6774C12.2581 14.9446 12.0414 15.1613 11.7742 15.1613H8.22581C7.95859 15.1613 7.74194 14.9446 7.74194 14.6774V13.7097C7.74194 13.4425 7.95859 13.2258 8.22581 13.2258H8.70968V10.6452H8.22581C7.95859 10.6452 7.74194 10.4285 7.74194 10.1613V9.19355C7.74194 8.92633 7.95859 8.70968 8.22581 8.70968H10.8065C11.0737 8.70968 11.2903 8.92633 11.2903 9.19355V13.2258H11.7742C12.0414 13.2258 12.2581 13.4425 12.2581 13.7097V14.6774Z" fill="#FFC908"></path>
                        </svg>
                        <span>
                            {warnText}
                        </span>
                    </div>
                    <div className="importer-step">
                        <div className="import-step-notice">
                            <p>{__('Here’s what will be installed and imported:', 'gutenverse')}</p>
                        </div>
                        <div className="importer-inner-step">
                            {confirmationWarning.map((process, key) => (
                                <div key={key} className="steps" style={{ alignItems: 'normal' }}>
                                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 1L4.75 9L1 5.36364" stroke="#3b57f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div>
                                        <p className="option-label">{process.label}</p>
                                        <span className="option-desc">{process.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="acceptance-wrapper">
                        <p className="acceptance-question">{__('Are you sure you want to switch demos?', 'gutenverse')}</p>
                        <div className="acceptance-checkbox-wrapper" onClick={() => setConsent(!consent)}>
                            <div className="acceptance-checkbox">
                                {
                                    consent ? <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="1" width="14" height="14" rx="2.5" fill="#3b57f7" />
                                        <rect x="0.5" y="1" width="14" height="14" rx="2.5" stroke="#3b57f7" />
                                        <path d="M11.25 5.1875L6.09375 10.3438L3.75 8" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg> : <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="1" width="14" height="14" rx="2.5" stroke="#BDBEBF" />
                                        <path d="M11.25 5.1875L6.09375 10.3438L3.75 8" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }
                            </div>
                            <p className="acceptance-label">{__('Yes, I want to switch the demo', 'gutenverse')}</p>
                        </div>
                    </div>
                </div>
                <div className="importer-footer">
                    {
                        consent ? <button className="button-confirm" onClick={handleConfirmImport}>Start Import</button> :
                            <button className="button-inactive">Start Import</button>
                    }
                </div>
            </>;
        default:
            break;
    }
};

