// Modern JavaScript with improved accessibility and error handling
const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");

// Tab navigation functionality
for (let i = 0; i < botoes.length; i++) {
    botoes[i].onclick = function () {
        // Remove active state from all buttons and tabs
        for (let j = 0; j < botoes.length; j++) {
            botoes[j].classList.remove("ativo");
            botoes[j].setAttribute("aria-selected", "false");
            textos[j].classList.remove("ativo");
        }

        // Add active state to clicked button and corresponding tab
        botoes[i].classList.add("ativo");
        botoes[i].setAttribute("aria-selected", "true");
        textos[i].classList.add("ativo");
    }
    
    // Add keyboard navigation support
    botoes[i].onkeydown = function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.click();
        }
    }
}

// Countdown timer configuration
const contadores = document.querySelectorAll(".contador");
const tempoObjetivo1 = new Date("2027-12-01T00:00:00");
const tempoObjetivo2 = new Date("2025-12-01T00:00:00");
const tempoObjetivo3 = new Date("2026-12-01T00:00:00");
const tempoObjetivo4 = new Date("2027-12-01T00:00:00");

const tempos = [tempoObjetivo1, tempoObjetivo2, tempoObjetivo3, tempoObjetivo4];

// Enhanced time calculation with error handling
function calculaTempo(tempoObjetivo) {
    try {
        let tempoAtual = new Date();
        let tempoFinal = tempoObjetivo - tempoAtual;
        
        if (tempoFinal <= 0) {
            return [0, 0, 0, 0];
        }
        
        let segundos = Math.floor(tempoFinal / 1000);
        let minutos = Math.floor(segundos / 60);
        let horas = Math.floor(minutos / 60);
        let dias = Math.floor(horas / 24);

        segundos %= 60;
        minutos %= 60;
        horas %= 24;
        
        return [dias, horas, minutos, segundos];
    } catch (error) {
        console.error('Erro no cálculo de tempo:', error);
        return [0, 0, 0, 0];
    }
}

// Format numbers with leading zeros for better visual consistency
function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

// Update countdown displays with improved formatting
function atualizaCronometro() {
    try {
        for (let i = 0; i < contadores.length; i++) {
            const tempo = calculaTempo(tempos[i]);
            
            const diasElement = document.getElementById("dias" + i);
            const horasElement = document.getElementById("horas" + i);
            const minElement = document.getElementById("min" + i);
            const segElement = document.getElementById("seg" + i);
            
            if (diasElement) diasElement.textContent = tempo[0];
            if (horasElement) horasElement.textContent = formatNumber(tempo[1]);
            if (minElement) minElement.textContent = formatNumber(tempo[2]);
            if (segElement) segElement.textContent = formatNumber(tempo[3]);
        }
    } catch (error) {
        console.error('Erro na atualização do cronômetro:', error);
    }
}

// Initialize countdown timer
function comecaCronometro() {
    atualizaCronometro();
    setInterval(atualizaCronometro, 1000);
}

// Start the application
document.addEventListener('DOMContentLoaded', function() {
    comecaCronometro();
});

// Fallback for older browsers
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', comecaCronometro);
} else {
    comecaCronometro();
}