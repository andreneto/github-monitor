import React from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

const validate = (values) => {
  const { username } = document.getElementById('main').dataset;
  const errors = {};
  if (!values.fullName || !values.fullName.startsWith(`${username}/`)) {
    errors.fullName = `Repository must belong to you (eg: ${username}/repo-name)`;
  }
  return errors;
};

const RepoCreateForm = ({ onSubmit, showSuccessMessage }) => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
    },
    validate,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="mb-5">
      {showSuccessMessage ? (
        <div className="alert alert-success" role="alert">
          Repository added successfully!
        </div>
      ) : null}

      <form onSubmit={formik.handleSubmit}>
        <div className="form-row">
          <div className="col-10">
            <input
              id="fullName"
              name="fullName"
              type="text"
              className={`form-control ${
                formik.touched.fullName && formik.errors.fullName
                  ? 'is-valid'
                  : 'is-invalid'
              }`}
              placeholder="Enter the repository name, must match {user}/{repo}"
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
            {formik.errors.fullName ? (
              <div id="control01" className="invalid-feedback">
                {formik.errors.fullName}
              </div>
            ) : null}
          </div>
          <div className="col-2">
            <button
              disabled={
                !(formik.isValid && formik.dirty) || formik.isSubmitting
              }
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

RepoCreateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showSuccessMessage: PropTypes.func.isRequired,
};

export default RepoCreateForm;
