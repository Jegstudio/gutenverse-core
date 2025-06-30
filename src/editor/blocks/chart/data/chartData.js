import { getDeviceType } from 'gutenverse-core/editor-helper';
import { getColor, getColorValueFromVariable } from 'gutenverse-core/styling';

const theColor = (color) => {
    const {type} = color;
    const rgbaColor = getColor(color ? color : {
        r: 255,
        g: 255,
        b: 255,
        a: 0
    });

    if ('variable' === type) {
        const temp = document.createElement('div');
        document.body.appendChild(temp);

        temp.style.setProperty('color', rgbaColor);
        const computedColor = getComputedStyle(temp).color;
        document.body.removeChild(temp);

        const rgbaMatch = computedColor.match(/\d+/g);
        if (!rgbaMatch || rgbaMatch.length < 3) return null;

        const [r, g, b] = rgbaMatch.map(Number);
        return `rgba(${r}, ${g}, ${b}, 1)`;
    }

    return rgbaColor;
};

export function getChartData(attributes, multiValue, canvas) {
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
    } = attributes;

    const values = [];
    const labels = [];
    const backgroundColor = [];
    const borderWidth = [];
    const borderColor = [];

    const responsiveSize = true;
    let maxBorderWidth = 1;

    chartItems.forEach((item) => {
        //color control
        let color;
        if (item.colorMode === 'default' || item.colorMode === undefined) {
            color = theColor(item.backgroundColor);
        } else {
            const gradient = 'topBottom' === item.gradientDirection ? canvas.getContext('2d').createLinearGradient(0, 0, 0, item.gradientPosition ? item.gradientPosition :  200) : canvas.getContext('2d').createLinearGradient(0, 0, item.gradientPosition ? item.gradientPosition :  200, 0);
            gradient.addColorStop(0, theColor(item.colorGradientOne));
            gradient.addColorStop(1, theColor(item.colorGradientTwo));
            color = gradient;
        }

        //push data to individual array
        values.push(item.value);
        labels.push(item.label);
        backgroundColor.push(color);
        borderColor.push(theColor(item.borderColor));
        if (item.borderWidth > maxBorderWidth) maxBorderWidth = item.borderWidth;
        borderWidth.push( parseFloat(item.borderWidth) );
    });

    const topValue = 'number' === chartContent ? parseFloat(totalValue) : 100;
    const bottomValue = 'number' === chartContent ? parseFloat(minValue) : 0;
    let cutoutFill = '';
    if (cutoutBackground.type === 'variable') {
        cutoutFill = getColorValueFromVariable(cutoutBackground);
    } else {
        cutoutFill = getColor({...cutoutBackground, a: 1});
    }

    switch(chartType) {
        case 'doughnut':
            const device = getDeviceType();
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