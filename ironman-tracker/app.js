// app.js

// Load workouts from localStorage or initialize an empty array
const workouts = JSON.parse(localStorage.getItem('workouts')) || [];

// Add workout form submission
document.getElementById('logWorkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const workout = {
        date: document.getElementById('date').value,
        type: document.getElementById('type').value,
        duration: parseInt(document.getElementById('duration').value),
        notes: document.getElementById('notes').value,
    };

    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
    alert('Workout logged!');
    location.reload(); // Refresh page to update chart
});

// Display workouts on a chart
const ctx = document.getElementById('progressChart').getContext('2d');
const workoutTypes = ["Swim", "Bike", "Run", "Strength"];
const totals = workoutTypes.map(type =>
    workouts.filter(w => w.type === type).reduce((sum, w) => sum + w.duration, 0)
);

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: workoutTypes,
        datasets: [{
            label: 'Total Duration (mins)',
            data: totals,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        }],
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});
