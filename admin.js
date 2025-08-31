// --- Configuration ---
const API_BASE_URL = 'https://carambar-api-lndl.onrender.com';
const ADMIN_PASSWORD = 'admin123'; // Mot de passe simple et fixe

// --- Éléments du DOM ---
const loginSection = document.getElementById('loginSection');
const adminSection = document.getElementById('adminSection');
const loginError = document.getElementById('loginError');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// --- Fonction de connexion (très simple) ---
function login() {
    const password = document.getElementById('adminPassword').value;
    
    // Vérification simple du mot de passe
    if (password === ADMIN_PASSWORD) {
        // Connexion réussie
        loginSection.style.display = 'none';
        adminSection.style.display = 'block';
        loginError.style.display = 'none';
        
        // Stockage simple en sessionStorage
        sessionStorage.setItem('isAdmin', 'true');
        
        console.log('✅ Connexion admin réussie');
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
    
    // Vérifier si l'admin est déjà connecté
    if (sessionStorage.getItem('isAdmin') === 'true') {
        loginSection.style.display = 'none';
        adminSection.style.display = 'block';
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
