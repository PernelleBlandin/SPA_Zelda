export default class Home{
    async render(){
        let view = `
        <h2> voici la page home </h2>
        <p></p>
        <p><strong>Bienvenue sur notre site dédié à l'univers de Zelda Breath of the Wild !</strong></p>
        <p>Explorez les personnages, équipements et monstres emblématiques de cette saga légendaire. 
        Plongez dans l'aventure et découvrez les secrets de ce monde fantastique.</p>
        <p>Utilisez la barre de navigation pour accéder aux différentes sections du site et n'hésitez pas à ajouter vos favoris pour un accès rapide à vos éléments préférés !</p>
        <p>Vous pouvez aussi noter les équipements pour conseiller les autres joueurs sur les meilleurs choix pour survivre dans Hyrule.</p>
        <p><em>Bonne exploration et que l'aventure commence !</em></p>
        `;

        return view;
    }
}