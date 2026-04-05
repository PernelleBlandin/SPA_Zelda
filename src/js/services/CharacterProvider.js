import { ENDPOINT } from '../config.js'

export default class CharacterProvider {

    static fetchCharacters = async(page = 1, limit = 6) => {
        const options = {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
            }
        }
        console.log("fetch characters");
        console.log(`${ENDPOINT}/personnages`);

        try {
            const url = `${ENDPOINT}/personnages?_page=${page}&_per_page=${limit}`;
            const response = await fetch(url, options);
            const json = await response.json();
           
            console.log("Structure API :", json);
           
            return json.data
        } catch(err) {
            console.error("Erreur de chargement", err);
            }
    }

    static getCharacter = async (id)=>{
        const options = {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
            }
        }
        try{
            const response = await fetch( `${ENDPOINT}/personnages/${id}`, options)
            const json = await response.json();
            return json
        }catch(err){
            console.log("Erreur de chargement", err)
        }
    }


    static countTotalCharacters = async () => {
    try {
        const response = await fetch(`${ENDPOINT}/personnages`);
        const json = await response.json();
        return json.length;
    } catch(err) {
        console.error("Erreur comptage", err);
        return 0;
    }
}

    static updateCharacter = async (id, characterData) => {
    const options = {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(characterData)
    };
    try {
        const response = await fetch(`${ENDPOINT}/personnages/${id}`, options);
        return await response.json();
    } catch(err) {
        console.error("Erreur lors de la mise à jour du personnage", err);
    }
}
   
}