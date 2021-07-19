# Pokedex
A web app which loads a complete listing of currently released pokemon from [PokeApi](https://pokeapi.co/).

Pokemon are expandable, offering basic stats (i.e. height, weight, type, abilities) along with a photo of the Pokemon.

The search bar will find pokemon by name. It will match the search string with any part of the name. Can't remember how to spell the pokemon you want? Try searching for just a few characters from it's name!

## Dependencies
* JavaScript ES5
* [PokeApi](https://pokeapi.co/)
* ESLint Rules
  - extends: eslint:recommended
  - indent: 4
  - linebreak-style: windows
  - quotes: single
  - semi: always

## Setup
* Verify Node is installed by typing ```node -v``` in your terminal.  
This should print the version number so you’ll see something like this ```v12.18.1```
  * If the command is unrecognized, download and install node from [nodjs.org](https://nodejs.org/en/download/)

## To Install Clone
Open the terminal in the project folder and run
```npm install```
