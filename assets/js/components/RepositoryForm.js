import React from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

const RepositoryForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="mb-5">
      <div className="alert alert-success" role="alert">
        Repository added successfully!
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-row">
          <div className="col-10">
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="form-control"
              placeholder="Enter the repository name, must match {user}/{repo}"
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
          </div>
          <div className="col-2">
            <button
              disabled=""
              className="btn btn-block btn-primary"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

RepositoryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RepositoryForm;
