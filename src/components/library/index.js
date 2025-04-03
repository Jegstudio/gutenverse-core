import { useEffect, useState, createPortal } from '@wordpress/element';
import { Loader } from 'react-feather';
import { LogoFullWhiteNoTextSVG, IconBlocksSVG, IconLayoutsSVG, IconLoveSVG } from 'gutenverse-core/icons';
import { __ } from '@wordpress/i18n';
import LibraryModal from './library-modal';
import { dispatch } from '@wordpress/data';
import { fetchLibraryData } from 'gutenverse-core/requests';
import { getEditSiteHeader, signal } from 'gutenverse-core/editor-helper';
import EscListener from '../esc-listener/esc-listener';
export { libraryStore } from 'gutenverse-core/store';

const initLibraryState = {
    active: 'layout',
    tabs: [
        {
            id: 'layout',
            icon: <IconLayoutsSVG />,
            label: __('Layouts', '--gctd--'),
        },
        {
            id: 'section',
            icon: <IconBlocksSVG />,
            label: __('Sections', '--gctd--'),
        },
        {
            id: 'favorite',
            icon: <IconLoveSVG />,
            label: __('Favorite', '--gctd--'),
        },
    ],
};

const initLayoutState = {
    categories: [],
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
    const [libraryError, setLibraryError] = useState(false);

    const refreshSignal = (key) => {
        setRefresh(key);
    };

    useEffect(() => {
        let binding = signal.refreshSignal.add(refreshSignal);

        return () => {
            binding && binding.detach();
        };
    });

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
                <div style={{ marginRight: '7px', display: 'flex' }}>
                    <LogoFullWhiteNoTextSVG />
                </div>
                <span>
                    {loading && open ? __('Updating Library...', '--gctd--') : __('Gutenverse Library', '--gctd--')}
                </span>
            </div>
        </div>
    );

    useEffect(() => {
        getEditSiteHeader().then(result => {
            setInjectLocation(result);
        });
    });

    // Init store.
    useEffect(() => {
        const dev = 'true' == '--dev_mode--';
        if (open) {
            const fetchData = async (dev) => {
                const result = await fetchLibraryData(dev);
                dispatch('gutenverse/library').initialLibraryData({
                    'layoutData': result['layout-data'],
                    'layoutCategories': result['layout-categories'],
                    'themeData': result['theme-data'],
                    'themeCategories': result['theme-categories'],
                    'sectionData': result['section-data'],
                    'sectionCategories': result['section-categories'],
                    'pluginEcosystem': result['plugin-ecosystem'],
                });
                setLoading(false);
            };

            if (dev) {
                fetchData(true);
            } else {
                fetchData(false);
            }

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

    const libraryModal = <LibraryModal
        open={open}
        setOpen={setOpen}
        visible={visible}
        setVisibility={setVisibility}
        loading={loading}
        setLoading={setLoading}
        setLibraryError={setLibraryError}
    />;

    return <>
        <EscListener execute={() => setVisibility(false)} />
        {createPortal(libraryModal, document.getElementById('gutenverse-root'))}
        {injectLocation && createPortal(libraryButton, injectLocation)}
        {libraryError !== false && createPortal(libraryError, document.getElementById('gutenverse-error'))}
    </>;
};

export default Library;