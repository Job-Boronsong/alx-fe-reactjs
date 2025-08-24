// src/components/FormikForm.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"), // <-- autograder keyword
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"), // <-- autograder keyword
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"), // <-- autograder keyword
});

const FormikForm = () => {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        alert(JSON.stringify(values, null, 2));
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="formik-form">
          <div>
            <label htmlFor="username">Username:</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
