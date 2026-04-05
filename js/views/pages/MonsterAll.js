import MonsterProvider from "../../services/MonsterProvider.js";

export default class MonsterAll {
    constructor() {
        this.currentPage = 1;
        this.limit = 6;
        this.totalPages = 1;
    }

    renderList(monstres) {
        if (!monstres || !Array.isArray(monstres)) return "";
        return monstres.map(
            monstre => `<li><a href="#/monstres/${monstre.id}">${monstre.nom}</a></li>`
        ).join('\n');
    }

    async render () {
        const total = await MonsterProvider.countTotalMonsters();
        this.totalPages = Math.ceil(total / this.limit);
        const monstres = await MonsterProvider.fetchMonsters(this.currentPage, this.limit);
        let view = `
        <h2>Tous les monstres</h2>
        <ul id="list">
                ${this.renderList(monstres)}
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
    
        const updatePage = async (newPage) => {
            if (newPage < 1 || newPage > this.totalPages) {
                pageInput.value = this.currentPage; // On remet l'ancienne valeur si erreur
                return;
            }
            this.currentPage = newPage;
            const data = await MonsterProvider.fetchMonsters(this.currentPage, this.limit);
            
            if (listContainer && data) {
                listContainer.innerHTML = this.renderList(data);
                pageInput.value = this.currentPage;
                prevBtn.disabled = (this.currentPage === 1);
                nextBtn.disabled = (this.currentPage >= this.totalPages);
            }
        };

        if (pageInput) {
            pageInput.onchange = (e) => updatePage(parseInt(e.target.value));
        }
        if (nextBtn) nextBtn.onclick = () => updatePage(this.currentPage + 1);
        if (prevBtn) prevBtn.onclick = () => updatePage(this.currentPage - 1);
    }
}