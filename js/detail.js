// Redirección si no ha iniciado sesión
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '../index.html';
}

// Cargar datos del chiste al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const jokeDataRaw = sessionStorage.getItem('currentJoke');
    
    if (!jokeDataRaw) {
        alert("No se encontró información del chiste.");
        return;
    }

    try {
        const joke = JSON.parse(jokeDataRaw);
        console.log(joke)
        displayJoke(joke);
    } catch (error) {
        alert("Error al procesar los datos del chiste.");
    }
});

function displayJoke(joke) {
    // ID del chiste
    document.getElementById('jokeId').textContent = `ID: #${joke.id || 'N/A'}`;

    // Tipo de chiste
    document.getElementById('jokeType').textContent = joke.type;

    // Contenido del chiste
    const jokeTextEl = document.getElementById('jokeText');
    if (joke.type === 'twopart') {
        jokeTextEl.innerHTML = `
            <div class="setup">${joke.setup}</div>
            <div class="delivery">${joke.delivery}</div>
        `;
    } else {
        jokeTextEl.innerHTML = `<div>${joke.joke || joke.setup}</div>`;
    }

    // Categoría
    const categoriesEl = document.getElementById('categories');
    categoriesEl.innerHTML = `<span class="tag category">${joke.category}</span>`;

    // Idioma
    document.getElementById('language').textContent = joke.lang?.toUpperCase() || 'N/A';

    // Flags
    const flagsEl = document.getElementById('flags');
    const activeFlags = Object.keys(joke.flags || {}).filter(flag => joke.flags[flag]);
    if (activeFlags.length > 0) {
        flagsEl.innerHTML = activeFlags.map(flag =>
            `<span class="tag flag">${flag}</span>`
        ).join('');
    } else {
        flagsEl.innerHTML = '<span class="tag">Ninguno</span>';
    }
}

const trigger = document.getElementById("trigger")
const scream = document.getElementById("scream");

trigger.addEventListener("mouseenter", () => {
      scream.style.display = "flex";
    });

scream.addEventListener("mouseout", () => {
  scream.style.display = "none";
});