import { useState } from "react";

export default function RegistrationForm() {
  // Controlled component state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      // Simulate API call (mock endpoint)
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Registration failed");

      setSuccess("User registered successfully!");
      setFormData({ username: "", email: "", password: "" }); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 border rounded w-96 mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Register (Controlled)</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Username:
          <input
            type="text"
            name="username"
            className="border p-2 w-full"
            value={formData.username}
            onChange={handleChange}
          />
        </label>

        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            className="border p-2 w-full"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label className="block mb-2">
          Password:
          <input
            type="password"
            name="password"
            className="border p-2 w-full"
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
