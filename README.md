## 📌 Système de Gestion des Réclamations Étudiantes

Application web complète permettant aux étudiants de soumettre des réclamations avec validation par code sécurisé.

### ✨ Fonctionnalités principales
- **Formulaire de réclamation** avec validation en temps réel
- **Vérification du code étudiant** contre la base de données
- **Interface admin** pour visualiser toutes les réclamations
- **Système de feedback** avec messages de succès/erreur
- **Design responsive** avec Tailwind CSS

### 🛠 Stack technique
- **Backend**: Node.js + Express
- **Base de données**: MySQL
- **Templating**: Handlebars
- **Frontend**: Tailwind CSS
- **Validation**: Système de code personnalisé

### 🚀 Installation
1. Cloner le dépôt
2. `npm install`
3. Configurer la base de données (voir `database.sql`)
4. `node app.js`

### 📊 Structure de la base
- Table `reclamation` (id, num_cart, nom, prenom, reclamation, code, created_at)

Idéal pour les établissements scolaires cherchant un système simple de gestion des réclamations.
