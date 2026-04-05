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

    async calculPuissance(equipementIds) {
        let puissanceTotale = 0;
        for (const id of equipementIds) {
            let equipement = await WeaponProvider.getWeapon(id);
            puissanceTotale += equipement.puissance || 0;
        }
        return puissanceTotale;
    }

    async render (Index) {
        console.log("character show")
        let character = await CharacterProvider.getCharacter(Index);
        console.log(character);
        console.log("type coeurs", typeof(character.coeurs));
        let nb_coeurs = character.coeurs;
        let nb_endurance = character.endurance;
        
        let nomsEquipements = await this.getNomEquipements(character.equipementIds);
        console.log("liste nom equip", nomsEquipements);
        let puissanceTotale = await this.calculPuissance(character.equipementIds);
        console.log("puissance totale", puissanceTotale);

        const totalEquipement = await WeaponProvider.countTotalWeapons();
        const listeTotEquipements = await WeaponProvider.fetchWeapons(1, totalEquipement);
        const equipementsDisponibles = listeTotEquipements.filter(e => !character.equipementIds.includes(e.id));

        let view = `
            <section>
            <img class="perso-pic" src="${character.image}" alt="Image du personnage ${character.nom}"/>
                <h2>${character.nom}</h2>
                <p> ID : ${character.id}</p>
                <p>${character.race}</p>

                <div class="stats">
                    <p> Cœurs : ${cst["coeurs"].repeat(nb_coeurs)}</p>
                    <p>Endurance : ${cst["goutte"].repeat(nb_endurance)}</p>
                    <p>Puissance : ${puissanceTotale}</p>
                </div>

                <div class="equipement_perso">
                    <p>Inventaire : (${character.equipementIds.length}/6) :
                                ${nomsEquipements.length > 0 ? nomsEquipements.join(', ') : 'Aucun'}</p>
                </div>

                <div class="control">
                    <div class="select">
                        <select id="selectEquipement">
                            <option value="">-- Choisir un équipement --</option>
                            ${equipementsDisponibles.map(equipement => `
                                <option value="${equipement.id}">${equipement.nom} (+${equipement.puissance})</option>
                            `).join('')}
                        </select>
                    </div>
                </div>
                <div class="control">
                    <button id="btnEquiper" class="button is-primary">Équiper</button>
                </div>

            </section>
            `;

        return view
        
    }


    async after_render(id) {
        const btn = document.getElementById("btnEquiper");
        const select = document.getElementById("selectEquipement");

        btn.addEventListener("click", async () => {
            const equipementId = select.value;
            if (!equipementId) {
                alert("Veuillez sélectionner un équipement !");
                return;
            }

            let character = await CharacterProvider.getCharacter(id);

            if (character.equipementIds.length >= 6) {
                alert("Inventaire plein ! Vous ne pouvez pas porter plus de 6 équipements.");
                return;
            }

            let equipement = await WeaponProvider.getWeapon(equipementId);
            character.equipementIds.push(equipementId);
            character.puissance = await this.calculPuissance(character.equipementIds);
            await CharacterProvider.updateCharacter(id, character);
            
            alert(`${equipement.nom} a été ajouté à ${character.nom} !`);
            window.location.reload(); 
        });
    }
}

