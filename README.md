# SPA_Zelda
TP noté de complément web S4

## Description générale du projet  

Ce projet a été réalisé dans le cadre du module R4.10 Complément web.
L'objectif est de concevoir une Single Page Application (SPA) en javascript en utilisant une API via json-server.
Le projet permet de découvrir l'univers du jeu Zelda Breath of the Wild: personnages, équipements et monstres. Il est possible de rechercher un équipement, un personnage ou encore un monstre, de mettre en favoris des personnages et des équipements. Il est également possible de noté les équipements.

## Composition de l'équipe de développeuses

- Blandin Pernelle (@PernelleBlandin)   
- Hachelef Asma (@Asminouch)  

## Installation et lancement
### Packages nécessaires au lancement de la Single Page Application (SPA)
Nous utilisons json-server, qui nous permet d'imiter une API Rest et de fournir un accès dynamique aux données, à l'aide d'un simple fichier JSON.

Installer le json-server : 
    `npm install json-server`

### Lancement de la page

Pour faire fonctionner la SPA, vous devez ouvrir deux terminaux


**Terminal 1: lancement de l'API** :
    `npx json-server --watch ./data/zelda.json`

Vous pouvez accéder aux données de l'api en cliquant sur les liens qui apparaissent:
  
- http://localhost:3000/personnages
- http://localhost:3000/monstres
- http://localhost:3000/equipements
- http://localhost:3000/categories



**Terminal 2 lancement du serveur web** :
    `php -S localhost:8080`

Vous pouvez accédez à l'application en cliquant sur `http://localhost:8080`


**Remarque**

Pour voir les images, soyez bien connecté à Internet.


### Explication des routes mises en place

Le routeur dynamique gère les changements de hash, pour afficher les pages sans recharger le navigateur.

- `#/` : Page d'accueil
- `#/personnages` : Récupère la liste complète des personnages
- `#/personnages/:id` : Récupère les détails d'un personnage spécifique
- `#/equipements` : Récupère la liste complète des équipements
- `#/equipements/:id` : Récupère les détails d'un équipement spécifique
- `#/monstres` : Récupère la liste complète des monstres
- `#/monstres/:id` : Récupère les détails d'un monstre spécifique
- `#/about` : Page d'informations sur le projet
- `#/favoris` : Récupère la liste complète des éléments favoris


**Remarques**

Si une route n'existe pas (ex: `#/toto` ), alors le routeur renvoie vers la page `Error404`.

## Organisation du code

Le code est structuré avec différents modules, pour respecter les principes de séparation des responsabilités.

- app.js : Initialise le routeur et gèle les évenements globaux (recherche, clics).
- services/ : Contient la logique d'accès aux données.
    - Utils.js: Fonctions utilitaires (parsing d'URL).
    - Les Providers (ex: WeaponProvider.js): Gère les appels fetch vers le json-server.
- views/ : Contient les composant de rendu HTML
    - pages/ : Chaque fichier (ex: Home.js ou WeaponShow.js) possède une méthode `render()`pour le HTML et certains ont une méthode `after_render()` pour gérer l'intéractivité.
  
## Bundle
Afin de déployer l'application en production avec un bundler nous avons fait le choix de choisir vite.

### Installation

- Installation des dépendances du bundler: `npm install`
- Génération du bundle: `npm run build`




• commandes pour générer le bundle,
• installation à effectuer,
• explication du fichier de config du bundler,
• modifications à effectuer dans le code pour utiliser le bundle ou non (pour tester les modules),


description de ce que fait chaque module dans readme et dans le module 
Comprendre comment on a organisé le code
partie mise en production avec élément fourni par M.COCHARD


