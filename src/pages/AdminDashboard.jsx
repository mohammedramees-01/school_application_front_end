import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  const loadStudents = async () => {
    try {
      const { data } = await API.get("/students");
      console.log("Students API response:", data); // 👈 ADD THIS
      setStudents(data);
    } catch (err) {
      console.error("API ERROR:", err.response?.data || err);
    }
  };

  loadStudents();
}, []);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold">
          Total Students: {students.length}
        </h2>
      </div>

      {/* Create Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/admin/create-student")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Create Student
        </button>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Marks</th>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-t">
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.class}</td>
                <td className="p-3">
                  {student.progress?.marks || "-"}
                </td>
                <td className="p-3">
                  {student.progress?.grade || "-"}
                </td>
                <td className="p-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/update-progress/${student._id}`)
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {students.length === 0 && (
          <p className="p-4 text-gray-500">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
