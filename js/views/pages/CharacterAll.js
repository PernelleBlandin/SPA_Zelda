import CharacterProvider from "../../services/CharacterProvider.js";

export default class CharacterAll {

    async render () {
        console.log("passage character all")
        let personnages = await CharacterProvider.fetchCharacters(10);
        console.log(personnages);
        let view = `
        <h2>Tous les personnages</h2>
        <ul>
            ${personnages.map(
                personnage =>
                    `
                        <li><a href= "#/personnages/${personnage.id}">${personnage.nom}</a></li>
                    `
            ).join('\n')}
        </ul>
    `;
    return view;
    }

}