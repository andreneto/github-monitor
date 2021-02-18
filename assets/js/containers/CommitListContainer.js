import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCommitList } from '../reducers/CommitReducer';
import CommitList from '../components/CommitList';

class CommitListContainer extends React.Component {
  componentDidMount() {
    const {
      fetchCommitList,
      repositoryId,
      currentPageNumber,
      filters,
    } = this.props;
    fetchCommitList({
      page: currentPageNumber,
      repositoryId,
      authorEmail: filters.authorEmail,
    });
  }

  render() {
    const { commits, commitsCount, prevPage, nextPage } = this.props;
    return (
      <div>
        <CommitList
          commits={commits}
          commitCount={commitsCount}
          prevPage={prevPage}
          nextPage={nextPage}
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommitListContainer);
