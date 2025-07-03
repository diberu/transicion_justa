// Funcionalidad de la calculadora de consumo energético
document.addEventListener('DOMContentLoaded', function() {
    const percentageInput = document.getElementById('renewable-percentage');
    const percentageDisplay = document.getElementById('percentage-display');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsContainer = document.getElementById('results-container');
    
    // Actualizar el display del porcentaje al mover el slider
    percentageInput.addEventListener('input', function() {
        percentageDisplay.textContent = this.value + '%';
    });
    
    // Calcular al hacer clic en el botón
    calculateBtn.addEventListener('click', function() {
        const consumption = parseFloat(document.getElementById('consumption').value);
        const renewablePercentage = parseFloat(percentageInput.value);
        
        if (isNaN(consumption) || consumption <= 0) {
            resultsContainer.innerHTML = '<p class="error">Por favor, ingrese un valor válido para el consumo.</p>';
            return;
        }
        
        // Realizar cálculos
        const annualConsumption = consumption * 12; // kWh al año
        const renewableEnergy = (annualConsumption * renewablePercentage) / 100; // kWh de renovables
        const solarEnergy = renewableEnergy; // Asumimos que toda la energía renovable será solar
        
        // Estimación de paneles solares necesarios (asumiendo panel estándar de 400W)
        const panelPower = 0.4; // kW
        const sunHoursPerDay = 5; // Promedio para Colombia
        const systemEfficiency = 0.75; // Eficiencia del sistema
        const annualProductionPerPanel = panelPower * sunHoursPerDay * 365 * systemEfficiency; // kWh por panel al año
        const panelsNeeded = Math.ceil(solarEnergy / annualProductionPerPanel);
        
        // Estimación de área necesaria (asumiendo 2m² por panel)
        const areaNeeded = panelsNeeded * 2; // m²
        
        // Estimación de reducción de CO2 (0.4 kg CO2 por kWh)
        const co2Reduction = solarEnergy * 0.4; // kg de CO2
        
        // Mostrar resultados
        resultsContainer.innerHTML = `
            <div class="result-item">
                <h4>Consumo anual:</h4>
                <p>${annualConsumption.toFixed(2)} kWh</p>
            </div>
            <div class="result-item">
                <h4>Energía renovable deseada:</h4>
                <p>${renewableEnergy.toFixed(2)} kWh (${renewablePercentage}% del total)</p>
            </div>
            <div class="result-item">
                <h4>Paneles solares necesarios:</h4>
                <p>${panelsNeeded} paneles (400W cada uno)</p>
            </div>
            <div class="result-item">
                <h4>Área aproximada requerida:</h4>
                <p>${areaNeeded.toFixed(2)} m²</p>
            </div>
            <div class="result-item">
                <h4>Reducción estimada de CO₂:</h4>
                <p>${co2Reduction.toFixed(2)} kg al año</p>
            </div>
            <div class="result-note">
                <p><strong>Nota:</strong> Esta es una estimación simplificada. Los resultados reales pueden variar según la ubicación, orientación, sombras y eficiencia de los equipos.</p>
            </div>
        `;
        
        // Aplicar estilos a los resultados
        const style = document.createElement('style');
        style.textContent = `
            .result-item {
                margin-bottom: 1rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid #eee;
            }
            .result-item h4 {
                margin-bottom: 0.5rem;
                color: #2c3e50;
            }
            .result-item p {
                font-size: 1.1rem;
                font-weight: 500;
                color: #3498db;
            }
            .result-note {
                margin-top: 1.5rem;
                padding: 1rem;
                background-color: #f8f9fa;
                border-radius: 8px;
                font-size: 0.9rem;
                color: #666;
            }
            .error {
                color: #e74c3c;
                font-weight: 500;
            }
        `;
        document.head.appendChild(style);
    });
});
