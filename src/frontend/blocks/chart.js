import anime from 'anime';
import { Default, u } from 'gutenverse-core-frontend';
import { Chart} from 'chart.js/auto';
import isEmpty from 'lodash/isEmpty';

class GutenverseChart extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            const dataElement = u(element).find('.chart-content.content-chart').find('.chart-container');

            if (dataElement.length) {
                const rawData = dataElement.data('chart');
                if (rawData) {
                    const parsedData = JSON.parse(rawData);
                    const canvas = u(dataElement).find('canvas');
                    if (!canvas.nodes[0]) return;
                    const chartData = this._getChartData(parsedData, canvas.nodes[0]);

                    const customPositioner = (elements, eventPosition) => ({
                        x: eventPosition.x,
                        y: eventPosition.y,
                    });

                    const tooltipPlugin = Chart.registry.getPlugin('tooltip');
                    if (tooltipPlugin) {
                        tooltipPlugin.positioners.custom = customPositioner;
                    }

                    const numberElement = u(element).find('.chart-content .chart-inside span');

                    const observer = new IntersectionObserver((entries, obs) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                new Chart(canvas.nodes[0], chartData);

                                this._animateNumber(numberElement, parsedData);

                                obs.unobserve(entry.target);
                            }
                        });
                    }, {
                        threshold: 0.2
                    });

                    observer.observe(canvas.nodes[0]);
                }
            }
        });
    }

    _animateNumber(element, data) {
        const {
            chartContent,
            chartItems,
            totalValue,
            animationDuration,
            multiValue
        } = data;

        anime({
            targets: element.nodes[0],
            innerHTML: multiValue || 'number' === chartContent ? [0, totalValue] : [0, chartItems[0].value],
            duration: animationDuration,
            easing: 'cubicBezier(.02, .01, .47, 1)',
            round: 1,
        });

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