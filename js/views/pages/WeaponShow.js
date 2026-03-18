import Utils from '../../services/Utils.js'
import WeaponProvider from "./../../services/WeaponProvider.js";

export default class WeaponShow {
    async render (Index) {
        console.log("weapon show")
        let request = Utils.parseRequestURL()
        let equipement = await WeaponProvider.getWeapon(Index);
        console.log(equipement);
        console.log("la");
        let view = `
            <section>
                <h2>${equipement.nom}</h2>
                <img class="equipement-pic" src="${equipement.image}" alt="Image de l'arme ${equipement.nom}"/>
                <p>${equipement.description}</p>
                <p> ID : ${equipement.id}</p>
                <p>Type d'équipement : ${equipement.type}</p>
                <p>Puissance : ${equipement.puissance}</p>
            </section>
            `;
        return view
    }
}
