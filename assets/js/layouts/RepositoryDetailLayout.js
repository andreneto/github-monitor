import React from 'react';
import { useParams } from 'react-router-dom';
import RepoDetailContainer from '../containers/RepoDetailContainer';
import CommitListContainer from '../containers/CommitListContainer';

const RepositoryDetailLayout = () => {
  const { id } = useParams();
  return (
    <div>
      <RepoDetailContainer repositoryId={id} />
      <CommitListContainer repositoryId={id} />
    </div>
  );
};
export default RepositoryDetailLayout;
