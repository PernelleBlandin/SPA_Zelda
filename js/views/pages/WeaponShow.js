import Utils from '../../services/Utils.js'
import WeaponProvider from "./../../services/WeaponProvider.js";

export default class WeaponShow {

    async getNotations(notation){
        if(notation.length === 0){
            return "Aucune notation pour le moment"
        }
        let sum_note = 0;

        for (const el of notation){
            console.log("type note dans liste", el, typeof(el));
            sum_note += el;

        }
        let moy = sum_note / notation.length;
        return moy.toFixed(2);   
    }

    async after_render(Index){  
            const input = document.querySelector("#notationInput");
            const button = document.querySelector("#notationButton");   

            button.addEventListener("click", async () => {
                const new_note = parseInt(input.value);
                console.log("new note", new_note);
                if(new_note >= 0 && new_note <= 5){
                    let equipement = await WeaponProvider.getWeapon(Index);

                    equipement.notation.push(new_note);
                    console.log("equipement avec nouvelle note", equipement);
                    await WeaponProvider.updateWeapon(Index, equipement);

                    alert("Merci pour votre notation !");
                    window.location.reload();
                }
            });

    }

    // fonction qui recupere l'element entré en Input, 
    // et qui l'ajoute dans l'attribut List notation d'equipement
    // input submit, input button ou button ? https://developer.mozilla.org/fr/docs/Web/API/Element/click_event 
    // querySelector ? https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

    async render (Index) {
        console.log("weapon show")
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
                <p>Notation : ${notations}</p>

                <p id="test">Noter cet équipement ? </p> 
                    <input type="number" id="notationInput" min="0" max="5" value="3" required />
                    <button id="notationButton">Noter</button>
            </section>
            `;
        return view
    }
}
