let pokemonRepository = (function() {
    const pokemonList = [];
    const pokemonMenu = [];
    let pokemonTotal = undefined;
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';
    // We have defined modalContainer here
    const modalContainer = document.querySelector('#modal-container');

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

    // return pokemonList
    function getAll() {
        return pokemonList;
    }

    // return pokemonMenu
    function getMenu() {
        return pokemonMenu;
    }

    // create button for each pokemon and add event listener
    function addListItem(pokemon) {
        let pokelist = document.querySelector('#pokelist');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        button.classList.add('pokebutton');
        listItem.appendChild(button);
        pokelist.appendChild(listItem);
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
            showModal();
        });
    }

    // create nav buttons and add event listener
    function addMenuItem(navEle) {
        let menuItems = [];
        menuItems.push(navEle);
        let navmenu = document.querySelector('#nav-menu');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        let navTitle = document.querySelector('.nav-title');
        let titlePlaceholder = navTitle.childNodes[1];
        let titleText = document.createElement('p');
        let indexPoints = apiUrl.match(/\d+/g).map(Number);
        indexPoints.shift();
        let currentEndpoint = indexPoints[0] + indexPoints[1];
        titleText.innerText = 'Pokemon\n' + indexPoints[0] + ' - ' + currentEndpoint + '\nof\n' + pokemonTotal;
        button.innerText = Object.keys(navEle)[0].charAt(0).toUpperCase() + Object.keys(navEle)[0].slice(1);
        button.classList.add('nav-button');
        listItem.classList.add('nav-item')
        listItem.appendChild(button);
        navmenu.appendChild(listItem);
        const firstNavButton = document.querySelector('.nav-button');
        firstNavButton.setAttribute("style", "border-top: 2px solid rgba(0, 0, 0, 0.3)");
        navTitle.replaceChild(titleText, titlePlaceholder);
        button.addEventListener('click', function(event) {
            loadPage(navEle);
        });
    }

    // load pokemon based on page
    function loadPage(page) {
        for (let propName in page) {
            if (page.hasOwnProperty(propName)) {
                let propValue = page[propName];
                if (propValue === null) {
                    apiUrl = apiUrl;
                }
                else {
                    const pokelist = document.querySelector('#pokelist');
                    const navItems = document.querySelectorAll('.nav-item');
                    navItems.forEach(function(navItem){
                        navItem.parentNode.removeChild(navItem);
                    });
                    apiUrl = propValue;
                    pokelist.innerHTML = '';
                    pokemonRepository.loadList().then(function () {
                        pokemonRepository.getAll().forEach(function (pokemon) {
                            pokemonRepository.addListItem(pokemon);
                        });
                    }).then(function () {
                        pokemonRepository.getMenu().forEach(function (item) {
                            pokemonRepository.addMenuItem(item);
                        });
                    });
                }
            }
        }
    }

    //load pokemon from api
    async function loadList() {
        showLoadingMessage();
        const data = await (await fetch(apiUrl).catch(function(e){
            hideLoadingMessage();
            console.error(e);
        })).json();

       extractData(data);
    }

    function extractData(json) {
        hideLoadingMessage();
        const next = {
            next: json.next,
        }
        const previous = {
            previous: json.previous,
        }
        pokemonTotal = json.count;
        pokemonList.length = 0;
        pokemonMenu.length = 0;
        pokemonMenu.push(next, previous);
        json.results.forEach(function (item) {
            const pokemon = {
                name: item.name,
                detailsUrl: item.url
            };

            add(pokemon);
        });
    }
    // console.log(pokemonMenu);
    async function loadDetails(item) {
        showLoadingMessage();
        const url = item.detailsUrl;
        return await fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            hideLoadingMessage();
            console.log(details);
            item.imageUrl = details.sprites.other['official-artwork'].front_default;
            item.height = details.height;
            item.types = details.types;
            item.weight = details.weight;
            item.abilities = details.abilities;
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }

    // modal display of pokemon details of pokemon
    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            const pokeName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            const pokeHeight = pokemon.height / 10;
            const pokeWeight = pokemon.weight / 10;
            const pokeTypes = [];
            const pokeAbilities = [];
            const imageUrl = pokemon.imageUrl
            const pokeImage = imageUrl;

            pokemon.types.forEach(function (item) {
                pokeTypes.push(item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1));
            });

            pokemon.abilities.forEach(function (item) {
                pokeAbilities.push(item.ability.name.charAt(0).toUpperCase() + item.ability.name.slice(1));
            });
            
            const pokeDetails = 'Height: ' + pokeHeight + '\m\n' + 'Weight: '
             + pokeWeight + 'kg\n' + 'Types: ' + pokeTypes.join(', ') + '\n'
             + 'Abilities: ' + pokeAbilities.join(', ');

             console.log(pokeImage);
            
            showModal(pokeName, pokeImage, pokeDetails);
        });
    }

    
    function showModal(name, image, details) {

        // Clear all existing modal content
        modalContainer.innerHTML = '';

        const modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content
        const closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);

        const titleElement = document.createElement('h1');
        titleElement.innerText = name;

        const imageElement = document.createElement('img');
        imageElement.setAttribute('src', image);

        const contentElement = document.createElement('p');
        contentElement.innerText = details;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(imageElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        //Since this is also triggered when clicking INSIDE the modal
        //We only want to close if the user clicks directly on the overlay
        const target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    function showLoadingMessage() {
        const mainBody = document.querySelector('main');
        const loadingMessage = document.createElement('p');
        loadingMessage.classList.add('loading-message');
        loadingMessage.innerText = 'Loading Pokemon';
        mainBody.appendChild(loadingMessage);
        setTimeout(function(){
            return;
        }, 1000)
    }

    function hideLoadingMessage() {
        setTimeout(function () {
            const loadingMessage = document.getElementsByClassName('loading-message')[0];
            loadingMessage.parentNode.removeChild(loadingMessage);
        }, 500);
    }

    return {
        add: add,
        getAll: getAll,
        getMenu: getMenu,
        addListItem: addListItem,
        addMenuItem: addMenuItem,
        loadList: loadList,
        loadDetails: loadDetails,
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
}).then(function(){
    pokemonRepository.getMenu().forEach(function (item) {
        pokemonRepository.addMenuItem(item);
    });
});