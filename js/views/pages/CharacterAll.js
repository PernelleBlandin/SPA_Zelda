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
                <span id="page-info">Page ${this.currentPage} sur ${this.totalPages}</span>
                <button id="next-btn" ${this.currentPage >= this.totalPages ? 'disabled' : ''}>Suivant</button>
            </div>
        `;
    }

    async after_render() {
        const listContainer = document.getElementById('characters-list');
        const pageInfo = document.getElementById('page-info');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        const updatePage = async (direction) => {
            const nextStep = this.currentPage + direction;
            if (nextStep < 1 || nextStep > this.totalPages) return;

            this.currentPage = nextStep;
            const data = await CharacterProvider.fetchCharacters(this.currentPage, this.limit);

            if (listContainer && data) {
                listContainer.innerHTML = this.renderList(data);
                pageInfo.textContent = `Page ${this.currentPage} sur ${this.totalPages}`;
                

                prevBtn.disabled = (this.currentPage === 1);
                nextBtn.disabled = (this.currentPage >= this.totalPages);
            }
        };

        if (nextBtn) nextBtn.onclick = () => updatePage(1);
        if (prevBtn) prevBtn.onclick = () => updatePage(-1);
    }
}