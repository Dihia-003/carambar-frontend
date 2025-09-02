// Configuration centralisée pour l'application Carambar
const CONFIG = {
    API_BASE_URL: 'https://carambar-api-lndl.onrender.com',
    API_ENDPOINTS: {
        RANDOM_JOKE: '/api/blagues/random',
        ADD_JOKE: '/api/blagues',
        AUTH: '/api/auth'
    }
};

// Fonction utilitaire pour initialiser le menu burger
function initBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (!burgerMenu || !mobileMenu || !mobileMenuOverlay) return;
    
    // Toggle du menu
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
    });
    
    // Fermer le menu en cliquant sur l'overlay
    mobileMenuOverlay.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
    });
    
    // Fermer le menu en cliquant sur un lien
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('mobile-link')) {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        }
    });
    
    // Fermer le menu en cliquant sur le bouton de déconnexion mobile
    const mobileLogoutButton = document.getElementById('mobileLogoutButton');
    if (mobileLogoutButton) {
        mobileLogoutButton.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        });
    }
}
