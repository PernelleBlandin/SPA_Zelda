import Utils from '../../services/Utils.js'
import WeaponProvider from "./../../services/WeaponProvider.js";

export default class WeaponShow {

    async getNotations(notation){
        let sum_note = 0;
        let equipement = await WeaponProvider.getWeapon(notation);

        for (const el of notation){
            console.log("type note dans liste", el, typeof(el));
            sum_note += el;

        }
        let moy = sum_note / notation.length
        return moy;   
    }




    async render (Index) {
        console.log("weapon show")
        let request = Utils.parseRequestURL()
        let equipement = await WeaponProvider.getWeapon(Index);
        console.log(equipement);
 
        let notations = await this.getNotations(equipement.notation);
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
