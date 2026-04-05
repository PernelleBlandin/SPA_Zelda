import CharacterProvider from "../../services/CharacterProvider.js";
import FavoriteProvider from "../../services/FavoriteProvider.js";

export default class CharacterAll {
    constructor() {
        this.currentPage = 1;
        this.limit = 6;
        this.totalPages = 1;
    }

    
    renderList(personnages) {
        if (!personnages || !Array.isArray(personnages)) return "";
        return personnages.map(perso => {
            let estFavori = FavoriteProvider.isFavorite(perso.id, 'personnages');
            return `
            <li class="item-li">
                <div class="item-content">
                    <a href="#/personnages/${perso.id}">${perso.nom}</a>
                </div>
                <div class="fav-container">
                    <input type="checkbox" id="heart-${perso.id}" class="heart-checkbox" 
                           data-id="${perso.id}" data-nom="${perso.nom}" ${estFavori ? 'checked' : ''}>
                    <label for="heart-${perso.id}" class="heart-label">&#9829;</label>
                </div>
            </li>`;
        }).join("");
    }

    favorisEvent() {
        const checkboxes = document.querySelectorAll('.heart-checkbox');
        checkboxes.forEach(cb => {
            cb.onclick = () => {
                const itemData = {
                    id: cb.dataset.id,
                    nom: cb.dataset.nom
                };
                FavoriteProvider.toggleFavorite(itemData, 'personnages');
            };
        });
    }


    async render() {
        const totalPersos = await CharacterProvider.countTotalCharacters();
        this.totalPages = Math.ceil(totalPersos / this.limit);
        const personnagesData = await CharacterProvider.fetchCharacters(this.currentPage, this.limit);

        return `
            <h2>Tous les personnages</h2>
            <ul id="characters-list"> ${this.renderList(personnagesData)}
            </ul>
            <div class="pagination-controls">
                <button id="prev-btn" ${this.currentPage === 1 ? 'disabled' : ''}>Précédent</button>
                <div class="page-selector">
                    Page 
                    <input type="number" id="page-input" 
                           value="${this.currentPage}" 
                           min="1" max="${this.totalPages}" 
                           style="width: 50px; text-align: center;"> 
                    sur ${this.totalPages}
                </div>
                <button id="next-btn" ${this.currentPage >= this.totalPages ? 'disabled' : ''}>Suivant</button>
            </div>
        `;
    }

    async after_render() {
        const listContainer = document.getElementById('characters-list');
        const pageInput = document.getElementById('page-input');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        this.favorisEvent();

        const updatePage = async (newPage) => {
            if (newPage < 1 || newPage > this.totalPages) {
                if (pageInput) pageInput.value = this.currentPage;
                return;
            }
            this.currentPage = newPage;
            const data = await CharacterProvider.fetchCharacters(this.currentPage, this.limit);

            if (listContainer && data) {
                listContainer.innerHTML = this.renderList(data);
                if (pageInput) pageInput.value = this.currentPage;
                prevBtn.disabled = (this.currentPage === 1);
                nextBtn.disabled = (this.currentPage >= this.totalPages);
                this.favorisEvent();
            }
        };

        if (pageInput) {
            pageInput.onchange = (e) => updatePage(parseInt(e.target.value));
        }
        if (nextBtn) nextBtn.onclick = () => updatePage(this.currentPage + 1);
        if (prevBtn) prevBtn.onclick = () => updatePage(this.currentPage - 1);
    }
}