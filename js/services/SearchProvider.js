import CharacterProvider from "./CharacterProvider.js";
import WeaponProvider from "./WeaponProvider.js";
import MonsterProvider from "./MonsterProvider.js";

export default class SearchProvider {
    static async searchAll(query) {
        const q = query.toLowerCase();
        
        const data = await Promise.all([
            CharacterProvider.fetchCharacters(1,50),
            WeaponProvider.fetchWeapons(1,50),
            MonsterProvider.fetchMonsters(1,50)
        ]);

        const chars = data[0];
        const weapons = data[1];
        const monsters = data[2];
   
        let listChars = chars.map(item => {
            return { id: item.id, nom: item.nom, type: 'personnages' };});

        let listWeapons = weapons.map(item => {
            return { id: item.id, nom: item.nom, type: 'equipements' };});

        let listMonsters = monsters.map(item => {
            return { id: item.id, nom: item.nom, type: 'monstres' };});


        let allItems = listChars.concat(listWeapons).concat(listMonsters);
        return allItems.filter(item => {
            return item.nom.toLowerCase().includes(q);
        });
    }
}