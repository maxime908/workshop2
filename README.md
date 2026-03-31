# Workshop 2

## Étape 1 : Récupération du projet

Pour commencer, vous devez récupérer les fichiers sources depuis le dépôt GitHub.

1.  **Cloner le dépôt** :
    Ouvrez votre terminal et utilisez la commande `git clone` avec l'URL du projet.
    ```bash
    git clone <URL_DU_DEPOT_GITHUB>
    ```

2.  **Se déplacer dans le projet** :
    Entrez dans le dossier principal qui vient d'être créé.
    ```bash
    cd <NOM_DU_PROJET>
    ```

---

## Étape 2 : Configuration du Front-end

Avant de lancer l'application, nous devons nous placer dans le répertoire contenant l'interface utilisateur et installer les outils nécessaires.

1.  **Accéder au dossier front** :
    ```bash
    cd front
    ```

2.  **Installer les dépendances** :
    Cette étape permet de télécharger tous les paquets nécessaires au fonctionnement du projet (dossier `node_modules`).
    ```bash
    npm install
    ```

---

## Étape 3 : Lancement du serveur

Une fois que les dépendances sont installées, vous pouvez démarrer l'environnement de développement.

1.  **Démarrer le serveur** :
    ```bash
    npm run dev
    ```

2.  **Accès au site** :
    Une fois la commande lancée, le terminal affichera une adresse locale. Cliquez sur le lien ou rendez-vous sur :
    - `http://localhost:5173` (ou l'adresse indiquée par votre terminal).

---
> **Rappel** : N'oubliez pas de garder votre terminal ouvert tant que vous travaillez sur le projet !
---

## Étape 4 : Test du projet (Mobile & Desktop)

Pour tester l'interactivité entre les différents affichages, suivez scrupuleusement ces étapes :

### 1. Préparation des fenêtres
Ouvrez votre navigateur et préparez deux fenêtres (ou deux onglets côte à côte) sur l'URL du projet :

* **Fenêtre 1 (Vue Mobile) :**
    Dans cette première fenêtre, cliquez sur la section **Mobile Saul Bass**.
* **Fenêtre 2 (Vue Desktop) :**
    Dans cette seconde fenêtre, cliquez sur la section **Desktop Saul Bass**.

### 2. Scénario de test
Une fois les deux sections ouvertes, vous pouvez tester le flux de l'application :

1.  Sur la **page mobile**, appuyez sur le bouton **Commencer**.
2.  Suivez ensuite l'enchaînement des étapes en cliquant successivement sur :
    * **Étape 1**
    * **Étape 2**
    * **Étape 3**

3.  Observez les changements et les interactions qui s'opèrent entre votre vue mobile et votre vue desktop.

---
**Note :** Assurez-vous que les deux fenêtres sont bien connectées au même serveur local pour que les interactions fonctionnent correctement.