# Devoir Dashboard Client - Angular & Express avec MongoDB

## Description

Ce devoir est un **tableau de bord des commandes clients** développé avec **Angular 19** pour le frontend, et **Express**/**Node.js** pour le backend. L'objectif principal de ce devoir est de séparer les couches frontend et backend et d'interagir avec une base de données **NoSQL (MongoDB)** pour gérer les commandes clients.

C'est ma première expérience avec la séparation du frontend et du backend, ainsi que l'utilisation d'une base de données NoSQL, et ce devoir m'a permis de mieux comprendre la communication entre ces deux couches ainsi que les bonnes pratiques de développement avec MongoDB.

## Technologies Utilisées

- **Frontend :**
    - **Angular 19** : Framework JavaScript pour la construction du frontend.
    - **HTML/CSS** : Structure et style des pages.
    - **Bootstrap** : Framework CSS pour le design responsive.

- **Backend :**
    - **Node.js** : Environnement d'exécution JavaScript pour le serveur.
    - **Express** : Framework pour créer des APIs RESTful en Node.js.
    - **MongoDB** : Base de données NoSQL utilisée pour stocker les informations des clients et des commandes.

## Objectifs du devoir

Le devoir consiste à créer un tableau de bord permettant de :
1. Sélectionner un client et afficher ses commandes.
2. Voir le résumé des totaux des commandes, à la fois hors taxe (HT) et toutes taxes comprises (TTC).
3. Organiser les données de manière à ce que le frontend (Angular) et le backend (Express) communiquent efficacement via des requêtes HTTP .

## Fonctionnalités

- **Sélection des clients :** L'utilisateur peut sélectionner un client parmi une liste déroulante, et les commandes de ce client sont affichées.
- **Affichage des détails des commandes :** Pour chaque commande, les détails sont présentés dans un tableau (produits, quantités, prix HT et TTC).
- **Résumé des totaux :** Un résumé affichant les totaux HT et TTC pour toutes les commandes du client sélectionné.
- **Responsive design :** L'application est conçue pour être responsive et s'adapte à différents types d'écrans grâce à **Bootstrap**.

## Structure du devoir

Le devoir est divisé en deux parties principales :

1. **Frontend (Angular)** :
    - Gère l'affichage des informations.
    - Consomme les données exposées par le backend via des requêtes HTTP.

2. **Backend (Express + MongoDB)** :
    - Fournit une API pour accéder aux données des clients et de leurs commandes.
    - Utilise MongoDB pour stocker les informations.

## Installation

### Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :
- **Node.js** (version 14 ou supérieure)
- **MongoDB** (ou MongoDB Atlas si vous préférez une base de données en ligne)

### Installation du Backend

1. Clonez le  backend :

    ```bash
    git clone https://github.com/ahyahya1616/angular-express.git
    cd angular-express/backend
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```



Le backend sera accessible à l'adresse suivante : `http://localhost:3000`.

### Installation du Frontend

1. Clonez le frontend :

    ```bash
    cd ..
    cd frontend
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```

3. Démarrez le serveur Angular :

    ```bash
    ng serve
    ```

Le frontend sera accessible à l'adresse suivante : `http://localhost:4200`.

### Configuration MongoDB

Si vous utilisez une base de données MongoDB locale, assurez-vous que MongoDB est bien démarré sur votre machine. Sinon, vous pouvez utiliser **MongoDB Atlas** pour créer une base de données en ligne.

## Fonctionnement du Dashboard

### Image 1 - Tableau de bord sans client sélectionné

![Tableau de bord sans client sélectionné](/images/image1.png)

Cette capture montre l'interface du tableau de bord avant qu'un client ne soit sélectionné. Vous pouvez voir que la liste des commandes clients est vide, et la section de sélection d'un client est visible.

### Image 2 - Tableau de bord avec un client sélectionné

![Tableau de bord avec un client sélectionné](/images/image2.png)

Cette capture montre l'interface après la sélection d'un client. Les commandes de ce client sont affichées, et les totaux HT et TTC sont calculés et affichés dans le tableau de bord.

## Problèmes rencontrés et solutions

### Problème : Problème de communication entre le frontend et le backend
- **Solution :** Après quelques ajustements dans les configurations CORS et dans les appels HTTP dans Angular, j'ai pu résoudre les problèmes de communication entre le frontend et le backend.


## Conclusion

Ce devoir m'a permis d'acquérir une expérience précieuse dans le développement d'applications web modernes, notamment dans la gestion des interactions entre un frontend basé sur Angular et un backend Express avec MongoDB. Séparer le frontend et le backend m'a aidé à mieux comprendre comment ces deux parties interagissent, tout en utilisant une base de données NoSQL pour gérer les informations clients.


