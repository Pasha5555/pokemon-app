import React, { useState, useEffect } from 'react';
import { getTypes } from '../../api/pokemons';
import './PokemonsList.scss';


export const PokemonsList = ({ pokemons, onAddPokemon, count, types, filterValue }) => {
  
  // console.log(types, count)
  // if(!stats) {
  //   return "Loading...";
  // }

  let result = types;

  if(filterValue && result.length === count) {
    result = result.filter(pok => pok.types[0].type.name === filterValue)
  }



  return (
    <ul className="pokemons__list"> 
      {
        result && result.map((pokemon, i) => (
          
            <li 
              key={pokemon.name}
              onClick={() => onAddPokemon(pokemons[i].url)}
              className="pokemons__item item"
            >
              <img 
                width="100px" 
                src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
                className="item__img"
              />
                {/* <p className="item__number">#{parseFloat(pokemon.id)}</p> */}
                <p className="item__name">
                  {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                </p>
                <p className="item__types">
                  {
                    types[i] ? pokemon.types.map(typ => (
                      <span className="item__type">{typ.type.name[0].toUpperCase() + typ.type.name.slice(1)}</span>
                    )) 
                    : 
                    "Loading..."}</p>
            </li>
        ))
      }
    </ul>
  );
};