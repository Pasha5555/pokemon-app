import React from 'react';
import './SelectedPokemon.scss';

export const SelectedPokemon = ({pokemon}) => {
  console.log(pokemon)
  return (
    <div className="selected-pokemon">
      <div className="selected-pokemon__container">
        <div><img width="100px" src = {`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}/></div>
        {
          pokemon.stats && pokemon.stats.map(item => (
            <div key={item.name}>
              {item.stat.name} : {item.base_stat}
            </div>
          ))
          
        }
        <div>Type: {pokemon && pokemon.types.map((item, i, typess) => (
          <p key={typess[i].name}>{typess[i].type.name}</p>
        ))}</div>
        <p>{pokemon.name}</p>
      </div>
  </div>
  )
}