const PostBlockPagination = (props) => {
    const {
        paginationMode,
        paginationLoadmoreText,
        paginationPrevNextText,
        paginationPrevText,
        paginationNextText,
        paginationPrevIcon,
        paginationNextIcon,
        currentPage = 1,
        totalPages = 1,
        onPageChange
    } = props;

    if (!paginationMode || paginationMode === 'disable') {
        return null;
    }

    const renderLoadMore = () => {
        return (
            <div className="guten-block-pagination guten-align">
                <div className="guten-block-loadmore icon-position-before">
                    <span data-load="Load More" data-loading="Loading...">
                        {paginationLoadmoreText}
                    </span>
                </div>
            </div>
        );
    };

    const renderPrevNext = () => {
        return (
            <div className="guten_block_nav additional_class" data-page={currentPage}>
                <a
                    href="javascript:void(0);"
                    data-href="#"
                    className={`btn-pagination prev ${currentPage === 1 ? 'disabled' : ''}`}
                    title="Prev"
                >
                    <i className={paginationPrevIcon}></i>{' '}
                    {paginationPrevNextText ? paginationPrevText : ''}
                </a>
                <a
                    href="javascript:void(0);"
                    data-href="#"
                    className={`btn-pagination next ${currentPage >= totalPages ? 'disabled' : ''}`}
                    title="Next"
                >
                    {paginationPrevNextText ? paginationNextText : ''}{' '}
                    <i className={paginationNextIcon}></i>
                </a>
            </div>
        );
    };

    const renderNumber = () => {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        // Show first page
        if (startPage > 1) {
            pages.push(
                <a
                    key="page-1"
                    href="javascript:void(0);"
                    data-href="#"
                    className="btn-pagination"
                    data-page="1"
                >
                    1
                </a>
            );
            if (startPage > 2) {
                pages.push(<span key="dots-start">...</span>);
            }
        }

        // Show page numbers
        for (let i = startPage; i <= endPage; i++) {
            if (i === currentPage) {
                pages.push(
                    <span key={`page-${i}`} className="btn-pagination current">
                        {i}
                    </span>
                );
            } else {
                pages.push(
                    <a
                        key={`page-${i}`}
                        href="javascript:void(0);"
                        data-href="#"
                        className="btn-pagination"
                        data-page={i}
                    >
                        {i}
                    </a>
                );
            }
        }

        // Show last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="dots-end">...</span>);
            }
            pages.push(
                <a
                    key={`page-${totalPages}`}
                    href="javascript:void(0);"
                    data-href="#"
                    className="btn-pagination"
                    data-page={totalPages}
                >
                    {totalPages}
                </a>
            );
        }

        return (
            <div className="guten_block_nav" data-page={currentPage}>
                <a
                    href="javascript:void(0);"
                    data-href="#"
                    className={`btn-pagination prev ${currentPage === 1 ? 'disabled' : ''}`}
                    title="Prev"
                >
                    <i className={paginationPrevIcon}></i>{' '}
                    {paginationPrevNextText ? paginationPrevText : ''}
                </a>
                {pages}
                <a
                    href="javascript:void(0);"
                    data-href="#"
                    className={`btn-pagination next ${currentPage >= totalPages ? 'disabled' : ''}`}
                    title="Next"
                >
                    {paginationPrevNextText ? paginationNextText : ''}{' '}
                    <i className={paginationNextIcon}></i>
                </a>
            </div>
        );
    };

    switch (paginationMode) {
        case 'loadmore':
        case 'scrollload':
            return renderLoadMore();
        case 'prevnext':
        case 'normal-prevnext':
            return renderPrevNext();
        case 'number':
        case 'normal-number':
            return renderNumber();
        default:
            return null;
    }
};

export default PostBlockPagination;
