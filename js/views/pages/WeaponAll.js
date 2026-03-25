import WeaponProvider from "../../services/WeaponProvider.js";

export default class WeaponAll {
    constructor() {
        this.currentPage = 1;
        this.limit = 6;
    }

    renderList(equipements) {
        if (!equipements || !Array.isArray(equipements)) return "";
        return equipements.map(
            equipement => `<li><a href="#/equipements/${equipement.id}">${equipement.nom}</a></li>`
        ).join('\n');
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
    
        const updatePage = async (direction) => {
            this.currentPage += direction;
            const data = await WeaponProvider.fetchWeapons(this.currentPage, this.limit);
           
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