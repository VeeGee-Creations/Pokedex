let pokemonRepository = (function() {
    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';

    function add(pokemon) {

        // Create array of pokemon properties
        const pokArray = Object.keys(pokemon);
        //master list of properties
        const properties = ["name", "detailsUrl"]

        // compare pokArray to properties
        const comparrison = function (arr1, arr2) {

            if (arr1.length !== arr2.length) {
                return false;
            }

            return arr1.every((val) => arr2.includes(val));

        }(pokArray, properties);

        // pokemonList.push(pokemon)
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

    //return pokemonList
    function getAll() {
        return pokemonList;
    }

    function filterBy(property, value) {
        switch(property){
            case "name":
                const nameList = pokemonList.filter(function (pokemon) {
                    return pokemon.name === value;
                });
                if (nameList.length > 0) {
                    return nameList;
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
            case 'types':
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
        // button.addEventListener('click', function(event) {
        //     showDetails(pokemon);
        // })
    }

    // create event listener for element that shows details
    function addEventListener(element) {
        element.addEventListener('click', function (event) {
            let captured = filterBy('name', event.target.innerText);
            showDetails(captured);
        });
    }

    //load pokemon from api
    async function loadList() {
        const data = await (await fetch(apiUrl).catch(function(e){
            console.error(e);
        })).json();

       extractData(data);
        // console.log(data);
        // return fetch(apiUrl).then(function (response) {
        //     return response.json();
        // }).then(function (json) {
        //     json.results.forEach(function (item) {
        //         let pokemon = {
        //             name: item.name,
        //             detailsUrl: item.url
        //         };
        //         add(pokemon);
        //     });
        // }).catch(function (e) {
        //     console.error(e);
        // })
    }

    async function extractData(json) {
        await json.results.forEach(function (item) {
            const pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
        });
    }

    function loadDetails(item) {
        let url = item[0].detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            item.weight = details.weight;
            item.abilities = details.abilities;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // console log details of pokemon
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
        });
    }

    // async function searchFor(property, value) {
    //     await loadList();
    //     const result = filterBy(property, value);
    //     return result;
    // }

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

pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});

console.log(pokemonRepository.getAll());
console.log(pokemonRepository.filterBy('name', "bulbasaur"));
// console.log(pokemonRepository.filterBy('category', 'Seed'));
// console.log(pokemonRepository.filterBy('abilities', 'blaze'));
// console.log(pokemonRepository.filterBy('height', 2));
// console.log(pokemonRepository.filterBy('weight', 100));
// console.log(pokemonRepository.filterBy('weight', 900));
// console.log(pokemonRepository.filterBy('weiht', 100));