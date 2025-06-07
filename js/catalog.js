// Redirección si no ha iniciado sesión
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '../index.html';
}

const cardContainer = document.getElementById('joke-cards');

fetch("https://v2.jokeapi.dev/joke/Any?lang=en&amount=10")
    .then(res => res.json())
    .then(data => {
        const amount = data.amount;

        for (let i = 0; i < amount; i++) {
            const joke = data.jokes[i];
            const card = document.createElement('div');
            card.classList.add('joke-card');

            let content = '';

            switch (joke.type) {
                case 'twopart':
                    content = `<p>${joke.setup}</p><p>${joke.delivery}</p>`;
                    break;
                case 'single':
                    content = `<p>${joke.joke}</p>`;
                    break;
                default:
                    content = `<p>Tipo desconocido de chiste.</p>`;
            }

            card.innerHTML = content;
            cardContainer.appendChild(card);
        }
    })
    .catch(error => alert("Error al obtener chistes: " + error));