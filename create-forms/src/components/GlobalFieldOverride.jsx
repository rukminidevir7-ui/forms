import React from "react";
import { Field } from "formik";

const GlobalFieldOverride = (props) => {
  const { name, className, type, ...rest } = props;

  // If inside table and text type → convert to textarea
  if (
    className?.includes("form-input") &&
    type !== "number" &&
    type !== "date"
  ) {
    return (
      <Field
        as="textarea"
        name={name}
        className={className}
        rows={2}
        {...rest}
      />
    );
  }

  return <Field name={name} type={type} className={className} {...rest} />;
};

export default GlobalFieldOverride;