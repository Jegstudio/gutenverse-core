import anime from 'animejs';
import { __ } from '@wordpress/i18n';
import { createPortal } from 'react-dom';
import { compose } from '@wordpress/compose';
import { panelList } from './panels/panel-list';
import { applyFilters } from '@wordpress/hooks';
import { displayShortcut } from '@wordpress/keycodes';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { LogoCircleColor24SVG } from 'gutenverse-core/icons';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { IconLibrary, PanelController } from 'gutenverse-core/controls';
import { RichTextComponent, classnames } from 'gutenverse-core/components';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useEffect, useState, useRef, useCallback } from '@wordpress/element';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { HighLightToolbar, URLToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import { withCustomStyle, withMouseMoveEffect, withPartialRender, withCopyElementToolbar } from 'gutenverse-core/hoc';
import { getColor } from 'gutenverse-core/styling';

const NEW_TAB_REL = 'noreferrer noopener';

const ChartBlock = compose(
    withPartialRender,
    withCustomStyle(panelList),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        clientId,
        attributes,
        deviceType,
        isSelected,
        setPanelState,
        setElementRef,
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
        enableContent = true,
        chartContent = 'icon',
        tooltipDisplay,
        legendDisplay,
        chartItems,
        chartType,
        totalValue
    } = attributes;

    const [openIconLibrary, setOpenIconLibrary] = useState(false);
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const numberRef = useRef();
    const chartRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();

    let multiValue = false;
    let values = [];
    let labels = [];
    let backgroundColor = [];

    const size = '90%';
    const duration = 3600;

    const panelState = {
        panel: 'setting',
        section: 2,
    };
    
    const blockProps = useBlockProps({
        ref: elementRef,
        className: classnames(
            'guten-element',
            'guten-chart',
            elementId,
            animationClass,
            displayClass,
            deviceType.toLowerCase(),
        ),
    });

    const onToggleOpenInNewTab = useCallback(
        (value) => {
            const newLinkTarget = value ? '_blank' : undefined;

            let updatedRel = rel;
            if (newLinkTarget && !rel) {
                updatedRel = NEW_TAB_REL;
            } else if (!newLinkTarget && rel === NEW_TAB_REL) {
                updatedRel = undefined;
            }

            setAttributes({
                linkTarget: newLinkTarget,
                rel: updatedRel,
            });
        },
        [rel, setAttributes]
    );

    useEffect(() => {
        if (elementRef.current) {
            setElementRef(elementRef.current);
        }
    }, [elementRef]);

    chartItems.forEach((item, index) => {
        values.push(item.value);
        labels.push(item.label);
        backgroundColor.push(getColor(item.backgroundColor));
    });



    if (chartItems.length > 1) {
        multiValue = true;
    } else {
        multiValue = false;
    }

    const sum = values.reduce((acc, val) => acc + val, 0);

    if (sum < 100) {
        const difference = 100 - sum;
        values.push(difference);
        labels.push('gutenEmptyDataSet');
        backgroundColor.push('rgba(255, 255, 255, 0)')
    }


    useEffect(() => {
        const canvas = document.getElementById(`chart-canvas-${elementId}`);
        if (!canvas) return;

        setAttributes({})

        const backgroundPlugin = {
            id: 'customBackground',
            beforeDraw: (chart) => {
                const { ctx, chartArea } = chart;
                const { width, height } = chart;
                const centerX = chartArea.left + (chartArea.right - chartArea.left) / 2;
                const centerY = chartArea.top + (chartArea.bottom - chartArea.top) / 2;
                const outerRadius = Math.min(width, height) / 2;
                const cutoutPercent = parseFloat(chart.options.cutout);
                const innerRadius = (outerRadius * cutoutPercent) / 100;
                ctx.save();
                
                ctx.fillStyle = 'lightgray';
                ctx.beginPath();
                ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
                ctx.fill();
        
                ctx.globalCompositeOperation = 'destination-out'; 
                ctx.beginPath();
                ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
                ctx.fill();
        
                ctx.globalCompositeOperation = 'source-over';
                ctx.restore();
            }
        };

        Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
        if (!multiValue) {
            Chart.register(backgroundPlugin);
        }

        const customPositioner = (elements, eventPosition) => ({
            x: eventPosition.x,
            y: eventPosition.y,
        });

        const tooltipPlugin = Chart.registry.getPlugin('tooltip');
        if (tooltipPlugin) {
            tooltipPlugin.positioners.custom = customPositioner;
        } else {
            console.warn('Tooltip plugin is not available');
        }

        const newChart = new Chart(canvas, {
            type: chartType,
            data: {
                labels: labels,
                datasets: [
                    {
                        data: values,
                        backgroundColor: backgroundColor,
                        borderWidth: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: size,
                plugins: {
                    tooltip: {
                        enabled: tooltipDisplay,
                        position: 'custom',
                        filter: (tooltipItem) => {
                            return tooltipItem.label !== 'gutenEmptyDataSet';
                        },
                        callbacks: {
                            label: (tooltipItem) => {
                                if (multiValue) return `${tooltipItem.raw}% of ${totalValue}`;
                                return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                            },
                        },
                    },
                    legend: {
                        display: legendDisplay,
                        filter: (legendItem) => {
                            return legendItem.label !== 'gutenEmptyDataSet';
                        },
                    },
                },
                animation: {
                    animateRotate: true,
                    duration: duration,
                    easing: 'easeInOutQuart'
                },
            },
            plugins: !multiValue ? [backgroundPlugin] : []
        });

        chartRef.current = newChart; 
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, [tooltipDisplay, legendDisplay, chartItems]);

    useEffect(() => {
        if (!numberRef.current || chartContent !== 'percentage') return;
    
        const animation = anime({
            targets: numberRef.current,
            innerHTML: multiValue ? [0, totalValue] : [0, values[0]], 
            duration,
            easing: 'cubicBezier(.02, .01, .47, 1)',
            round: 1,
        });
    
        return () => animation.pause();
    }, [chartItems, duration, chartContent, totalValue]);

    // FilterDynamic(props);
    // HighLightToolbar(props);

    const insideChart = <div className='chart-inside'>
        { 
            'percentage' === chartContent || 'number' === chartContent ? 
                <span ref={numberRef} >{multiValue || 'number' === chartContent ? '0' : '0%'}</span> 
                : <i className={icon} onClick={() => setOpenIconLibrary(true)} />
        }
    </div>;

    return <>
        <PanelController panelList={panelList} {...props} />
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
            {enableContent && <div className="chart-content">
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
            <div className='chart-content'>
                <div>
                    <canvas id={`chart-canvas-${elementId}`} width="500" height="500" style={{boxSizing:'border-box', height: '250px', width: '250px'}}></canvas>
                </div>
                {chartContent !== 'none' ? insideChart : ''}
            </div>
        </div>
    </>;
});

export default ChartBlock;