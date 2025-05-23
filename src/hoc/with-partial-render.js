import { select } from '@wordpress/data';
import { useRef, useState, useEffect } from '@wordpress/element';
import { isOnEditor } from 'gutenverse-core/helper';

const BlockLoading = ({
    renderRef
}) => {
    const blockHeight = window['GutenverseConfig']?.settingsData?.editor_settings?.editor_lazy_load_block_height ? window['GutenverseConfig']?.settingsData?.editor_settings?.editor_lazy_load_block_height + 'px' : '150px';

    return <div className="gutenverse-block-loading" ref={renderRef} style={{ height: blockHeight }}></div>;
};

const checkIfAlwaysRendered = (clientId) => {
    let renderBlock = false;
    const { getBlockParents, getBlock } = select('core/block-editor');
    const parents = getBlockParents(clientId);
    const exceptionList = [
        'gutenverse/popup-builder',
        'gutenverse/popup-container'
    ];

    if(getBlock(clientId) === null || !getBlock(clientId)) renderBlock = true;

    parents.map(id => {
        const block = getBlock(id);

        if (exceptionList?.includes(block?.name)) {
            renderBlock = true;
        }
    });

    return renderBlock;
};

export const withPartialRender = (BlockElement) => {
    return (props) => {
        const disableLazyLoad = window['GutenverseConfig']?.settingsData?.editor_settings?.editor_lazy_load === false;
        const threshold = !isNaN(window['GutenverseConfig']?.settingsData?.editor_settings?.editor_lazy_load_block_threshold) ? window['GutenverseConfig']?.settingsData?.editor_settings?.editor_lazy_load_block_threshold / 100 : 0;
        const extendViewport = !isNaN(window['GutenverseConfig']?.settingsData?.editor_settings?.editor_lazy_load_extend_viewport) ? window['GutenverseConfig']?.settingsData?.editor_settings?.editor_lazy_load_extend_viewport * 1 : 250;
        const [partialRender, setPartialRender] = useState(false);
        const { clientId } = props;
        const renderRef = useRef();

        useEffect(() => {
            if (!window.IntersectionObserver || !renderRef?.current) {
                return;
            }

            const isAlwaysRendered = checkIfAlwaysRendered(clientId);
            const blockElement = renderRef.current;
            const postEditor = blockElement?.ownerDocument?.getElementsByClassName('interface-interface-skeleton__content');
            const windowEl = postEditor?.length > 0 ? postEditor[0] : blockElement?.ownerDocument;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting || isAlwaysRendered) {
                            setPartialRender(true);
                            observer.unobserve(blockElement);
                        }
                    });
                },
                {
                    root: windowEl,
                    rootMargin: isOnEditor() ? `${extendViewport}% 0px` : '0px',
                    threshold: `${threshold}`,
                }
            );

            observer.observe(blockElement);

            return () => {
                observer.disconnect();
            };
        }, [renderRef]);

        return disableLazyLoad || partialRender ? <BlockElement {...props} /> : <BlockLoading renderRef={renderRef} />;
    };
};