import { useState } from "react";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

function App() {
  const [showFormik, setShowFormik] = useState(false);

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowFormik(false)}
          className={`px-4 py-2 rounded ${
            !showFormik ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Controlled Form
        </button>
        <button
          onClick={() => setShowFormik(true)}
          className={`px-4 py-2 rounded ${
            showFormik ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Formik Form
        </button>
      </div>

      {showFormik ? <FormikForm /> : <RegistrationForm />}
    </div>
  );
}

export default App;
