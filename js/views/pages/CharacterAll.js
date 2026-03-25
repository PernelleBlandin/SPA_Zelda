import CharacterProvider from "../../services/CharacterProvider.js";

export default class CharacterAll {
    constructor() {
        this.currentPage = 1;
        this.limit = 6;
    }


    renderList(personnages) {
        if (!personnages || !Array.isArray(personnages)) return "";
        return personnages.map(
            personnage => `<li><a href="#/personnages/${personnage.id}">${personnage.nom}</a></li>`
        ).join('\n');
    }


    async render() {
        let personnages = await CharacterProvider.fetchCharacters(this.currentPage, this.limit);
        console.log(personnages);
       
        let view = `
            <h2>Tous les personnages</h2>
            <ul id="list">
                ${this.renderList(personnages)}
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
        const data = await CharacterProvider.fetchCharacters(this.currentPage, this.limit);
       
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