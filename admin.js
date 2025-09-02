// --- Configuration ---
const API_BASE_URL = 'https://carambar-api-lndl.onrender.com';
const ADMIN_PASSWORD = 'admin123'; // Mot de passe simple et fixe

// --- Éléments du DOM ---
const loginSection = document.getElementById('loginSection');
const adminSection = document.getElementById('adminSection');
const loginError = document.getElementById('loginError');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const jokesList = document.getElementById('jokesList');
const adminLogoutButton = document.getElementById('adminLogoutButton');

// --- Fonction de connexion (très simple) ---
function login() {
    const password = document.getElementById('adminPassword').value;
    
    // Vérification simple du mot de passe
    if (password === ADMIN_PASSWORD) {
        // Connexion réussie
        loginSection.style.display = 'none';
        adminSection.style.display = 'block';
        loginError.style.display = 'none';
        
        // Afficher le bouton de déconnexion dans la navbar
        if (adminLogoutButton) {
            adminLogoutButton.style.display = 'inline-block';
        }
        
        // Stockage simple en sessionStorage
        sessionStorage.setItem('isAdmin', 'true');
        
        console.log('✅ Connexion admin réussie');

        // Charger la liste des blagues
        loadJokes();
    } else {
        // Mot de passe incorrect
        loginError.style.display = 'block';
        console.log('❌ Mot de passe incorrect');
    }
}

// --- Fonction de déconnexion ---
function logout() {
    // Retour à la page de connexion
    loginSection.style.display = 'block';
    adminSection.style.display = 'none';
    
    // Cacher le bouton de déconnexion dans la navbar
    if (adminLogoutButton) {
        adminLogoutButton.style.display = 'none';
    }
    
    // Nettoyage du formulaire
    document.getElementById('blagueForm').reset();
    
    // Suppression de la session
    sessionStorage.removeItem('isAdmin');
    
    console.log('🚪 Déconnexion admin');
}

// --- Fonction d'ajout de blague ---
async function addBlague(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire
    
    // Récupération des données du formulaire
    const contenu = document.getElementById('contenu').value;
    const auteur = document.getElementById('auteur').value;
    
    // Vérification que le contenu n'est pas vide
    if (!contenu.trim()) {
        showError('Le contenu de la blague est obligatoire !');
        return;
    }
    
    try {
        // Préparation des données à envoyer
        const blagueData = {
            contenu: contenu.trim(),
            auteur: auteur.trim() || 'Anonyme'
        };
        
        console.log('📤 Envoi de la blague:', blagueData);
        
        // Appel à l'API pour ajouter la blague
        const response = await fetch(`${API_BASE_URL}/api/blagues`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blagueData)
        });
        
        // Vérification de la réponse
        if (response.ok) {
            const result = await response.json();
            console.log('✅ Blague ajoutée:', result);
            
            // Affichage du message de succès
            showSuccess('Blague ajoutée avec succès ! 🎉');
            
            // Nettoyage du formulaire
            document.getElementById('blagueForm').reset();

            // Recharger la liste
            loadJokes();
            
        } else {
            // Erreur de l'API
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de l\'ajout');
        }
        
    } catch (error) {
        console.error('❌ Erreur:', error);
        showError('Erreur lors de l\'ajout de la blague: ' + error.message);
    }
}

// --- Fonctions d'affichage des messages ---
function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    
    // Masquer le message après 3 secondes
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// --- Vérification de la session au chargement ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('🍬 Page admin chargée');
    
    // Attacher l'événement de déconnexion au bouton de la navbar
    if (adminLogoutButton) {
        adminLogoutButton.addEventListener('click', logout);
    }
    
    // Initialisation du menu burger
    initBurgerMenu();
    
    // Vérifier si l'admin est déjà connecté
    if (sessionStorage.getItem('isAdmin') === 'true') {
        loginSection.style.display = 'none';
        adminSection.style.display = 'block';
        
        // Afficher le bouton de déconnexion dans la navbar
        if (adminLogoutButton) {
            adminLogoutButton.style.display = 'inline-block';
        }
        
        // Afficher le bouton de déconnexion dans le menu mobile
        const mobileLogoutButton = document.getElementById('mobileLogoutButton');
        if (mobileLogoutButton) {
            mobileLogoutButton.style.display = 'block';
        }
        
        console.log('✅ Session admin active');
    }
});

// --- Gestion des touches ---
document.addEventListener('keydown', (event) => {
    // Entrée pour se connecter
    if (event.key === 'Enter' && document.activeElement.id === 'adminPassword') {
        login();
    }
});

// --- Chargement simple de toutes les blagues ---
async function loadJokes() {
    if (!jokesList) return;
    jokesList.innerHTML = 'Chargement...';
    try {
        const res = await fetch(`${API_BASE_URL}/api/blagues`);
        if (!res.ok) throw new Error('Erreur lors du chargement');
        const data = await res.json();
        const items = (data.data || []);
        if (items.length === 0) {
            jokesList.innerHTML = '<em>Aucune blague pour le moment.</em>';
            return;
        }
        jokesList.innerHTML = items.map(j => `
            <div style="border:1px solid #eee; border-radius:8px; padding:10px; display:flex; justify-content:space-between; gap:10px;">
                <div>
                    <div style="font-weight:700;">#${j.id}</div>
                    <div>${escapeHtml(j.contenu)}</div>
                    <div style="font-size:.9rem; color:#888;">Par ${escapeHtml(j.auteur || 'Anonyme')}</div>
                </div>
                <button class="admin-button" style="background:#e74c3c;" onclick="deleteJoke(${j.id})">Supprimer</button>
            </div>
        `).join('');
    } catch (e) {
        console.error(e);
        jokesList.innerHTML = '<span style="color:#e74c3c;">Erreur de chargement.</span>';
    }
}

// --- Suppression d'une blague ---
async function deleteJoke(id) {
    if (!confirm('Supprimer cette blague ?')) return;
    try {
        const res = await fetch(`${API_BASE_URL}/api/blagues/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Suppression impossible');
        loadJokes();
    } catch (e) {
        console.error(e);
        alert('Erreur pendant la suppression');
    }
}

// --- Gestion du menu burger ---
function initBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileLogoutButton = document.getElementById('mobileLogoutButton');
    
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
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        });
    });
    
    // Gérer le bouton de déconnexion mobile
    if (mobileLogoutButton) {
        mobileLogoutButton.addEventListener('click', () => {
            logout();
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        });
    }
}

// --- Sécurité minimale pour l'affichage ---
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
