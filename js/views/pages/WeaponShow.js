import Utils from '../../services/Utils.js'
import WeaponProvider from "./../../services/WeaponProvider.js";
import NotationProvider from "../../services/NotationProvider.js";

export default class WeaponShow {

    async getNotations(Index){
        let moy = 0;
        let equipement = await WeaponProvider.getWeapon(Index);
        for (const el of equipement.notation){
            moy += el;

        }
        return moy / equipement.notation.length;   
    }




    async render (Index) {
        console.log("weapon show")
        let request = Utils.parseRequestURL()
        let equipement = await WeaponProvider.getWeapon(Index);
        console.log(equipement);
 
        notations = await this.getNotations(Index);
        console.log("notation; ", notations);
        
        let view = `
            <section>
                <h2>${equipement.nom}</h2>
                <img class="equipement-pic" src="${equipement.image}" alt="Image de l'arme ${equipement.nom}"/>
                <p>${equipement.description}</p>
                <p> ID : ${equipement.id}</p>
                <p>Type d'équipement : ${equipement.type}</p>
                <p>Puissance : ${equipement.puissance}</p>
                <p>Notations : ${notations}</p>
            </section>
            `;
        return view
    }
}
