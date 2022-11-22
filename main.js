fetch(`http://localhost:3000/api/wishes`)
    .then(response => response.json())
    .then(function (wishes) {
        renderWishes(wishes);
        registerEvents(wishes);
    });

function renderWishes(wishes) {
    console.log(wishes);
    const ul = document.querySelector('ul#wishes');
    ul.innerHTML = '';
    console.log(ul);
    for (let i = 0; i < wishes.length; i++) {
        const wish = wishes[i];
        console.log(wish);
        const li = document.createElement('li');
        li.innerHTML = `
            <p class="text">${wish.text}</p>
            <p class="price">${wish.price}</p>
        `;
        ul.appendChild(li);
    }
}

function registerEvents(wishes) {
    console.log(wishes);
    const button = document.querySelector('button.filter');
    console.log(button);
    button.addEventListener('click', function() {
        console.log('button clicked');
        const inputElement = document.querySelector('input');
        console.log(inputElement);
        const minimumPrice = inputElement.value;
        console.log(minimumPrice);
        const filteredWishes = [];
        for (let i = 0; i < wishes.length; i++) {
            const wish = wishes[i];
            console.log(wish.price);
            console.log(minimumPrice);
            console.log(wish.price > minimumPrice);
            if(parseFloat(wish.price) > parseFloat(minimumPrice)) {
                filteredWishes.push(wish);
            }
        }

        const filteredWishesFilter = wishes.filter(wish => parseFloat(wish.price) > parseFloat(minimumPrice));

        console.log(filteredWishesFilter);

        renderWishes(filteredWishesFilter);
    })

}



