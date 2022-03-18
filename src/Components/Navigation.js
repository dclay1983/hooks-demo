import React, { useContext, useEffect, useState } from 'react';
import { DispatchPageContext } from '../App';

const getPageNumbers = (page, limit) => {
  const pages = [page];
  while(pages.length < limit && pages.length < 7) {
    let lower = pages[0];
    let upper = pages[pages.length - 1];

    lower > 1 && pages.unshift(lower - 1);
    upper < limit && pages.push(upper + 1);
  }
  return pages;
}
// Navigation page={page} pageCount={pageCount}
const Navigation = (props) => {
  const dispatch = useContext(DispatchPageContext);

  const [pageNumbers, setPageNumbers] = useState([1,2,3,4,5,6,7]);

  useEffect(() => {
    let newNumbers = getPageNumbers(props.page, props.pageCount);
    setPageNumbers(newNumbers);
  }, [props.page, props.pageCount])
  return (
    <>
      <button className='prev' onClick={() => dispatch({type: 'decrease'})} >Prev</button>
        {pageNumbers.map(page => 
          <a
            key={`page${page}`}
            href='#'
            style={page === props.page ? {textDecorationLine: 'underline'} : {textDecorationLine: 'none'}}
            onClick={() => dispatch({type: 'set', value: page})}
          >
            {page}
          </a>)}
      <button className='next' onClick={() => dispatch({type: 'increase'})} >Next</button>
    </>
  )
}

export default Navigation;