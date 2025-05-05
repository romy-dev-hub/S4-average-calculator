document.addEventListener('DOMContentLoaded', function() {
    const modules = [
        { 
            name: "Archi2", 
            coeff: 3,
            inputs: ["exam", "tp", "td"],
            formula: (values) => (values.exam * 2 + (values.tp + values.td) / 2) / 3
        },
        { 
            name: "POO", 
            coeff: 3,
            inputs: ["exam", "tp", "td"],
            formula: (values) => (values.exam * 2 + (values.tp + values.td) / 2) / 3
        },
        { 
            name: "BDD", 
            coeff: 3,
            inputs: ["exam", "tp", "td"],
            formula: (values) => (values.exam * 2 + (values.tp + values.td) / 2) / 3
        },
        { 
            name: "SE", 
            coeff: 3,
            inputs: ["exam", "tp", "td"],
            formula: (values) => (values.exam * 2 + (values.tp + values.td) / 2) / 3
        },
        { 
            name: "THL", 
            coeff: 3,
            inputs: ["exam", "td"],
            formula: (values) => (values.exam * 2 + values.td) / 3
        },
        { 
            name: "Python", 
            coeff: 2,
            inputs: ["exam"],
            formula: (values) => values.exam
        },
        { 
            name: "English", 
            coeff: 2,
            inputs: ["exam"],
            formula: (values) => values.exam
        }
    ];
    
    const modulesContainer = document.getElementById('modules-container');
    
    // Create input fields for each module
    modules.forEach(module => {
        const moduleDiv = document.createElement('div');
        moduleDiv.className = 'module';
        moduleDiv.id = `${module.name.toLowerCase()}-module`;
        
        const moduleHeader = document.createElement('div');
        moduleHeader.className = 'module-header';
        moduleHeader.innerHTML = `
            <span>${module.name}</span>
            <span>Coefficient: ${module.coeff}</span>
        `;
        
        moduleDiv.appendChild(moduleHeader);
        
        module.inputs.forEach(input => {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            inputGroup.innerHTML = `
                <label for="${module.name.toLowerCase()}-${input}">${input.toUpperCase()}:</label>
                <input type="number" id="${module.name.toLowerCase()}-${input}" min="0" max="20" step="0.01" placeholder="0-20">
            `;
            moduleDiv.appendChild(inputGroup);
        });
        
        const moduleActions = document.createElement('div');
        moduleActions.className = 'module-actions';
        
        const moduleResult = document.createElement('div');
        moduleResult.className = 'module-result';
        moduleResult.id = `${module.name.toLowerCase()}-result`;
        moduleResult.textContent = 'Click "Calculate" to see result';
        
        const calculateBtn = document.createElement('button');
        calculateBtn.className = 'module-btn';
        calculateBtn.textContent = 'Calculate';
        calculateBtn.addEventListener('click', () => calculateModule(module));
        
        moduleActions.appendChild(moduleResult);
        moduleActions.appendChild(calculateBtn);
        moduleDiv.appendChild(moduleActions);
        
        modulesContainer.appendChild(moduleDiv);
    });
    
    // Calculate individual module
    function calculateModule(module) {
        const values = {};
        module.inputs.forEach(input => {
            const inputElement = document.getElementById(`${module.name.toLowerCase()}-${input}`);
            values[input] = parseFloat(inputElement.value) || 0;
        });
        
        const moduleGrade = module.formula(values);
        const roundedGrade = Math.round(moduleGrade * 100) / 100;
        
        const resultElement = document.getElementById(`${module.name.toLowerCase()}-result`);
        if (resultElement) {
            resultElement.textContent = `Average: ${roundedGrade}/20`;
        }
        
        // Highlight the module temporarily
        const moduleDiv = document.getElementById(`${module.name.toLowerCase()}-module`);
        if (moduleDiv) {
            moduleDiv.style.backgroundColor = '#e6f0ff';
            setTimeout(() => {
                moduleDiv.style.backgroundColor = '#f8f9fa';
            }, 1000);
        }
    }
    
    // Calculate all button click handler
    document.getElementById('calculate-all-btn').addEventListener('click', function() {
        let totalPoints = 0;
        let totalCoeff = 0;
        const results = [];
        
        modules.forEach(module => {
            const values = {};
            module.inputs.forEach(input => {
                const inputElement = document.getElementById(`${module.name.toLowerCase()}-${input}`);
                values[input] = parseFloat(inputElement.value) || 0;
            });
            
            const moduleGrade = module.formula(values);
            const roundedGrade = Math.round(moduleGrade * 100) / 100;
            const modulePoints = roundedGrade * module.coeff;
            
            totalPoints += modulePoints;
            totalCoeff += module.coeff;
            
            const resultElement = document.getElementById(`${module.name.toLowerCase()}-result`);
            if (resultElement) {
                resultElement.textContent = `Average: ${roundedGrade}/20`;
            }
            
            results.push({
                name: module.name,
                grade: roundedGrade,
                coeff: module.coeff
            });
        });
        
        const average = totalPoints / totalCoeff;
        const roundedAverage = Math.round(average * 100) / 100;
        
        // Display results
        const moduleResults = document.getElementById('module-results');
        if (moduleResults) {
            moduleResults.innerHTML = '';
            
            results.forEach(result => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'module-summary';
                resultDiv.textContent = `${result.name}: ${result.grade}/20 (Coeff: ${result.coeff})`;
                moduleResults.appendChild(resultDiv);
            });
        }
        
        const finalAverageElement = document.getElementById('final-average');
        if (finalAverageElement) {
            finalAverageElement.textContent = `Final Average: ${roundedAverage}/20`;
        }
        
        const resultsElement = document.getElementById('results');
        if (resultsElement) {
            resultsElement.style.display = 'block';
            resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});