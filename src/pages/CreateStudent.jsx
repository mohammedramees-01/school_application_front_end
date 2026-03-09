import { useState } from "react";
import API, { setAuthToken } from "../api/axiosConfig";
import toast, { Toaster } from "react-hot-toast";

const CreateStudent = () => {
  const [form, setForm] = useState({ name: "", class: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAuthToken(localStorage.getItem("token"));
      await API.post("/auth/create-user", form);
      toast.success("Student Created Successfully!");
      setForm({ name: "", class: "", email: "", password: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create student");
    }
  };

  return (
    <div className="p-8">
      <Toaster />
      <form 
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">Create Student</h1>
        {["name", "class", "email", "password"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border p-2 mb-4 rounded"
            value={form[field]}
            onChange={handleChange}
          />
        ))}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateStudent;