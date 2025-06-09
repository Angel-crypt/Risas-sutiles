// Redirección si no ha iniciado sesión
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '../index.html';
}

function revealDelivery(element) {
  element.classList.add('revealed');
  element.classList.remove('blurred');
}


const cardContainer = document.getElementById('joke-cards');

fetch("https://v2.jokeapi.dev/joke/Any?lang=en&amount=100")
    .then(res => res.json())
    .then(data => {
        const amount = data.amount;

        for (let i = 0; i < amount; i++) {
            const joke = data.jokes[i];
            const card = document.createElement('div');
            card.classList.add('joke-card');

            let content = '';

            if (joke.type === 'twopart') {
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
              } else if (joke.type === 'single') {
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
            cardContainer.appendChild(card);
        }
    })
    .catch(error => alert("Error al obtener chistes: " + error));