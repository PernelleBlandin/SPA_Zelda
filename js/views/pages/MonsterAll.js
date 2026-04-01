import MonsterProvider from "../../services/MonsterProvider.js";

export default class MonsterAll {
    constructor() {
        this.currentPage = 1;
        this.limit = 6;
    }

    renderList(monstres) {
        if (!monstres || !Array.isArray(monstres)) return "";
        return monstres.map(
            monstre => `<li><a href="#/monstres/${monstre.id}">${monstre.nom}</a></li>`
        ).join('\n');
    }

    async render () {
        let monstres = await MonsterProvider.fetchMonsters(this.currentPage, this.limit);
        console.log(monstres);
        let view = `
        <h2>Tous les monstres</h2>
        <ul id="list">
                ${this.renderList(monstres)}
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
    
        const updatePage = async (direction) => {
            this.currentPage += direction;
            const data = await MonsterProvider.fetchMonsters(this.currentPage, this.limit);
           
            if (data.length > 0) {
                listContainer.innerHTML = this.renderList(data);
                pageInfo.textContent = `Page ${this.currentPage}`;
                prevBtn.disabled = (this.currentPage === 1);
            } else {
                this.currentPage -= direction;
            }
        };
    
        document.getElementById('next-btn').addEventListener('click', () => updatePage(1));
        document.getElementById('prev-btn').addEventListener('click', () => updatePage(-1));
        }

}