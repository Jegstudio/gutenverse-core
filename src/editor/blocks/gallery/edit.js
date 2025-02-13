import { compose } from '@wordpress/compose';
import { useEffect, useRef, useState } from '@wordpress/element';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { createPortal } from 'react-dom';
import GalleryPopup from './components/gallery-popup';
import GalleryItem from './components/gallery-item';
import { u } from 'gutenverse-core/components';
import Shuffle from 'shufflejs';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const GalleryBlock = compose(
    withPartialRender,
    withAnimationAdvance('gallery'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
        images,
        showed,
        column,
        grid,
        height,
        layout,
        filter,
        filterType,
        filterAll,
        filterList,
        enableLoadMore,
        itemsPerLoad,
        enableLoadText,
        enableLoadIcon,
        enableLoadIconPosition,
        filterSearchIcon,
        filterSearchIconPosition,
        filterSearchFormText,
    } = attributes;
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [showPopup, setShowPop] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [currentFilter, setCurrentFilter] = useState('All');
    const [showedItems, setShowedItems] = useState(showed);
    const elementRef = useRef(null);
    const shuffleInstance = useRef(null);
    const observerRef = useRef(null);
    const sizerRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-gallery',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            [`layout-${layout}`],
            [`grid-desktop-${column && column['Desktop'] ? column['Desktop'] : 3}`],
            [`grid-tablet-${column && column['Tablet'] ? column['Tablet'] : 2}`],
            [`grid-mobile-${column && column['Mobile'] ? column['Mobile'] : 2}`],
        ),
        ref: elementRef
    });

    const onSearch = (value) => {
        const searchValue = value.toLowerCase();

        const isValid = (item) => {
            const element = u(item);
            const controlText = element.data('control');
            const titleText = element.find('.item-title').text();
            const contentText = element.find('.item-content').text();
            const categoryText = element.find('.caption-category span').text();
            const filterName = currentFilter === 'All' ? '' : currentFilter.toLowerCase();
            return (controlText.toLowerCase()).includes(filterName) && ((titleText.toLowerCase()).includes(searchValue) || (contentText.toLowerCase()).includes(searchValue) || (categoryText.toLowerCase()).includes(searchValue));
        };

        shuffleInstance.current && shuffleInstance.current.filter(item => isValid(item));
    };

    const onFilter = (value) => {
        const searchValue = value.toLowerCase();
        const isValidFilter = (item) => {
            const element = u(item);
            const controlText = element.data('control');
            return (controlText.toLowerCase()).includes(searchValue);
        };

        shuffleInstance.current && shuffleInstance.current.filter(item => isValidFilter(item));
    };

    const changeFilter = (filterName) => {
        setCurrentFilter(filterName);
        filterName === 'All' ? onFilter('') : onFilter(filterName);
    };

    // Initialize Shuffle.js
    const initializeShuffle = () => {
        shuffleInstance.current = new Shuffle(elementRef.current.querySelector('.gallery-items'), {
            itemSelector: `.${elementId} .gallery-item-wrap`,
            sizer: `.${elementId} .gallery-sizer-element`,
            speed: 500
        });
    };

    // Wait for images to load
    const waitForImages = (images) => Promise.all(
        images.map((img) =>
            img.complete
                ? Promise.resolve()
                : new Promise((resolve) => (img.onload = img.onerror = resolve))
        )
    );

    // Observe changes in image sizes
    const observeResizeGalleryItems = () => {
        if(elementRef.current){
            const items = Array.from(elementRef.current.querySelectorAll('.gallery-item-wrap'));
            if (observerRef.current) observerRef.current.disconnect();
            observerRef.current = new ResizeObserver(() => {
                initializeShuffle();
            });
            items.forEach((item) => {
                observerRef.current.observe(item);
            });
        }
    };

    useEffect(() => setShowedItems(showed), [showed]);

    useEffect(() => {
        if (elementRef.current) {
            // Ensure images are loaded first, then observe changes
            const images = Array.from(elementRef.current.querySelectorAll('img'));
            waitForImages(images).then(observeResizeGalleryItems);
        }
        return () => {
            shuffleInstance.current?.destroy();
            observerRef.current?.disconnect();
            shuffleInstance.current = null;
            observerRef.current = null;
        };
    }, [showed, showedItems, grid, height, column, layout]);

    return <>
        <BlockPanelController panelList={panelList} props={props} />
        {showPopup && createPortal(<GalleryPopup activeIndex={activeIndex} {...attributes} onClose={() => setShowPop(false)} />, gutenverseRoot)}
        <div  {...blockProps} data-grid={grid}>
            {filter && (
                filterType === 'tab' ? <div className="filter-controls">
                    <ul>
                        <li className={`guten-gallery-control ${'All' === currentFilter ? 'active' : ''}`} onClick={() => changeFilter('All')}>{filterAll}</li>
                        {filterList && filterList.map((filterItem, index) => {
                            return filterItem.name && <li key={index} className={`guten-gallery-control ${filterItem.name === currentFilter ? 'active' : ''}`} data-filter={filterItem.name} onClick={() => changeFilter(filterItem.name)}>{filterItem.name}</li>;
                        })}
                    </ul>
                </div> : <div className="search-filters-wrap">
                    <div className="filter-wrap">
                        <button id="search-filter-trigger" className={`search-filter-trigger icon-position-${filterSearchIconPosition}`} onClick={() => setShowFilter(!showFilter)}>
                            {filterSearchIconPosition === 'before' && <i aria-hidden="true" className={filterSearchIcon}></i>}
                            <span>{currentFilter}</span>
                            {filterSearchIconPosition === 'after' && <i aria-hidden="true" className={filterSearchIcon}></i>}
                        </button>
                        <ul className={`search-filter-controls ${showFilter ? 'open-controls' : ''}`}>
                            <li className={`guten-gallery-control ${'All' === currentFilter ? 'active' : ''}`} onClick={() => changeFilter('All')}>{filterAll}</li>
                            {filterList && filterList.map((filterItem, index) => {
                                return filterItem.name && <li key={index} className={`guten-gallery-control ${filterItem.name === currentFilter ? 'active' : ''}`} data-filter={filterItem.name} onClick={() => changeFilter(filterItem.name)}>{filterItem.name}</li>;
                            })}
                        </ul>
                    </div>
                    <form className="guten-gallery-search-box" id="guten-gallery-search-box" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                        <input type="text" id="guten-gallery-search-box-input" name="guten-frontend-search" placeholder={filterSearchFormText} onChange={(e) => onSearch(e.target.value)} />
                    </form>
                </div>
            )}
            <div className="gallery-items">
                {images.map((item, index) => {
                    const onZoom = () => {
                        setShowPop(true);
                        setActiveIndex(index);
                    };

                    return <div key={index} className={`gallery-item-wrap ${index >= showedItems ? 'item-hidden' : ''}`} data-control={item.id}>
                        <GalleryItem galleryItem={item} onZoom={onZoom} {...attributes} />
                    </div>;
                })}
            </div>
            <div className="gallery-sizer-element" ref={sizerRef}></div>
            {enableLoadMore && (showedItems < images.length) && <div className="load-more-items">
                <div className="guten-gallery-loadmore">
                    <a href="#" className="guten-gallery-load-more" onClick={(e) => {
                        e.preventDefault();
                        setShowedItems(parseInt(showedItems) + parseInt(itemsPerLoad));
                    }}>
                        {enableLoadIcon && enableLoadIconPosition === 'before' && <span className="load-more-icon icon-position-before" aria-hidden="true">
                            <i className={enableLoadIcon}></i>
                        </span>}
                        <span className="load-more-text">{enableLoadText}</span>
                        {enableLoadIcon && enableLoadIconPosition === 'after' && <span className="load-more-icon icon-position-after" aria-hidden="true">
                            <i className={enableLoadIcon}></i>
                        </span>}
                    </a>
                </div>
            </div>}
        </div>
    </>;
});

export default GalleryBlock;