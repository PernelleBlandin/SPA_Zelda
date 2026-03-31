import Utils from '../../services/Utils.js';
import CharacterProvider from "./../../services/CharacterProvider.js";
import {cst} from "./../../services/constantes.js";

export default class CharacterShow {
    async render (Index) {
        console.log("character show")
        let request = Utils.parseRequestURL()
        let character = await CharacterProvider.getCharacter(Index);
        console.log(character);
        console.log("type coeurs", typeof(character.coeurs))
        let nb_coeurs = character.coeurs
        let nb_endurance = character.endurance
        let note = character.notation


        
        
        let view = `
            <section>
            <img class="perso-pic" src="${character.image}" alt="Image du personnage ${character.nom}"/>
                <h2>${character.nom}</h2>
                <p> ID : ${character.id}</p>
                <p>${character.race}</p>

                <div class="stats">
                    <p> Cœurs : ${cst["coeurs"].repeat(nb_coeurs)}</p>
                    <p>Endurance : ${cst["goutte"].repeat(nb_endurance)}</p>
                    <p>Evaluation du personnage ${cst["etoile"].repeat(note)}</p>
                </div>

                <div class="equipement_perso">
                    <p>${character.equipementIds}</p>
                </div>
                
            </section>
            `;

        return view
        
    }
}

