let pokemonRepository = (function() {
    let pokemonList = [];

    function add(pokemon) {

        // Create array of pokemon properties
        const pokArray = Object.keys(pokemon);
        //master list of properties
        const properties = ['name', 'category', 'height', 'weight', 'abilities', 'type', 'weakness']

        // compare pokArray to properties
        const comparrison = function (arr1, arr2) {

            if (arr1.length !== arr2.length) {
                return false;
            }

            return arr1.every((val) => arr2.includes(val));

        }(pokArray, properties);

        // if formated properly, push to list
        if (typeof pokemon === 'object') {
            if (comparrison === true) {
                let accepted = pokemon;
                return pokemonList.push(accepted);
            }
        // console log format errors
            else {
                for (let i = 0; i < pokArray.length; i++)
                    if(pokArray[i] !== properties[i]){
                    console.error(pokArray[i] + ' is an incorrect property');
                    }
            }
        }
        else {
            console.error(typeof pokemon + ' is an incorrect type');
        }
    }
1
    function getAll() {
        return pokemonList;
    }

    function byName(pokeName) {
        const filteredList = [];
        for (let item of pokemonList) {
            if (item.name === pokeName) {
                filteredList.push(item);
            }
        }

        return filteredList;
    }

    return {
        add: add,
        getAll: getAll,
        byName: byName
    };
})();

// Create Pokemon
let p001 = {
    name: 'Bulbasaur',
    category: 'Seed',
    height: '2\' 04"',
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
    height: '3\' 03"',
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
    height: '6\' 07"',
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
    height: '2\' 00"',
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
    height: '3\' 07"',
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
    height: '5\' 07"',
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
    height: '1\' 08"',
    weight: 19.8,
    abilities: ['Torrent'],
    type: ['Water'],
    weakness: ['Grass', 'Electric']
};

let p008 = {
    name: 'Wartortle',
    category: 'Turtle',
    height: '3\' 03"',
    weight: 49.6,
    abilities: ['Torrent'],
    type: ['Water'],
    weakness: ['Grass', 'Electric']
};

let p009 = {
    name: 'Blastoise',
    category: 'Shellfish',
    height: '5\' 03"',
    weight: 188.5,
    abilities: ['Torrent'],
    type: ['Water'],
    weakness: ['Grass', 'Electric']
};

//test filters
let p010 = 11;
let p011 = {name: 'crayon', color: 'red'};

// Add Pokemon to pokeRepository
pokemonRepository.add(p001);
pokemonRepository.add(p002);
pokemonRepository.add(p003);
pokemonRepository.add(p004);
pokemonRepository.add(p005);
pokemonRepository.add(p006);
pokemonRepository.add(p007);
pokemonRepository.add(p008);
pokemonRepository.add(p009);
pokemonRepository.add(p010);
pokemonRepository.add(p011);

// Print pokemon to DOM
pokemonRepository.getAll().forEach(function(pokemon) {
    pokelist = document.getElementById('pokelist');
    pokelist.insertAdjacentHTML('beforeend', pokemon.name + '<br/>Height: ' + pokemon.height + '<br/>Weight:' + pokemon.weight + 'lbs' + '<br/>');
    if (pokemon.height > '3\' 00"' && pokemon.weight > 100){
        pokelist.insertAdjacentHTML('beforeend', 'What a chonker!<br/><br/>');
    }
    else{
        pokelist.insertAdjacentHTML('beforeend', '<br/>')
    }
});

console.log(pokemonRepository.byName('Blastoise'));