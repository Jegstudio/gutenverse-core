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
    max,

    // Transitions / animation
    transition,
    easeCubicOut,
    easeCubic,
    interpolate,
    interpolateNumber,

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
        // console.log(chartData, chartType);

        const chartId = `#chart-${elementId}`;
        const device = this._getDeviceType();
        const width = 200;
        const height = 200;
        const radius = Math.min(width, height) / 2;
        const data = chartItems;
        console.log({totalValue});

        const svg = select(chartId)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // === Chart Type ===
        if (chartType === 'doughnut') {
            this._drawDonutChart(svg, data, radius, chartId, animationDuration, chartContent);
        } else if (chartType === 'bar') {
            this._drawBarChart({svg, data, width, height, animationDuration, barThickness});
        }

        // === Tooltip ===
        if (tooltipDisplay) {
            this._appendTooltip(chartId);
        }
    }

    // ========== MODULES ==========

    // --- Gradient Generator ---
    _appendGradientDefs(svg, data) {
        const defs = svg.append('defs');

        data.forEach((d, i) => {
            if (d.colorMode !== 'gradient') return; // Only create if gradient

            const gradient = defs.append('linearGradient')
                .attr('id', `gradient-${i}`)
                .attr('x1', '0%')
                .attr('y1', '0%')
                .attr('x2', '100%')
                .attr('y2', '100%');

            gradient.append('stop')
                .attr('offset', '0%')
                .attr('stop-color', this._theColor(d.colorGradientOne));

            gradient.append('stop')
                .attr('offset', '100%')
                .attr('stop-color', this._theColor(d.colorGradientTwo));
        });
    }

    _drawDonutChart(svg, data, radius, chartId, animationDuration = 800, chartContent) {
        if(chartContent === 'percentage') {
            let flag = 100;
            for (const dataChart of data) {
                flag -= dataChart.value;
                if (flag < 0) break;
            }
            data = flag !== 0 ? [
                ...data,
                {
                    label: '',
                    value: flag,
                    backgroundColor: {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 0
                    },
                    borderColor: {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 1
                    },
                    borderWidth: 0,
                    _key: '00000'
                }
            ] : data;
        }
        // Append gradient defs if needed
        this._appendGradientDefs(svg, data);

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
                const adjustedArc = arc()
                    .innerRadius(radius * 0.6)
                    .outerRadius(radius - borderWidth);
                return adjustedArc(d);
            })
            .attr('fill', (d, i) =>
                d.data.colorMode === 'gradient'
                    ? `url(#gradient-${i})`
                    : this._theColor(d.data.backgroundColor)
            )
            .style('stroke', d => this._theColor(d.data.borderColor))
            .style('stroke-width', d => d.data.borderWidth || 0)
            .style('stroke-linejoin', 'round');

        // Animate
        arcs.transition()
            .ease(easeCubic)
            .duration(animationDuration)
            .attrTween('d', function (d) {
                const i = interpolate({ startAngle: 0, endAngle: 0 }, d);
                return function (t) {
                    return arcGenerator(i(t));
                };
            });

        // Labels
        const labelArc = arc()
            .innerRadius(radius * 0.7)
            .outerRadius(radius * 0.7);

        svg.selectAll('text')
            .data(pieGenerator(data))
            .enter()
            .append('text')
            .text(d => d.data.label)
            .attr('transform', d => `translate(${labelArc.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('fill', '#333');
    }

    _getMaxvalue(data) {
        return Math.max(...data.map(d => d.value));
    }

    _drawBarChart(props) {
        const {
            svg,
            data,
            width,
            height,
            animationDuration = 800,
            barThickness,
            enableGrid = true
        } = props;
        // console.log(props);

        this._appendGradientDefs(svg, data);

        const margin = { top: 20, right: 20, bottom: 40, left: 40 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const chartGroup = svg.append('g')
            .attr('transform', `translate(${margin.left - width / 2}, ${margin.top - height / 2})`);

        // === Scales ===
        const x = scaleBand()
            .domain(data.map(d => d.label))
            .range([0, chartWidth])
            .padding(0.2);

        const y = scaleLinear()
            .domain([0, this._getMaxvalue(data)])
            .nice()
            .range([chartHeight, 0]);

        // === Axes ===
        chartGroup.append('g')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(axisBottom(x))
            .selectAll('text')
            .attr('font-size', '10px')
            .attr('fill', '#333');

        chartGroup.append('g')
            .call(axisLeft(y).ticks(5))
            .selectAll('text')
            .attr('font-size', '10px')
            .attr('fill', '#333');

        if (enableGrid) {
            // === Horizontal Grid Lines ===
            chartGroup.append('g')
                .attr('class', 'grid-lines-y')
                .selectAll('line')
                .data(y.ticks(5).filter(d => d !== 0)) // exclude y=0 baseline
                .enter()
                .append('line')
                .attr('x1', 1)
                .attr('x2', (chartWidth - 1))
                .attr('y1', d => y(d))
                .attr('y2', d => y(d))
                .attr('stroke', '#e0e0e0')
                .attr('stroke-width', 1);

            // === Vertical Grid Lines (Between Bars) ===
            const xDomain = x.domain();
            const xPositions = [];

            for (let i = 0; i < xDomain.length - 1; i++) {
                // Center of current bar
                const currentCenter = x(xDomain[i]) + x.bandwidth() / 2;
                // Center of next bar
                const nextCenter = x(xDomain[i + 1]) + x.bandwidth() / 2;
                // Middle point between two bar centers
                const mid = currentCenter + (nextCenter - currentCenter) / 2;
                xPositions.push(mid);
            }

            const verticalGrid = chartGroup.append('g').attr('class', 'grid-lines-x');

            verticalGrid.selectAll('line')
                .data(xPositions)
                .enter()
                .append('line')
                .attr('x1', d => d)
                .attr('x2', d => d)
                .attr('y1', 0)
                .attr('y2', chartHeight)
                .attr('stroke', '#f0f0f0')
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', '2,2');
        }

        // === Bars ===
        const bars = chartGroup.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => x(d.label) + (x.bandwidth() - barThickness) / 2)
            .attr('width', `${barThickness}px`)
            // Start from the bottom line
            .attr('y', 0)
            .attr('transform', `scale(1, -1) translate(0, ${-chartHeight})`)
            .attr('height', 0)
            .attr('fill', (d, i) =>
                d.colorMode === 'gradient'
                    ? `url(#gradient-${i})`
                    : this._theColor(d.backgroundColor)
            )
            .style('stroke', d => this._theColor(d.borderColor))
            .style('stroke-width', d => d.borderWidth || 0)
            .style('stroke-linejoin', 'round');

        // === Animate Only the Height ===
        bars.transition()
            .ease(easeCubic)
            .delay((d, i) => i * 120)
            .duration(animationDuration)
            .attr('height', d => chartHeight - y(d.value));

        // === Value Labels on Top ===
        const labels = chartGroup.selectAll('.bar-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'bar-label')
            .attr('x', d => x(d.label) + x.bandwidth() / 2)
            .attr('y', chartHeight - 5) // start at bottom
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('fill', '#333')
            .text(''); // empty until animated

        // === Animate Labels (start slightly later) ===
        // console.log({animationDuration});
        labels.transition()
            .ease(easeCubic)
            .delay((d, i) => i * 120)
            .duration(parseInt(animationDuration) + 700)
            .attr('y', d => {
                // console.log(d.value);
                return y(d.value) - 5;
            })
            .tween('text', function (d) {
                const i = interpolateNumber(0, d.value);
                return function (t) {
                    select(this).text(Math.round(i(t)));
                };
            });
    }

    // --- Tooltip Module ---
    _appendTooltip(chartId) {
        const tooltip = select(chartId)
            .append('div')
            .style('position', 'absolute')
            .style('padding', '4px 8px')
            .style('background', 'rgba(0,0,0,0.7)')
            .style('color', '#fff')
            .style('font-size', '12px')
            .style('border-radius', '4px')
            .style('pointer-events', 'none')
            .style('opacity', 0);

        // You can bind hover logic outside or here depending on your architecture
        return tooltip;
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