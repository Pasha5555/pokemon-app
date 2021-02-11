import React, { useState, useEffect } from 'react';
import './App.scss';

import { PokemonsList } from './components/PokemonsList/PokemonsList';
import { getPokemons, getPokemon } from './api/pokemons';
import { SelectedPokemon } from './components/SelectedPokemon/SelectedPokemon';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState('');
  const [types, setTypes] = useState([]);
  const [count, setCount] = useState(12)
  const [filterValue, setFilterValue] = useState('');

  useEffect(()=> {
    getPokemons(count).then(pokemons => setPokemons(pokemons.results))
  }, [count])

  useEffect(() => {
    pokemons.map((poke) => getPokemon(poke.url).then(pok => setTypes((old) => {
      if(old.every(pokem => pokem.name !== pok.name )) {
        return [...old, pok];
      }

      return [...old];
    })))
  }, [pokemons])


  const fetchPokemon = (url) => {
    getPokemon(url).then(pokemon => setPokemon(pokemon));
  }


  console.log(pokemon)

  return (
    <div className="App">
      <select onChange={(e) => setFilterValue(e.target.value)}>
        <option value="">All</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="electric">Electric</option>
      </select>
      <main className="main">
        <PokemonsList 
          pokemons={pokemons} 
          onAddPokemon={fetchPokemon} 
          types={types}
          count={count}
          filterValue={filterValue}
        />
        <SelectedPokemon pokemon={pokemon} />
      </main>
      <button onClick={() => setCount(count+10)}>More</button>
    </div>
  );
}

export default App;

