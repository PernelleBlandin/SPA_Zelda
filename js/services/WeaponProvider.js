import { ENDPOINT } from '../config.js'

export default class WeaponProvider {

    static fetchWeapons = async(limit = 5) => {
        const options = {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
            }
        }
        console.log("fetch equipements");
        console.log(`${ENDPOINT}/equipements`);
        try{
            const response = await fetch(`${ENDPOINT}/equipements`, options)
            const json = await response.json();
           
            return json
        }catch(err){
            console.error("Error getting doc", err)
        }
    }

    static getWeapon = async (id)=>{
        const options = {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
            }
        }
        try{
            const response = await fetch( `${ENDPOINT}/equipements/${id}`, options)
            const json = await response.json();
            return json
        }catch(err){
            console.log("Error getting doc", err);;
        }
    }

    
}