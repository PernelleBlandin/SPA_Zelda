import { ENDPOINT } from '../config.js'

export default class WeaponProvider {

    static fetchWeapons = async(page = 5, limit = 6) => {
        const options = {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
            }
        }
        console.log("fetch equipements");
        console.log(`${ENDPOINT}/equipements`);
        try{
            const url = `${ENDPOINT}/equipements?_page=${page}&_per_page=${limit}`;
            const response = await fetch(url, options);
            const json = await response.json();
            return json.data

        }catch(err){
            console.error("Erreur de chargement", err)
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
            console.log("Erreur de chargement", err);;
        }
    }


    static updateWeapon = async (id, weaponData) => {
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(weaponData)
        };
        try {
            const response = await fetch(`${ENDPOINT}/equipements/${id}`, options);
            return await response.json();
        } catch (err) {
            console.error("Error updating weapon", err);
        }
    }

    
}