import React from "react";
import { Formik, Field } from "formik";

const FormikForm = ({
  formTitle,
  handleSubmit,
  fields,
  submitLabel,
  initialValues,
  validationSchema,
  prependChildren,
  children,
  refId
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
          errors,
          touched,
          validateOnChange,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            {prependChildren}
            {fields.map(field => (
              <>
                <Field
                  key={field.name}
                  component={"input"}
                  containerClass={field.containerClass}
                  refId={refId}
                  selectOptions={field.select}
                  radioOptions={field.options}
                  name={field.name}
                  type={field.type}
                  value={values[field.name]}
                  label={field.label}
                  description={field.description}
                  hasFeedback
                  placeholder={field.placeholder}
                />
                {error && touched[field.name] && (
                  <span>{error[field.name]}</span>
                )}
              </>
            ))}
            {children}
            {status && status.msg && (
              <span className="error-message">{status.msg}</span>
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
