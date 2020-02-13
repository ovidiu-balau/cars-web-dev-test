import React from "react";
import { Formik, Form } from "formik";

const FormikForm = ({
  formTitle,
  handleSubmit,
  fields,
  submitLabel,
  initialValues,
  validationSchema
}) => {
  return (
    <>
      <h1>{formTitle}</h1>

      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            status,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              {fields.map(field => (
                <>
                  <div className="form-group">
                    <label for={field.name}>{field.label}</label>
                    <input
                      key={field.name}
                      name={field.name}
                      id={field.name}
                      className="form-control"
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors && touched[field.name] && (
                      <span>{errors[field.name]}</span>
                    )}
                  </div>
                </>
              ))}
              {status && status.msg && (
                <div className="invalid-feedback">{status.msg}</div>
              )}
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>

              {status && status.success && (
                <span className="error-message success">{status.success}</span>
              )}
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormikForm;
