import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRepository } from '../reducers/RepositoryReducer';
import RepoCreateForm from '../components/RepoCreateForm';

class RepoCreateContainer extends React.Component {
  constructor(props) {
    super(props);
    const { addRepository } = props;
    this.addRepository = addRepository;
  }

  submit = (values) => {
    this.addRepository(values.fullName);
  };

  render() {
    const { successMessage } = this.props;
    return (
      <RepoCreateForm
        onSubmit={this.submit}
        showSuccessMessage={successMessage}
      />
    );
  }
}

RepoCreateContainer.propTypes = {
  addRepository: PropTypes.func.isRequired,
  successMessage: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {
  addRepository,
};

const mapStateToProps = (store) => ({
  successMessage: store.repositoryState.successMessage,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoCreateContainer);
