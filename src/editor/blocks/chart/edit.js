import anime from 'animejs';
import { __ } from '@wordpress/i18n';
import { Chart } from 'chart.js/auto';
import { createPortal } from 'react-dom';
import { compose } from '@wordpress/compose';
import { panelList } from './panels/panel-list';
import { applyFilters } from '@wordpress/hooks';
import { getChartData } from './data/chartData';
import getBlockStyle from './styles/block-style';
import { getColor } from 'gutenverse-core/styling';
import { displayShortcut } from '@wordpress/keycodes';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { LogoCircleColor24SVG } from 'gutenverse-core/icons';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { RichTextComponent, classnames } from 'gutenverse-core/components';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { IconLibrary, BlockPanelController } from 'gutenverse-core/controls';
import { useEffect, useState, useRef, useCallback } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { HighLightToolbar, URLToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import { withPassRef, withMouseMoveEffect, withPartialRender, withCopyElementToolbar } from 'gutenverse-core/hoc';

//commented code is for integrating with dynamic and text highlight
const NEW_TAB_REL = 'noreferrer noopener';

export const flipClasses = (contentType) => {
    const flipClass = [];

    if (contentType) {
        const { Desktop, Tablet, Mobile } = contentType;

        const isDesktopFlip = Desktop === 'flipCard';
        const isTabletFlip = Tablet === 'flipCard' || (Tablet === undefined && Desktop === 'flipCard');
        const isMobileFlip = Mobile === 'flipCard' || (Mobile === undefined && isTabletFlip);

        isDesktopFlip ? flipClass.push('Desktop-flipCard') : (isTabletFlip || isMobileFlip) && flipClass.push('Desktop-noFlip');
        isTabletFlip ? flipClass.push('Tablet-flipCard') : (isDesktopFlip || isMobileFlip) && flipClass.push('Tablet-noFlip');
        isMobileFlip ? flipClass.push('Mobile-flipCard') : (isDesktopFlip || isTabletFlip) && flipClass.push('Mobile-noFlip');
    }

    return flipClass;
}

const ChartBlock = compose(
    withPartialRender,
    withPassRef,
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        clientId,
        attributes,
        isSelected,
        setBlockRef,
        setPanelState,
        setAttributes,
        panelIsClicked,
        setPanelIsClicked
    } = props;

    const {
        elementId,
        titleTag = 'h2',
        icon,
        url,
        rel,
        linkTarget,
        enableContent,
        chartContent,
        tooltipDisplay,
        legendDisplay,
        chartItems,
        chartType,
        totalValue,
        animationDuration,
        contentType,
        minValue,
        cutout,
        barThickness,
        cutoutBackground,
        enableContentParsed
    } = attributes;

    const [openIconLibrary, setOpenIconLibrary] = useState(false);
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const multiValue = chartItems.length > 1;
    const deviceType = getDeviceType();
    const elementRef = useRef();
    const numberRef = useRef();
    const chartRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();
    // const panelState = {
    //     panel: 'setting',
    //     section: 2,
    // };

    const blockProps = useBlockProps({
        ref: elementRef,
        className: classnames(
            'guten-element',
            'guten-chart',
            elementId,
            animationClass,
            displayClass,
            flipClasses(contentType)
        ),
    });

    // const onToggleOpenInNewTab = useCallback(
    //     (value) => {
    //         const newLinkTarget = value ? '_blank' : undefined;

    //         let updatedRel = rel;
    //         if (newLinkTarget && !rel) {
    //             updatedRel = NEW_TAB_REL;
    //         } else if (!newLinkTarget && rel === NEW_TAB_REL) {
    //             updatedRel = undefined;
    //         }

    //         setAttributes({
    //             linkTarget: newLinkTarget,
    //             rel: updatedRel,
    //         });
    //     },
    //     [rel, setAttributes]
    // );

    useEffect(() => {
        if (elementRef.current) {
            setBlockRef(elementRef.current);
        }
    }, [elementRef]);

    useEffect(() => {
        if (enableContent[deviceType] === true) {
            setAttributes({enableContentParsed : {
                ...enableContentParsed,
                [deviceType] : 'true'
            }});
        } else {
            setAttributes({enableContentParsed : {
                ...enableContentParsed,
                [deviceType] : 'false'
            }});
        }
    }, [enableContent]);

    useEffect(() => {
        //return jika ada double elementId
        const checkElement = document.querySelectorAll(`.${elementId}`);
        if (checkElement.length > 1) return;

        const iframe = document.querySelector('iframe[name="editor-canvas"]');
        let iframecanvas;
        if (iframe) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframecanvas = iframeDoc.getElementById(`chart-canvas-${elementId}`);
        }

        const canvas = document.getElementById(`chart-canvas-${elementId}`) || iframecanvas;
        if (!canvas) return;

        const customPositioner = (elements, eventPosition) => ({
            x: eventPosition.x,
            y: eventPosition.y,
        });

        const tooltipPlugin = Chart.registry.getPlugin('tooltip');
        if (tooltipPlugin) {
            tooltipPlugin.positioners.custom = customPositioner;
        }

        const data = getChartData(attributes, multiValue, canvas);

        const generateChart = new Chart(canvas, data);
        chartRef.current = generateChart;

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, [
        cutout,
        minValue,
        chartType,
        elementId,
        chartItems,
        totalValue,
        chartContent,
        barThickness,
        legendDisplay,
        tooltipDisplay,
        cutoutBackground,
        animationDuration,
    ]);

    useEffect(() => {
        if (!numberRef.current || (chartContent !== 'percentage' && 'number' !== chartContent)) return;

        const animation = anime({
            targets: numberRef.current,
            innerHTML: multiValue || 'number' === chartContent ? [0, totalValue] : [0, chartItems[0].value],
            duration: animationDuration,
            easing: 'cubicBezier(.02, .01, .47, 1)',
            round: 1,
        });

        return () => animation.pause();
    }, [chartItems, animationDuration, chartContent, totalValue, chartType]);

    // FilterDynamic(props);
    // HighLightToolbar(props);

    const insideChart = <div className={`chart-inside type-${chartType}`}>
        {
            'percentage' === chartContent || 'number' === chartContent ?
                <span ref={numberRef} >{multiValue || 'number' === chartContent ? '0' : '0%'}</span>
                : <i className={icon} onClick={() => setOpenIconLibrary(true)} />
        }
    </div>;

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef}/>
        <BlockControls>
            <ToolbarGroup>
                {'icon' === chartContent && <ToolbarButton
                    name="icon"
                    icon={<LogoCircleColor24SVG />}
                    title={__('Choose Icon', 'gutenverse')}
                    shortcut={displayShortcut.primary('i')}
                    onClick={() => setOpenIconLibrary(true)}
                />}
            </ToolbarGroup>
        </BlockControls>
        {openIconLibrary && createPortal(
            <IconLibrary
                closeLibrary={() => setOpenIconLibrary(false)}
                value={icon}
                onChange={icon => setAttributes({ icon })}
            />,
            gutenverseRoot
        )}
        <div {...blockProps} >
            <div className="guten-chart-wrapper">
                {enableContent[deviceType] && <div className="chart-content content-card">
                    <RichTextComponent
                        ref={titleRef}
                        classNames={'chart-title'}
                        tagName={titleTag}
                        aria-label={__('Chart Title', 'gutenverse')}
                        placeholder={__('Write title...', 'gutenverse')}
                        onChange={value => setAttributes({ title: value })}
                        multiline={false}
                        setAttributes={setAttributes}
                        attributes={attributes}
                        clientId={clientId}
                        contentAttribute={'title'}
                        // panelDynamic={{ panel: 'setting', section: 3 }}
                        // panelPosition={{ panel: 'style', section: 1 }}
                        // setPanelState={setPanelState}
                        // textChilds={'titleChilds'}
                        // dynamicList={'titleDynamicList'}
                        // isUseDinamic={true}
                        // isUseHighlight={true}
                        // parentHasLink={isGlobalLinkSet}
                    />
                    {'doughnut' !== chartType && 'none' !== chartContent ? insideChart : ''}
                    <RichTextComponent
                        ref={descRef}
                        classNames={'chart-description'}
                        tagName={'p'}
                        aria-label={__('Chart Description', 'gutenverse')}
                        placeholder={__('Write description...', 'gutenverse')}
                        onChange={value => setAttributes({ description: value })}
                        multiline={false}
                        setAttributes={setAttributes}
                        attributes={attributes}
                        clientId={clientId}
                        contentAttribute={'description'}
                        // panelDynamic={{ panel: 'setting', section: 3 }}
                        // panelPosition={{ panel: 'style', section: 1 }}
                        // setPanelState={setPanelState}
                        // textChilds={'descriptionChilds'}
                        // dynamicList={'descriptionDynamicList'}
                        // isUseDinamic={true}
                        // isUseHighlight={true}
                        // parentHasLink={isGlobalLinkSet}
                    />
                </div>}
                <div className="chart-content content-chart">
                    <div className="chart-container">
                        <canvas id={`chart-canvas-${elementId}`} width="500" height="500" style={{boxSizing:'border-box', height: '250px', width: '250px'}}></canvas>
                    </div>
                    {chartContent !== 'none' && 'doughnut' === chartType ? insideChart : ''}
                </div>
            </div>
        </div>
    </>;
});

export default ChartBlock;