import { ENDPOINT } from '../config.js'

export default class MonsterProvider {

    static fetchMonsters = async(page = 1, limit = 5) => {
        const options = {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
            }
        }
        console.log("fetch monsters");
        console.log(`${ENDPOINT}/monstres`);
        try{
            const url = `${ENDPOINT}/monstres?_page=${page}&_per_page=${limit}`;
            const response = await fetch(url, options);
            const json = await response.json();
            return json.data
        }catch(err){
            console.error("Erreur de chargement", err)
        }
    }

    static getMonster = async (id)=>{
        const options = {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
            }
        }
        try{
            const response = await fetch( `${ENDPOINT}/monstres/${id}`, options)
            const json = await response.json();
            return json
        }catch(err){
            console.log("Erreur de chargement", err)
        }
    }

    
}