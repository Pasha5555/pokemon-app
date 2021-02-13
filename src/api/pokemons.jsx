const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemons = count => (
  fetch(`${BASE_URL}?limit=${count}`).then(res => res.json())
);

export const getPokemon = async url => (
  (await fetch(`${url}`)).json()
);

export const getTypes = () => (
  fetch('http://pokeapi.co/api/v2/type/').then(res => res.json())
);
