import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../api/axiosConfig";
import toast, { Toaster } from "react-hot-toast";

const StudentDashboard = () => {
    const [student, setStudent] = useState(null);
    const [theme, setTheme] = useState("light"); // "light" or "dark"
    const navigate = useNavigate();

    // Fetch student data
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setAuthToken(localStorage.getItem("token"));
                const { data } = await API.get("/students/me");
                setStudent(data);
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to fetch data");
            }
        };
        fetchStudent();
    }, []);

    // Toggle light/dark theme
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuthToken(null);
        navigate("/");
    };



    if (!student) return <div className="p-8">Loading...</div>;

    return (
        <div className={`min-h-screen p-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            <Toaster />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Welcome, {student.name}</h1>
                <div className="space-x-2">
                    <button
                        onClick={toggleTheme}
                        className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        {theme === "light" ? "Dark Mode" : "Light Mode"}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1 border rounded hover:bg-red-500 hover:text-white"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Progress Table */}
            <div className="overflow-x-auto w-full max-w-md">
                <table className={`table-auto border-collapse w-full ${theme === "dark" ? "text-white" : "text-black"}`}>
                    <thead>
                        <tr className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
                            <th className="border px-4 py-2">Class</th>
                            <th className="border px-4 py-2">Marks</th>
                            <th className="border px-4 py-2">Grade</th>
                            <th className="border px-4 py-2">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                            <td className="border px-4 py-2">{student.class}</td>
                            <td className="border px-4 py-2">{student.progress?.marks || "N/A"}</td>
                            <td className="border px-4 py-2">{student.progress?.grade || "N/A"}</td>
                            <td className="border px-4 py-2">{student.progress?.remarks || "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default StudentDashboard;