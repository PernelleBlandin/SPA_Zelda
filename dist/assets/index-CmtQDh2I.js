(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{async render(){return`
        <h2> voici la page home </h2>
        <p></p>
        <p><strong>Bienvenue sur notre site dédié à l'univers de Zelda Breath of the Wild !</strong></p>
        <p>Explorez les personnages, équipements et monstres emblématiques de cette saga légendaire. 
        Plongez dans l'aventure et découvrez les secrets de ce monde fantastique.</p>
        <p>Utilisez la barre de navigation pour accéder aux différentes sections du site et n'hésitez pas à ajouter vos favoris pour un accès rapide à vos éléments préférés !</p>
        <p>Vous pouvez aussi noter les équipements pour conseiller les autres joueurs sur les meilleurs choix pour survivre dans Hyrule.</p>
        <p><em>Bonne exploration et que l'aventure commence !</em></p>
        `}},t={parseRequestURL:()=>{let e=(location.hash.slice(1).toLowerCase()||`/`).split(`/`),t={resource:null,id:null,verb:null};return t.resource=e[1],t.id=e[2],t.verb=e[3],t},sleep:e=>new Promise(t=>setTimeout(t,e))},n=`http://localhost:3000`,r=class{static fetchCharacters=async(e=1,t=6)=>{let r={method:`GET`,headers:{"Content-Type":`application/json`}};console.log(`fetch characters`),console.log(`${n}/personnages`);try{let i=`${n}/personnages?_page=${e}&_per_page=${t}`,a=await(await fetch(i,r)).json();return console.log(`Structure API :`,a),a.data}catch(e){console.error(`Erreur de chargement`,e)}};static getCharacter=async e=>{let t={method:`GET`,headers:{"Content-Type":`application/json`}};try{return await(await fetch(`${n}/personnages/${e}`,t)).json()}catch(e){console.log(`Erreur de chargement`,e)}};static countTotalCharacters=async()=>{try{return(await(await fetch(`${n}/personnages`)).json()).length}catch(e){return console.error(`Erreur comptage`,e),0}};static updateCharacter=async(e,t)=>{let r={method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)};try{return await(await fetch(`${n}/personnages/${e}`,r)).json()}catch(e){console.error(`Erreur lors de la mise à jour du personnage`,e)}}},i=class{static getFavorites(){let e=localStorage.getItem(`zelda_favorites`);return e?JSON.parse(e):[]}static toggleFavorite(e,t){let n=this.getFavorites(),r=-1;for(let i=0;i<n.length;i++)if(n[i].id===e.id&&n[i].type===t){r=i;break}if(r!==-1)n.splice(r,1);else{let r={id:e.id,nom:e.nom,type:t};n.push(r)}localStorage.setItem(`zelda_favorites`,JSON.stringify(n))}static isFavorite(e,t){let n=this.getFavorites();for(let r=0;r<n.length;r++)if(n[r].id===e&&n[r].type===t)return!0;return!1}},a=class{constructor(){this.currentPage=1,this.limit=6,this.totalPages=1}renderList(e){return!e||!Array.isArray(e)?``:e.map(e=>{let t=i.isFavorite(e.id,`personnages`);return`
            <li class="item-li">
                <div class="item-content">
                    <a href="#/personnages/${e.id}">${e.nom}</a>
                </div>
                <div class="fav-container">
                    <input type="checkbox" id="heart-${e.id}" class="heart-checkbox" 
                           data-id="${e.id}" data-nom="${e.nom}" ${t?`checked`:``}>
                    <label for="heart-${e.id}" class="heart-label">&#9829;</label>
                </div>
            </li>`}).join(``)}favorisEvent(){document.querySelectorAll(`.heart-checkbox`).forEach(e=>{e.onclick=()=>{let t={id:e.dataset.id,nom:e.dataset.nom};i.toggleFavorite(t,`personnages`)}})}async render(){let e=await r.countTotalCharacters();this.totalPages=Math.ceil(e/this.limit);let t=await r.fetchCharacters(this.currentPage,this.limit);return`
            <h2>Tous les personnages</h2>
            <ul id="characters-list"> ${this.renderList(t)}
            </ul>
            <div class="pagination-controls">
                <button id="prev-btn" ${this.currentPage===1?`disabled`:``}>Précédent</button>
                <div class="page-selector">
                    Page 
                    <input type="number" id="page-input" 
                           value="${this.currentPage}" 
                           min="1" max="${this.totalPages}" 
                           style="width: 50px; text-align: center;"> 
                    sur ${this.totalPages}
                </div>
                <button id="next-btn" ${this.currentPage>=this.totalPages?`disabled`:``}>Suivant</button>
            </div>
        `}async after_render(){let e=document.getElementById(`characters-list`),t=document.getElementById(`page-input`),n=document.getElementById(`prev-btn`),i=document.getElementById(`next-btn`);this.favorisEvent();let a=async a=>{if(a<1||a>this.totalPages){t&&(t.value=this.currentPage);return}this.currentPage=a;let o=await r.fetchCharacters(this.currentPage,this.limit);e&&o&&(e.innerHTML=this.renderList(o),t&&(t.value=this.currentPage),n.disabled=this.currentPage===1,i.disabled=this.currentPage>=this.totalPages,this.favorisEvent())};t&&(t.onchange=e=>a(parseInt(e.target.value))),i&&(i.onclick=()=>a(this.currentPage+1)),n&&(n.onclick=()=>a(this.currentPage-1))}},o=class{static fetchWeapons=async(e=5,t=6)=>{let r={method:`GET`,headers:{"Content-Type":`application/json`}};console.log(`fetch equipements`),console.log(`${n}/equipements`);try{let i=`${n}/equipements?_page=${e}&_per_page=${t}`;return(await(await fetch(i,r)).json()).data}catch(e){console.error(`Erreur de chargement`,e)}};static getWeapon=async e=>{let t={method:`GET`,headers:{"Content-Type":`application/json`}};try{return await(await fetch(`${n}/equipements/${e}`,t)).json()}catch(e){console.log(`Erreur de chargement`,e)}};static updateWeapon=async(e,t)=>{let r={method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)};try{return await(await fetch(`${n}/equipements/${e}`,r)).json()}catch(e){console.error(`Erreur mise à jour arme`,e)}};static countTotalWeapons=async()=>{try{return(await(await fetch(`${n}/equipements`)).json()).length}catch(e){console.error(`Erreur comptage armes`,e)}}},s={coeurs:` ♥ `,goutte:` 🌢 `,etoile:` ★ `},c=class{async getObjetEquipements(e){let t=[];for(let n of e){let e=await o.getWeapon(n);t.push(e)}return t}async calculPuissance(e){let t=0;for(let n of e){let e=await o.getWeapon(n);t+=e.puissance||0}return t}async render(e){console.log(`character show`);let t=await r.getCharacter(e),n=t.coeurs,i=t.endurance,a=await this.getObjetEquipements(t.equipementIds);console.log(`liste equipements`,a);let c=await this.calculPuissance(t.equipementIds);console.log(`puissance totale`,c);let l=await o.countTotalWeapons(),u=(await o.fetchWeapons(1,l)).filter(e=>!t.equipementIds.includes(e.id));return`
            <section>
            <img class="perso-pic" src="${t.image}" alt="Image du personnage ${t.nom}"/>
                <h2>${t.nom}</h2>
                <p> ID : ${t.id}</p>
                <p>${t.race}</p>

                <div class="stats">
                    <p> Cœurs : ${s.coeurs.repeat(n)}</p>
                    <p>Endurance : ${s.goutte.repeat(i)}</p>
                    <p>Puissance : ${c}</p>
                </div>

                <div class="equipement_perso">
                    <p><strong>Inventaire : (${t.equipementIds.length}/6) : </strong></p>
                    <ul id="liste-retrait">
                        ${a.map(e=>`
                            <li>
                                ${e.nom}( +${e.puissance})
                                <button class="btn-retire" data-id="${e.id}" style="margin-left:10px;">Retirer</button>
                            </li>`).join(``)}
                    </ul>
                    ${a.length===0?`<p>Aucun équipement équipé.</p>`:``}
                </div>

                <div class="control">
                    <div class="select">
                        <select id="selectEquipement">
                            <option value="">-- Choisir un équipement --</option>
                            ${u.map(e=>`
                                <option value="${e.id}">${e.nom} (+${e.puissance})</option>
                            `).join(``)}
                        </select>
                    </div>
                </div>
                <div class="control">
                    <button id="btnEquiper" class="button is-primary">Équiper</button>
                </div>

            </section>
            `}async after_render(e){let t=document.getElementById(`btnEquiper`),n=document.getElementById(`selectEquipement`),i=document.querySelectorAll(`.btn-retire`);t.addEventListener(`click`,async()=>{let t=n.value;if(!t){alert(`Veuillez sélectionner un équipement !`);return}let i=await r.getCharacter(e);if(i.equipementIds.length>=6){alert(`Inventaire plein ! Vous ne pouvez pas porter plus de 6 équipements.`);return}let a=await o.getWeapon(t);i.equipementIds.push(t),i.puissance=await this.calculPuissance(i.equipementIds),await r.updateCharacter(e,i),alert(`${a.nom} a été ajouté à ${i.nom} !`),window.location.reload()}),i.forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.getAttribute(`data-id`),i=await r.getCharacter(e);i.equipementIds=i.equipementIds.filter(e=>e!==n),i.puissance=await this.calculPuissance(i.equipementIds),await r.updateCharacter(e,i),alert(`Équipement retiré !`),window.location.reload()})})}},l=class{constructor(){this.currentPage=1,this.limit=6,this.totalPages=1}renderList(e){return!e||!Array.isArray(e)?``:e.map(e=>{let t=i.isFavorite(e.id,`equipements`);return`
                <li class="item-li">
                    <div class="item-content">
                        <a href="#/equipements/${e.id}">${e.nom}</a>
                    </div>
                    <div class="fav-container">
                        <input type="checkbox" id="heart-${e.id}" class="heart-checkbox" 
                               data-id="${e.id}" data-nom="${e.nom}" ${t?`checked`:``}>
                        <label for="heart-${e.id}" class="heart-label">&#9829;</label>
                    </div>
                </li>`}).join(``)}favorisEvent(){document.querySelectorAll(`.heart-checkbox`).forEach(e=>{e.onclick=t=>{let n={id:e.dataset.id,nom:e.dataset.nom};i.toggleFavorite(n,`equipements`)}})}async render(){let e=await o.countTotalWeapons();this.totalPages=Math.ceil(e/this.limit);let t=await o.fetchWeapons(this.currentPage,this.limit);return console.log(t),`
        <h2>Tous les équipements</h2>
        <ul id="list">
                ${this.renderList(t)}
            </ul>
            <div class="pagination-controls">
                <button id="prev-btn" ${this.currentPage===1?`disabled`:``}>Précédent</button>     
                <div class="page-selector">
                    Page 
                    <input type="number" id="page-input" 
                           value="${this.currentPage}" 
                           min="1" max="${this.totalPages}" 
                           style="width: 50px; text-align: center;"> 
                    sur ${this.totalPages}
                </div>
                <button id="next-btn" ${this.currentPage>=this.totalPages?`disabled`:``}>Suivant</button>
            </div>
        `}async after_render(){let e=document.getElementById(`list`),t=document.getElementById(`page-input`),n=document.getElementById(`prev-btn`),r=document.getElementById(`next-btn`);this.favorisEvent();let i=async i=>{if(i<1||i>this.totalPages){t&&(t.value=this.currentPage);return}this.currentPage=i;let a=await o.fetchWeapons(this.currentPage,this.limit);e&&a&&(e.innerHTML=this.renderList(a),t&&(t.value=this.currentPage),n.disabled=this.currentPage===1,r.disabled=this.currentPage>=this.totalPages,this.favorisEvent())};t&&(t.onchange=e=>i(parseInt(e.target.value))),r&&(r.onclick=()=>i(this.currentPage+1)),n&&(n.onclick=()=>i(this.currentPage-1))}},u=class{async getNotations(e){if(!e||e.length===0)return`Aucune notation pour le moment`;let t=0;for(let n of e)console.log(`type note dans liste`,n,typeof n),t+=n;return(t/e.length).toFixed(2)}async after_render(e){let t=document.querySelector(`#notationInput`);document.querySelector(`#notationButton`).addEventListener(`click`,async()=>{let n=parseInt(t.value);if(console.log(`new note`,n),n>=0&&n<=5){let t=await o.getWeapon(e);t.notation||=[],t.notation.push(n),console.log(`equipement avec nouvelle note`,t),await o.updateWeapon(e,t),alert(`Merci pour votre notation !`),window.location.reload()}})}async render(e){console.log(`weapon show`);let t=await o.getWeapon(e);console.log(t),t.notation&&t.notation;let n=await this.getNotations(t.notation||[]);return console.log(`notation; `,n),`
            <section>
                <h2>${t.nom}</h2>
                <img class="equipement-pic" src="${t.image}" alt="Image de l'arme ${t.nom}"/>
                <p>${t.description}</p>
                <p> ID : ${t.id}</p>
                <p>Type d'équipement : ${t.type}</p>
                <p>Puissance : ${t.puissance}</p>
                <p>Notation : ${n}</p>

                <p id="test">Noter cet équipement ? </p> 
                    <input type="number" id="notationInput" min="0" max="5" value="3" required
                        style="display: inline-block; width: 60px; padding: 5px; border: 1px solid #ccc;" />
                    <button id="notationButton">Noter</button>
            </section>
            `}},d=class{static fetchMonsters=async(e=1,t=5)=>{let r={method:`GET`,headers:{"Content-Type":`application/json`}};console.log(`fetch monsters`),console.log(`${n}/monstres`);try{let i=`${n}/monstres?_page=${e}&_per_page=${t}`;return(await(await fetch(i,r)).json()).data}catch(e){console.error(`Erreur de chargement`,e)}};static getMonster=async e=>{let t={method:`GET`,headers:{"Content-Type":`application/json`}};try{return await(await fetch(`${n}/monstres/${e}`,t)).json()}catch(e){console.log(`Erreur de chargement`,e)}};static countTotalMonsters=async()=>{try{return(await(await fetch(`${n}/monstres`)).json()).length}catch(e){console.error(`Erreur comptage monstres`,e)}}},f=class{constructor(){this.currentPage=1,this.limit=6,this.totalPages=1}renderList(e){return!e||!Array.isArray(e)?``:e.map(e=>`<li><a href="#/monstres/${e.id}">${e.nom}</a></li>`).join(`
`)}async render(){let e=await d.countTotalMonsters();this.totalPages=Math.ceil(e/this.limit);let t=await d.fetchMonsters(this.currentPage,this.limit);return`
        <h2>Tous les monstres</h2>
        <ul id="list">
                ${this.renderList(t)}
            </ul>
            <div class="pagination-controls">
                <button id="prev-btn" ${this.currentPage===1?`disabled`:``}>Précédent</button>
                <div class="page-selector">
                    Page 
                    <input type="number" id="page-input" 
                        value="${this.currentPage}" 
                        min="1" max="${this.totalPages}" 
                        style="width: 50px; text-align: center;"> 
                    sur ${this.totalPages}
                </div>
                <button id="next-btn" ${this.currentPage>=this.totalPages?`disabled`:``}>Suivant</button>
            </div>
            `}async after_render(){let e=document.getElementById(`list`),t=document.getElementById(`page-input`),n=document.getElementById(`prev-btn`),r=document.getElementById(`next-btn`),i=async i=>{if(i<1||i>this.totalPages){t.value=this.currentPage;return}this.currentPage=i;let a=await d.fetchMonsters(this.currentPage,this.limit);e&&a&&(e.innerHTML=this.renderList(a),t.value=this.currentPage,n.disabled=this.currentPage===1,r.disabled=this.currentPage>=this.totalPages)};t&&(t.onchange=e=>i(parseInt(e.target.value))),r&&(r.onclick=()=>i(this.currentPage+1)),n&&(n.onclick=()=>i(this.currentPage-1))}},p=class{async render(e){console.log(`monster show`),t.parseRequestURL();let n=await d.getMonster(e);return console.log(n),`
            <section>
                <h2>${n.nom}</h2>
                <p> ID : ${n.id}</p>
                <p>Type : ${n.type}</p>
                <p>Points de vie : ${n.points_de_vie}</p>

                <img class="monstre-pic" src="${n.image}" alt="Image du monstre ${n.nom}"/>
            </section>
            `}},m=class{async render(){return console.log(`render about`),` 
        <section>
            <h2>About</h2>
            <p> Ce site a été réalisé par : Hachelef Asma, Blandin Pernelle </p>
        </section>
        `}},h=class{constructor(){}renderList(e){if(!e||e.length===0)return`<p>Vous n'avez pas encore de favoris.</p>`;let t=``;for(let n=0;n<e.length;n++){let r=e[n];t+=`
                <li class="item-li">
                    <div class="item-content">
                        <a href="#/${r.type}/${r.id}">${r.nom}</a>
                        <small style="color: #666; margin-left: 10px;">(${r.type})</small>
                    </div>
                    <div class="fav-container">
                        <input type="checkbox" 
                               id="heart-fav-${r.type}-${r.id}" 
                               class="heart-checkbox" 
                               data-id="${r.id}" 
                               data-nom="${r.nom}"
                               data-type="${r.type}"
                               checked>
                        <label for="heart-fav-${r.type}-${r.id}" class="heart-label">&#9829;</label>
                    </div>
                </li>`}return t}async render(){let e=i.getFavorites();return`
            <h2>Mes Favoris</h2>
            <ul id="list">
                ${this.renderList(e)}
            </ul>
        `}async after_render(){let e=document.querySelectorAll(`.heart-checkbox`);for(let t=0;t<e.length;t++)e[t].addEventListener(`change`,function(e){let t=e.target,n={id:t.getAttribute(`data-id`),nom:t.getAttribute(`data-nom`)},r=t.getAttribute(`data-type`);i.toggleFavorite(n,r)})}},g=class{async render(){return`
            <h2>Error 404</h2>
        `}},_=class{static async searchAll(e){let t=e.toLowerCase(),n=await Promise.all([r.fetchCharacters(1,50),o.fetchWeapons(1,50),d.fetchMonsters(1,50)]),i=n[0],a=n[1],s=n[2],c=i.map(e=>({id:e.id,nom:e.nom,type:`personnages`})),l=a.map(e=>({id:e.id,nom:e.nom,type:`equipements`})),u=s.map(e=>({id:e.id,nom:e.nom,type:`monstres`}));return c.concat(l).concat(u).filter(e=>e.nom.toLowerCase().includes(t))}},v={"/":e,"/about":m,"/personnages":a,"/personnages/:id":c,"/equipements":l,"/equipements/:id":u,"/monstres":f,"/monstres/:id":p,"/favoris":h},y=async()=>{console.log(`router`);let e=document.querySelector(`#main`),n=t.parseRequestURL(),r=(n.resource?`/`+n.resource:`/`)+(n.id?`/:id`:``)+(n.verb?`/`+n.verb:``),i=new(v[r]?v[r]:g);e.innerHTML=await i.render(n.id),b(),i.after_render&&await i.after_render(n.id)};window.addEventListener(`hashchange`,y),window.addEventListener(`load`,y);function b(){let e=document.getElementById(`recherche_input`);e&&(e.oninput=async()=>{let t=document.getElementById(`recherche_res`),n=e.value.toLowerCase();if(console.log(`Recherche : `+n),console.log(`res`+t),n.length<2){t.innerHTML=``;return}t.innerHTML=(await _.searchAll(n)).map(e=>`
        <div class="search-item">
            <a href="#/${e.type}/${e.id}">
                ${e.nom} <small>(${e.type})</small>
            </a>
        </div>
    `).join(``)})}document.addEventListener(`click`,e=>{let t=document.getElementById(`recherche_form`),n=document.getElementById(`recherche_res`);t&&!t.contains(e.target)&&n&&(n.innerHTML=``)});