let pokemonRepository = (function() {
    const pokemonList = [];

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
                for (let i = 0; i < pokArray.length; i++) {
                    if(pokArray[i] !== properties[i]){
                        console.error(pokArray[i] + ' is an incorrect property');
                    }
                    else {
                        for (let i = 0; i < properties.length; i++) {
                            const missingProperty = function findMissing(item) {
                                return !pokArray.includes(item);
                            }(properties[i]);
                            if (missingProperty === true){
                                console.error(properties[i] + ' is missing from object');
                            }
                        }
                    }
                }
            }
        }
        else {
            console.error(typeof pokemon + ' is an incorrect type');
        }
    }
1
    //return pokemonList
    function getAll() {
        return pokemonList;
    }

    function filterBy(property, value) {
        switch(property){
            case 'name':
                const nameList = pokemonList.filter(function (pokemon) {
                    return pokemon.name === value;
                });
                if(nameList.length > 0) {
                    return nameList;
                }
                else {
                    return 'No matches for ' + property + ': ' + value;
                }
                break;
            case 'category':
                const categoryList = pokemonList.filter(function (pokemon) {
                    return pokemon.category === value;
                });
                if(categoryList.length > 0) {
                    return categoryList;
                }
                else {
                    return 'No matches for ' + property + ': ' + value;
                }
                break;
            case 'height':
                const heightList = pokemonList.filter(function (pokemon) {
                    return pokemon.height.feet >= value;
                });
                if(heightList.length > 0) {
                    return heightList;
                }
                else {
                    return 'No matches for ' + property + ': ' + value;
                }
                break;
            case 'weight':
                const weightList = pokemonList.filter(function (pokemon) {
                    return pokemon.weight >= value;
                });
                if (weightList.length > 0) {
                    return weightList;
                }
                else {
                    return 'No matches for ' + property + ': ' + value;
                }
                break;
            case 'abilities':
                const abilitiesList = pokemonList.filter(function (pokemon) {
                    return pokemon.abilities.includes(value);
                });
                if(abilitiesList.length > 0) {
                    return abilitiesList;
                }
                else {
                    return 'No matches for ' + property + ': ' + value;
                }
                break;
            case 'type':
                const typeList = pokemonList.filter(function (pokemon) {
                    return pokemon.type.includes(value);
                });
                if(typeList.length > 0) {
                    return typeList;
                }
                else {
                    return 'No matches for ' + property + ': ' + value;
                }
                break;
            case 'weakness':
                const weaknessList = pokemonList.filter(function (pokemon) {
                    return pokemon.weakness.includes(value);
                });
                if(weaknessList.length > 0) {
                    return weaknessList;
                }
                else {
                    return 'No matches for ' + property + ': ' + value;
                }
                break;
            default:
                return property + ' does not exist';
                break;
        }
    }

    // create button for each pokemon and add event listener
    function addListItem(pokemon) {
        let pokelist = document.querySelector('.pokelist');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokebutton');
        listItem.appendChild(button);
        pokelist.appendChild(listItem);
        addEventListener(button);
    }

    // create event listener for element that shows details
    function addEventListener(element) {
        element.addEventListener('click', function (event) {
            let captured = filterBy('name', event.target.innerText);
            showDetails(captured);
        });
    }

    // console log details of pokemon
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    //load pokemon from api
    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsURL: itemurl
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsURL;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageURL = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll,
        filterBy: filterBy,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

// Create Pokemon
let p001 = {
    name: 'Bulbasaur',
    category: 'Seed',
    height: {feet: 2, inches: 4},
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
    height: {feet: 3, inches: 3},
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
    height: {feet: 6, inches: 7},
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
    height: {feet: 2, inches: 0},
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
    height: {feet: 3, inches: 7},
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
    height: {feet: 5, inches: 7},
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
    height: {feet: 1, inches: 8},
    weight: 19.8,
    abilities: ['Torrent'],
    type: ['Water'],
    weakness: ['Grass', 'Electric']
};

let p008 = {
    name: 'Wartortle',
    category: 'Turtle',
    height: {feet: 3, inches: 3},
    weight: 49.6,
    abilities: ['Torrent'],
    type: ['Water'],
    weakness: ['Grass', 'Electric']
};

let p009 = {
    name: 'Blastoise',
    category: 'Shellfish',
    height: {feet: 5, inches: 3},
    weight: 188.5,
    abilities: ['Torrent'],
    type: ['Water'],
    weakness: ['Grass', 'Electric']
};

//test filters
// let p010 = 11;
// let p011 = {name: 'crayon', color: 'red'};

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
// pokemonRepository.add(p010);
// pokemonRepository.add(p011);

// Print pokemon to DOM
/*pokemonRepository.getAll().forEach(function(pokemon) {
    pokelist = document.getElementById('pokelist');
    pokelist.insertAdjacentHTML('beforeend', pokemon.name + '<br/>Height: ' + pokemon.height.feet + '\' ' + pokemon.height.inches + '"' + '<br/>Weight:' + pokemon.weight + 'lbs' + '<br/>');
    if (pokemon.height.feet > 3 && pokemon.weight > 100){
        pokelist.insertAdjacentHTML('beforeend', 'What a chonker!<br/><br/>');
    }
    else{
        pokelist.insertAdjacentHTML('beforeend', '<br/>')
    }
});*/

pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});

console.log(pokemonRepository.filterBy('name', 'Blastoise'));
console.log(pokemonRepository.filterBy('category', 'Seed'));
console.log(pokemonRepository.filterBy('abilities', 'Blaze'));
console.log(pokemonRepository.filterBy('height', 2));
console.log(pokemonRepository.filterBy('weight', 100));
console.log(pokemonRepository.filterBy('weight', 900));
console.log(pokemonRepository.filterBy('weiht', 100));