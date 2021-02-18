import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const CommitFilter = ({ authorEmail, onReset }) => {
  const resetHandler = useCallback(() => {
    onReset();
  });

  return (
    <div className="row">
      <div className="col mb-3">
        {authorEmail !== '' && (
          <Button variant="primary" onClick={resetHandler}>
            {authorEmail} <Badge variant="light">X</Badge>
          </Button>
        )}
      </div>
    </div>
  );
};
CommitFilter.propTypes = {
  authorEmail: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default CommitFilter;
