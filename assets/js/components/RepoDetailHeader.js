import React from 'react';
import PropTypes from 'prop-types';

const RepoDetailHeader = ({ repository }) => (
  <div>
    {repository && (
      <div className="mb-3" style={{ height: '150px' }}>
        <h2>{repository.name}</h2>
        <h6 className="mb-2 text-muted">{repository.owner.name}</h6>
        <p>{repository.description}</p>
      </div>
    )}
  </div>
);
RepoDetailHeader.propTypes = {
  repository: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RepoDetailHeader;
