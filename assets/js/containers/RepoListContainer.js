import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RepoList from '../components/RepoList';
import { fetchRepositories } from '../reducers/RepositoryReducer';

class RepoListContainer extends React.Component {
  componentDidMount() {
    const { fetchRepositories } = this.props;
    fetchRepositories();
  }

  render() {
    const { repositories } = this.props;
    return (
      <div>
        <RepoList repositories={repositories.results || []} />
      </div>
    );
  }
}

RepoListContainer.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRepositories: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  repositories: store.repositoryState.repositories,
});

const mapDispatchToProps = {
  fetchRepositories,
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoListContainer);
