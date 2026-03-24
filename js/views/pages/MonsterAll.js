import MonsterProvider from "../../services/MonsterProvider.js";

export default class MonsterAll {

    async render () {
        console.log("passage Monster all")
        let monstres = await MonsterProvider.fetchMonsters(10);
        console.log(monstres);
        let view = `
        <h2>Tous les monstres</h2>
        <ul>
            ${monstres.map(
                monstre =>
                    `
                        <li><a href= "#/monstres/${monstre.id}">${monstre.nom}</a></li>
                    `
            ).join('\n')}
        </ul>
    `;
    return view;
    }

}