import React from 'react';
import PropTypes from 'prop-types';

const RepoCard = ({ name, description, owner }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{owner.name}</h6>
      <p className="card-text">{description}</p>
    </div>
  </div>
);
RepoCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  owner: PropTypes.shape.isRequired,
};

export default RepoCard;
