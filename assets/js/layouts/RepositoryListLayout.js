import React from 'react';
import RepoCreateContainer from '../containers/RepoCreateContainer';
import RepoListContainer from '../containers/RepoListContainer';

const RepositoryListLayout = () => (
  <div>
    <RepoCreateContainer />
    <RepoListContainer />
  </div>
);

export default RepositoryListLayout;
