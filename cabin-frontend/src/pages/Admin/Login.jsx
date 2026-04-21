import { useState } from "react";
import { api } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../store/authSlice";
import { showToast } from "../../store/toastSlice";

export default function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/admin/login", { username, password });
            dispatch(adminLogin(res.data.token));
            navigate("/admin/dashboard");
        } catch (err) {
            dispatch(showToast({ message: "Login failed", type: "error" }));
        }
        setUsername("");
        setPassword("");
    };

    return (
        <div className="bg-surface-container-low font-body text-on-surface min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-surface p-8 md:p-12 rounded-xl shadow-xl shadow-primary/5 border border-outline-variant/10">
                <div class="flex flex-col items-center mb-10">
                    <div class="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>landscape</span>
                    </div>
                    <h2 class="text-2xl font-headline font-bold text-on-surface tracking-tight">Admin Login</h2>
                    <p class="text-on-surface-variant font-light text-sm mt-1">Enter your credentials to continue</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center justify-center">
                    <div className="w-full">
                        <label class="block font-label text-[10px] uppercase tracking-widest text-on-secondary-container font-bold mb-2">Username</label>
                        <div class="relative group">
                            <input class="w-full bg-surface-container-highest px-4 py-3.5 rounded-lg border-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-outline/50 text-on-surface text-sm" placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                    </div>
                    <div className="w-full">
                        <label class="block font-label text-[10px] uppercase tracking-widest text-on-secondary-container font-bold mb-2">Password</label>
                        <div class="relative group">
                            <input class="w-full bg-surface-container-highest px-4 py-3.5 rounded-lg border-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-outline/50 text-on-surface text-sm" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div>
                    <div class="pt-2 w-full">
                        <button class="w-full bg-primary hover:bg-primary-container text-on-primary py-4 rounded-lg font-label font-extrabold tracking-widest uppercase text-xs transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2 group" type="submit">
                            Login
                            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}