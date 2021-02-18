import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const CommitCard = ({
  sha,
  message,
  authorName,
  authorEmail,
  authoredAt,
  authorAvatar,
  onFilterChange,
}) => {
  const filterHandler = useCallback((e) => {
    e.preventDefault();
    onFilterChange({ authorEmail: e.target.text });
  });
  return (
    <div className="card mb-3" style={{ height: '150px' }}>
      <div className="card-body">
        <h5 className="card-title">{message}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {authorName} (
          <a onClick={filterHandler} href="#">
            {authorEmail}
          </a>
          )
        </h6>
        <p className="card-text"></p>
      </div>
    </div>
  );
};
CommitCard.propTypes = {
  sha: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorEmail: PropTypes.string.isRequired,
  authoredAt: PropTypes.string.isRequired,
  authorAvatar: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default CommitCard;
