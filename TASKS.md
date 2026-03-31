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

---

# 📌 Tâches du 01/04/2026

## 🎨 Front-end & Intégration

L'objectif principal de cette session est de transformer les maquettes haute fidélité en composants fonctionnels et de structurer la logique narrative.

---

### 🛠️ Tâches prioritaires

#### 1. Intégration de l'Interface Utilisateur (UI)
* **Mise en œuvre du Design System** : Intégration des composants visuels fournis par l'équipe design (Figma/Adobe XD).
* **Responsive Design** : Adaptation des vues pour les différents formats d'écran.

#### 2. Logique de Progression des Personnages
* **Système d'Étapes (Stepper)** : Développement du moteur de navigation permettant de suivre l'évolution de chaque personnage de manière indépendante.
* **Gestion d'État** : Mise en place de la persistance des étapes pour éviter la perte de progression lors de la navigation.

#### 3. Gestion du Contenu Dynamique
* **Mapping Questions/Réponses** : Injection des données textuelles pour chaque embranchement narratif.
* **Validation des flux** : Vérification de la cohérence entre les réponses sélectionnées et les étapes suivantes déclenchées.

---

### ✅ État d'avancement
- [ ] **UI** : Intégration globale
- [ ] **Logique** : Système d'étapes par personnage
- [ ] **Contenu** : Questions/Réponses liées aux étapes