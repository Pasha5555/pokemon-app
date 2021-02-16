/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './PokemonsList.scss';

export const PokemonsList = ({
  showPokemonInfo,
  pokemonsCount,
  pokemonsAllInfo,
  filterValue,
  firstToUppercase,
}) => {
  let resultPokemons = pokemonsAllInfo.map(pokemon => ({
    ...pokemon,
    imgUrl: `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`,
    url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
  }));

  if (filterValue && resultPokemons.length === pokemonsCount) {
    resultPokemons = resultPokemons
      .filter(pokemon => pokemon.types[0].type.name === filterValue
        || (pokemon.types[1] && pokemon.types[1].type.name === filterValue));
  }

  return (
    <ul className="pokemons__list">
      {
        resultPokemons && resultPokemons.map(pokemon => (
          <li
            key={pokemon.name}
            onClick={() => showPokemonInfo(pokemon.url)}
            className="pokemons__item item"
          >
            <img
              src={pokemon.imgUrl}
              className="item__img"
              alt="Pokemon"
            />
            <p className="item__name">
              {firstToUppercase(pokemon.name)}
            </p>
            <p className="item__types">
              {
                pokemon ? pokemon.types.map(typeItem => (
                  <span className={classNames(
                    'item__type',
                    `item__type--${typeItem.type.name}`,
                  )}
                  >
                    {firstToUppercase(typeItem.type.name)}
                  </span>
                ))
                  : 'Loading...'
              }
            </p>
          </li>
        ))
      }
    </ul>
  );
};

PokemonsList.propTypes = {
  showPokemonInfo: PropTypes.func.isRequired,
  pokemonsCount: PropTypes.number.isRequired,
  pokemonsAllInfo: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.arrayOf(PropTypes.object).isRequired,
  })).isRequired,
  filterValue: PropTypes.string.isRequired,
  firstToUppercase: PropTypes.func.isRequired,
};
