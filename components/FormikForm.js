import React from "react";
import { Formik, Field } from "formik";

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
        validateOnChange={false}
        onSubmit={handleSubmit}
        render={({
          handleSubmit,
          isSubmitting,
          status,
          error,
          touched,
          values
        }) => (
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
                  />
                  {error && touched[field.name] && (
                    <span>{error[field.name]}</span>
                  )}
                </div>
              </>
            ))}
            {status && status.msg && (
              <div className="invalid-feedback">{status.msg}</div>
            )}
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {submitLabel || "Submit"}
            </button>
            {status && status.success && (
              <span className="error-message success">{status.success}</span>
            )}
          </form>
        )}
      />
    </>
  );
};

export default FormikForm;
