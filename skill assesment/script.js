document.addEventListener('DOMContentLoaded', function () {
    // Initialize the progress chart
    const ctx = document.getElementById('progressChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Python', 'JavaScript', 'HTML/CSS', 'Machine Learning', 'Algorithms'],
            datasets: [{
                label: 'Completion %',
                data: [85, 90, 95, 70, 80], // Example data
                backgroundColor: 'rgba(164, 121, 252, 0.4)',
                borderColor: 'rgba(0, 128, 0, 1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += `${context.parsed.y}%`;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });


});
