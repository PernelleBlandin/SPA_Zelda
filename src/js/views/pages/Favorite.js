import FavoriteProvider from "../../services/FavoriteProvider.js";

export default class Favorites {
    constructor() {}

    renderList(items) {
        if (!items || items.length === 0) {
            return "<p>Vous n'avez pas encore de favoris.</p>";
        }
        let htmlResultat = "";
        for (let i = 0; i < items.length; i++) {
            let it = items[i];
            htmlResultat += `
                <li class="item-li">
                    <div class="item-content">
                        <a href="#/${it.type}/${it.id}">${it.nom}</a>
                        <small style="color: #666; margin-left: 10px;">(${it.type})</small>
                    </div>
                    <div class="fav-container">
                        <input type="checkbox" 
                               id="heart-fav-${it.type}-${it.id}" 
                               class="heart-checkbox" 
                               data-id="${it.id}" 
                               data-nom="${it.nom}"
                               data-type="${it.type}"
                               checked>
                        <label for="heart-fav-${it.type}-${it.id}" class="heart-label">&#9829;</label>
                    </div>
                </li>`;
        }
        return htmlResultat;
    }

    async render() {
        let favoris = FavoriteProvider.getFavorites();
        let view = `
            <h2>Mes Favoris</h2>
            <ul id="list">
                ${this.renderList(favoris)}
            </ul>
        `;
        return view;
    }

    async after_render() {
        let checkboxes = document.querySelectorAll('.heart-checkbox');
        for (let j = 0; j < checkboxes.length; j++) {
            checkboxes[j].addEventListener('change', function(event) {
                let checkbox = event.target;
                let itemData = {
                    id: checkbox.getAttribute('data-id'),
                    nom: checkbox.getAttribute('data-nom')
                };
                let type = checkbox.getAttribute('data-type');
                // On retire des favoris
                FavoriteProvider.toggleFavorite(itemData, type);
                
            });
        }
    }
}