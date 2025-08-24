// src/components/RegistrationForm.jsx
import React, { useState } from "react";
import { userSchema } from "../validationSchemas/userSchema"; // ✅ same schema

function RegistrationForm() {
  const [values, setValues] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateForm = async () => {
    try {
      await userSchema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((e) => {
        newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validateForm()) {
      alert("Plain React Form submitted:\n" + JSON.stringify(values, null, 2));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={values.username} onChange={handleChange} />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input type="email" name="email" value={values.email} onChange={handleChange} />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input type="password" name="password" value={values.password} onChange={handleChange} />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <button type="submit">Register (Plain React)</button>
    </form>
  );
}

export default RegistrationForm;
