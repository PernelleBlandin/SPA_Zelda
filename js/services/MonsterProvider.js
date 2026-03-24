import { ENDPOINT } from '../config.js'

export default class MonsterProvider {

    static fetchMonsters = async(limit = 5) => {
        const options = {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
            }
        }
        console.log("fetch monsters");
        console.log(`${ENDPOINT}/monstres`);
        try{
            
            const response = await fetch(`${ENDPOINT}/monstres`, options)
            const json = await response.json();
           
            return json
        }catch(err){
            console.error("Error getting doc", err)
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
            console.log("Error getting doc", err)
        }
    }

    
}