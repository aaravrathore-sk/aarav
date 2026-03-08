// Room Data (Ab har room ke paas multiple photos hain)
const rooms = [
    {
        id: 1,
        title: "Deluxe Room",
        price: 3000,
        desc: "A comfortable and spacious room with modern amenities, perfect for couples or solo travelers.",
        images: [
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Bathroom
            "https://images.unsplash.com/photo-1592229505726-ca121723b8ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"  // View
        ]
    },
    {
        id: 2,
        title: "Semi Deluxe Room",
        price: 5000,
        desc: "Upgraded comfort with premium bedding, city view, and extra space for your relaxation.",
        images: [
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560067174-c5a3a8f37060?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 3,
        title: "Super Deluxe Room",
        price: 8000,
        desc: "The ultimate luxury experience. Features a jacuzzi, king-size bed, and a breathtaking panoramic view.",
        images: [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1522771731470-ea131db21590?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" // Extra photo
        ]
    }
];

// Load Rooms into the Grid
const roomGrid = document.getElementById('room-grid');

rooms.forEach(room => {
    const card = document.createElement('div');
    card.classList.add('room-card');
    card.innerHTML = `
        <img src="${room.images[0]}" alt="${room.title}"> <div class="room-info">
            <h3>${room.title}</h3>
            <p>₹${room.price} / night</p>
            <button class="btn" style="width: 100%;">View Details & Book</button>
        </div>
    `;
    card.addEventListener('click', () => openModal(room));
    roomGrid.appendChild(card);
});

// Modal Logic & Image Gallery Logic
const modal = document.getElementById('room-modal');
const closeBtn = document.querySelector('.close-btn');

function openModal(room) {
    document.getElementById('modal-title').innerText = room.title;
    document.getElementById('modal-desc').innerText = room.desc;
    
    // Setup Image Gallery
    const mainImg = document.getElementById('main-modal-img');
    const thumbContainer = document.getElementById('thumbnail-container');
    
    mainImg.src = room.images[0]; // Set default main image
    thumbContainer.innerHTML = ''; // Clear old thumbnails

    // Generate thumbnails dynamically
    room.images.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        if (index === 0) thumb.classList.add('active'); // Make first thumb active
        
        // When a thumbnail is clicked
        thumb.addEventListener('click', () => {
            mainImg.src = imgSrc; // Change main image
            
            // Remove 'active' class from all thumbs, add to clicked one
            document.querySelectorAll('.thumbnail-container img').forEach(img => img.classList.remove('active'));
            thumb.classList.add('active');
        });
        
        thumbContainer.appendChild(thumb);
    });

    // Payment Logic (50% Advance)
    const totalPrice = room.price;
    const advancePrice = totalPrice * 0.50;
    document.getElementById('modal-total-price').innerText = totalPrice;
    document.getElementById('modal-advance').innerText = advancePrice;
    
    modal.style.display = 'flex';
}

// Close Modal Logic
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form Submission
document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const advanceAmount = document.getElementById('modal-advance').innerText;
    alert(`Redirecting to Secure Payment Gateway to pay ₹${advanceAmount}...\n\n(This is where the Backend Developer will connect the actual API)`);
    modal.style.display = 'none';
});