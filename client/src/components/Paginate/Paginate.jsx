import React from 'react';
import { useDispatch } from 'react-redux';
import { nextPag, prevPag } from '../../redux/actions';
import style from './Paginate.module.css';

const Paginate = ({ cantPages, numPag }) => {
  const dispatch = useDispatch();

  const handlePageClick = (page) => {
    if (page >= 1 && page <= cantPages) {
      dispatch(nextPag(page));
    }
  };

  const handlePrevPageClick = (page) => {
    if (page >= 1 && page <= cantPages) {
      dispatch(prevPag(page));
    }
  };

  return (
    <div className={style.container}>
      {numPag > 1 && (
        <div className={style.btnContainer}>
          <button className={style.btn} onClick={() => handlePrevPageClick(numPag - 1)}>
            PREV
          </button>
        </div>
      )}
      <div className={style.pageNumber}>{numPag}</div>
      {numPag < cantPages && (
        <div className={style.btnContainer}>
          <button className={style.btn} onClick={() => handlePageClick(numPag + 1)}>
            NEXT
          </button>
        </div>
      )}
    </div>
  );
};

export default Paginate;
