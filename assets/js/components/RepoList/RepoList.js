import React from 'react';
import PropTypes from 'prop-types';
import RepoCard from '../RepoCard';

const RepoList = (props) => {
  const { repositories, showStats } = props;
  return (
    <div>
      <h1>My monitored repositories</h1>
      <div className="row">
        {repositories.length !== 0 ? (
          repositories.map((repository) => (
            <div className="col-sm-12 col-md-6" key={`${repository.id}`}>
              <RepoCard
                id={repository.id}
                name={repository.name}
                description={repository.description}
                owner={repository.owner}
                commitCount={repository.commit_count}
                showStats={showStats}
              />
            </div>
          ))
        ) : (
          <p>No repositories registered</p>
        )}
      </div>
    </div>
  );
};

RepoList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
  showStats: PropTypes.bool.isRequired,
};

export default RepoList;
