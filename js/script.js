document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    if (menuToggle && navLinks && menuIcon) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon between hamburger and close
            if (navLinks.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            } else {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        });
    }

    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all animatable elements
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });
});
// ==========================================
// Seamless Auto-Scroll Logic: Meet Our Stars
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("stars-track");
    
    if(track) {
        // Clone exactly our current stars so we create an endless loop.
        const starCards = Array.from(track.children);
        starCards.forEach(card => {
            const clone = card.cloneNode(true);
            // Hide element from Screen-readers duplicate reading 
            clone.setAttribute('aria-hidden', 'true'); 
            track.appendChild(clone);
        });

        let isHoveredOrTouched = false;
        let speed = 1.0; // Auto Pan Pixel Jump 
        
        // Loop the scrolling math 
        const loopScroll = () => {
            if (!isHoveredOrTouched) {
                track.scrollLeft += speed;
                
                // Track hits Exactly Mid-Point Wrapper
                const exactMiddle = track.scrollWidth / 2;
                if (track.scrollLeft >= exactMiddle) {
                     // Flawlessly snap back by total loop block length - creates infinite impression
                    track.scrollLeft -= exactMiddle;
                }
            }
            requestAnimationFrame(loopScroll);
        };
        requestAnimationFrame(loopScroll); // Ignite the loop animation!

        // Let humans cleanly interrupt the auto scroll timeline if grabbing!
        track.addEventListener("mouseenter", () => { isHoveredOrTouched = true; });
        track.addEventListener("mouseleave", () => { isHoveredOrTouched = false; });

        track.addEventListener("touchstart", () => { isHoveredOrTouched = true; });
        track.addEventListener("touchend", () => { isHoveredOrTouched = false; });
    }
});