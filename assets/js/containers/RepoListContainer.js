import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RepoList from '../components/RepoList';
import { fetchRepositoryList } from '../reducers/RepositoryReducer';

class RepoListContainer extends React.Component {
  componentDidMount() {
    const { fetchRepositoryList } = this.props;
    fetchRepositoryList();
  }

  render() {
    const {
      repositories,
      repositoryCount,
      prevPage,
      nextPage,
      showStats,
    } = this.props;
    return (
      <div>
        <RepoList
          repositories={repositories}
          repositoryCount={repositoryCount}
          prevPage={prevPage}
          nextPage={nextPage}
          showStats={showStats}
        />
      </div>
    );
  }
}

RepoListContainer.propTypes = {
  repositoryCount: PropTypes.number.isRequired,
  nextPage: PropTypes.string,
  prevPage: PropTypes.string,
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRepositoryList: PropTypes.func.isRequired,
  showStats: PropTypes.bool,
};

RepoListContainer.defaultProps = {
  nextPage: '',
  prevPage: '',
  showStats: false,
};

const mapStateToProps = (store) => ({
  repositories: store.repositoryState.repositories,
  repositoryCount: store.repositoryState.repositoryCount,
});

const mapDispatchToProps = {
  fetchRepositoryList,
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoListContainer);
