//import Utils from '../../services/Utils.js';
import CharacterProvider from "./../../services/CharacterProvider.js";
import WeaponProvider from "./../../services/WeaponProvider.js";
import {cst} from "./../../services/constantes.js";

export default class CharacterShow {

    async getObjetEquipements(equipementIds) {
        let liste_equipements = [];

        for(const id of equipementIds){

            let equipement = await WeaponProvider.getWeapon(id);
            liste_equipements.push(equipement);
        }
        return liste_equipements;
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
        let nb_coeurs = character.coeurs;
        let nb_endurance = character.endurance;
        
        let equipements = await this.getObjetEquipements(character.equipementIds);
        console.log("liste equipements", equipements);
        let puissanceTotale = await this.calculPuissance(character.equipementIds);
        console.log("puissance totale", puissanceTotale);

        const totalEquipement = await WeaponProvider.countTotalWeapons();
        const listeTotEquipements = await WeaponProvider.fetchWeapons(1, totalEquipement);
        const equipementsDisponibles = listeTotEquipements.filter(equip => !character.equipementIds.includes(equip.id));

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
                    <p><strong>Inventaire : (${character.equipementIds.length}/6) : </strong></p>
                    <ul id="liste-retrait">
                        ${equipements.map(equip => `
                            <li>
                                ${equip.nom}( +${equip.puissance})
                                <button class="btn-retire" data-id="${equip.id}" style="margin-left:10px;">Retirer</button>
                            </li>`).join('')}
                    </ul>
                    ${equipements.length === 0 ? '<p>Aucun équipement équipé.</p>' : ''}
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
        const btnEquiper = document.getElementById("btnEquiper");
        const select = document.getElementById("selectEquipement");
        const btnRetirer = document.querySelectorAll(".btn-retire");

        btnEquiper.addEventListener("click", async () => {
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

        btnRetirer.forEach(bouton => {
            bouton.addEventListener("click", async () => {
                const idARetirer = bouton.getAttribute("data-id");
                let character = await CharacterProvider.getCharacter(id);

                character.equipementIds = character.equipementIds.filter(itemId => itemId !== idARetirer);
                character.puissance = await this.calculPuissance(character.equipementIds);

                await CharacterProvider.updateCharacter(id, character);
                alert("Équipement retiré !");
                window.location.reload();
            });
        });

    }
}

