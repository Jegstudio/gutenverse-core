import { IconCloseSVG, IconWarningSVG } from 'gutenverse-core/icons';
import { __ } from '@wordpress/i18n';

const AlertModal = ({ title = '', detail = '', actionText = 'Delete', onProceed, onClose }) => {
    const proceedAction = () => {
        onProceed();
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <div className="popup-header">
                    <div className="title">
                        <IconWarningSVG />
                        <span>{__('Warning', 'gutenverse-pro')}</span>
                    </div>
                    <div className="close-button" onClick={onClose}>
                        <IconCloseSVG />
                    </div>
                </div>
                <div className="popup-body">
                    <h3>{title}</h3>
                    <p>{detail}</p>
                </div>
                <div className="popup-footer">
                    <div className="buttons end">
                        <div className="button proceed" onClick={proceedAction}>{actionText}</div>
                        <div className="button cancel" onClick={onClose}>{__('Cancel', 'gutenverse-pro')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;