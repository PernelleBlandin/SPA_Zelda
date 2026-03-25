import Utils from '../../services/Utils.js';
import CharacterProvider from "./../../services/CharacterProvider.js";

export default class CharacterShow {
    async render (Index) {
        console.log("character show")
        let request = Utils.parseRequestURL()
        let character = await CharacterProvider.getCharacter(Index);
        console.log(character);
        console.log("type coeurs", typeof(character.coeurs))
        
        let view = `
            <section>
            <img class="perso-pic" src="${character.image}" alt="Image du personnage ${character.nom}"/>
                <h2>${character.nom}</h2>
                <p> ID : ${character.id}</p>
                <p>${character.race}</p>

                <div class="stats">
                    <p> coeurs : ${character.coeurs}</p>
                    <p>${character.endurance}</p>
                    <p>${character.notation}</p>
                </div>

                <div class="equipement_perso">
                    <p>${character.equipementIds}</p>
                </div>
                
            </section>
            `;

        return view
        
    }
}

