import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchCommitList,
  setPageNumber,
  setFilters,
} from '../reducers/CommitReducer';
import CommitList from '../components/CommitList';

class CommitListContainer extends React.Component {
  componentDidMount() {
    const {
      fetchCommitList,
      repositoryId,
      currentPageNumber,
      setFilters,
      filters,
    } = this.props;

    setFilters({ authorEmail: '', repositoryId });

    fetchCommitList({
      page: currentPageNumber,
      repositoryId,
      authorEmail: '',
    });

    this.pageChanged = this.pageChanged.bind(this);
    this.filterChanged = this.filterChanged.bind(this);
    this.filterReseted = this.filterReseted.bind(this);
  }

  pageChanged(page) {
    const {
      setPageNumber,
      fetchCommitList,
      repositoryId,
      filters,
    } = this.props;

    setPageNumber(page);
    fetchCommitList({
      page,
      repositoryId,
      authorEmail: filters.authorEmail,
    });
  }

  filterReseted() {
    const {
      repositoryId,
      currentPageNumber,
      setFilters,
      fetchCommitList,
    } = this.props;
    setFilters({ authorEmail: '', repositoryId });
    fetchCommitList({
      page: currentPageNumber,
      repositoryId,
      authorEmail: '',
    });
  }

  filterChanged(filters) {
    const {
      repositoryId,
      setPageNumber,
      setFilters,
      fetchCommitList,
    } = this.props;
    setFilters({ repositoryId, ...filters });
    setPageNumber(1);
    fetchCommitList({
      page: 1,
      repositoryId,
      authorEmail: filters.authorEmail,
    });
  }

  render() {
    const {
      commits,
      commitsCount,
      prevPage,
      nextPage,
      currentPageNumber,
      filters,
    } = this.props;
    return (
      <div>
        <CommitList
          commits={commits}
          commitCount={commitsCount}
          prevPage={prevPage}
          nextPage={nextPage}
          currentPageNumber={currentPageNumber}
          paginationHandler={this.pageChanged}
          onFilterReset={this.filterReseted}
          onFilterChange={this.filterChanged}
          filters={filters}
        />
      </div>
    );
  }
}

CommitListContainer.propTypes = {
  filters: PropTypes.shape({
    authorEmail: PropTypes.string,
    repositoryId: PropTypes.number,
  }),
  currentPageNumber: PropTypes.number,
  repositoryId: PropTypes.number.isRequired,
  commitsCount: PropTypes.number.isRequired,
  prevPage: PropTypes.string,
  nextPage: PropTypes.string,
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCommitList: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
};

CommitListContainer.defaultProps = {
  nextPage: '',
  prevPage: '',
  currentPageNumber: 1,
  filters: {
    authorEmail: '',
    repositoryId: '',
  },
};

const mapStateToProps = (store) => ({
  repository: store.repositoryState.currentRepository,
  commits: store.commitState.commits,
  commitsCount: store.commitState.commitCount,
  filters: store.commitState.filters,
  prevPage: store.commitState.prevPage,
  nextPage: store.commitState.nextPage,
  currentPageNumber: store.commitState.currentPageNumber,
});

const mapDispatchToProps = {
  fetchCommitList,
  setPageNumber,
  setFilters,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommitListContainer);
