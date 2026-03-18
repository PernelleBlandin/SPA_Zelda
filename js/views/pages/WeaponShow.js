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
                <p> ID : ${equipement.id}</p>
            </section>
            `;
            console.log("ici");
        return view
    }
}
