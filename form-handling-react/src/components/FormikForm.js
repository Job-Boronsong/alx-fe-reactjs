// src/components/formikForm.js
import React from "react";
import { useFormik } from "formik";
import { userSchema } from "../validationSchemas/userSchema"; // ✅ import schema

function FormikForm() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: userSchema, // ✅ shared schema
    onSubmit: (values) => {
      alert("Formik Form submitted:\n" + JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username && (
          <p style={{ color: "red" }}>{formik.errors.username}</p>
        )}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <p style={{ color: "red" }}>{formik.errors.email}</p>
        )}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <p style={{ color: "red" }}>{formik.errors.password}</p>
        )}
      </div>

      <button type="submit">Register (Formik)</button>
    </form>
  );
}

export default FormikForm;
