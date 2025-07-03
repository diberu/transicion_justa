// Inicialización y configuración de gráficos
let capacityChart, generationChart, pieChart, areaChart, comparisonChart;

function initCharts(years, capacityData, generationData, solarPercentages) {
    // Preparar datos para los gráficos
    const capacityValues = capacityData.map(item => item.value);
    const generationValues = generationData.map(item => item.value);
    const percentageValues = years.map(year => solarPercentages[year] || 0);
    
    // Configuración de colores
    const primaryColor = '#3498db';
    const secondaryColor = '#f39c12';
    const accentColor = '#2ecc71';
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
    
    // Gráfico de barras - Capacidad Instalada
    const capacityCtx = document.getElementById('capacity-chart').getContext('2d');
    capacityChart = new Chart(capacityCtx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Capacidad Instalada (MW)',
                data: capacityValues,
                backgroundColor: primaryColor,
                borderColor: primaryColor,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Megavatios (MW)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Año'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y.toFixed(2)} MW`;
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico de líneas - Generación
    const generationCtx = document.getElementById('generation-chart').getContext('2d');
    generationChart = new Chart(generationCtx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Generación (GWh)',
                data: generationValues,
                backgroundColor: 'rgba(243, 156, 18, 0.2)',
                borderColor: secondaryColor,
                borderWidth: 2,
                pointBackgroundColor: secondaryColor,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Gigavatios-hora (GWh)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Año'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y.toFixed(2)} GWh`;
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico de torta - Distribución de capacidad solar 2022
    const pieCtx = document.getElementById('pie-chart').getContext('2d');
    pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Solar Fotovoltaica', 'Hidroeléctrica', 'Eólica', 'Biomasa', 'Térmica'],
            datasets: [{
                data: [478, 11834, 18.4, 143, 5665],
                backgroundColor: colors,
                borderColor: 'white',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${value} MW (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico de área - Evolución del porcentaje solar
    const areaCtx = document.getElementById('area-chart').getContext('2d');
    areaChart = new Chart(areaCtx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: '% de Energía Solar en el Consumo Total',
                data: percentageValues,
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                borderColor: accentColor,
                borderWidth: 2,
                pointBackgroundColor: accentColor,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Porcentaje (%)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(4) + '%';
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Año'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y.toFixed(4)}%`;
                        }
                    }
                }
            }
        }
    });
}

// Función para actualizar el gráfico comparativo
function updateComparisonChart(countries, capacityValues, generationValues) {
    const comparisonCtx = document.getElementById('comparison-chart').getContext('2d');
    
    // Usar escala logarítmica para mejor visualización de las diferencias
    comparisonChart = new Chart(comparisonCtx, {
        type: 'bar',
        data: {
            labels: countries,
            datasets: [{
                label: 'Capacidad Instalada (MW)',
                data: capacityValues,
                backgroundColor: 'rgba(52, 152, 219, 0.7)',
                borderColor: '#3498db',
                borderWidth: 1,
                order: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Capacidad Instalada (MW) - Escala Logarítmica'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'País'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y.toLocaleString()} MW`;
                        }
                    }
                }
            }
        }
    });
}

// Exportar funciones para uso en otros archivos
window.chartFunctions = {
    initCharts,
    updateComparisonChart
};
