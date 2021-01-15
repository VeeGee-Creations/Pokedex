let pokemonList = [];

// Create Pokemon
let p001 = {
    name: 'Bulbasaur',
    category: 'Seed',
    height: 2.04,
    weight: 15.2,
    abilities: ['Overgrow'],
    type: ['Grass', 'Poison'],
    weakness: [
        'Fire',
        'Psychic',
        'Flying',
        'Ice'
    ]
};

let p002 = {
    name: 'Ivysaur',
    category: 'Seed',
    height: 3.03,
    weight: 28.7,
    abilities: ['Overgrow'],
    type: ['Grass', 'Poison'],
    weakness: [
        'Fire',
        'Psychic',
        'Flying',
        'Ice'
    ]
};

let p003 = {
    name: 'Venusaur',
    category: 'Seed',
    height: 6.07,
    weight: 220.5,
    abilities: ['Overgrow'],
    type: ['Grass', 'Poison'],
    weakness: [
        'Fire',
        'Psychic',
        'Flying',
        'Ice'
    ]
};

let p004 = {
    name: 'Charmander',
    category: 'Lizard',
    height: 2.00,
    weight: 18.7,
    abilities: ['Blaze'],
    type: ['Fire'],
    weakness: [
        'Water',
        'Ground',
        'Rock'
    ]
};

let p005 = {
    name: 'Charmeleon',
    category: 'Flame',
    height: 3.07,
    weight: 41.9,
    abilities: ['Blaze'],
    type: ['Fire'],
    weakness: [
        'Water',
        'Ground',
        'Rock'
    ]
};

let p006 = {
    name: 'Charizard',
    category: 'Flame',
    height: 5.07,
    weight: 199.5,
    abilities: ['Blaze'],
    type: ['Fire', 'Flying'],
    weakness: [
        'Water',
        'Electric',
        'Rock'
    ]
};

let p007 = {
    name: 'Squirtle',
    category: 'Tiny Turtle',
    height: 1.08,
    weight: 19.8,
    abilities: ['Torrent'],
    type: ['Water'],
    weakness: ['Grass', 'Electric']
};

let p008 = {
    name: 'Wartortle',
    category: 'Turtle',
    height: 3.03,
    weight: 49.6,
    abilities: ['Torrent'],
    type: ['Water'],
    weakness: ['Grass', 'Electric']
};

let p009 = {
    name: 'Blastoise',
    category: 'Shellfish',
    height: 5.03,
    weight: 188.5,
    abilities: ['Torrent'],
    type: ['Water'],
    weakness: ['Grass', 'Electric']
};

// Add Pokemon to pokeList
pokemonList.push(p001, p002, p003, p004, p005, p006, p008, p009);

// Verify Console Output
console.log(pokemonList);