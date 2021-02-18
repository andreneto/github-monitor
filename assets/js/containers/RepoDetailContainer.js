import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  setCurrentRepository,
  fetchRepository,
} from '../reducers/RepositoryReducer';
import RepoDetailHeader from '../components/RepoDetailHeader';

class RepoDetailContainer extends React.Component {
  componentDidMount() {
    const {
      setCurrentRepository,
      repositoryId,
      repository,
      fetchRepository,
    } = this.props;

    setCurrentRepository(repositoryId);

    if (!repository) {
      fetchRepository(repositoryId);
    }
  }

  render() {
    const { repository } = this.props;
    return <RepoDetailHeader repository={repository} />;
  }
}

RepoDetailContainer.propTypes = {
  setCurrentRepository: PropTypes.func.isRequired,
  fetchRepository: PropTypes.func.isRequired,
  repositoryId: PropTypes.number.isRequired,
  repository: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (store) => ({
  repository: store.repositoryState.currentRepository,
});

const mapDispatchToProps = {
  setCurrentRepository,
  fetchRepository,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoDetailContainer);
