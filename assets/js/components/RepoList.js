import React from 'react';
import PropTypes from 'prop-types';
import RepoCard from './RepoCard';

const RepoList = (props) => {
  const { repositories } = props;
  return (
    <div>
      <h1>My monitored repositories</h1>
      {repositories.length !== 0 &&
        repositories.map((repository) => (
          <RepoCard
            name={repository.name}
            description={repository.description}
            owner={repository.owner}
          />
        ))}
    </div>
  );
};

RepoList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RepoList;
