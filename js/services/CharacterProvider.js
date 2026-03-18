import { ENDPOINT } from '../config.js'

export default class CharacterProvider {

    static fetchCharacters = async(limit = 5) => {
        const options = {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
            }
        }
        console.log("fetch characters");
        console.log(`${ENDPOINT}/personnages`);
        try{
            
            const response = await fetch(`${ENDPOINT}/personnages`, options)
            const json = await response.json();
           
            return json
        }catch(err){
            console.error("Error getting doc", err)
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
            console.log("Error getting doc", err)
        }
    }

    
}