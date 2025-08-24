// src/components/RegistrationForm.jsx
import React, { useState } from "react";

const RegistrationForm = () => {
  // state variables for each input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", { username, email, password });
    alert(`Submitted: ${username}, ${email}, ${password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}               {/* 👈 controlled */}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}                  {/* 👈 controlled */}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}               {/* 👈 controlled */}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
