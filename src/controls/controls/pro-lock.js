
import { __ } from '@wordpress/i18n';

const ProLock = () => {
    const {
        upgradeProUrl,
    } = window['GutenverseConfig'];

    const openLink = () => {
        window.open(upgradeProUrl);
    };

    return <>
        <div className={'control-locked'}>
            <p className="label" onClick={() => openLink()}>
                <strong>{__('PROX', '--gctd--')}</strong>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.9974 2.375C2.91406 2.375 1.1349 3.67083 0.414062 5.5C1.1349 7.32917 2.91406 8.625 4.9974 8.625C7.08073 8.625 8.8599 7.32917 9.58073 5.5C8.8599 3.67083 7.08073 2.375 4.9974 2.375ZM4.9974 7.58333C3.8474 7.58333 2.91406 6.65 2.91406 5.5C2.91406 4.35 3.8474 3.41667 4.9974 3.41667C6.1474 3.41667 7.08073 4.35 7.08073 5.5C7.08073 6.65 6.1474 7.58333 4.9974 7.58333ZM4.9974 4.25C4.30573 4.25 3.7474 4.80833 3.7474 5.5C3.7474 6.19167 4.30573 6.75 4.9974 6.75C5.68906 6.75 6.2474 6.19167 6.2474 5.5C6.2474 4.80833 5.68906 4.25 4.9974 4.25Z" fill="#C1313F" />
                </svg>
            </p>
        </div>
    </>;
};

export default ProLock;