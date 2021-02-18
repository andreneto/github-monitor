import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RepoCard = ({ id, name, description, owner }) => (
  <Link to={`/${id}`}>
    <div className="card mb-3" style={{ height: '150px' }}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{owner.name}</h6>
        <p className="card-text">{description}</p>
      </div>
    </div>
  </Link>
);
RepoCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default RepoCard;
