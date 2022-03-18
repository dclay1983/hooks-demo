import React, {useState, useReducer, useEffect} from'react';
import Navigation from './Components/Navigation';
import CardList from './Components/CardList';
import './App.css';

export const DispatchPageContext = React.createContext(null);

function App() {
  const [limit] = useState(36);
  const [baseUrl] = useState('https://pokeapi.co/api/v2/')
  const [pokemonList, setPokemonList] = useState([]);
  const [pageCount, setPageCount] = useState(1)
  
  const pageReducer = (page, action) => {
    switch (action.type) {
      case 'increase' :
        return page < pageCount ? page + 1 : page;
      case 'decrease' :
        return page > 1 ? page - 1 : page;
      case 'set' :
        return action.value ? action.value : page;
      default :
        throw new Error('Invalid type passed to pageReducer')
    }
  }

  const [page, dispatchPage] = useReducer(pageReducer, 1);
 

  useEffect(() => {
    const url = `${baseUrl}pokemon?limit=${limit}&offset=${(page - 1) * limit}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPageCount(Math.ceil(data.count / limit));
        setPokemonList(data.results);
      })
  }, [page])

  return (
    <>
      <CardList pokemon={pokemonList} />
      <DispatchPageContext.Provider value={dispatchPage}>
        <Navigation page={page} pageCount={pageCount} />
      </DispatchPageContext.Provider>
    </>
    
  );
}

export default App;
