import { __ } from '@wordpress/i18n';
import { ButtonImport } from './button-import';
import { formatArray } from '../helper';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';
import classnames from 'classnames';

export const DemoCard = ({
    template,
    key,
    templateList,
    importTemplates,
    setSelectedTemplate,
    demoUsed,
    setModal,
    setModalContent,
}) => {
    const [loading, setLoading] = useState(false);
    const handleImport = (demo) => {
        apiFetch({
            path: 'gutenverse-companion/v1/check/library-down',
            method: 'GET',
        }).then(() => {
            setSelectedTemplate(demo);
            setModal(true);
        }).catch(() => {
            alert(__('Library Server Down. Please try again later.', 'gutenverse-companion'));
            setModalContent(prev => {
                return prev;
            });
            setModal(false);
            return;
        }).finally(() => setLoading(false));
    };

    const templatePageClasses = classnames(
        'template-page',
        {
            'loading': !template || !template?.cover,
            'active': template?.status?.using_template,
        },
    );

    return <div className={templatePageClasses} key={key}>
        {template.pro && <div className="pro-flag">{__('PRO', 'gutenverse')}</div>}
        <div className="template-thumbnail">
            {template?.cover ? <img src={template?.cover} /> : <div className="no-image"></div>}
            {
                template !== 'initial' && template?.status?.required_tier ? applyFilters('gutenverse-companion.demo-overlay', () => {
                    return <><div className="thumbnail-overlay"></div>
                        <div className="required-wrapper">
                            <p className="required-title">Required License</p>
                            <p className="required-tier">{formatArray(template?.status?.required_tier)}</p>
                        </div>
                    </>;
                }, () => <></>, template?.status?.required_tier) : <></>
            }
            {template?.status?.using_template && <div className="overlay-active"><p>{__('Currently Active', 'gutenverse-companion')}</p></div>}
        </div>
        <div className="template-page-desc">
            {
                template?.cover && template?.demo_id ? <>
                    <h3>{template?.title}</h3>
                    <div className="buttons">
                        {
                            loading ? <div className="loading-button">
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.69737 1V2.89873M8.69737 12.962V16M3.76316 8.40506H1M16 8.40506H14.8158M13.7951 13.3092L13.2368 12.7722M13.9586 3.40439L12.8421 4.47848M3.10914 13.7811L5.34211 11.6329M3.27264 3.2471L4.94737 4.85823" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div> : <ButtonImport
                                elementKey={key}
                                templateList={templateList}
                                template={template}
                                importTemplates={importTemplates}
                                setSelectedTemplate={setSelectedTemplate}
                                demoUsed={demoUsed}
                                setModal={setModal}
                                setLoading={setLoading}
                                handleImport={() => handleImport(template)}
                            />
                        }
                        <div className="button-view-demo" onClick={() => window.open(template?.remote_url, '_blank')}>{__('View Demo', 'gutenverse')}</div>
                    </div>
                </> : <>
                    <div className="loading-title">
                        <div className="loading-skeleton"></div>
                    </div>
                    <div className="loading-buttons">
                        <div className="loading-skeleton"></div>
                    </div>
                </>
            }
        </div>
    </div>;
};

