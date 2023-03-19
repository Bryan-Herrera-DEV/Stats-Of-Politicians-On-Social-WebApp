function generateHistoryCompareChart(canvas_id, labels, colors, dates, y_values, title, unit, stepSize=1) {
    let datasets = [];

    for (let i = 0; i < labels.length; i++) {
        let data = [];

        for (let j = 0; j < dates[i].length; j++)
            data.push({
                x: new Date(dates[i][j]),
                y: y_values[i][j]
            }); 

        datasets.push({
            lineTension: 0.25,
            backgroundColor: colors[i],
            borderColor: colors[i],
            fill: false,
            label: labels[i],
            data: data
        });
    }

    new Chart(canvas_id, {
        type: 'line',
        data: { datasets: datasets },
        options: {
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: unit,
                        stepSize: stepSize
                    }
                }
            }
        }
    });
}

function generateHistoryChart(canvas_id, x_values, y_values, label, unit, stepSize=1) {
    new Chart(canvas_id, {
        type: 'bar',
        data: {
            labels: x_values,
            datasets: [{
                backgroundColor: '#e71d35b6',
                data: y_values,
                fill: false,
                label: label
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: unit,
                        stepSize: stepSize
                    }
                }
            }
        }
    });
}
