import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

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
    <div
      className="card mb-3 commit-card"
      style={{ height: '150px', maxWidth: '800px', flexDirection: 'row' }}
    >
      <div className="card-body" style={{ width: '70%' }}>
        <h5
          className="card-title"
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {message}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {authorName} (
          <a onClick={filterHandler} href="#">
            {authorEmail}
          </a>
          )
        </h6>
        <p className="card-text text-muted">
          Authored at <Moment date={authoredAt} />
        </p>
      </div>
      <img className="img-thumbnail" src={authorAvatar} alt="User avatar" />
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
