import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRepository } from '../reducers/RepositoryReducer';
import RepositoryForm from '../components/RepositoryForm';

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
    return <RepositoryForm onSubmit={this.submit} />;
  }
}

RepoCreateContainer.propTypes = {
  addRepository: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addRepository,
};

export default connect(null, mapDispatchToProps)(RepoCreateContainer);
