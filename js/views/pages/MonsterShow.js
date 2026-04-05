import Utils from '../../services/Utils.js'
import MonsterProvider from "./../../services/MonsterProvider.js";
import {cst} from "./../../services/constantes.js";

export default class MonsterShow {
    async render (Index) {
        console.log("monster show")
        let request = Utils.parseRequestURL()
        let monster = await MonsterProvider.getMonster(Index);
        console.log(monster);
        //let note_illus = calculer moyenne liste et unité inférieure
        // dans view : <p>Evaluation du monstre ${cst["etoile"].repeat(note)}</p>

        let view = `
            <section>
                <h2>${monster.nom}</h2>
                <p> ID : ${monster.id}</p>
                <p>Type : ${monster.type}</p>
                <p>Points de vie : ${monster.points_de_vie}</p>

                <img class="monstre-pic" src="${monster.image}" alt="Image du monstre ${monster.nom}"/>
            </section>
            `;

        return view
    }
}