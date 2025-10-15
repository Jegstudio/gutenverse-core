import { Default, u } from 'gutenverse-core-frontend';
// import {
//     Chart,
//     Tooltip,
//     DoughnutController,
//     ArcElement,
//     LineController,
//     LineElement,
//     LinearScale,
//     BarController,
//     BarElement,
//     Legend,
//     CategoryScale,
// } from 'chart.js';
import isEmpty from 'lodash/isEmpty';
import {
    // Core DOM selection & data binding
    select,
    selectAll,

    // Scales & colors
    scaleLinear,
    scaleBand,
    scaleOrdinal,
    schemeCategory10,

    // Shape generators
    arc,
    pie,

    // Transitions / animation
    transition,
    easeCubicOut,
    interpolate,

    // Axes (for bar chart)
    axisBottom,
    axisLeft,

    // Gradient & defs utilities (optional manual SVG)
    create,
} from 'd3';

class GutenverseChart extends Default {
    /* public */
    init() {
        this._elements.each(element => {
            const dataElement = u(element).find('.chart-content.content-chart .chart-container');

            if (!dataElement.length) return;

            const rawData = dataElement.data('chart');
            if (!rawData) return;

            let parsedData;
            try {
                parsedData = JSON.parse(rawData);
            } catch (e) {
                console.error('Invalid chart data:', rawData, e);
                return;
            }

            const { elementId } = parsedData;
            const chartElement = u(dataElement).find(`#chart-${elementId}`);
            if (!chartElement.nodes[0]) return;

            const numberElement = u(element).find('.chart-content .chart-inside span');

            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        try {
                            this._generateChart(parsedData, chartElement.nodes[0]);
                            if (numberElement.length) {
                                this._animateNumber(numberElement, parsedData);
                            }
                        } catch (err) {
                            console.error('Chart rendering failed:', err);
                        } finally {
                            obs.unobserve(entry.target);
                        }
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '100px'
            });

            observer.observe(chartElement.nodes[0]);
        });
    }

    _generateChart(chartData, element) {
        const {
            chartContent,
            tooltipDisplay,
            legendDisplay,
            chartItems,
            chartType,
            minValue,
            totalValue,
            animationDuration,
            cutout,
            barThickness,
            cutoutBackground,
            multiValue,
            elementId
        } = chartData;
        console.log(chartItems, cutout);

        const chartId = `#chart-${elementId}`;
        const device = this._getDeviceType();
        const width = 200;
        const height = 200;
        const radius = Math.min(width, height) / 2;

        const data = chartItems;

        // const color = scaleOrdinal(schemeCategory10);

        const svg = select(`${chartId}`)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const pieGenerator = pie()
            .sort(null)
            .value(d => d.value);

        const arcGenerator = arc()
            .innerRadius(radius * 0.6)
            .outerRadius(radius - 10);

        const arcs = svg.selectAll('path')
            .data(pieGenerator(data))
            .enter()
            .append('path')
            .attr('d', d => {
                const borderWidth = d.data.borderWidth || 0;
                const radius = Math.min(width, height) / 2;
                const innerRadius = radius * 0.6;
                const outerRadius = radius;

                const adjustedArc = arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius - borderWidth / 2);
                return adjustedArc(d);
            })
            .attr('fill', d => this._theColor(d.data.backgroundColor))
            .style('stroke', d => this._theColor(d.data.borderColor))
            .style('stroke-width', d => d.data.borderWidth || 0)
            .style('stroke-linejoin', 'round');

        // === Animate on load ===
        arcs.transition()
            .delay((d, i) => i * 150)
            .duration(800)
            .attrTween('d', function (d) {
                const i = interpolate({ startAngle: 0, endAngle: 0 }, d);
                return function (t) {
                    return arcGenerator(i(t));
                };
            });

        // === Tooltip ===
        const tooltip = select(`${chartId}`)
            .append('div')
            .style('position', 'absolute')
            .style('padding', '4px 8px')
            .style('background', 'rgba(0,0,0,0.7)')
            .style('color', '#fff')
            .style('font-size', '12px')
            .style('border-radius', '4px')
            .style('pointer-events', 'none')
            .style('opacity', 0);

        // === Hover interactions ===
        arcs.on('mouseover', function (event, d) {
            select(this)
                .transition()
                .duration(200)
                .attr('transform', 'scale(1.05)');

            tooltip
                .style('opacity', 1)
                .html(`<strong>${d.data.label}</strong>: ${d.data.value}`)
                .style('left', event.offsetX + 'px')
                .style('top', event.offsetY - 30 + 'px');
        })
            .on('mousemove', function (event) {
                tooltip
                    .style('left', event.offsetX + 'px')
                    .style('top', event.offsetY - 30 + 'px');
            })
            .on('mouseout', function () {
                select(this)
                    .transition()
                    .duration(200)
                    .attr('transform', 'scale(1)');

                tooltip.style('opacity', 0);
            });

        // Labels (optional)
        svg.selectAll('text')
            .data(pieGenerator(data))
            .enter()
            .append('text')
            .text(d => d.data.label)
            .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('fill', '#333');
    }

    _animateNumber(element, data) {
        const {
            chartContent,
            chartItems,
            totalValue,
            animationDuration,
            multiValue
        } = data;

        const el = element.nodes ? element.nodes[0] : element;
        const endValue = multiValue || chartContent === 'number'
            ? totalValue
            : chartItems[0].value;

        const startValue = 0;
        const duration = animationDuration || 1000;
        const startTime = performance.now();

        function cubicBezierEase(t) {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        const isPercentage =
            (endValue > 0 && endValue <= 1) ||
            (el && el.innerHTML?.toLowerCase().includes('%'));

        const finalEndValue = endValue <= 1 ? endValue * 100 : endValue;

        function animate(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = cubicBezierEase(progress);

            const currentValue = startValue + (finalEndValue - startValue) * easedProgress;

            // 🧩 format number
            let displayValue;
            if (isPercentage) {
                displayValue = Math.round(currentValue) + '%';
            } else {
                displayValue = Math.round(currentValue);
            }

            el.innerHTML = displayValue;

            if (progress < 1) requestAnimationFrame(animate);
        }

        el && requestAnimationFrame(animate);
    }

    _theColor (color) {
        const theColor = color ? color : {
            r: 255,
            g: 255,
            b: 255,
            a: 0
        };

        const { r, g, b, a, type, id } = theColor;
        let result = '';

        if ((r || r === 0) && (g || g === 0) && (g || g === 0)) {
            result = `rgba(${r}, ${g}, ${b}, ${a})`;
        }

        if ('variable' === type) {
            const value = `--wp--preset--color--${id}`;
            const temp = document.createElement('div');
            document.body.appendChild(temp);

            temp.style.setProperty('color', `var(${value})`);
            const computedColor = getComputedStyle(temp).color;
            document.body.removeChild(temp);

            const rgbaMatch = computedColor.match(/\d+/g);
            if (!rgbaMatch || rgbaMatch.length < 3) return null;

            const [r, g, b] = rgbaMatch.map(Number);
            result = `rgba(${r}, ${g}, ${b}, 1)`;
        }

        return result;
    }

    _getDeviceType() {
        const {breakPoints} =  window['GutenverseConfig'] || window['GutenverseData'] || {};
        const screenWidth = window.screen.width;
        let currentDevice = 'Desktop';

        if (isEmpty(breakPoints)) {
            return currentDevice;
        }

        if(screenWidth < breakPoints['Tablet'] && screenWidth > breakPoints['Mobile']){
            currentDevice = 'Tablet';
        } else if (screenWidth < breakPoints['Mobile']) {
            currentDevice = 'Mobile';
        }

        return currentDevice;
    }

    _getChartData(data, canvas) {

        const {
            chartContent,
            tooltipDisplay,
            legendDisplay,
            chartItems,
            chartType,
            minValue,
            totalValue,
            animationDuration,
            cutout,
            barThickness,
            cutoutBackground,
            multiValue
        } = data;

        const values = [];
        const labels = [];
        const backgroundColor = [];
        const borderWidth = [];
        const borderColor = [];

        const responsiveSize = true;

        chartItems.forEach((item) => {
            //color control
            let color;
            if (item.colorMode === 'default' || item.colorMode === undefined) {
                color = this._theColor(item.backgroundColor);
            } else {
                let gradient = '';
                switch (item.gradientDirection) {
                    case 'topBottom':
                        gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, item.gradientPosition ? item.gradientPosition :  200);
                        break;
                    case 'leftRight':
                        gradient = canvas.getContext('2d').createLinearGradient(0, 0, item.gradientPosition ? item.gradientPosition :  200, 0);
                        break;
                    case 'bottomTop':
                        gradient = canvas.getContext('2d').createLinearGradient(0, item.gradientPosition ? item.gradientPosition :  200, 0, 0);
                        break;
                    case 'rightLeft':
                        gradient = canvas.getContext('2d').createLinearGradient(item.gradientPosition ? item.gradientPosition :  200, 0, 0, 0);
                        break;
                }
                gradient.addColorStop(0, this._theColor(item.colorGradientOne));
                gradient.addColorStop(1, this._theColor(item.colorGradientTwo));
                color = gradient;
            }

            //push data to individual array
            values.push(item.value);
            labels.push(item.label);
            backgroundColor.push(color);
            borderColor.push(this._theColor(item.borderColor));
            borderWidth.push( parseFloat(item.borderWidth) );
        });

        const topValue = 'number' === chartContent ? parseFloat(totalValue) : 100;
        const bottomValue = 'number' === chartContent ? parseFloat(minValue) : 0;
        const cutoutFill = this._theColor({...cutoutBackground, a: 1});

        switch(chartType) {
            case 'doughnut':
                const device = this._getDeviceType();
                const sum = values.reduce((acc, val) => parseFloat(acc) + parseFloat(val), 0);
                const backgroundPlugin = {
                    id: 'customBackground',
                    beforeDraw: (chart) => {
                        const { ctx } = chart;
                        const meta = chart.getDatasetMeta(0);
                        const arc = meta.data[0];

                        if (!arc) return;

                        const centerX = arc.x;
                        const centerY = arc.y;
                        const outerRadius = arc.outerRadius;
                        const innerRadius = arc.innerRadius;

                        ctx.save();

                        // Draw full outer circle
                        ctx.globalAlpha = cutoutBackground.a;
                        ctx.fillStyle = cutoutFill;
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
                        ctx.fill();

                        // Cut inner circle (to make doughnut)
                        ctx.globalAlpha = 1.0;
                        ctx.globalCompositeOperation = 'destination-out';
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
                        ctx.fill();

                        ctx.globalCompositeOperation = 'source-over';
                        ctx.restore();
                    }
                };

                if (sum < topValue && 'doughnut' === chartType) {
                    const difference = topValue - sum;
                    values.push(difference);
                    labels.push('gutenEmptyDataSet');
                    backgroundColor.push('rgba(255, 255, 255, 0)');
                    borderColor.push('rgba(255, 255, 255, 0)');
                    borderWidth.push(0);
                }

                return {
                    type: chartType,
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                data: values,
                                backgroundColor: backgroundColor,
                                borderColor: borderColor,
                                borderWidth: borderWidth,
                            },
                        ],
                    },
                    options: {
                        responsive: responsiveSize,
                        maintainAspectRatio: false,
                        cutout: `${cutout[device]}%`,
                        plugins: {
                            tooltip: {
                                enabled: tooltipDisplay,
                                position: 'custom',
                                filter: (tooltipItem) => {
                                    return tooltipItem.label !== 'gutenEmptyDataSet';
                                },
                                callbacks: {
                                    label: (tooltipItem) => {
                                        if ('number' === chartContent) return `${tooltipItem.raw} of ${totalValue}`;
                                        if (multiValue) return `${tooltipItem.raw}% of ${totalValue}`;
                                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                                    },
                                },
                            },
                            legend: {
                                display: false,
                            },
                        },
                        animation: {
                            animateRotate: true,
                            duration: animationDuration,
                            easing: 'easeInOutQuart'
                        },
                    },
                    plugins: [backgroundPlugin]
                };

            case 'bar' :

                return {
                    type: chartType,
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                data: values,
                                backgroundColor: backgroundColor,
                                borderColor: borderColor,
                                borderWidth: borderWidth,
                                barThickness: barThickness
                            },
                        ],
                    },
                    options: {
                        responsive: responsiveSize,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                min: bottomValue,
                                max: topValue
                            }
                        },
                        plugins: {
                            tooltip: {
                                enabled: tooltipDisplay,
                                position: 'custom',
                                callbacks: {
                                    label: (tooltipItem) => {
                                        if ('number' === chartContent) return `${tooltipItem.raw} of ${totalValue}`;
                                        if (multiValue) return `${tooltipItem.raw}% of ${totalValue}`;
                                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                                    },
                                },
                            },
                            legend: {
                                display: legendDisplay,
                                onClick: null,
                                labels: {
                                    generateLabels: (chart) => {
                                        return chart.data.labels.map((label, i) => ({
                                            text: `${label}`,
                                            fillStyle: chart.data.datasets[0].backgroundColor[i],
                                            hidden: false,
                                            lineWidth: 0,
                                            pointStyle: 'circle'
                                        }));
                                    },
                                    usePointStyle: true
                                }
                            },
                        },
                        animation: {
                            animateRotate: true,
                            duration: animationDuration,
                            easing: 'easeInOutQuart'
                        },
                    },
                };

            case 'line' :
                return {
                    type: chartType,
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                data: values,
                                backgroundColor: backgroundColor,
                                borderColor: borderColor,
                                borderWidth: borderWidth,
                                barThickness: barThickness
                            },
                        ],
                    },
                    options: {
                        responsive: responsiveSize,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                min: bottomValue,
                                max: topValue
                            }
                        },
                        plugins: {
                            tooltip: {
                                enabled: tooltipDisplay,
                                position: 'custom',
                                callbacks: {
                                    label: (tooltipItem) => {
                                        if ('number' === chartContent) return `${tooltipItem.raw} of ${totalValue}`;
                                        if (multiValue) return `${tooltipItem.raw}% of ${totalValue}`;
                                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                                    },
                                },
                            },
                            legend: {
                                display: legendDisplay,
                                onClick: null,
                                labels: {
                                    generateLabels: (chart) => {
                                        return chart.data.labels.map((label, i) => ({
                                            text: `${label}`,
                                            fillStyle: chart.data.datasets[0].backgroundColor[i],
                                            hidden: false,
                                            lineWidth: 0,
                                            pointStyle: 'circle'
                                        }));
                                    },
                                    usePointStyle: true
                                }
                            },
                        },
                        animation: {
                            animateRotate: true,
                            duration: animationDuration,
                            easing: 'easeInOutQuart'
                        },
                    },
                };
        }
    }
}

const selected = u('.guten-chart');

if (selected) {
    new GutenverseChart(selected);
}