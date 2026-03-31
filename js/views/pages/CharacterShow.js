import Utils from '../../services/Utils.js';
import CharacterProvider from "./../../services/CharacterProvider.js";
import WeaponProvider from "./../../services/WeaponProvider.js";
import {cst} from "./../../services/constantes.js";

export default class CharacterShow {

    async getNomEquipements(equipementIds) {
        let liste_noms = [];

        for(const el of equipementIds){

            let equipement = await WeaponProvider.getWeapon(el);
            let nom_equipement = " " + equipement.nom;
            liste_noms.push(nom_equipement);
        }
        return liste_noms;
    }


    async render (Index) {
        console.log("character show")
        let request = Utils.parseRequestURL();
        let character = await CharacterProvider.getCharacter(Index);
        console.log(character);
        console.log("type coeurs", typeof(character.coeurs));
        let nb_coeurs = character.coeurs;
        let nb_endurance = character.endurance;

        let equipements = await this.getNomEquipements(character.equipementIds);
        console.log("liste nom equip", equipements);
        
        let view = `
            <section>
            <img class="perso-pic" src="${character.image}" alt="Image du personnage ${character.nom}"/>
                <h2>${character.nom}</h2>
                <p> ID : ${character.id}</p>
                <p>${character.race}</p>

                <div class="stats">
                    <p> Cœurs : ${cst["coeurs"].repeat(nb_coeurs)}</p>
                    <p>Endurance : ${cst["goutte"].repeat(nb_endurance)}</p>
                </div>

                <div class="equipement_perso">
                    <p>Equipements : ${equipements}</p>
                </div>
                
            </section>
            `;

        return view
        
    }
}

