import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function login() {
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/api/users/login",
                { email, password }
            );
            localStorage.setItem("token", response.data.token)

            const user = response.data.user;
            // From the given role direct to the corect path
            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/")
            }
        } catch (e) {
            console.error("Login Failed:", e);
            toast.error("Login Fail Please Enter Valid Email and Password")
        }
    }

    return (
        <div className="w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex items-center justify-center">
            {/* Glass container */}
            <div className="w-[450px] md:w-[500px] h-[520px] backdrop-blur-lg bg-white/10 shadow-2xl rounded-2xl flex flex-col items-center justify-center gap-6 p-8 border border-white/20">

                {/* Logo */}
                <img src="/logo.png" alt="Logo" className="w-[120px] h-auto mb-4" />

                {/* Title */}
                <h2 className="text-2xl font-semibold text-black tracking-wide">Welcome Back</h2>
                <p className="text-sm text-black mb-4">Please login to continue</p>

                {/* Inputs */}
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[90%] h-[45px] px-4 rounded-lg bg-white/90 focus:bg-white focus:ring-2 focus:ring-[var(--color-accent)] outline-none transition-all"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[90%] h-[45px] px-4 rounded-lg bg-white/90 focus:bg-white focus:ring-2 focus:ring-[var(--color-accent)] outline-none transition-all"
                />

                {/* Button */}
                <button
                    onClick={login}
                    className="w-[90%] h-[45px] bg-[var(--color-accent)] hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all"
                >
                    Login
                </button>

            </div>
        </div>
    );
}
