// src/App.jsx
import React from "react";
import FormikForm from "./components/formikForm";   // 👈 lowercase 'f' to match your filename exactly
import RegistrationForm from "./components/RegistrationForm";

const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>React Forms</h1>

      <h2>Formik Form</h2>
      <FormikForm />

      <h2>Registration Form</h2>
      <RegistrationForm />
    </div>
  );
};

export default App;
