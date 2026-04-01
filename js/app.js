import Home from './views/pages/Home.js';

import Utils  from "./services/Utils.js";
import CharacterAll from "./views/pages/CharacterAll.js";
import CharacterShow from "./views/pages/CharacterShow.js";
import WeaponAll from "./views/pages/WeaponAll.js";
import WeaponShow from "./views/pages/WeaponShow.js";
import MonsterAll from "./views/pages/MonsterAll.js";
import MonsterShow from "./views/pages/MonsterShow.js";
import About from "./views/pages/About.js";

import Error404 from "./views/pages/Error404.js";
import SearchProvider from "./services/SearchProvider.js";

const routes = {
    "/": Home,
    "/about": About,
    "/personnages": CharacterAll,
    "/personnages/:id": CharacterShow,
    "/equipements": WeaponAll,
    "/equipements/:id": WeaponShow,
    "/monstres": MonsterAll,
    "/monstres/:id": MonsterShow

};

const router = async()=>{
    console.log("router");
    const content = null ||  document.querySelector('#main');

    let request = Utils.parseRequestURL();
    let parsedURL= (request.resource ? '/'+ request.resource : '/') + (request.id ? '/:id': '')+ (request.verb ? '/'+ request.verb: '');

    let pageC = routes[parsedURL] ? routes[parsedURL] :  Error404;
    let page= new pageC();

    content.innerHTML = await page.render(request.id);
    if (page.after_render) {
        await page.after_render();
    }

}

window.addEventListener("hashchange", router);

window.addEventListener("load",router);


const recherche = document.getElementById("recherche_input");


recherche.addEventListener("input", async() => {
    const res = document.getElementById("recherche_res");
    const input = recherche.value.toLowerCase();
    console.log("Recherche : " + input);
    console.log("res"+ res)

    if(input.length<2){
        res.innerHTML = "";
        return;
    }
    const matches = await SearchProvider.searchAll(input);
    

    res.innerHTML = matches.map(item => `
        <div class="search-item">
            <a href="#/${item.type}/${item.id}">
                ${item.nom} <small>(${item.type})</small>
            </a>
        </div>
    `).join("");
    });
    document.addEventListener("click", (e) => {
        if (!document.getElementById("recherche_form").contains(e.target)) {
            res.innerHTML = "";
        }
    
});