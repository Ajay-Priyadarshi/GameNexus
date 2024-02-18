document.addEventListener('DOMContentLoaded', function () {
    // Dummy data for illustration purposes
    const analyticsData = {
        players: 150,
        organizers: 20,
        sponsors: 10
    };

    // Pie chart
    const pieChartCanvas = document.getElementById('pieChart').getContext('2d');
    new Chart(pieChartCanvas, {
        type: 'doughnut',
        data: {
            labels: ['Players', 'Event Organizers', 'Sponsors'],
            datasets: [{
                data: [analyticsData.players, analyticsData.organizers, analyticsData.sponsors],
                backgroundColor: ['#3498db', '#2ecc71', '#e74c3c']
            }]
        }
    });
});
