import './App.css';
import FormikForm from "./components/FormikForm";

function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Registration (Formik + Yup)</h1>
      <FormikForm />
    </div>
  );
}

export default App;
