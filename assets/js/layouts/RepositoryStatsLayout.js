import React from 'react';
import RepoListContainer from '../containers/RepoListContainer';

const RepositoryStatsLayout = () => {
  return (
    <div>
      <RepoListContainer showStats={true} />
    </div>
  );
};
export default RepositoryStatsLayout;
