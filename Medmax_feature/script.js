
document.addEventListener('DOMContentLoaded', function() {
    const medicines = [
        { name: 'Aspirin', image: './Aspirin.jpg' },
        { name: 'Ibuprofen', image: './Ibuprofen.jpg' },
        { name: 'Acetaminophen (Tylenol)', image: './Acetaminophen.jpg' },
        { name: 'Amoxicillin', image: './Amoxicillin.jpg' },
        { name: 'Paracetamol', image: './paracetamol.jpg' },
        { name: 'Antacid (Tums)', image: './Antacid.jpg' },
        { name: 'Azithromycin', image: './Azithromycin.jpg' },
        { name: 'Cetirizine (Zyrtec)', image: './Cetirizine.jpg' },
        { name: 'Ciprofloxacin', image: './Ciprofloxacin.jpg' },
        { name: 'Metformin', image: './Metformin.jpg' }
    ];

    const container = document.getElementById('medicineContainer');
    
    medicines.forEach(medicine => {
        const medicineDiv = document.createElement('div');
        medicineDiv.classList.add('medicine-item', 'card');
        medicineDiv.style.backgroundColor = 'rgb(243, 79, 120)';

        const img = document.createElement('img');
        img.src = medicine.image;
        img.alt = medicine.name;
        img.className = 'card-img-top image';

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card-body';

        const name = document.createElement('h5');
        name.textContent = medicine.name;
        name.className = 'card-title';

        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'text-center';

        const button = document.createElement('a');
        button.innerHTML = 'Add to Cart';
        button.className = 'btn btn-light btn-lg';
        button.href=`#`;

        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.name === medicine.name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...medicine, quantity: 1 });
            }

            sessionStorage.setItem('cart', JSON.stringify(cart));
            console.log('Updated cart:', cart);
            window.location.href = `./cart.html`;
        });



        cardDiv.appendChild(name);
        buttonDiv.appendChild(button);
        cardDiv.appendChild(buttonDiv);

        medicineDiv.appendChild(img);
        medicineDiv.appendChild(cardDiv);

        container.appendChild(medicineDiv);
    });
});
