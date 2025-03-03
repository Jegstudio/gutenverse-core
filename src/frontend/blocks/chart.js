import anime from 'animejs';
import { Default, u } from 'gutenverse-core-frontend';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

class GutenverseChart extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            
            const data = [80];
            const labels = ['A'];
            const backgroundColor= ['#ff6384'];
            const type = 'doughnut';
            const size = '90%';
            const tooltipDisplay = true;
            const duration = 4000;
            const legendDisplay = false;

            const sum = data.reduce((acc, val) => acc + val, 0);

            if (sum < 100) {
                data.push(100 - sum);
                labels.push('');
                backgroundColor.push('rgba(255, 255, 255, 0)');
            }

            const canvasElement = u(element).find('canvas#acquisitions');
            if (!canvasElement.length) return;

            const canvas = canvasElement.first();
            if (!canvas) {
                return;
            }

            // Destroy existing chart instance if it exists
            if (canvas.chartInstance && typeof canvas.chartInstance.destroy === 'function') {
                canvas.chartInstance.destroy();
                canvas.chartInstance = null;
            }

            // Register required Chart.js components
            Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

            // Ensure Tooltip.positioners exists before modifying it
            if (!Tooltip.positioners) {
                Tooltip.positioners = {};
            }

            // Define custom tooltip positioner
            Tooltip.positioners.custom = (elements, eventPosition) => ({
                x: eventPosition.x,
                y: eventPosition.y,
            });

            // Create new Chart instance and store it in the canvas
            canvas.chartInstance = new Chart(canvas.getContext('2d'), {
                type: type,
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            backgroundColor: backgroundColor,
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
                            callbacks: {
                                label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
                            },
                        },
                        legend: {
                            display: legendDisplay,
                        },
                    },
                    animation: {
                        animateRotate: true,
                        duration: duration,
                        easing: 'easeInOutQuart',
                    },
                },
            });
        });
    }
}
export default GutenverseChart;