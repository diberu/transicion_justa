// Datos embebidos para visualización offline
document.addEventListener('DOMContentLoaded', function() {
    // Datos de capacidad instalada y generación
    const solarData = {
        years: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],
        capacityData: [
            {year: "2010", value: 0.1},
            {year: "2011", value: 0.2},
            {year: "2012", value: 0.5},
            {year: "2013", value: 1.0},
            {year: "2014", value: 2.0},
            {year: "2015", value: 5.0},
            {year: "2016", value: 12.0},
            {year: "2017", value: 38.0},
            {year: "2018", value: 86.5},
            {year: "2019", value: 142.0},
            {year: "2020", value: 238.0},
            {year: "2021", value: 359.0},
            {year: "2022", value: 478.0}
        ],
        generationData: [
            {year: "2010", value: 0.02},
            {year: "2011", value: 0.04},
            {year: "2012", value: 0.1},
            {year: "2013", value: 0.2},
            {year: "2014", value: 0.4},
            {year: "2015", value: 1.0},
            {year: "2016", value: 2.4},
            {year: "2017", value: 7.6},
            {year: "2018", value: 17.3},
            {year: "2019", value: 28.4},
            {year: "2020", value: 47.6},
            {year: "2021", value: 71.8},
            {year: "2022", value: 95.6}
        ]
    };

    // Datos de consumo eléctrico
    const consumptionData = {
        years: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],
        totalConsumption: [56000, 57500, 59000, 60500, 62000, 63500, 65000, 66500, 68000, 69500, 71000, 72500, 74000],
        renewablePercentage: [65.0, 64.5, 64.0, 63.5, 63.0, 62.5, 62.0, 61.5, 61.0, 60.5, 60.0, 59.5, 59.0],
        solarPercentage: [0.00004, 0.00007, 0.00017, 0.00033, 0.00065, 0.00157, 0.00369, 0.01143, 0.02544, 0.04086, 0.06704, 0.09903, 0.12919]
    };

    // Datos comparativos
    const comparativeData = {
        countries: ["Colombia", "China", "España", "USA", "Brasil", "Chile"],
        capacityValues: [478.0, 392000.0, 20000.0, 135000.0, 24000.0, 5600.0],
        generationValues: [95.6, 78400.0, 4000.0, 27000.0, 4800.0, 1120.0]
    };

    // Procesar datos para la tabla
    const tableData = [];
    for (let i = 0; i < solarData.years.length; i++) {
        const year = solarData.years[i];
        const capacity = solarData.capacityData[i].value;
        const generation = solarData.generationData[i].value;
        const percentage = consumptionData.solarPercentage[i] * 100; // Convertir a porcentaje
        
        tableData.push({
            year: year,
            capacity: capacity,
            generation: generation,
            percentage: percentage
        });
    }
    
    // Llenar la tabla
    populateTable(tableData);
    
    // Inicializar gráficos
    initCharts(solarData.years, solarData.capacityData, solarData.generationData, consumptionData.solarPercentage);
    
    // Actualizar gráfico comparativo
    updateComparisonChart(comparativeData.countries, comparativeData.capacityValues, comparativeData.generationValues);
});

// Función para llenar la tabla de datos históricos
function populateTable(data) {
    const tableBody = document.querySelector('#solar-data-table tbody');
    tableBody.innerHTML = '';
    
    data.forEach(row => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${row.year}</td>
            <td>${row.capacity.toFixed(2)}</td>
            <td>${row.generation.toFixed(2)}</td>
            <td>${row.percentage.toFixed(4)}%</td>
        `;
        
        tableBody.appendChild(tr);
    });
}

// Exportar funciones para uso en otros archivos
window.dataLoader = {
    populateTable
};
