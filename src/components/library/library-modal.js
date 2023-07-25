import { withSelect, dispatch } from '@wordpress/data';
import classnames from 'classnames';
import { LogoFullColorSVG, IconCloseSVG } from 'gutenverse-core/icons';
import { __ } from '@wordpress/i18n';
import LayoutContent from './layout-content';
import SectionContent from './section-content';
import FavoriteContent from './favorite-content';

const LibraryModal = props => {
    const {
        open,
        setOpen,
        visible,
        setVisibility,
        loading,
        setLoading,
        modalData
    } = props;

    const closeImporter = () => {
        setVisibility(false);
    };

    const importerClass = classnames('gutenverse-library-wrapper', {
        'visible': visible
    });

    return (open && !loading) ? <>
        <div className={importerClass}>
            <div className={'gutenverse-library-overlay'} onClick={closeImporter} />
            <div className={'gutenverse-library-container'}>
                <div className={'gutenverse-library-header'}>
                    <div className="gutenverse-header-logo"><LogoFullColorSVG />{__('Library', '--gctd--')}</div>
                    <div className="gutenverse-section-switcher">
                        {modalData.libraryData.tabs.map((type, index) => {
                            const active = type.id === modalData.libraryData.active ? 'active' : '';

                            return (
                                <div
                                    key={index}
                                    className={`gutenverse-library-type ${active}`}
                                    onClick={() =>{
                                        dispatch( 'gutenverse/library' ).setActiveLiblary(type.id);
                                        dispatch( 'gutenverse/library' ).setCategories('');
                                        dispatch( 'gutenverse/library' ).setAuthor('');
                                        dispatch( 'gutenverse/library' ).setLicense('');
                                        dispatch( 'gutenverse/library' ).setPaging(1);
                                    }}
                                >
                                    {type.icon}
                                    <span>{type.label}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="gutenverse-close-wrapper">
                        <div className="gutenverse-close" onClick={closeImporter}>
                            <IconCloseSVG />
                        </div>
                    </div>
                </div>
                <div className={'gutenverse-library-body'}>
                    <LibraryContent
                        active={modalData.libraryData.active}
                        closeImporter={closeImporter}
                    />
                </div>
            </div>
        </div>
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
        default:
            template = <LayoutContent {...props} />;
            break;
    }

    return template;
};

export default withSelect(select => {
    const { getModalData } = select('gutenverse/library');

    return {
        modalData: getModalData()
    };
})(LibraryModal);