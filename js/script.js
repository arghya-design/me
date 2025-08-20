var getHubergerIcon = document.getElementById("hamburger-menu");
    var getHubergerCrossIcon = document.getElementById("hamburger-cross");
    var getMobileMenu = document.getElementById("mobile-menu");

    getHubergerIcon.addEventListener("click", function () {
        console.log("hello");
        getMobileMenu.style.display = "flex";
        setTimeout(function () {
            getMobileMenu.style.transform = "translateX(0%)"; // Slide in the menu
        }, 50); // Add a small delay for better transition effect
    });

    getHubergerCrossIcon.addEventListener("click", function () {
        console.log("hello");
        getMobileMenu.style.transform = "translateX(-100%)"; // Slide out the menu
        setTimeout(function () {
            getMobileMenu.style.display = "none";
        }, 300); // Wait for the transition to end before hiding
    });

    // Check if screen size changes to desktop view and hide mobile menu
    window.addEventListener("resize", function () {
        if (window.innerWidth > 770) {
            getMobileMenu.style.display = "none";
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    // Add hover effects and 3D tilt animation
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 15;
            const rotateX = (centerY - y) / 15;
            
            // Apply the 3D rotation
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            
            // Shine effect follows mouse
            const shine = card.querySelector('.shine');
            shine.style.opacity = "1";
            shine.style.transform = `rotate(30deg) translateX(${x / 10}%)`;
        });
        
        // Reset the card's transform when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            const shine = card.querySelector('.shine');
            shine.style.opacity = "0";
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 500);
        });
    });
    
    // Add animations for pricing amount
    const amounts = document.querySelectorAll('.amount');
    amounts.forEach(amount => {
        const targetValue = parseInt(amount.textContent);
        animateValue(amount, 0, targetValue, 1500);
    });
    
    // Add selection functionality
    const selectButtons = document.querySelectorAll('.select-btn');
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const tier = card.dataset.tier;
            
            // Reset all cards
            cards.forEach(c => c.classList.remove('selected'));
            
            // Mark this card as selected
            card.classList.add('selected');
            
            // Pulse animation
            card.classList.add('pulse');
            setTimeout(() => {
                card.classList.remove('pulse');
            }, 500);
            
            // You can add more logic here for selecting a pricing tier
            console.log(`Selected tier: ${tier}`);
        });
    });
});

// Function to animate counting up numbers
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add this CSS dynamically
document.head.insertAdjacentHTML('beforeend', `
<style>
.card.selected {
    border-color: var(--gold);
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
}

.card.pulse {
    animation: pulse 0.5s ease-out;
}

@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); }
    70% { box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); }
    100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
}

.card.clicked {
    transform: scale(0.98) !important;
    transition: transform 0.2s ease;
}

.features li {
    opacity: 0;
    transform: translateY(10px);
    animation: fadeInUp 0.5s forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
`);

// Apply staggered animation to features list items
document.addEventListener('DOMContentLoaded', () => {
    const featuresList = document.querySelectorAll('.features li');
    featuresList.forEach((item, index) => {
        item.style.animationDelay = `${index * 100 + 300}ms`;
    });
});