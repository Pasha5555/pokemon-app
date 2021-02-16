/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import PropTypes from 'prop-types';
import './SelectedPokemon.scss';

export const SelectedPokemon = ({
  selectedPokemon,
  firstToUppercase,
}) => {
  const imgBaseUrl = 'https://pokeres.bastionbot.org/images/pokemon/';

  return (
    selectedPokemon
      ?
      (<div className="selected-pokemon">
        <div className="selected-pokemon__container">
          <img
            src={`${imgBaseUrl}${selectedPokemon.id}.png`}
            className="selected-pokemon__img"
            alt="Pokemon"
          />
          <h2 className="selected-pokemon__name">
            {firstToUppercase(selectedPokemon.name)}
            {` #`}
            {`${('0').repeat(3 - String(selectedPokemon.id)
              .length) + selectedPokemon.id}`}
          </h2>
          <table cellSpacing="0" className="selected-pokemon__property-table">
            <tbody>
              <tr className="selected-pokemon__property-table">
                <td>Type</td>
                <td>
                  {
                    selectedPokemon.types.map(typeItem => (
                      <span key={typeItem.type.name}>
                        {firstToUppercase(typeItem.type.name)}
                        {' '}
                      </span>
                    ))
                  }
                </td>
              </tr>
              {
                selectedPokemon.stats.map(property => (
                  <tr key={property.name}>
                    <td>{firstToUppercase(property.stat.name)}</td>
                    <td>{property.base_stat}</td>
                  </tr>
                ))
              }
              <tr className="selected-pokemon__property-table">
                <td>Weight</td>
                <td>{selectedPokemon.weight}</td>
              </tr>
              <tr className="selected-pokemon__property-table">
                <td>Total moves</td>
                <td>{selectedPokemon.moves.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>) : null
  );
};

SelectedPokemon.propTypes = {
  selectedPokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.object).isRequired,
    stats: PropTypes.arrayOf(PropTypes.object).isRequired,
    weight: PropTypes.number.isRequired,
    moves: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  firstToUppercase: PropTypes.func.isRequired,
};
