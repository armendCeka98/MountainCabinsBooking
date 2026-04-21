import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../store/toastSlice";
import { useSelector } from "react-redux";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn]);

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", form);

            // store token
            localStorage.setItem("token", res.data.token);

            navigate("/"); // later dashboard
            dispatch(showToast({ message: "Login successful", type: "success" }));
        } catch (err) {
            dispatch(showToast({ message: "Login failed", type: "error" }));
        }
    };

    return (
        <div className="bg-background text-on-surface min-h-screen flex items-center justify-center p-4 md:p-8">
            <main className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-xl overflow-hidden shadow-2xl shadow-on-surface/5">
                {/* LEFT SIDE */}
                <section className="relative hidden md:block overflow-hidden">
                    <img
                        className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] contrast-[1.05]"
                        alt="cabin"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgTsAk2earKEOvWMi2McFEP4jRgDpdLJebq2gr_PLb5bbO6MhMB69nvght8mb4XjuKEzjKTeJWihnq5iJVExhvKGxZsUjwFhmKYn-5bTUt1uRkpAjShhz3Hgh0Cok8lzM9gPzncWpaB-JMHr9uDfuz40sU2D30nRDJzRFry98h-IPduJGF3ismXU3Xw3ITTRp5J9jp_bcaGscjuF7OnYjp8tA8XMaEaiP2AOxbK_rKkbBRqB5Wsh7hh1rQwDAZZfeChYDUn5yINNRH"
                    />

                    <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]"></div>

                    <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
                        <div>
                            <span className="font-serif italic text-3xl tracking-tight text-surface-bright">
                                Alpina
                            </span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl font-serif leading-tight text-white drop-shadow-md">
                                The Hearth <br /> & Horizon
                            </h1>

                            <p className="font-body text-surface-container-highest max-w-xs leading-relaxed opacity-90">
                                Welcome back to your curated escape. Every stay is a story
                                waiting to be told.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-surface-container-highest">
                            <span className="material-symbols-outlined text-sm">nature</span>
                            Editorial Alpine Elegance
                        </div>
                    </div>
                </section>

                {/* RIGHT SIDE */}
                <section className="p-8 md:p-16 flex flex-col justify-center bg-surface-container-low">
                    <div className="md:hidden mb-8">
                        <span className="font-serif italic text-2xl text-primary">
                            Alpina
                        </span>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-8 mb-10 border-b border-outline-variant/20">
                        <Link
                            to="/login"
                            className="pb-4 text-sm font-bold uppercase tracking-widest text-primary border-b-2 border-primary"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="pb-4 text-sm font-bold uppercase tracking-widest text-stone-400 hover:text-stone-600 transition-colors"
                        >
                            Sign Up
                        </Link>

                        <Link
                            to="/"
                            className="flex items-center gap-2 pb-4 text-sm ml-auto font-bold uppercase tracking-widest hover:text-primary text-stone-400 transition-colors"
                        >
                            <span
                                className="material-symbols-outlined"
                                data-icon="arrow_back"
                            >
                                arrow_back
                            </span>{" "}
                            Back to Homepage
                        </Link>
                    </div>

                    <div className="space-y-8">
                        <header>
                            <h2 className="text-3xl font-serif text-primary mb-2">
                                Welcome Home
                            </h2>

                            <p className="text-on-surface-variant font-body">
                                Please enter your credentials to access your sanctuary.
                            </p>
                        </header>

                        {/* SOCIAL */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 px-6 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg hover:bg-surface-container-high transition-all text-sm font-semibold">
                                Google
                            </button>

                            <button className="flex items-center justify-center gap-3 px-6 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg hover:bg-surface-container-high transition-all text-sm font-semibold">
                                Facebook
                            </button>
                        </div>

                        {/* DIVIDER */}
                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-outline-variant/15"></div>

                            <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-stone-400">
                                or with email
                            </span>

                            <div className="flex-grow border-t border-outline-variant/15"></div>
                        </div>

                        {/* FORM */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="group">
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-4 text-on-surface focus:ring-0 focus:border-b-2 focus:border-primary transition-all placeholder:text-stone-400"
                                    placeholder="e.g. wanderer@alpine.com"
                                />
                            </div>

                            <div className="group">
                                <div className="flex justify-between items-center mb-2">
                                    <label
                                        htmlFor="password"
                                        className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors"
                                    >
                                        Password
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        onChange={handleChange}
                                        className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-4 text-on-surface focus:ring-0 focus:border-b-2 focus:border-primary transition-all placeholder:text-stone-400"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            visibility
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20"
                                />

                                <label
                                    htmlFor="remember"
                                    className="text-sm text-on-surface-variant"
                                >
                                    Keep me logged in on this device
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-b from-primary to-primary-container text-on-primary py-4 rounded-lg font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all"
                            >
                                Begin Journey
                            </button>
                        </form>

                        <footer className="pt-6 text-center">
                            <p className="text-xs text-on-surface-variant font-medium">
                                By signing in, you agree to our{" "}
                                <a className="text-secondary underline decoration-secondary/30 hover:decoration-secondary">
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a className="text-secondary underline decoration-secondary/30 hover:decoration-secondary">
                                    Privacy Policy
                                </a>
                                .
                            </p>
                        </footer>
                    </div>
                </section>
            </main>
        </div>
    );
}
