import NotationProvider from "../../services/NotationProvider.js";
import WeaponProvider from "../../services/WeaponProvider.js";

export default class WeaponAll {

    async render () {
        console.log("passage weapon all")
        let equipements = await WeaponProvider.fetchWeapons(10);
        console.log(equipements);
        let view = `
        <h2>Tous les equipements</h2>
        <ul>
            ${equipements.map(
                equipement =>
                    `
                        <li><a href= "#/equipements/${equipement.id}">${equipement.nom}</a></li>
                    `
            ).join('\n')
        }
        </ul>
    `;
    return view;
    }

}