import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa';
import './App.scss';

import { PokemonsList } from './components/PokemonsList/PokemonsList';
import { getPokemons, getPokemon, getTypes } from './api/pokemons';
import { SelectedPokemon } from './components/SelectedPokemon/SelectedPokemon';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [pokemonsAllInfo, setPokemonsAllInfo] = useState([]);
  const [pokemonsCount, setPokemonsCount] = useState(12);
  const [filterValue, setFilterValue] = useState('');
  const [pokemonsTypes, getPokemonsTypes] = useState([]);
  const loadButtonRef = useRef(null);

  useEffect(() => {
    getPokemons(pokemonsCount)
      .then(pokemonsFromServer => setPokemons(pokemonsFromServer.results));

    getTypes().then(types => getPokemonsTypes(types.results));
  }, [pokemonsCount]);

  useEffect(() => {
    pokemons.map(pokemon => getPokemon(pokemon.url)
      .then(pokemonFromServer => setPokemonsAllInfo((availablePokemons) => {
        if (availablePokemons.every(pokemon_ => pokemon_.name
          !== pokemonFromServer.name)) {
          return [...availablePokemons, pokemonFromServer];
        }

        return [...availablePokemons];
      })));
  }, [pokemons]);

  useEffect(() => {
    loadButtonRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [pokemonsAllInfo]);

  const fetchPokemon = useCallback((url) => {
    getPokemon(url)
      .then(pokemonFromServer => setSelectedPokemon((currentPokemon) => {
        if (currentPokemon
          && (currentPokemon.name === pokemonFromServer.name)) {
          return;
        }

        // eslint-disable-next-line consistent-return
        return pokemonFromServer;
      }));
  }, [selectedPokemon]);

  const firstToUppercase = string => (
    string[0].toUpperCase() + string.slice(1)
  );

  return (
    <div className="app">
      <select
        value={filterValue}
        onChange={({ target }) => setFilterValue(target.value)}
        className="app__select"
      >
        <option value="">all</option>
        {
          pokemonsTypes.map(type => (
            <option value={type.name}>{type.name}</option>
          ))
        }
      </select>
      <main className="main">
        <PokemonsList
          showPokemonInfo={fetchPokemon}
          pokemonsAllInfo={pokemonsAllInfo}
          pokemonsCount={pokemonsCount}
          filterValue={filterValue}
          firstToUppercase={firstToUppercase}
        />
        <SelectedPokemon
          selectedPokemon={selectedPokemon}
          firstToUppercase={firstToUppercase}
        />
      </main>

      <button
        type="button"
        onClick={() => setPokemonsCount(pokemonsCount + 10)}
        className="app__button-load"
        ref={loadButtonRef}
      >
        Load more
      </button>

      <button
        type="button"
        onClick={() => window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })}
        className="app__button-scroll-top"
      >
        <FaArrowCircleUp />
      </button>

      <button
        type="button"
        onClick={() => window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        })}
        className="app__button-scroll-bottom"
      >
        <FaArrowCircleDown />
      </button>
    </div>
  );
}

export default App;
