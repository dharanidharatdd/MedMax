document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log('Retrieved cart:', cart);

    if (cart.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your cart is empty.';
        cartItemsContainer.appendChild(emptyMessage);
    } else {
        cart.forEach((medicine, index) => {
            const itemRow = document.createElement('div');
            itemRow.className = 'row';
            itemRow.style.borderRadius = '10px';
            itemRow.style.backgroundColor = 'silver';
            itemRow.style.marginBottom = '10px'; // Add some spacing between items

            const imgCol = document.createElement('div');
            imgCol.className = 'col-2';

            const itemHeaderRow = document.createElement('div');
            itemHeaderRow.className = 'row';
            const itemHeader = document.createElement('h1');
            itemHeader.textContent = 'Item:';
            itemHeaderRow.appendChild(itemHeader);

            const imgRow = document.createElement('div');
            imgRow.className = 'row';
            const img = document.createElement('img');
            img.src = medicine.image;
            img.id = 'medicineImage';
            img.alt = medicine.name;
            img.style.width = '100px'; // Set fixed width
            img.style.height = '100px'; // Set fixed height
            img.style.objectFit = 'cover'; // Ensure the image fits within the frame
            imgRow.appendChild(img);

            const nameRow = document.createElement('div');
            nameRow.className = 'row';
            const name = document.createElement('h3');
            const nameBold = document.createElement('b');
            nameBold.id = 'medicineName';
            nameBold.textContent = medicine.name;
            name.appendChild(nameBold);
            nameRow.appendChild(name);

            imgCol.appendChild(itemHeaderRow);
            imgCol.appendChild(imgRow);
            imgCol.appendChild(nameRow);

            const descCol = document.createElement('div');
            descCol.className = 'col-4 mt-5 mx-4';
            const descHeader = document.createElement('h2');
            descHeader.textContent = 'Description:';
            const descPara = document.createElement('p');
            descPara.textContent = medicine.description; // Use the description from the medicine object
            descCol.appendChild(descHeader);
            descCol.appendChild(descPara);

            const qtyCol = document.createElement('div');
            qtyCol.className = 'col-3 mx-4';
            const qtyHeader = document.createElement('h1');
            qtyHeader.className = 'mt-5';
            qtyHeader.textContent = 'Quantity:';
            const qtyInput = document.createElement('input');
            qtyInput.type = 'number';
            qtyInput.name = 'quantity';
            qtyInput.id = 'quantity';
            qtyInput.value = medicine.quantity;
            qtyInput.step = '1';
            qtyInput.style.border = 'none';
            qtyInput.style.borderBottom = '2px solid black';
            qtyInput.style.fontSize = 'large';
            qtyInput.style.fontWeight = '700';
            qtyInput.className = 'text-center my-5';
            qtyInput.addEventListener('change', (event) => {
                medicine.quantity = parseInt(event.target.value);
                localStorage.setItem('cartItems', JSON.stringify(cart));
            });
            qtyCol.appendChild(qtyHeader);
            qtyCol.appendChild(qtyInput);

            const removeCol = document.createElement('div');
            removeCol.className = 'col-2 my-5';
            const removeButton = document.createElement('button');
            removeButton.className = 'btn btn-danger';
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                cart.splice(index, 1);
                localStorage.setItem('cartItems', JSON.stringify(cart));
                window.location.reload();
            });
            removeCol.appendChild(removeButton);

            const buyCol = document.createElement('div');
            buyCol.className = 'col-2 my-5';
            const buyRow = document.createElement('div');
            buyRow.className = 'row mt-5';
            const buyButton = document.createElement('a');
            buyButton.href = './order.html';
            buyButton.className = 'btn btn-danger text-center';
            buyButton.style.color = 'black';
            buyButton.style.fontSize = 'larger';
            buyButton.style.fontWeight = '600';
            buyButton.textContent = 'Proceed to Buy';
            buyRow.appendChild(buyButton);
            buyCol.appendChild(buyRow);

            itemRow.appendChild(imgCol);
            itemRow.appendChild(descCol);
            itemRow.appendChild(qtyCol);
            itemRow.appendChild(removeCol);
            itemRow.appendChild(buyCol);

            cartItemsContainer.appendChild(itemRow);
        });
    }
});