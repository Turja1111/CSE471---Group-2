import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://localhost:5000/login", formData);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                navigate("/");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Invalid email or password.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white/90 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">Welcome Back</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-sage-500 text-white py-3 rounded-lg hover:bg-sage-600 transition-all duration-300 ease-in-out"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
