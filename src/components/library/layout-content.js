import { useEffect, useState, useRef, useLayoutEffect } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';
import SingleLayoutContent from './single-layout-content';
import PluginInstallMode from './plugin-install-mode';
import { withSelect, dispatch } from '@wordpress/data';
import { filterLayout, getDistincAuthor, mapId, filterCategories, likeLayout } from './library-helper';
import SearchBar from './search-bar';
import Select from 'react-select';
import { Loader } from 'react-feather';
import { customStyles } from './style';
import { IconHeartFullSVG, IconLoveSVG, IconEmptySVG } from 'gutenverse-core/icons';
import Paging from './paging';
import BannerPro from '../pro/banner-pro';
import isEmpty from 'lodash/isEmpty';


const LayoutContent = (props) => {
    const [slug, setSlug] = useState(null);
    const [singleId, setSingleId] = useState(null);
    const [content, setContent] = useState([]);
    const [pluginInstallMode, setPluginInstallMode] = useState(false);
    const [singleData, setSingleData] = useState(null);
    
    return <>
        {pluginInstallMode && <PluginInstallMode
            name={singleData.title}
            data={singleData}
            setPluginInstallMode={setPluginInstallMode}
            backString={sprintf(__('Back to %s', '--gctd--'), singleData.title)}
        />}
        {singleId !== null && <SingleLayoutContent
            id={singleId}
            slug={slug}
            setSingleId={setSingleId}
            setSlug={setSlug}
            backText={__('Back to Layouts', '--gctd--')}
            closeImporter={props.closeImporter}
            setSingleData={setSingleData}
            singleData={singleData}
            pluginInstallMode={pluginInstallMode}
            setPluginInstallMode={setPluginInstallMode}
        />}
        <div className="gutenverse-library-inner-body">
            <LayoutContentList {...props}
                content={content}
                setContent={setContent}
                setSlug={setSlug}
                setSingleId={setSingleId}
                burger={props.burger}
            />
        </div>
    </>;
};

const LayoutContentList = ({ libraryData, modalData, content, setContent, setSingleId, setSlug, burger }) => {
    const data = modalData.layoutContentData;
    const [categories, setCategories] = useState([]);
    const [license, setLicense] = useState('');
    const [scroller, setScroller] = useState(null);
    const scrollerRef = useRef();
    const { keyword } = data;
    const [authors, setAuthors] = useState([]);
    const [author, setAuthor] = useState(null);

    useLayoutEffect(() => {
        data.categories = [];
    },[]);
    
    useEffect(() => {
        setScroller(scrollerRef);
    }, [scrollerRef]);

    useEffect(() => {
        const { layoutData } = libraryData;
        const result = filterLayout(layoutData, data, 12);
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
    }, [data]);

    useEffect(() => {
        const { layoutData } = libraryData;
        const authors = getDistincAuthor(layoutData);
        const { data: newData } = filterLayout(layoutData, data);
        const result = mapId(newData);

        setContent(prevState => {
            const { data: oldData, total, current } = prevState;

            const theData = oldData.map(item => {
                return result[item.id];
            });

            return {
                data: theData,
                total,
                current
            };
        });

        setAuthors(authors);
    }, [libraryData]);

    useEffect(() => {
        const { layoutData, layoutCategories } = libraryData;
        const categories = filterCategories(layoutData, layoutCategories, {
            license: license?.value,
            author: author?.value,
            keyword,
        }, 'layout');
        setCategories(categories);
    }, [license, keyword, author]);

    return <>
        <div className={`gutenverse-library-sidebar ${!burger && 'hide-sidebar'}`}  >
            <SearchBar
                placeholder={__('Search Layout', '--gctd--')}
                onChange={keyword => {
                    dispatch( 'gutenverse/library' ).setKeyword(keyword);
                }}
            />
            {<>
                <h2 className="gutenverse-library-side-heading">{__('Licenses', '--gctd--')}</h2>
                <SelectLicense license={license} setLicense={setLicense} />
            </>}
            {authors.length > 1 && <>
                <h2 className="gutenverse-library-side-heading">{__('Author', '--gctd--')}</h2>
                <SelectAuthor authors={authors} author={author} setAuthor={setAuthor} />
            </>}
            <h2 className="gutenverse-library-side-heading">
                {__('Categories', '--gctd--')}
            </h2>
            <RenderCategories categories={categories} slug={'category'} data={data} type={'layout'} />
            <h2 className="gutenverse-library-side-heading">
                {__('Style', '--gctd--')}
            </h2>
            <RenderCategories categories={categories} slug={'style'} data={data} type={'layout'}/>
            <h2 className="gutenverse-library-side-heading">
                {__('Color', '--gctd--')}
            </h2>
            <RenderCategories categories={categories} slug={'color'} data={data} type={'layout'} />
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
            <LayoutContentData
                current={content.current}
                data={content.data}
                total={content.total}
                setSingleId={setSingleId}
                setSlug={setSlug}
                scroller={scroller}
            />
        </div>
    </>;
};

export const SelectLicense = ({ license, setLicense }) => {
    return <div className="gutenverse-library-select">
        <Select
            styles={customStyles}
            isMulti={false}
            value={license}
            onChange={license => {
                setLicense(license);
                dispatch( 'gutenverse/library' ).setLicense(license.value);
            }}
            options={[
                { value: '', label: __('All', '--gctd--') },
                { value: 'pro', label: __('Pro', '--gctd--') },
                { value: 'free', label: __('Free', '--gctd--') },
            ]}
        />
    </div>;
};

export const SelectAuthor = ({ authors, author, setAuthor }) => {
    return <div className="gutenverse-library-select">
        <Select
            styles={customStyles}
            isMulti={false}
            value={author}
            onChange={data => {
                setAuthor(data);
                dispatch( 'gutenverse/library' ).setAuthor(data.value);
            }}
            options={[
                { value: '', label: __('All', '--gctd--') },
                ...authors.map(author => ({
                    value: author,
                    label: author
                }))
            ]}
        />
    </div>;
};

export const RenderCategories = ({ categories, data, showCount = true, categoryListClicked = false, slug, type }) => {
    if( !isEmpty(categories) ){
        const categoriesIndex = categories.findIndex(el => el.slug === slug );
        const childCategories = categories[categoriesIndex]?.childs;
        return categoriesIndex >= 0 && <ul className="gutenverse-sidebar-list">
            {Object.keys(childCategories).map(id => {
                const category = childCategories[id];
                return <li
                    className={data.categories.includes(category.id) ? 'active' : ''}
                    key={category.id}
                    onClick={() => {
                        dispatch( 'gutenverse/library' ).setCategories(category.id, category.name);
                        // categoryListClicked && categoryListClicked(category.id, category.name);
                    }}
                >
                    <i className="checkblock" />
                    <span dangerouslySetInnerHTML={{ __html: theTitle(category, showCount) }} />
                </li>;
            })}
        </ul>;
    }
};

const theTitle = (category, showCount) => {
    if (showCount) {
        return `${category.name} (${category.count})`;
    } else {
        return `${category.name}`;
    }
};

export const LayoutContentData = ({ data, current, total, setSingleId, setSlug, scroller }) => {
    //changePaging is sipatch page
    if (data !== undefined) {
        return data.length === 0 ? <div className="empty-content">
            <div className="empty-svg">
                <IconEmptySVG />
            </div>
            <h3>{__('Empty Result', '--gctd--')}</h3>
        </div> : <>
            <LayoutItems data={data} setSingleId={setSingleId} setSlug={setSlug} scroller={scroller} />
            <Paging current={current} total={total} scroller={scroller} />
        </>;
    } else {
        return null;
    }
};

const LayoutItems = ({ data, setSingleId, setSlug }) => {
    const showSingleLayout = (id, slug) => {
        setSingleId(id);
        setSlug(slug);
    };

    return <div className="library-items-wrapper layout">
        {data.map(item => {
            return <LayoutSingleItem
                key={item.id}
                item={item}
                showSingleLayout={showSingleLayout}
            />;
        })}
    </div>;
};

const LayoutSingleItem = ({ item, showSingleLayout }) => {
    return <div className="library-item" key={item.id}>
        <div className="library-item-loader">
            <div className="rotating">
                <Loader size={20} />
            </div>
        </div>
        <div className="library-item-holder" style={{
            paddingBottom: `${item.cover[2] / item.cover[1] * 100}%`
        }} onClick={() => showSingleLayout(item.id, item.slug)}>
            <img src={item.cover[0]} />
        </div>
        <div className="library-item-detail">
            <div className="library-item-wrapper">
                <h2 onClick={() => showSingleLayout(item.id)}>
                    {item.pro && <div className="pro-flag" onClick={() => showSingleLayout(item.id)}>{__('PRO', '--gctd--')}</div>}
                    {item.title}
                </h2>
                {item.author && <span className="by">{__('by', '--gctd--')} {item.author.name}</span>}
            </div>
            {item.like ?
                <div className="library-like active" onClick={() => likeLayout(item.slug, false)}>
                    <IconHeartFullSVG size={14}/>
                </div> : <div className="library-like" onClick={() => likeLayout(item.slug, true)}>
                    <IconLoveSVG size={16}/>
                </div>
            }
        </div>
    </div>;
};


export default withSelect(select => {
    const { getLibraryData, getModalData } = select('gutenverse/library');
    return {
        modalData: getModalData(),
        libraryData: getLibraryData()
    };
})(LayoutContent);