
import { sprintf, __ } from '@wordpress/i18n';
import { withSelect, dispatch } from '@wordpress/data';
import { useEffect, useState, useRef, useLayoutEffect } from '@wordpress/element';
import { filterCategories, filterSection, getDistincAuthor, filterLayout } from './library-helper';
import { IconBlocksSVG, IconLayoutsSVG } from 'gutenverse-core/icons';
import { LayoutContentData, RenderCategories, SelectAuthor, SelectLicense, SelectStatus } from './layout-content';
import { SectionContentData } from './section-content';
import SingleLayoutContent from './single-layout-content';
import PluginInstallMode from './plugin-install-mode';
import { saveLayoutLikeState } from 'gutenverse-core/requests';
import BannerPro from '../pro/banner-pro';

const FavoriteContent = props => {
    const { modalData, library, burger } = props;
    const { layoutContentData } = modalData;
    const [content, setContent] = useState({});
    const [singleId, setSingleId] = useState(null);
    const [license, setLicense] = useState(false);
    const [layoutCategories, setLayoutCategories] = useState([]);
    const [sectionCategories, setSectionCategories] = useState([]);
    const [status, setStatus] = useState('');
    const [slug, setSlug] = useState(null);
    const scrollerRef = useRef();
    const [currentItem, setCurrentItem] = useState(null);
    const [pluginInstallMode, setPluginInstallMode] = useState(false);
    const [authors, setAuthors] = useState([]);
    const [author, setAuthor] = useState(null);

    useLayoutEffect(() => {
        layoutContentData.categories = [];
    },[]);
    
    useEffect(() => {
        dispatch('gutenverse/library').setCategories([]);
        dispatch('gutenverse/library').setAuthor('');
        dispatch('gutenverse/library').setLicense('');
        dispatch( 'gutenverse/library' ).setStatus('');
        dispatch('gutenverse/library').setPaging(1);
    }, []);

    const refreshContent = items => {
        const { data: newData, total, current } = items;

        setContent({
            data: newData,
            total,
            current
        });
    };

    const setLibrary = (library) => {
        dispatch('gutenverse/library').setLibrary(library);
    };

    const setLicenseData = (licenseData) => {
        setLicense(licenseData);
        dispatch('gutenverse/library').setLicense(licenseData.value);
    };

    const updateCategoryList = () => {
        const { layoutData, layoutCategories } = library;
        let categories = filterCategories(layoutData, layoutCategories, {
            license: license.value,
            like: true,
            status: status?.value,
        }, 'layout');
        setLayoutCategories(categories);
        const { sectionData, sectionCategories } = library;
        categories = filterCategories(sectionData, sectionCategories, {
            license: license.value,
            like: true,
            status: status?.value,
        }, 'section');
        setSectionCategories(categories);
    };

    // const categoryListClicked = (id) => {
    //     dispatch('gutenverse/library').setCategories(id);
    // };

    useEffect(() => {
        if (license !== false) {
            setLicenseData({ value: '', label: __('All', '--gctd--') });
        }
    }, [layoutContentData.library]);

    useEffect(() => {
        updateCategoryList();
    }, [license, library]);

    useEffect(() => {
        scrollerRef.current.scrollTop = 0;
    }, [layoutContentData]);

    useEffect(() => {
        const { layoutData, sectionData } = library;

        if ('layout' === layoutContentData.library) {
            const result = filterLayout(layoutData, {
                ...layoutContentData,
                like: true
            });
            refreshContent(result);

            const authors = getDistincAuthor(layoutData);
            setAuthors(authors);
        } else {
            const result = filterSection(sectionData, {
                ...layoutContentData,
                like: true
            });
            refreshContent(result);

            const authors = getDistincAuthor(sectionData);
            setAuthors(authors);
        }
    }, [layoutContentData, library]);

    const changeContentLike = (id, flag) => {
        const data = content.data.map(item => {
            if (item.id === id) {
                item.like = flag;
            }
            return item;
        });

        setContent({
            ...content,
            data
        });

        saveLayoutLikeState({
            id,
            state: flag
        });
    };
    const dev = '--dev_mode--' === 'true';

    return <>
        {pluginInstallMode && <PluginInstallMode
            name={currentItem.title}
            data={currentItem}
            setPluginInstallMode={setPluginInstallMode}
            backString={'layout' === layoutContentData.library ? sprintf(__('Back to %s', '--gctd--'), currentItem.title) : __('Back to sections', '--gctd--')}
        />}
        {singleId !== null && 'layout' === layoutContentData.library && <SingleLayoutContent
            id={singleId}
            slug={slug}
            setSingleId={setSingleId}
            backText={__('Back to Favorite Layout', '--gctd--')}
            closeImporter={props.closeImporter}
            changeContentLike={changeContentLike}
            setSingleData={setCurrentItem}
            singleData={currentItem}
            pluginInstallMode={pluginInstallMode}
            setPluginInstallMode={setPluginInstallMode}
        />}
        <div className="gutenverse-library-inner-body">
            <div className={`gutenverse-library-sidebar ${!burger && 'hide-sidebar'}`}>
                <h2 className="gutenverse-library-side-heading" style={{ marginTop: 0 }}>
                    {__('Library', '--gctd--')}
                </h2>
                <ul className="gutenverse-sidebar-list">
                    <li className={layoutContentData.library === 'layout' ? 'active' : ''} onClick={() => {
                        setLibrary('layout');
                        dispatch( 'gutenverse/library' ).setCategories([]);
                    }}>
                        <IconLayoutsSVG /><span>{__('Layout', '--gctd--')}</span>
                    </li>
                    <li className={layoutContentData.library === 'section' ? 'active' : ''} onClick={() => {
                        setLibrary('section');
                        dispatch( 'gutenverse/library' ).setCategories([]);
                    }}>
                        <IconBlocksSVG /><span>{__('Section', '--gctd--')}</span>
                    </li>
                </ul>
                <>
                    <h2 className="gutenverse-library-side-heading">{__('Licenses', '--gctd--')}</h2>
                    <SelectLicense license={license} setLicense={setLicense} />
                </>
                {dev && <>
                    <h2 className="gutenverse-library-side-heading">{__('Status', '--gctd--')}</h2>
                    <SelectStatus status={status} setStatus={setStatus} />
                </>}
                {authors.length > 1 && <>
                    <h2 className="gutenverse-library-side-heading">{__('Author', '--gctd--')}</h2>
                    <SelectAuthor authors={authors} author={author} setAuthor={setAuthor} />
                </>}
                {
                    'layout' === layoutContentData.library ? <>
                        <h2 className="gutenverse-library-side-heading">
                            {__('Categories', '--gctd--')}
                        </h2>
                        <RenderCategories categories={layoutCategories} slug={'category'} data={layoutContentData} type={'layout'} />
                        <h2 className="gutenverse-library-side-heading">
                            {__('Style', '--gctd--')}
                        </h2>
                        <RenderCategories categories={layoutCategories} slug={'style'} data={layoutContentData} type={'layout'}/>
                        <h2 className="gutenverse-library-side-heading">
                            {__('Color', '--gctd--')}
                        </h2>
                        <RenderCategories categories={layoutCategories} slug={'color'} data={layoutContentData} type={'layout'}/>
                    </> : <>
                        <h2 className="gutenverse-library-side-heading">
                            {__('Style', '--gctd--')}
                        </h2>
                        <RenderCategories categories={sectionCategories} slug={'style'} data={layoutContentData} type={'section'} />
                        <h2 className="gutenverse-library-side-heading">
                            {__('Categories', '--gctd--')}
                        </h2>
                        <RenderCategories categories={sectionCategories} slug={'category'} data={layoutContentData} type={'section'} />
                    </>
                }
            </div>
            <div className="gutenverse-library-inner" ref={scrollerRef}>
                <BannerPro
                    subtitle={__('Welcome to Gutenverse Library', '--gctd--')}
                    title={<>{__('Discover ', '--gctd--')}<span>{__(' Premium Themes ', '--gctd--')}</span><br/>{__(' and Sections You Never Meet Before!', '--gctd--')}</>}
                    customStyles={{ paddingTop: '30px' }}
                    container = "library"
                    leftBannerImg = "library-graphic-library-left.png"
                    rightBannerImg = "library-graphic-library-right.png"
                    backgroundGradient = "library-bg-library.png"/>
                <>
                    {'layout' === layoutContentData.library && <LayoutContentData
                        current={content.current}
                        data={content.data}
                        total={content.total}
                        changePaging={null}
                        setSingleId={setSingleId}
                        setSlug={setSlug}
                        changeContentLike={changeContentLike}
                    />}
                    {'section' === layoutContentData.library && <SectionContentData
                        current={content.current}
                        data={content.data}
                        total={content.total}
                        changePaging={null}
                        closeImporter={props.closeImporter}
                        setPluginInstallMode={setPluginInstallMode}
                        setCurrentItem={setCurrentItem}
                    />}
                </>
            </div>
        </div>
    </>;
};

export default withSelect(select => {
    const { getModalData, getLibraryData } = select('gutenverse/library');

    return {
        modalData: getModalData(),
        library: getLibraryData()
    };
})(FavoriteContent);