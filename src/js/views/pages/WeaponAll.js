import WeaponProvider from "../../services/WeaponProvider.js";
import FavoriteProvider from "../../services/FavoriteProvider.js";

export default class WeaponAll {
    constructor() {
        this.currentPage = 1;
        this.limit = 6;
        this.totalPages = 1;
    }

    renderList(equipements) {
        if (!equipements || !Array.isArray(equipements)) return "";

        return equipements.map(eq => {
            let estFavori = FavoriteProvider.isFavorite(eq.id, 'equipements');
            return `
                <li class="item-li">
                    <div class="item-content">
                        <a href="#/equipements/${eq.id}">${eq.nom}</a>
                    </div>
                    <div class="fav-container">
                        <input type="checkbox" id="heart-${eq.id}" class="heart-checkbox" 
                               data-id="${eq.id}" data-nom="${eq.nom}" ${estFavori ? 'checked' : ''}>
                        <label for="heart-${eq.id}" class="heart-label">&#9829;</label>
                    </div>
                </li>`;
        }).join("");
    }

    favorisEvent() {
        const checkboxes = document.querySelectorAll('.heart-checkbox');
        checkboxes.forEach(cb => {
            cb.onclick = (e) => {
                const itemData = {
                    id: cb.dataset.id,
                    nom: cb.dataset.nom
                };
                FavoriteProvider.toggleFavorite(itemData, 'equipements');
            };
        });
    }

    async render () {
        const total = await WeaponProvider.countTotalWeapons();
        this.totalPages = Math.ceil(total / this.limit);
        const equipements = await WeaponProvider.fetchWeapons(this.currentPage, this.limit);
        console.log(equipements);
        let view = `
        <h2>Tous les équipements</h2>
        <ul id="list">
                ${this.renderList(equipements)}
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
        return view;
    }


    async after_render() {
        const listContainer = document.getElementById('list');
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
            const data = await WeaponProvider.fetchWeapons(this.currentPage, this.limit);

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