// Redirección si no ha iniciado sesión
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '../index.html';
}

// Ir a la vista detallada del chiste
function goToJoke(joke) {
    sessionStorage.setItem("currentJoke", JSON.stringify(joke));
    window.location.href = `detail.html`;
}

function fetchAndRenderJokes(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const cardContainer = document.getElementById('joke-cards');
            cardContainer.innerHTML = '';

            const jokes = data.jokes || [data];
            console.log(jokes)

            jokes.forEach(joke => {
                const card = document.createElement("div");
                card.classList.add("joke-card");
            
                let content = '';
            
                if (joke.type === "twopart") {
                    content = `
                        <div class='book'>
                            <div class="page">
                                <div class="side left">
                                    <p class="setup">${joke.setup}</p>
                                </div>
                                <div class="side right blurred" onclick="revealDelivery(this)">
                                    <p class="delivery">${joke.delivery}</p>
                                </div>
                            </div>
                        </div>
                    `;
                } else if (joke.type === "single") {
                    content = `
                        <div class="single">
                            <div class="page one-side">
                                <p class="joke">${joke.joke}</p>
                            </div>
                        </div>
                    `;
                } else {
                    content = `<p>Tipo desconocido de chiste.</p>`;
                }
            
                card.innerHTML = content;
            
                if (joke.type === "twopart") {
                    const leftSide = card.querySelector('.side.left');
                    console.log(joke)
                    leftSide.addEventListener('click', () => goToJoke(joke));
                }
                
                if (joke.type === "single") {
                    const singleCard = card.querySelector('.page.one-side');
                    singleCard.addEventListener('click', () => goToJoke(joke));
                }                
            
                cardContainer.appendChild(card);
            });
        })
        .catch(err => {
            alert("Ocurrió un error al obtener los chistes: " + err.message);
        });
}

document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita recargar la página

    const form = new FormData(this);
    const selectedCategories = [];
    const blacklistFlags = [];
    const jokeTypes = [];

    // Recolectar categorías
    document.querySelectorAll("input[name='categories']:checked").forEach(cb => {
        if (cb.value !== 'any') selectedCategories.push(cb.value);
    });
    const categories = selectedCategories.length ? selectedCategories.join(",") : "Any";

    // Recolectar blacklist
    document.querySelectorAll("input[name='black-list']:checked").forEach(cb => {
        if (cb.value !== 'none') blacklistFlags.push(cb.value);
    });

    // Recolectar tipos de chistes
    document.querySelectorAll("input[name='joke-type']:checked").forEach(cb => {
        jokeTypes.push(cb.value);
    });

    const lang = form.get("language");
    const amount = form.get("amount") || 10;

    // Construir URL base
    let url = `https://v2.jokeapi.dev/joke/${categories}?lang=${lang}&amount=${amount}`;

    if (blacklistFlags.length) url += `&blacklistFlags=${blacklistFlags.join(",")}`;
    if (jokeTypes.length === 1) url += `&type=${jokeTypes[0]}`;

    console.log("Generated URL:", url);
    fetchAndRenderJokes(url);
});

function revealDelivery(element) {
    element.classList.add("revealed");
    element.classList.remove("blurred");
}

function clearForm() {
    document.getElementById('searchForm').reset();
}

// Utilidad para manejar exclusión entre "Ninguna" y el resto
function setupExclusiveCheckboxes(noneId, groupName) {
    const noneCheckbox = document.getElementById(noneId);
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.id === noneId && checkbox.checked) {
                // Si se marca "Ninguna", desmarcar todas las demás
                checkboxes.forEach(cb => {
                    if (cb.id !== noneId) cb.checked = false;
                });
            } else if (checkbox.id !== noneId && checkbox.checked) {
                // Si se marca una diferente a "Ninguna", desmarcar "Ninguna"
                noneCheckbox.checked = false;
            }

            // Si ninguna está marcada (todas se desmarcan manualmente), vuelve a marcar "Ninguna" por defecto
            const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
            if (!anyChecked) noneCheckbox.checked = true;
        });
    });
}

base_url = "https://v2.jokeapi.dev/joke/Any?lang=es&amount=10"

document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderJokes(base_url);
    setupExclusiveCheckboxes('cat-any', 'categories');
    setupExclusiveCheckboxes('black-none', 'black-list');
});