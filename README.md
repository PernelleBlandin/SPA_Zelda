# SPA_Zelda
TP noté de complément web S4

## Description générale du projet  

Ce projet a été réalisé dans le cadre du module R4.10 Complément web.
L'objectif est de concevoir une Single Page Application (SPA) en javascript en utilisant une API via json-server.
Le projet permet de découvrir l'univers du jeu Zelda Breath of the Wild : personnages, équipements et monstres. Il est possible de rechercher un équipement, un personnage ou encore un monstre, de mettre en favoris des personnages et des équipements. Il est également possible de noter les équipements.

## Composition de l'équipe de développeuses

- Blandin Pernelle (@PernelleBlandin)   
- Hachelef Asma (@Asminouch)  

## Installation et lancement
### Packages nécessaires au lancement de la Single Page Application (SPA)
Nous utilisons json-server, qui nous permet d'imiter une API Rest et de fournir un accès dynamique aux données, à l'aide d'un simple fichier JSON. Le fichier JSON a été fait par nous même.

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
- views/ : Contient les composants de rendu HTML
    - pages/ : Chaque fichier (ex: Home.js ou WeaponShow.js) possède une méthode `render()`pour le HTML et certains ont une méthode `after_render()` pour gérer l'intéractivité.
  
## Bundle
Afin de déployer l'application en production avec un bundler nous avons fait le choix de choisir Vite.

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


## Détail des fonctionnalités du site

### Home
Une brève description du site et de l'univers du celui-ci.

### Personnages
Vous pouvez accéder à la liste de tous les personnages en cliquant sur l'onglet 'Personnages' dans la barre de navigation.


#### Page listing
Sous forme de tuile se trouve les informations pour un personnage.  
En bas de page se trouve la fonctionnalité de pagination. Vous pouvez changer de pages : 
- en utilisant les bouton dédié à cet action
- en utilisant les fleches du champ input
- en entrant directement la page à laquelle vous voulez aller dans le input et en appuyant sur "entrée".

Vous pouvez cliquer sur le nom d'un personnage pour accéder à ses informations.

### Favoris
A droite de chaque tuile de personnage se trouve un coeur. Cliquer sur ce coeur permet d'ajouter le personnage dans sa liste de favoris (accessible via l'onglet favoris de la barre de navigation). Les favoris sont stockés en localStorage.

#### Informations personnage
On trouve une illustration du personnage. Cette image est récupérée dans le json par un lien qui renvoie à un Git sur lequel les images sont stockées en ligne. Ce Git à été fait par Blandin Pernelle pour le site. Il faut donc être connecté à internet pour visualiser ces images.Autrement un message descriptif s'affiche à la place de l'image.   
On retrouve le nom du personnage, sa race dan sle jeu, son nombre de coeur et d'endurance, ainsi que sa puissance. La puissance varie en fonction des armes dont est équipé le personnage.

#### Donner une arme
Vous pouvez donner jusqu'à 6 équipements à votre personnage (ce n'est pas en local storage comme le système de favoris).
Ajouté un équipement donne un bonus de puissance au personnage, et le retirer diminue la puissance. La puissance ajoutée ou enlever est celle qui, dans le json, est attribué à chaque arme.
Cette sélection d'équipement se fait via un menu déroulant. Une arme déjà équipée n'apparaît pas dans le menu déroulant.
Le retrait est possible grâce au bouton dédié, en face de chaque arme.
Un message d'alerte indique pour le retrait et l'ajout, que la modification a été prise en compte. La page est rafraîchie tout de suite après.

### Equipements

#### Page listing
Cette page fonctionne exactement comme celle des personnages (ajout de favoris, pagination et détails de l'équipement).

### Favoris
A droite de chaque tuile d'équipement se trouve un coeur. Cliquer sur ce coeur permet d'ajouter l'arme dans sa liste de favoris (accessible via l'onglet favoris de la barre de navigation). Les favoris sont stockés en localStorage.

#### Informations arme
On trouve en haut de la page le nom de l'équipement et une image d'illustration. L'image provient d'une API en ligne (Compendium). Compendium n'a que des images d'objets qui peuvent être pris en photo dans le jeu par Link (objets et monstres).   
Il y a une description de l'arme et de son type. Il y a trois types (épée, bouclier, arc). On trouve aussi la puissance de l'équipement (utile pour l'ajout d'équipement à un personnage).   

#### Notation
Dans la page détails d'une arme, il est possible de noter l'arme. Cette notation va de 0 à 5. 
En face du label "Notation", on peut lire la moyenne de toutes les notes qui ont été données à cet équipement. La moyenne est arrondie au centième près.
Il faut voter avec l'input et valider sa note avec le bouton. Un message d'alerte indique que la note a été prise en compte. La page est rafraîchie tout de suite après. La nouvelle note est stockée dans la liste de l'attribut "notations" dans le Json.

### Monstres
#### Page listing
Cette page est une version minimaliste de celles des personnages et des équipements (pas de favoris).

#### Informations monstre
On trouve une image d'illustration (de l'API Compendium), le nom du monsre, son type et ses points de vie.

### Onglet Favoris
Sur cette page, vous pouvez retrouver la liste de tous les personnages et équipements que vous avez mis en favoris. Chacun est cliquable afin d'accéder à sa page de détails.

### About
Sur cette page se trouve les noms des développeuses.