// src/components/formikForm.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// ✅ Yup validation schema
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function FormikForm() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema, // 👈 using Yup here
    onSubmit: (values) => {
      alert("Form submitted:\n" + JSON.stringify(values, null, 2));
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

      <button type="submit">Register</button>
    </form>
  );
}

export default FormikForm;
