import {useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API, { setAuthToken } from "../api/axiosConfig";
import toast from "react-hot-toast";

const UpdateProgress = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ get studentId from URL
  const studentId = id;

  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAuthToken(localStorage.getItem("token"));
      await API.put(`/students/${studentId}`, { marks, grade, remarks });
      toast.success("Progress Updated Successfully!");
      navigate("/admin"); // redirect after update
    } catch (err) {
      toast.error("Update Failed");
      console.log(err.response?.data || err);
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Update Student Progress</h2>

        <input
          placeholder="Marks"
          className="border p-2 w-full mb-3"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />

        <input
          placeholder="Grade"
          className="border p-2 w-full mb-3"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />

        <input
          placeholder="Remarks"
          className="border p-2 w-full mb-3"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />

        <button className="bg-blue-500 text-white p-2 w-full rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProgress;