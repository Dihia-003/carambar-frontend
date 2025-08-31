// --- Configuration Globale ---
// On définit l'URL de base de notre API pour ne pas avoir à la répéter partout.
const API_BASE_URL = 'https://carambar-api-lndl.onrender.com';
// On construit l'URL spécifique pour récupérer une blague aléatoire.
const API_RANDOM_JOKE_URL = `${API_BASE_URL}/blague`;

// --- Sélection des Éléments du DOM ---
// On récupère toutes les parties de notre page HTML avec lesquelles on veut interagir.
// C'est une bonne pratique de le faire au début du script.
const jokeButton = document.getElementById('jokeButton'); // Le bouton principal
const newJokeButton = document.getElementById('newJokeButton'); // Le bouton "Une autre blague"
const retryButton = document.getElementById('retryButton'); // Le bouton pour réessayer en cas d'erreur
const jokeContainer = document.getElementById('jokeContainer'); // Le conteneur qui affiche la blague
const loadingContainer = document.getElementById('loadingContainer'); // Le conteneur pour l'animation de chargement
const errorContainer = document.getElementById('errorContainer'); // Le conteneur pour les messages d'erreur
const jokeText = document.getElementById('jokeText'); // Le paragraphe pour le texte de la blague
const jokeAuthor = document.getElementById('jokeAuthor'); // Le paragraphe pour l'auteur
const errorText = document.getElementById('errorText'); // Le paragraphe pour le message d'erreur
const confettiContainer = document.getElementById('confettiContainer'); // Le conteneur pour les confettis

// --- État de l'Application ---
// On utilise une variable pour savoir si une requête est déjà en cours.
// Cela évite que l'utilisateur ne clique 10 fois sur le bouton et ne lance 10 requêtes.
let isLoading = false;

// --- Initialisation de l'application ---
// 'DOMContentLoaded' est un événement qui se déclenche quand toute la page HTML est chargée et prête.
document.addEventListener('DOMContentLoaded', () => {
    console.log('🍬 Carambar & Co - Application de blagues chargée !');
    
    // On attache nos fonctions aux événements 'click' des boutons.
    jokeButton.addEventListener('click', fetchRandomJoke);
    newJokeButton.addEventListener('click', fetchRandomJoke);
    retryButton.addEventListener('click', fetchRandomJoke);
    
    // On lance une petite animation d'entrée pour le style.
    animateOnLoad();
});

// --- Fonctions Principales ---

/**
 * @description La fonction la plus importante : elle contacte l'API pour récupérer une blague.
 * C'est une fonction 'async' pour pouvoir utiliser 'await' et gérer les requêtes réseau de manière propre.
 */
async function fetchRandomJoke() {
    // Si une requête est déjà en cours, on ne fait rien.
    if (isLoading) return;
    
    // On utilise un bloc try...catch...finally pour bien gérer tous les cas.
    try {
        // Le bloc 'try' contient le "chemin heureux" : ce qu'on essaie de faire.
        setLoadingState(true); // On passe en état de chargement.
        
        // On appelle l'API avec la fonction 'fetch' du navigateur.
        const response = await fetch(API_RANDOM_JOKE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        // Si la réponse du serveur n'est pas un succès (ex: erreur 404 ou 500), on lève une erreur.
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        // On transforme la réponse (qui est du texte) en un objet JavaScript (JSON).
        const data = await response.json();
        
        // On vérifie que la réponse de l'API est bien celle que l'on attend.
        if (data.success && data.data) {
            displayJoke(data.data); // Si tout est bon, on affiche la blague.
            createConfetti(); // Et on lance des confettis pour la fête !
        } else {
            // Si l'API renvoie un succès mais pas de blague, on lève une erreur.
            throw new Error('Aucune blague disponible');
        }
        
    } catch (error) {
        // Le bloc 'catch' s'exécute si une erreur est survenue dans le bloc 'try'.
        console.error('Erreur lors de la récupération de la blague:', error);
        displayError(error.message); // On affiche un message d'erreur à l'utilisateur.
    } finally {
        // Le bloc 'finally' s'exécute toujours, que ça ait réussi ou échoué.
        setLoadingState(false); // On quitte l'état de chargement.
    }
}

// --- Fonctions d'Affichage (UI - User Interface) ---

/**
 * @description Met à jour le DOM pour afficher la blague reçue.
 * @param {object} joke - L'objet blague contenant 'contenu' et 'auteur'.
 */
function displayJoke(joke) {
    jokeText.textContent = joke.contenu;
    jokeAuthor.textContent = `Par ${joke.auteur || 'Anonyme'}`;
    
    // On cache tous les autres conteneurs et on affiche celui de la blague.
    hideAllContainers();
    jokeContainer.classList.remove('hidden');
    
    // On ajoute une petite animation d'apparition.
    jokeContainer.style.opacity = '0';
    jokeContainer.style.transform = 'translateY(20px)';
    setTimeout(() => {
        jokeContainer.style.transition = 'all 0.5s ease-out';
        jokeContainer.style.opacity = '1';
        jokeContainer.style.transform = 'translateY(0)';
    }, 100);
}

/**
 * @description Met à jour le DOM pour afficher un message d'erreur.
 * @param {string} message - Le message d'erreur à afficher.
 */
function displayError(message) {
    errorText.textContent = message || 'Une erreur s\'est produite lors du chargement de la blague.';
    hideAllContainers();
    errorContainer.classList.remove('hidden');
    
    // Animation d'apparition
    errorContainer.style.opacity = '0';
    errorContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        errorContainer.style.transition = 'all 0.5s ease-out';
        errorContainer.style.opacity = '1';
        errorContainer.style.transform = 'translateY(0)';
    }, 100);
}

/**
 * @description Gère l'affichage ou non de l'indicateur de chargement.
 * @param {boolean} loading - Vrai si on doit afficher le chargement, faux sinon.
 */
function setLoadingState(loading) {
    isLoading = loading;
    
    if (loading) {
        hideAllContainers();
        loadingContainer.classList.remove('hidden');
        
        // Animation d'apparition
        loadingContainer.style.opacity = '0';
        setTimeout(() => {
            loadingContainer.style.transition = 'opacity 0.3s ease-out';
            loadingContainer.style.opacity = '1';
        }, 100);
    }
}

/**
 * @description Une fonction utilitaire pour cacher tous les conteneurs d'un coup.
 */
function hideAllContainers() {
    jokeContainer.classList.add('hidden');
    loadingContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');
}

// --- Fonctions d'Animation et Effets ---

/**
 * @description Crée et anime des confettis pour un effet visuel amusant.
 */
function createConfetti() {
    const colors = ['#FF6B35', '#FFD23F', '#FF8E53', '#FF6B9D', '#4ECDC4'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            confettiContainer.appendChild(confetti);
            
            // On nettoie les confettis du DOM après leur animation pour ne pas surcharger la page.
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 50); // On décale le départ de chaque confetto.
    }
}

/**
 * @description Anime les éléments au premier chargement de la page.
 */
function animateOnLoad() {
    // Animation des bonbons Carambar
    const bonbons = document.querySelectorAll('.carambar-bonbon');
    bonbons.forEach((bonbon, index) => {
        bonbon.style.opacity = '0';
        bonbon.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            bonbon.style.transition = 'all 0.8s ease-out';
            bonbon.style.opacity = '1';
            bonbon.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
}

// Gestion des erreurs réseau
window.addEventListener('online', () => {
    console.log('Connexion réseau rétablie');
    if (errorContainer.classList.contains('hidden')) {
        // Si on était en erreur, on peut réessayer
        const retryButton = document.getElementById('retryButton');
        if (retryButton) {
            retryButton.textContent = 'Réessayer maintenant';
        }
    }
});

window.addEventListener('offline', () => {
    console.log('Connexion réseau perdue');
    if (!isLoading) {
        displayError('Connexion réseau perdue. Vérifiez votre connexion internet.');
    }
});

// Amélioration de l'accessibilité
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement === jokeButton || activeElement === newJokeButton || activeElement === retryButton) {
            event.preventDefault();
            activeElement.click();
        }
    }
});

// Service Worker pour le cache (optionnel pour GitHub Pages)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker enregistré:', registration);
            })
            .catch(error => {
                console.log('Échec de l\'enregistrement du Service Worker:', error);
            });
    });
}

// Analytics simple (optionnel)
function trackEvent(eventName, eventData = {}) {
    console.log('Event:', eventName, eventData);
    // Ici vous pourriez ajouter Google Analytics ou autre
}

// Tracking des interactions
jokeButton.addEventListener('click', () => trackEvent('joke_requested'));
newJokeButton.addEventListener('click', () => trackEvent('new_joke_requested'));
retryButton.addEventListener('click', () => trackEvent('retry_clicked'));

// Gestion des erreurs globales
window.addEventListener('error', (event) => {
    console.error('Erreur globale:', event.error);
    trackEvent('global_error', { message: event.error?.message });
});

// Gestion des promesses rejetées
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promesse rejetée non gérée:', event.reason);
    trackEvent('unhandled_promise_rejection', { reason: event.reason });
}); 