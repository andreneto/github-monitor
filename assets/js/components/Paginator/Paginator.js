import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

const Paginator = ({ currentPageNumber, pageCount, onPageChange }) => {
  const nextPage = useCallback(() => {
    onPageChange(currentPageNumber + 1);
  });

  const previousPage = useCallback(() => {
    onPageChange(currentPageNumber - 1);
  });

  const pageHandler = useCallback((e) => {
    onPageChange(parseInt(e.target.text, 10));
  });

  return (
    <Pagination>
      <Pagination.Prev
        disabled={currentPageNumber === 1}
        onClick={previousPage}
      />
      {[...Array(Math.ceil(pageCount)).keys()].map((value) => (
        <Pagination.Item
          onClick={pageHandler}
          active={currentPageNumber === value + 1}
          key={value + 1}
        >
          {value + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPageNumber >= pageCount}
        onClick={nextPage}
      />
    </Pagination>
  );
};
Paginator.propTypes = {
  currentPageNumber: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Paginator;
