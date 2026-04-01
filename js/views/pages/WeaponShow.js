import Utils from '../../services/Utils.js'
import WeaponProvider from "./../../services/WeaponProvider.js";

export default class WeaponShow {

    async getNotations(notation){
        let sum_note = 0;

        for (const el of notation){
            console.log("type note dans liste", el, typeof(el));
            sum_note += el;

        }
        let moy = sum_note / notation.length
        return moy;   
    }

    noter(NoterForm){  
        // var input=NoterForm.input.value;
        // document.getElementById("test").innerHTML+=input;
        // return false;
            document.querySelector("#notationInput");
    }

    // fonction qui recupere l'element entré en Input, 
    // et qui l'ajoute dans l'attribut List notation d'equipement
    // input submit, input button ou button ? https://developer.mozilla.org/fr/docs/Web/API/Element/click_event 
    // querySelector ? https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

    async render (Index) {
        console.log("weapon show")
        let request = Utils.parseRequestURL()
        let equipement = await WeaponProvider.getWeapon(Index);
        console.log(equipement);
 
        let notations = await this.getNotations(equipement.notation);
        console.log("notation; ", notations);
        const noteInput = document.querySelector("#notation");
        console.log("note en input", noteInput);
        
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
                <form name="NoterForm" onsubmit="return noter(this)">     
                    <input type="number" name="notationInput" min=0 max=5 required />
                    <button type="button" id="notationButton" onclick="noter">Noter</button>
                </form>
            </section>
            `;
        return view
    }
}
