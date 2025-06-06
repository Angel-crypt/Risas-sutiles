fetch("https://v2.jokeapi.dev/joke/Programming?lang=es&amount=10")
    .then(res => res.json())
    .then(data => {
        amount = data.amount
        for (let i = 0; i < amount; i++) {
            let type = data.jokes[i].type
            switch (type) {
                case 'twopart':
                    console.log(data.jokes[i].type)
                    console.log(data.jokes[i].setup)
                    console.log(data.jokes[i].delivery)
                    break;

                case 'single':
                    console.log(data.jokes[i].joke)
                    break;

                default:
                    break;
            }

        }
    })
    .catch(error => alert(error))