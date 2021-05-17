let pokemonRepository = (function () {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=-1';
    const pokeList = [];

/*      ---Initializer---
    fetch and parse pokemon data*/
    function onLoad() {
        if(!localStorage.getItem('pokemon')) {
            fetchPokemon().then(res => localStorage.setItem('pokemon', JSON.stringify(res.results)));
        };

        results = JSON.parse(localStorage.getItem('pokemon'));
        results.map(pokemon => pokeList.push(pokemon));
        populatePage(pokeList);
    }

    async function fetchPokemon() {
            const data = await (await fetch(apiUrl).catch(function (e) {
                console.error(e);
            })).json();
    
            return await data;
    }

    /*      ---End---       */

    /*  ---Populate Page With Pokemon Buttons---    */
    function populatePage(pokemonList) {
        pokemonList.map(pokemon => {
            const pokelist = document.querySelector('#pokelist');
            const listItem = document.createElement('li');
            const button = document.createElement('button');

            button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            button.classList.add('pokebutton');
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#pokemonModal');
            listItem.appendChild(button);
            pokelist.appendChild(listItem);
            button.addEventListener('click', function () {
                showDetails(pokemon);
            });
        });
    }
    /*      ---End---       */

    /*  ---Show Details on Pokemon Button Click---  */
    async function fetchDetails(pokemon) {
        return await fetch(pokemon.url).then(function (response) {
            return response.json();
        }).then(function (details) {
            pokemon.imageUrl = details.sprites.other['official-artwork'].front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
            pokemon.weight = details.weight;
            pokemon.abilities = details.abilities;
        }).catch(function (e) {
            console.error(e);
        });
    }

    async function showDetails(pokemon) {
        await fetchDetails(pokemon).then(() => {
            const pokeName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            const pokeImage = pokemon.imageUrl;
            const pokeDetails =
            `Height: ${pokemon.height / 10}m\n
            Weight: ${pokemon.weight / 10}kg\n
            Types: ${pokemon.types.map(type => type.type.name).join(', ')}\n
            Abilitites: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}`;

            showModal(pokeName, pokeImage, pokeDetails);
        });
    }

    function showModal(name, image, details) {
        const modalTitle = document.querySelector('#pokemonModalLabel');
        const modalBody = document.querySelector('.modal-body');
        const imageElement = document.createElement('img');
        const contentElement = document.createElement('p');

        modalTitle.innerText = name;
        modalTitle.setAttribute('tabindex', '0');

        modalBody.innerHTML = '';
        image && imageElement.setAttribute('src', image);
        imageElement.setAttribute('id', 'pokemon-img');
        imageElement.setAttribute('alt', name + '-image');

        contentElement.innerText = details;
        contentElement.setAttribute('tabindex', '0');

        modalBody.appendChild(imageElement);
        modalBody.appendChild(contentElement);
    }
/*      ---End---       */

function searchListener(){
    const searchButton = document.querySelector('#search-button');
    const searchBar = document.querySelector('#search-input');
    searchButton.addEventListener('click', pokemonSearch);
    searchBar.addEventListener('search', pokemonSearch);
}

// search for pokemon
function pokemonSearch() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const searchRegExp = new RegExp(searchInput, 'g');
    const pokelist = document.querySelector('#pokelist');
    pokelist.innerHTML = '';
    const searchResult = pokeList.filter(pokemon => pokemon.name.match(searchRegExp))
    if(searchResult.length > 1) pokelist.removeAttribute('style', 'columns: 1');
    if(searchResult.length < 2) pokelist.setAttribute('style', 'columns: 1');
    populatePage(searchResult);
    
}

    return {
        onLoad,
        searchListener,
    };
})();

pokemonRepository.onLoad();
pokemonRepository.searchListener();