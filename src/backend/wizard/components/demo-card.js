import { __ } from '@wordpress/i18n';
import { ButtonImport } from './button-import';
import { formatArray } from '../helper';

export const DemoCard = ({
    template,
    key,
    templateList,
    importTemplates,
    setSelectedTemplate,
    demoUsed,
    setModal
}) => {
    return <div className="template-page" key={key}>
        {template.pro && <div className="pro-flag">{__('PRO', 'gutenverse')}</div>}
        <div className="template-thumbnail">
            <img src={template?.cover} />
            {template?.status?.need_upgrade && <><div className="thumbnail-overlay"></div>
                <div className="required-wrapper">
                    <p className="required-title">Required License</p>
                    <p className="required-tier">{formatArray(template?.status?.required_tier)}</p>
                </div>
            </>
            }
        </div>
        <div className="template-page-desc">
            <h3>{template?.title}</h3>
            <div className="buttons">
                {}
                <ButtonImport
                    elementKey={key}
                    templateList={templateList}
                    template={template}
                    importTemplates={importTemplates}
                    setSelectedTemplate={setSelectedTemplate}
                    demoUsed={demoUsed}
                    setModal={setModal}
                />
                <div className="button-view-demo" onClick={() => window.open(template?.demo, '_blank')}>{__('View Demo', 'gutenverse')}</div>
            </div>
        </div>
    </div>;
};

