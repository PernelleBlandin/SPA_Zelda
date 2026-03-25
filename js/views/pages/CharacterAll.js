import CharacterProvider from "../../services/CharacterProvider.js";

export default class CharacterAll {

    async render () {
        let personnages = await CharacterProvider.fetchCharacters(10);
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



async after_render() {
    const recherche = document.getElementById("recherche");
    recherche.addEventListener("input", () => {
        const input = recherche.value.toLowerCase();
        console.log("Recherche : " + input);

    
        })
    }

}