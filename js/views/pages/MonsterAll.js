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
                <span id="page-info">Page ${this.currentPage} sur ${this.totalPages}</span>
                <button id="next-btn" ${this.currentPage >= this.totalPages ? 'disabled' : ''}>Suivant</button>
            </div>
            `;
        return view;
    }

    async after_render() {
        const listContainer = document.getElementById('list');
        const pageInfo = document.getElementById('page-info');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
    
        const updatePage = async (direction) => {
            const nextStep = this.currentPage + direction;
            if (nextStep < 1 || nextStep > this.totalPages) return;

            this.currentPage = nextStep;
            const data = await MonsterProvider.fetchMonsters(this.currentPage, this.limit);
            
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