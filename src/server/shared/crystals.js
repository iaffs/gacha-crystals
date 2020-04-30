

const crystals = [
    {id: 1, name: 'Emerald', img: '/img/emerald.png', color: 'Emerald Green', hardness: 7, rarity: 4, value: 100},
    {id: 2, name: 'Diamond', img: './img/diamond.png', color: 'Glossy Transparent', hardness: 10, rarity: 1, value: 300},
    {id: 3, name: 'Angelite', img: '/img/angelite.png', color: 'Dusty Skyblue', hardness: 6, rarity: 6, value: 50},
    {id: 4, name: 'Citrine', img: '/img/citrine.png', color: 'Dijon Yellow', hardness: 5, rarity: 5, value: 60},
    {id: 5, name: 'Rose Quartz', img: '/img/rosequartz.png', color: 'Baby pink', hardness: 6, rarity: 8, value: 30},
    {id: 6, name: 'Amethyst', img: '/img/amethyst.png', color: 'Transparent Purple', hardness: 4, rarity: 3, value: 150},
    {id: 7, name: 'Black Onyx', img: '/img/blackonyx.png', color: 'Glossy Dusty Black', hardness: 8, rarity: 2, value: 200},
    {id: 8, name: 'Tigers Eye', img: '/img/tigerseye.png', color: '70s Greenorange', hardness: 7, rarity: 9, value: 20},
    {id: 9, name: 'Hematite', img: '/img/hematite.png', color: 'Glossy Steel', hardness: 9, rarity: 3, value: 150},
    {id: 10, name: 'Opal', img: '/img/opalspeckled.png', color: 'White Speckled', hardness: 4, rarity: 2, value: 200},
    {id: 11, name: 'Jade', img: '/img/jade.png', color: 'Dusty Jade Green', hardness: 6, rarity: 7, value: 30},
    {id: 12, name: 'Black Obsidian', img: '/img/blackobsidian.png', color: 'Total Black', hardness: 3, rarity: 4, value: 100},
    {id: 13, name: 'Ruby', img: '/img/ruby.png', color: 'Fuchsia Glossy Red', hardness: 3, rarity: 3, value: 100},
    {id: 14, name: 'Bloodstone', img: '/img/bloodstone.png', color: 'Red Speckled Green', hardness: 7, rarity: 10, value: 5},
    {id: 15, name: 'Sapphire', img: '/img/sapphire.png', color: 'Royal Blue', hardness: 9, rarity: 2, value: 200}
]
/*
function getRandomCrystal() {
    return crystals[Math.floor(Math.random() * crystals.length)];
}

function getPokemonById(id) {
    const pokemon = pokemonList.filter(pokemon => pokemon.id == id);
    return pokemon;
}
*/
function exportMe() {
    console.log("yep");
}
//export default crystals;
module.exports = {crystals, exportMe};