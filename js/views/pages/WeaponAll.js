import WeaponProvider from "../../services/WeaponProvider.js";
import FavoriteProvider from "../../services/FavoriteProvider.js";

export default class WeaponAll {
    constructor() {
        this.currentPage = 1;
        this.limit = 6;
    }

    renderList(equipements) {
        if (!equipements || !Array.isArray(equipements)) return "";

        let htmlResultat = "";
        for (let i = 0; i < equipements.length; i++) {
            let eq = equipements[i];
            let estFavori = FavoriteProvider.isFavorite(eq.id,'equipements');
            htmlResultat += `
                <li class="item-li">
                <div class="item-content">
                    <a href="#/equipements/${eq.id}">${eq.nom}</a>
                </div>
                <div class="fav-container">
                    <input type="checkbox" 
                           id="heart-${eq.id}" 
                           class="heart-checkbox" 
                           data-id="${eq.id}" 
                           data-nom="${eq.nom}"
                           ${estFavori ? 'checked' : ''}>
                    <label for="heart-${eq.id}" class="heart-label">&#9829;</label>
                </div>
            </li>`;
        }
        return htmlResultat;

        // return equipements.map(
        //     equipement => `<li><a href="#/equipements/${equipement.id}">${equipement.nom}</a></li>`
        // ).join('\n');
    }

    async render () {
        let equipements = await WeaponProvider.fetchWeapons(this.currentPage, this.limit);
        console.log(equipements);
        let view = `
        <h2>Tous les equipements</h2>
        <ul id="list">
                ${this.renderList(equipements)}
            </ul>
            <div class="pagination-controls">
                <button id="prev-btn" ${this.currentPage === 1 ? 'disabled' : ''}>Précédent</button>
                <span id="page-info">Page ${this.currentPage}</span>
                <button id="next-btn">Suivant</button>
            </div>
        `;
    return view;
    }


    async after_render() {
        const listContainer = document.getElementById('list');
        const pageInfo = document.getElementById('page-info');
        const prevBtn = document.getElementById('prev-btn');

        const setupFavListeners = () => {
            let checkboxes = document.querySelectorAll('.heart-checkbox');
            for (let j = 0; j < checkboxes.length; j++) {
                checkboxes[j].addEventListener('change', function(event) {
                    let checkbox = event.target;
                    let itemData = {
                        id: checkbox.getAttribute('data-id'),
                        nom: checkbox.getAttribute('data-nom')
                    };
                    FavoriteProvider.toggleFavorite(itemData, 'equipements');
                });
            }
        };
    
    
        const updatePage = async (direction) => {
            this.currentPage += direction;
            const data = await WeaponProvider.fetchWeapons(this.currentPage, this.limit);
           
            if (data.length > 0) {
                listContainer.innerHTML = this.renderList(data);
                pageInfo.textContent = `Page ${this.currentPage}`;
                prevBtn.disabled = (this.currentPage === 1);
                setupFavListeners();
            } else {
                this.currentPage -= direction;
            }
        };
    
        document.getElementById('next-btn').addEventListener('click', () => updatePage(1));
        document.getElementById('prev-btn').addEventListener('click', () => updatePage(-1));
        setupFavListeners();    
    }

}