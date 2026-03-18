import Utils from '../../services/Utils.js'
import MonsterProvider from "./../../services/MonsterProvider.js";

export default class MonsterShow {
    async render (Index) {
        console.log("monster show")
        let request = Utils.parseRequestURL()
        let monster = await MonsterProvider.getMonster(Index);
        console.log(monster);
        let view = `
            <section>
                <h2>${monster.nom}</h2>
                <p> ID : ${monster.id}</p>
                <p>Type : ${monster.type}</p>
                <img class="monstre-pic" src="${monster.image}" alt="Image du monstre ${monster.nom}"/>
            </section>
            `;

        return view
    }
}