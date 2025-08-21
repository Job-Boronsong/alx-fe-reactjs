import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikForm() {
  const initialValues = {
    username: "",
    email: "",
    password: ""
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
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
    <div className="p-4 border rounded w-96 mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Register (Formik)</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, status }) => (
          <Form>
            {status?.error && <p className="text-red-500">{status.error}</p>}
            {status?.success && <p className="text-green-500">{status.success}</p>}

            <div className="mb-2">
              <label className="block">Username:</label>
              <Field type="text" name="username" className="border p-2 w-full" />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-2">
              <label className="block">Email:</label>
              <Field type="email" name="email" className="border p-2 w-full" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-2">
              <label className="block">Password:</label>
              <Field type="password" name="password" className="border p-2 w-full" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <button type="submit" disabled={isSubmitting} className="bg-green-500 text-white px-4 py-2 rounded">
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
