import { useEffect, useState, createPortal } from '@wordpress/element';
import { Loader } from 'react-feather';
import { LogoFullWhiteSVG, IconBlocksSVG, IconLayoutsSVG, IconLoveSVG } from 'gutenverse-core/icons';
import { __ } from '@wordpress/i18n';
import LibraryModal from './library-modal';
import { dispatch } from '@wordpress/data';
import { fetchLibraryData } from 'gutenverse-core/requests';
import { signal } from 'gutenverse-core/editor-helper';
export { libraryStore } from 'gutenverse-core/store';

const initLibraryState = {
    active: 'layout',
    tabs: [
        {
            id: 'layout',
            icon: <IconLayoutsSVG />,
            label: __('Layouts', 'gutenverse'),
        },
        {
            id: 'section',
            icon: <IconBlocksSVG />,
            label: __('Sections', 'gutenverse'),
        },
        {
            id: 'favorite',
            icon: <IconLoveSVG />,
            label: __('Favorite', 'gutenverse'),
        },
    ],
};

const initLayoutState = {
    categories: '',
    license: '',
    keyword: '',
    author: '',
    paging: 1,
    library: 'layout',
};

const Library = () => {
    const [open, setOpen] = useState(false);
    const [visible, setVisibility] = useState(true);
    const [injectLocation, setInjectLocation] = useState(null);
    const [refresh, setRefresh] = useState(null); // eslint-disable-line no-unused-vars
    const [loading, setLoading] = useState(true);

    const refreshSignal = (key) => {
        setRefresh(key);
    };

    useEffect(() => {
        let binding = signal.refreshSignal.add(refreshSignal);

        return () => {
            binding && binding.detach();
        };
    });

    setTimeout(() => {
        let injectLocation = document.getElementsByClassName('edit-post-header-toolbar')[0];
        injectLocation = injectLocation ? injectLocation : document.getElementsByClassName('edit-site-header_start')[0];
        injectLocation = injectLocation ? injectLocation : document.getElementsByClassName('edit-site-header-edit-mode__start')[0];
        setInjectLocation(injectLocation);
    }, 1000);

    const libraryButton = (
        <div className="gutenverse-top-button">
            <div className="gutenverse-library-button" id={'gutenverse-library-button'} onClick={() => {
                setOpen(true);
                setVisibility(true);
            }}>
                {loading && open && <div style={{ marginRight: '10px' }}>
                    <div className="rotating" style={{ display: 'flex' }}>
                        <Loader size={20} />
                    </div>
                </div>}
                <div style={{ marginRight: '2px', display: 'flex' }}>
                    <LogoFullWhiteSVG />
                </div>
                <span>
                    {__('Library', 'gutenverse')}
                </span>
            </div>
        </div>
    );

    // Init store.
    useEffect(() => {
        if (open) {
            fetchLibraryData().then(result => {
                dispatch('gutenverse/library').initialLibraryData({
                    'layoutData': result['layout-data'],
                    'layoutCategories': result['layout-categories'],
                    'themeData': result['theme-data'],
                    'themeCategories': result['theme-categories'],
                    'sectionData': result['section-data'],
                    'sectionCategories': result['section-categories'],
                    'pluginEcosystem': result['plugin-ecosystem']
                });
                setLoading(false);
            });
            const { plugins } = window['GutenverseConfig'];
            dispatch('gutenverse/library').initialPluginData({
                'installedPlugin': plugins,
            });
            dispatch('gutenverse/library').initialModalData({
                'libraryData': initLibraryState,
                'layoutContentData': initLayoutState
            });
        }
    }, [open]);

    return <>
        <LibraryModal
            open={open}
            setOpen={setOpen}
            visible={visible}
            setVisibility={setVisibility}
            loading={loading}
            setLoading={setLoading}
        />
        {injectLocation && createPortal(libraryButton, injectLocation)}
    </>;
};

export default Library;