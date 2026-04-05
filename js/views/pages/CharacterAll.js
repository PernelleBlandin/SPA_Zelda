import CharacterProvider from "../../services/CharacterProvider.js";
import FavoriteProvider from "../../services/FavoriteProvider.js";
import SearchProvider from "../../services/SearchProvider.js";

export default class CharacterAll {
    constructor() {
        this.currentPage = 1;
        this.limit = 6;
        this.totalPages = 1;
    }


    renderList(personnages) {
        if (!personnages || !Array.isArray(personnages)) return "";
        let htmlResultat = "";
    
        for (let i = 0; i < personnages.length; i++) {
            let perso = personnages[i];
            let estFavori = FavoriteProvider.isFavorite(perso.id, 'personnages');

        htmlResultat += `
            <li class="item-li">
                <div class="item-content">
                    <a href="#/personnages/${perso.id}">${perso.nom}</a>
                </div>
                <div class="fav-container">
                    <input type="checkbox" 
                           id="heart-${perso.id}" 
                           class="heart-checkbox" 
                           data-id="${perso.id}" 
                           data-nom="${perso.nom}"
                           ${estFavori ? 'checked' : ''}>
                    <label for="heart-${perso.id}" class="heart-label">&#9829;</label>
                </div>
            </li>`;
    }
    
    return htmlResultat;
    }


    async render() {
        let personnages = await CharacterProvider.fetchCharacters(this.currentPage, this.limit);
        this.totalPages= personnages.pages;
        const personnagesData = personnages.data;
        console.log(personnages);
       
        let view = `
            <h2>Tous les personnages</h2>
            <ul id="list">
                ${this.renderList(personnagesData)}
                
            </ul>
            <div class="pagination-controls">
                <button id="prev-btn" ${this.currentPage === 1 ? 'disabled' : ''}>Précédent</button>
                <span id="page-info">Page ${this.currentPage} sur ${this.totalPages}</span>
                <button id="next-btn"  ${this.currentPage >= this.totalPages ? 'disabled' : ''}>Suivant</button>
            </div>
        `;
        return view;
    }

    async after_render() {
    //recherche
    //const recherche = document.getElementById("recherche");
    
  
    //Pagination
    const listContainer = document.getElementById('list');
    const pageInfo = document.getElementById('page-info');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Gestion des favoris
    const favs= () => {
        let checkboxes = document.querySelectorAll('.heart-checkbox');
        for (let j = 0; j < checkboxes.length; j++) {
            checkboxes[j].onclick = function(event) {
                let checkbox = event.target;
                let itemData = {
                    id: checkbox.getAttribute('data-id'),
                    nom: checkbox.getAttribute('data-nom')
                };
                FavoriteProvider.toggleFavorite(itemData, 'personnages');
            };
        }
    }
    favs();
    
    // Gestion Pagination
    const updatePage = async (direction) => {
        const nextStep = this.currentPage + direction;
        if (nextStep < 1 || nextStep > this.totalPages) return;

        this.currentPage = nextStep;
        const response = await CharacterProvider.fetchCharacters(this.currentPage, this.limit);
        const data = response.data;

        if (data.length > 0) {
            listContainer.innerHTML = this.renderList(data);
            pageInfo.textContent = `Page ${this.currentPage} sur ${this.totalPages}`;
            prevBtn.disabled = (this.currentPage === 1);
            nextBtn.disabled = (this.currentPage >= this.totalPages);
            favs();
        } else {
            this.currentPage -= direction;
        }
    };

    document.getElementById('next-btn').addEventListener('click', () => updatePage(1));
    document.getElementById('prev-btn').addEventListener('click', () => updatePage(-1));
    }
}