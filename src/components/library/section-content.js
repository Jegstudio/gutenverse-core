import { useEffect, useState, useRef } from '@wordpress/element';
import PluginInstallMode from './plugin-install-mode';
import { useSelect, dispatch, withSelect } from '@wordpress/data';
import { RenderCategories, SelectAuthor, SelectLicense, SelectStatus } from './layout-content';
import { filterCategories, filterSection, likeSection, getPluginRequirementStatus } from './library-helper';
import Paging from './paging';
import { __, _n, sprintf } from '@wordpress/i18n';
import Masonry from 'react-masonry-css';
import classnames from 'classnames';
import { IconHeartFullSVG, IconLoveSVG, IconEmptySVG, IconInfoYellowSVG } from 'gutenverse-core/icons';
import ImportSectionButton from './import-section-button';
import BannerPro from '../pro/banner-pro';
import { Loader } from 'react-feather';

const SectionContent = (props) => {
    const [currentItem, setCurrentItem] = useState(null);
    const [pluginInstallMode, setPluginInstallMode] = useState(false);

    return <>
        {pluginInstallMode && <PluginInstallMode
            name={currentItem.title}
            data={currentItem}
            setPluginInstallMode={setPluginInstallMode}
            backString={__('Back to sections', '--gctd--')}
        />}
        <div className="gutenverse-library-inner-body">
            <SectionContentWrapper
                {...props}
                closeImporter={props.closeImporter}
                setPluginInstallMode={setPluginInstallMode}
                setCurrentItem={setCurrentItem}
            />
        </div>
    </>;
};

const SectionContentWrapper = (props) => {
    const { modalData, closeImporter, setCurrentItem, setPluginInstallMode, dispatchData, libraryData: library, burger } = props;
    const { layoutContentData: data } = modalData;
    const [categories, setCategories] = useState({});
    const [license, setLicense] = useState(false);
    const [status, setStatus] = useState('');
    const [content, setContent] = useState({});
    const [scroller, setScroller] = useState(null);
    const [categoryCache, setCategoryCache] = useState('');
    const scrollerRef = useRef();
    const [authors, setAuthors] = useState([]);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        setScroller(scrollerRef);
    }, [scrollerRef]);
    
    useEffect(() => {
        if (data.paging === 1) {
            scrollerRef.current.scrollTop = 0;
        }

        const { sectionData } = library;
        const result = filterSection(sectionData, data, 20);
        const { data: newData, total, current } = result;

        setContent(prevState => {
            const { data: oldData } = prevState;
            const theData = data.paging === 1 ? newData : [
                ...oldData,
                ...newData
            ];

            return {
                data: theData,
                total,
                current
            };
        });
    }, [data, library]);

    useEffect(() => {
        const { sectionData, sectionCategories } = library;
        const categories = filterCategories(sectionData, sectionCategories, {
            license: license?.value,
            author: author?.value,
            status: status?.value,
        }, 'section');
        setCategories(categories);
    }, [license, author]);

    const categoryListClicked = (id, name) => {
        dispatch( 'gutenverse/library' ).setPaging(1);
        setCategoryCache(name);
    };

    const changePaging = (page) => {
        dispatch( 'gutenverse/library' ).setPaging(page);
    };
    const dev = '--dev_mode--' === 'true';

    return <>
        <div className={`gutenverse-library-sidebar ${!burger && 'hide-sidebar'}`}>
            <>
                <h2 className="gutenverse-library-side-heading" style={{ marginTop: 0 }}> {__('Licenses', '--gctd--')}</h2>
                <SelectLicense license={license} setLicense={setLicense} dispatchData={dispatchData} />
            </>
            {dev && <>
                <h2 className="gutenverse-library-side-heading">{__('Status', '--gctd--')}</h2>
                <SelectStatus status={status} setStatus={setStatus} />
            </>}
            {authors.length > 1 && <>
                <h2 className="gutenverse-library-side-heading">{__('Author', '--gctd--')}</h2>
                <SelectAuthor authors={authors} author={author} setAuthor={setAuthor} dispatchData={dispatchData} />
            </>}
            <h2 className="gutenverse-library-side-heading">
                {__('Style', '--gctd--')}
            </h2>
            <RenderCategories categories={categories} slug={'style'} categoryListClicked={categoryListClicked} data={data} type={'section'}/>
            <h2 className="gutenverse-library-side-heading">
                {__('Categories', '--gctd--')}
            </h2>
            <RenderCategories categories={categories} slug={'category'} categoryListClicked={categoryListClicked} data={data} type={'section'}/>
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
            <SectionContentData
                current={content.current}
                data={content.data}
                total={content.total}
                changePaging={changePaging}
                closeImporter={closeImporter}
                categoryCache={categoryCache}
                scroller={scroller}
                setCurrentItem={setCurrentItem}
                setPluginInstallMode={setPluginInstallMode}
            />
        </div>
    </>;
};

export const SectionContentData = props => {
    const { data, current, total, changePaging, closeImporter, categoryCache, scroller, setCurrentItem, setPluginInstallMode } = props;
    if (data !== undefined) {
        return data.length === 0 ? <div className="empty-content">
            <div className="empty-svg">
                <IconEmptySVG />
            </div>
            <h3>{__('Empty Result', '--gctd--')}</h3>
        </div> : <>
            <SectionItems categoryCache={categoryCache} data={data} closeImporter={closeImporter} setCurrentItem={setCurrentItem} setPluginInstallMode={setPluginInstallMode} />
            <Paging current={current} total={total} changePaging={changePaging} scroller={scroller} />
        </>;
    } else {
        return null;
    }
};

const SectionItems = props => {
    const { categoryCache, closeImporter } = props;
    let { data } = props;
    let breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };

    if ('Header' === categoryCache) {
        breakpointColumnsObj = {
            default: 2,
            1100: 2,
            700: 1,
            500: 1
        };
    }
    data = data.filter(el => el !== undefined);
    
    return <Masonry
        breakpointCols={breakpointColumnsObj}
        className="library-items-wrapper section"
        columnClassName="my-masonry-grid_column"
    >
        {data && data.map(item => <SectionContentItem
            key={item?.id}
            item={item}
            closeImporter={closeImporter}
            setCurrentItem={props.setCurrentItem}
            setPluginInstallMode={props.setPluginInstallMode}
        />)}
    </Masonry>;
};

const SectionContentItem = props => {

    const {
        getLibraryData,
        getPluginData
    } = useSelect(
        (select) => select('gutenverse/library'),
        []
    );
    const plugins =  getPluginData();
    const library =  getLibraryData();

    const { item, closeImporter, setCurrentItem, setPluginInstallMode } = props;
    const [image, setImage] = useState('');
    const { section: sectionId } = library;
    const [requirementStatus, setRequirementStatus] = useState(false);
    const { installedPlugin } = plugins;

    useEffect(() => {
        const { requirements, compatibleVersion } = item;
        const requirement = getPluginRequirementStatus({
            plugins: installedPlugin,
            requirements,
            compatibleVersion
        });
        setRequirementStatus(requirement);
    }, [item, installedPlugin]);

    const classname = classnames('library-item', {
        'importing': sectionId === item.id
    });

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImage(item.cover[0]);
        };
        img.src = item.cover[0];
    });

    const setToCurrentItem = () => {
        setCurrentItem(item);
        setPluginInstallMode(true);
    };

    return <div className={classname}>
        <div className="library-item-content">
            {sectionId === item.id && <div className="library-item-loader">
                <div className="rotating">
                    <Loader size={20} />
                </div>
            </div>}
            <div className="library-item-holder" style={{
                paddingBottom: `${item.cover[2] / item.cover[1] * 100}%`
            }}>
                <img src={image} />
                <div className="library-item-detail">
                    {requirementStatus?.length === 0 ? <div className="library-item-overlay">
                        <ImportSectionButton
                            data={item}
                            closeImporter={closeImporter}
                        />
                    </div> : <div className="library-item-overlay">
                        <div className="section-button import-section" onClick={() => setToCurrentItem()}>
                            <div className="section-button-inner">
                                <span>
                                    {__('Missing Requirement', '--gctd--')}
                                    <br />
                                    {__('Click for more detail', '--gctd--')}
                                </span>
                            </div>
                        </div>
                    </div>}
                    {item.pro && <div className="pro-flag">{__('PRO', '--gctd--')}</div>}
                </div>
            </div>
        </div>
        <div className="library-item-bottom">
            <div className="library-item-wrapper">
                <div className="library-item-left">
                    {item.author && <span className="by">{__('by', '--gctd--')} {item.author.name}</span>}
                </div>
                <div className="library-item-right">
                    {requirementStatus?.length > 0 && <div className="section-requirement">
                        <div className="section-requirement-detail">
                            <p>{sprintf(
                                _n('There is plugin need to be installed or updated for this section work correctly.', 'There are %s plugins need to be installed or updated for this section work correctly.', requirementStatus.length, '--gctd--'),
                                requirementStatus.length
                            )}</p>
                            <a href="#" onClick={(e) => {
                                setToCurrentItem();
                                e.preventDefault();
                            }}>{__('Manage Plugin Requirement →', '--gctd--')}</a>
                        </div>
                        <div className="section-requirement-icon" onClick={() => setToCurrentItem()}>
                            <IconInfoYellowSVG />
                        </div>
                    </div>}
                    {item.like ?
                        <div className="library-like active" onClick={() => likeSection(item.slug, false)}>
                            <IconHeartFullSVG size={14} />
                        </div> : <div className="library-like" onClick={() => likeSection(item.slug, true)}>
                            <IconLoveSVG size={16}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>;
};

export default withSelect(select => {
    const { getLibraryData, getModalData } = select('gutenverse/library');

    return {
        modalData: getModalData(),
        libraryData: getLibraryData()
    };
})(SectionContent);