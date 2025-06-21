# 🍬 Carambar & Co - Landing Page

Landing page moderne et interactive pour l'application de blagues de Carambar & Co, conçue pour être déployée sur GitHub Pages.

## 🎨 Fonctionnalités

- ✅ Design moderne et responsive
- ✅ Animations fluides et attrayantes
- ✅ Intégration avec l'API Carambar
- ✅ Effets visuels (confetti)
- ✅ Gestion d'erreurs élégante
- ✅ Optimisé pour mobile
- ✅ Prêt pour GitHub Pages

## 🚀 Déploiement sur GitHub Pages

### Méthode 1 : Déploiement automatique

1. **Créer un repository GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Landing page Carambar"
   git branch -M main
   git remote add origin https://github.com/votre-username/carambar-frontend.git
   git push -u origin main
   ```

2. **Configurer GitHub Pages**
   - Allez dans Settings > Pages
   - Source : "Deploy from a branch"
   - Branch : "main"
   - Folder : "/ (root)"
   - Cliquez sur "Save"

3. **Votre site sera disponible à :**
   ```
   https://votre-username.github.io/carambar-frontend/
   ```

### Méthode 2 : Déploiement manuel

1. **Installer GitHub CLI**
   ```bash
   npm install -g gh-pages
   ```

2. **Déployer**
   ```bash
   gh-pages -d .
   ```

## 🛠️ Configuration

### Variables d'environnement

Pour changer l'URL de l'API, modifiez la constante dans `script.js` :

```javascript
const API_BASE_URL = 'https://votre-api-render.com/api/v1';
```

### Personnalisation

- **Couleurs** : Modifiez les variables CSS dans `styles.css`
- **Animations** : Ajustez les keyframes dans `styles.css`
- **Contenu** : Modifiez le texte dans `index.html`

## 📱 Responsive Design

Le site est optimisé pour :
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1200px+)

## 🎯 Fonctionnalités techniques

### Animations
- Animations d'entrée fluides
- Effet confetti lors de l'affichage d'une blague
- Animations des bonbons Carambar
- Transitions CSS optimisées

### Gestion d'erreurs
- États de chargement
- Gestion des erreurs réseau
- Messages d'erreur utilisateur-friendly
- Retry automatique

### Performance
- CSS optimisé
- JavaScript modulaire
- Images optimisées (emojis)
- Lazy loading des animations

## 🔧 Structure du projet

```
carambar-frontend/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # Logique JavaScript
└── README.md           # Documentation
```

## 🎨 Design System

### Couleurs
- **Primary** : #FF6B35 (Orange Carambar)
- **Secondary** : #FFD23F (Jaune)
- **Accent** : #FF8E53 (Orange clair)
- **Text Dark** : #2C3E50
- **Text Light** : #7F8C8D

### Typographie
- **Titre** : Fredoka One (Google Fonts)
- **Corps** : Nunito (Google Fonts)

### Animations
- Durée standard : 0.3s
- Easing : cubic-bezier(0.4, 0, 0.2, 1)
- Border-radius : 20px

## 🔗 Intégration API

L'application se connecte à l'API Carambar pour :
- Récupérer des blagues aléatoires
- Gérer les erreurs de connexion
- Afficher les états de chargement

### Endpoints utilisés
- `GET /api/v1/blagues/random` - Blague aléatoire

## 🧪 Tests

Pour tester localement :

1. **Démarrer l'API**
   ```bash
   cd ../carambar-api
   npm run dev
   ```

2. **Ouvrir le frontend**
   - Ouvrez `index.html` dans votre navigateur
   - Ou utilisez un serveur local :
   ```bash
   python -m http.server 8000
   # Puis ouvrez http://localhost:8000
   ```

## 📊 Analytics

L'application inclut un système de tracking simple :
- Clics sur les boutons
- Erreurs globales
- Promesses rejetées

## 🔒 Sécurité

- Validation des données côté client
- Gestion sécurisée des erreurs
- Pas d'informations sensibles exposées

## 🌐 Compatibilité

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile Safari
- ✅ Chrome Mobile

## 📝 Licence

Ce projet est sous licence ISC.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Ouvrir une issue
- Proposer une pull request
- Améliorer la documentation

---

**Développé avec ❤️ pour Carambar & Co**

🍬 *Parce que la vie est plus douce avec une blague !* 🍬 