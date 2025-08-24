// App.jsx
import React from "react";
import RegistrationForm from "./components/RegistrationForm"; 
import FormikForm from "./components/formikForm";  // 👈 matches file casing

function App() {
  return (
    <div>
      <h1>User Registration</h1>
      <h2>Controlled Component Form</h2>
      <RegistrationForm />
      
      <h2>Formik Form</h2>
      <FormikForm />
    </div>
  );
}

export default App;
