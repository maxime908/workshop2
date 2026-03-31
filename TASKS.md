# 📌 Tâches du 31/03/2026

## 🎨 Front-end

### 🔧 Mise en place
- Importer la base de données fournie dans le fichier SQL (dossier `api`) afin de pouvoir tester l’API en local.

### 🔗 Connexion à l’API
- Utiliser **Axios** pour effectuer des requêtes **GET**.
- Générer dynamiquement les boutons correspondant aux différents personnages à partir des données récupérées.

### 🧭 Navigation & interaction
- Implémenter un système permettant, lors du clic sur un bouton personnage :
  - de rediriger vers une nouvelle page,
  - d’y afficher les **questions et réponses associées**.

### 🎮 Gestion de partie (game)
- Lors du clic sur un personnage :
  - envoyer une requête à l’API pour **créer une nouvelle partie**.
- À la fin de la partie :
  - envoyer une requête pour **mettre à jour la partie** (score, progression, etc.).

---

## ⚙️ Back-end
- Gestion des parties (création, mise à jour)