import Card from './Card';
import React from 'react';

const CardList = (props) => {
  return (
    <ul>
      {props.pokemon.map(poke => <Card pokemon={poke} key={`card${poke.name}`}/>)}
    </ul>
  )
}

export default CardList;