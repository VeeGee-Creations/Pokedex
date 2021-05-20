let pokemonRepository = (function () {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=-1';

/*      ---Initializer---
    fetch and parse pokemon data*/
    function onLoad() {
        if(localStorage.getItem('pokemon').length < 1) {
            fetchPokemon().then(res => localStorage.setItem('pokemon', JSON.stringify(res.results)))
            .then(() => {
                const results = JSON.parse(localStorage.getItem('pokemon'));
                splitPokeList(results);
            })
            .catch(err => console.error(err));
        };

        const results = JSON.parse(localStorage.getItem('pokemon'));
        splitPokeList(results, 16);
    }

    async function fetchPokemon() {
            const data = await (await fetch(apiUrl).catch(function (e) {
                console.error(e);
            })).json();
    
            return await data;
    }

    /*      ---End---       */

    /*      ---Pagination--- */
    function splitPokeList(pokemonArray, size) {
        const results = [];
        const pokelist = document.querySelector('#pokelist');
    
        while (pokemonArray.length) {
            results.push(pokemonArray.splice(0, size));
        }
    
        $(function() {
            $('.simple-pagination').pagination({
                items: results.length,
                itemsOnPage: 1,
                displayedPages: 10,
                currentPage: 1,
                cssStyle: 'light-theme',
                onInit: function() {
                    const pageSelector = $(function() {
                        return $('.simple-pagination').pagination('getCurrentPage');
                    });

                    const page = function () {
                        const firstpage = 1;
                        if(pageSelector[0].URL.match(/\d+/)) {
                            return parseInt(pageSelector[0].URL.match(/\d+/)[0]);
                        }
                        return firstpage;
                    }
                    
                    $(function() {
                        $('.simple-pagination').pagination('drawPage', page());
                    });
                    pokelist.innerHTML = '';
                    pokemonCount(page(), results);
                    populatePage(results[page()-1]);
                },
                onPageClick: function(page) {
                    pokelist.innerHTML = '';
                    pokemonCount(page, results);
                    populatePage(results[page-1]);
                }
            });
        });
    }

    function pokemonCount(page, results) {
        const pokeCount = JSON.parse(localStorage.getItem('pokemon')).length;
        const totalPages = results.length;
        const countMessage = document.querySelector('#pokeCount');
        if(totalPages < 2) countMessage.textContent = `${results[0].length} of ${pokeCount} Pokemon`;
        if(totalPages > 1)countMessage.textContent = `${16 * page - 15}-${Math.min(16 * page, pokeCount)} of ${pokeCount} Pokemon`;
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
    const results = JSON.parse(localStorage.getItem('pokemon'));
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const searchRegExp = new RegExp(searchInput, 'g');
    const pokelist = document.querySelector('#pokelist');
    pokelist.innerHTML = '';
    const searchResult = results.filter(pokemon => pokemon.name.match(searchRegExp))
    if(searchResult.length > 1) pokelist.removeAttribute('style', 'columns: 1');
    if(searchResult.length < 2) pokelist.setAttribute('style', 'columns: 1');
    location.hash = '#page-1';
    splitPokeList(searchResult, 16);
    
}

    return {
        onLoad,
        searchListener,
    };
})();

pokemonRepository.onLoad();
pokemonRepository.searchListener();