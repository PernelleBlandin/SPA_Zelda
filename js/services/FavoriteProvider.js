export default class FavoriteProvider {

    static getFavorites() {
        let favs = localStorage.getItem('zelda_favorites');
        if (favs) {
            return JSON.parse(favs);
        } else {
            return [];
        }
    }

    // Ajouter ou retirer un favori
    static toggleFavorite(item, type){
        let favorites = this.getFavorites();
        let foundIndex = -1;

        for(let i = 0; i < favorites.length; i++){
            if (favorites[i].id === item.id && favorites[i].type === type){
                foundIndex = i;
                break;
            }
        }

        if(foundIndex !== -1) {
            favorites.splice(foundIndex, 1);
        }else {
            let newItem = {
                id:item.id,
                nom:item.nom,
                type: type};
            favorites.push(newItem);
        }
        
        localStorage.setItem('zelda_favorites', JSON.stringify(favorites));
    }
    // Vérifier si un item est en favori
    static isFavorite(id, type){
        let favorites = this.getFavorites();
        for(let i = 0; i < favorites.length; i++){
            if(favorites[i].id === id && favorites[i].type === type){
                return true;
            }
        }
        return false;
    }
}