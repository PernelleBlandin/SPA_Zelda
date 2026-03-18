import Home from './views/pages/Home.js';

import Utils  from "./services/Utils.js";
import CharacterAll from "./views/pages/CharacterAll.js";
import CharacterShow from "./views/pages/CharacterShow.js";
import WeaponAll from "./views/pages/WeaponAll.js";
import WeaponShow from "./views/pages/WeaponShow.js";
import About from "./views/pages/About.js";

import Error404 from "./views/pages/Error404.js";

const routes = {
    "/": Home,
    "/about": About,
    "/personnages": CharacterAll,
    "/personnages/:id": CharacterShow,
    "/equipements": WeaponAll,
    "/equipements/id": WeaponShow


};

const router = async()=>{
    console.log("router");
    const content = null ||  document.querySelector('#main');

    let request = Utils.parseRequestURL();

    let parsedURL= (request.resource ? '/'+ request.resource : '/') + (request.id ? '/:id': '')+ (request.verb ? '/'+ request.verb: '');

    let pageC = routes[parsedURL] ? routes[parsedURL] :  Error404;

    let page= new pageC();

    content.innerHTML = await page.render(request.id);
}

window.addEventListener("hashchange", router);

window.addEventListener("load",router);