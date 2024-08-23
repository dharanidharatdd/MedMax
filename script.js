async function sendMessage() {
    const inputBox = document.getElementById('prompt-box');
    const message = inputBox.value.trim();
    if (message) {
        displayMessage(message, 'user');
        inputBox.value = '';

        try {
            const response = await fetch('http://127.0.0.1:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: message })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            displayMessage(data.response, 'bot');
        } catch (error) {
            console.error('Error:', error);
            displayMessage('Error fetching response from server.', 'bot');
        }
    }
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('box-for-chat');
    const messageBubble = document.createElement('div');
    messageBubble.classList.add('chat-bubble', sender);
    
    if (sender === 'bot') {
        const markdownHtml = marked.parse(message);
        messageBubble.innerHTML = markdownHtml;
    } else {
        messageBubble.innerText = message;
    }

    chatBox.appendChild(messageBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Medicine List generation

// Example of adding an item to the cart and storing it in localStorage
document.addEventListener('DOMContentLoaded', () => {
    fetch('medicines.json')
        .then(response => response.json())
        .then(medicines => {
            const medicineGrid = document.getElementById('medicine-grid');
            medicines.forEach(medicine => {
                const showcase = document.createElement('div');
                showcase.className = 'showcase';

                const showcaseBanner = document.createElement('div');
                showcaseBanner.className = 'showcase-banner';

                const imgDefault = document.createElement('img');
                imgDefault.src = medicine.image;
                imgDefault.alt = medicine.name;
                imgDefault.className = 'product-img default';

                showcaseBanner.appendChild(imgDefault);

                const showcaseContent = document.createElement('div');
                showcaseContent.className = 'showcase-content';

                const showcaseCategory = document.createElement('a');
                showcaseCategory.href = '#';
                showcaseCategory.className = 'showcase-category';
                showcaseCategory.textContent = medicine.category;

                const showcaseTitle = document.createElement('a');
                showcaseTitle.href = '#';
                const showcaseTitleH3 = document.createElement('h3');
                showcaseTitleH3.className = 'showcase-title';
                showcaseTitleH3.textContent = medicine.name;
                showcaseTitle.appendChild(showcaseTitleH3);

                const priceBox = document.createElement('div');
                priceBox.className = 'price-box';
                const price = document.createElement('p');
                price.className = 'price';
                price.textContent = medicine.price;

                const addToCartButton = document.createElement('button');
                addToCartButton.className = 'btn-add-to-cart';
                addToCartButton.textContent = 'Add to Cart';

                // Add event listener to the "Add to Cart" button
                addToCartButton.addEventListener('click', () => {
                    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                    const existingItem = cartItems.find(item => item.name === medicine.name);

                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        medicine.quantity = 1;
                        cartItems.push(medicine);
                    }

                    localStorage.setItem('cartItems', JSON.stringify(cartItems));

                    // Show a confirm dialog with "View Cart" option
                    if (confirm('Item added to cart! Do you want to view your cart?')) {
                        window.location.href = 'cart.html';
                    }
                });

                priceBox.appendChild(price);
                priceBox.appendChild(addToCartButton);

                showcaseContent.appendChild(showcaseCategory);
                showcaseContent.appendChild(showcaseTitle);
                showcaseContent.appendChild(priceBox);

                showcase.appendChild(showcaseBanner);
                showcase.appendChild(showcaseContent);

                medicineGrid.appendChild(showcase);
            });
            document.getElementById('medicine-list').style.display = 'block';
        })
        .catch(error => console.error('Error fetching medicines:', error));
});

//Smooth Scroll
document.addEventListener('DOMContentLoaded', () => {
const scrollLink = document.querySelector('a[href="#exp"]');
scrollLink.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#exp').scrollIntoView({ behavior: 'smooth' });
});
});