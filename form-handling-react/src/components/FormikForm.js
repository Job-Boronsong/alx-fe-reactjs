import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function formikForm() {
  const initialValues = {
    username: "",
    email: "",
    password: ""
  };

  // ✅ Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) throw new Error("Registration failed");

      setStatus({ success: "User registered successfully!" });
      resetForm();
    } catch (err) {
      setStatus({ error: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Register (Formik)</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, status }) => (
          <Form>
            {status?.error && <p style={{ color: "red" }}>{status.error}</p>}
            {status?.success && <p style={{ color: "green" }}>{status.success}</p>}

            <div>
              <label>Username:</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label>Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" style={{ color: "red" }} />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
