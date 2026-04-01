import { ENDPOINT } from '../config.js'

export default class NotationProvider {

    static fetchNotations = async(limit =5) =>{
        const options = 
            {method: 'PUT',
            headers:{
            "Content-Type": "application/json",
            }}
    console.log("fetch notation");
    try{
        const response = await fetch(`${ENDPOINT}/notations`, options)
        const json = await response.json();
    }catch(err){
        console.error("Error getting doc", err)
    }
    }
    
}