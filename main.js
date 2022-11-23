fetch(`http://localhost:3000/api/wishes`)
    .then(response => response.json())
    .then(function (wishes) {
        renderWishes(wishes);
        registerEvents(wishes);
    });

function renderWishes(wishes) {
    //console.log(wishes);
    const ul = document.querySelector('ul#wishes');
    ul.innerHTML = '';
    //console.log(ul);
    for (let i = 0; i < wishes.length; i++) {
        const wish = wishes[i];
        //console.log(wish);
        const li = document.createElement('li');
        li.innerHTML = `
            <p class="text">${wish.text}</p>
            <p class="price">${wish.price}</p>
        `;
        ul.appendChild(li);
    }
}

function registerEvents(wishes) {
    const button = document.querySelector('button.filter');
    button.addEventListener('click', function() {
        const inputElement = document.querySelector('input');
        const minimumPrice = inputElement.value;

        // approach 1 to filtering
        const filteredWishes = [];
        for (let i = 0; i < wishes.length; i++) {
            const wish = wishes[i];
            debugger;
            if(parseFloat(wish.price) > parseFloat(minimumPrice)) {
                filteredWishes.push(wish);
            }
        }

        // approach 2 to filtering wishes using the .filter method
        const filteredWishesFilter = wishes.filter(wish => parseFloat(wish.price) > parseFloat(minimumPrice));

        renderWishes(filteredWishesFilter);
    })
}


const textInput = document.querySelector('input#text');
const descriptionInput = document.querySelector('input#description');
const priceInput = document.querySelector('input#price');
const createNewItemButton = document.querySelector('button#new-wish');
console.log(textInput, descriptionInput, priceInput, createNewItemButton);

createNewItemButton.addEventListener('click', function () {
    console.log('in create new wish');

    const text = textInput.value;
    const description = descriptionInput.value;
    const price = priceInput.value;
    const wish =  {
        text: text,
        description: description,
        price: price,
    }
    console.log(text, description, price);

    fetch('http://localhost:3000/api/wishes', {
        method: "POST",
        body: JSON.stringify(wish),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then(function (isSuccessfulString) {
            console.log(isSuccessfulString);
        });
});

