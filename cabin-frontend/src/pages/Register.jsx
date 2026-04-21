import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../store/loadingSlice";
import { showToast } from "../store/toastSlice";
import { validateField } from "../utils/validation";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.loading);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const nameError = validateField(form.name, ["required"]);
    const emailError = validateField(form.email, ["required", "email"]);
    const passwordError = validateField(form.password, ["required", { minLength: 8 }]);
    if (nameError || emailError || passwordError) {
      setErrors((prevErrors) => ({ ...prevErrors, name: nameError, email: emailError, password: passwordError }));
      return;
    }
    try {
      await api.post("/auth/register", form);
      navigate("/login");
      dispatch(showToast({ message: "Registration successful", type: "success" }));
    } catch (err) {
      dispatch(showToast({ message: "Registration failed", type: "error" }));
    } finally {
      setErrors({ name: "", email: "", password: "" });
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 500);
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex items-center justify-center p-4 md:p-8 relative">
      <main className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-xl overflow-hidden shadow-2xl shadow-on-surface/5">
        {/* LEFT SIDE */}
        <section className="relative hidden md:block overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            alt="Alpine mountains"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLdM6YuQ3mWr4Pjyg9efGOIEkGzeJsl-8eFnNjLCqNW3uW2F4nJ_qqbkQ-5_bTNftm0ezUYPt9lH3xPolovkrh6XEfCpNMOjfxRbGOoQ5Q5dXhcobZZLquJIpooJFYej9e7lmPMwSCpwW3C3hHoiuCp_w-p8qyErl-R-dApwt_A7RO7nsRi6ZDnff9zNwcBJt7qw_hyMw3MfnUHTpYRMogMAtZNVqdeBmqnELGD419ZLme5tGHbLmmanAIQ8ixMUjsTYZtxe9P7ZG4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
          <div className="relative z-10 p-12 mt-auto">
            <span className="font-label text-xs uppercase tracking-widest text-secondary-fixed mb-4 block">
              The Hearth & Horizon
            </span>
            <h1 className="text-5xl lg:text-7xl text-on-primary font-headline leading-tight max-w-xl">
              Begin Your <br /> Alpine Escape.
            </h1>
            <p className="mt-6 text-on-primary text-lg max-w-md font-body leading-relaxed">
              Join a community of modern explorers and discover sanctuaries.
            </p>
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
                <Link to="/login" className="pb-4 text-sm font-bold uppercase text-stone-400 tracking-widest">
                    Login
                </Link>
                <Link to="/register" className="pb-4 text-sm font-bold uppercase tracking-widest border-b-2 border-primary hover:text-stone-600 transition-colors">
                    Sign Up
                </Link>
                <Link to="/" className="flex items-center gap-2 pb-4 text-sm ml-auto font-bold uppercase tracking-widest hover:text-primary text-stone-400 transition-colors">
                  <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span> Back to Homepage
                </Link>
            </div>
            <div className="mb-8">
              <h2 className="text-3xl font-headline text-on-surface mb-2">
                Create an account
              </h2>
              <p className="text-on-surface-variant font-body">
                Enter your details to start your journey.
              </p>
            </div>
            {/* FORM */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* NAME */}
              <div className="group">
                <div className="flex justify-between items-center mb-2">
                    <label
                    htmlFor="name"
                    className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors"
                    >
                    Full Name
                    </label>
                </div>
                <input
                  name="name"
                  onChange={handleChange}
                  className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-4 text-on-surface focus:ring-0 focus:border-b-2 focus:border-primary transition-all placeholder:text-stone-400"
                  placeholder="Eleanor Rigby"
                  type="text"
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>
              {/* EMAIL */}
              <div className="group">
                <div className="flex justify-between items-center mb-2">
                    <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors"
                    >
                    Email Address
                    </label>
                </div>
                <input
                  name="email"
                  onChange={handleChange}
                  className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-4 text-on-surface focus:ring-0 focus:border-b-2 focus:border-primary transition-all placeholder:text-stone-400"
                  placeholder="email@alpine.com"
                  type="email"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>
              {/* PASSWORD */}
              <div className="group">
                    <div className="flex justify-between items-center mb-2">
                        <label
                        htmlFor="password"
                        className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors"
                        >
                            Create Password
                        </label>
                    </div>
                <div className="relative">
                  <input
                    name="password"
                    onChange={handleChange}
                    className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-4 text-on-surface focus:ring-0 focus:border-b-2 focus:border-primary transition-all placeholder:text-stone-400"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
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
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>
              {/* BUTTON */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-b from-primary to-primary-container text-on-primary font-body font-bold rounded-lg shadow-lg shadow-primary/10 hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Create Account
              </button>
            </form>
            {/* DIVIDER */}
            <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-outline-variant/15"></div>
                <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-stone-400">
                    or with socials
                </span>
                <div className="flex-grow border-t border-outline-variant/15"></div>
            </div>
            {/* SOCIAL */}
            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 px-6 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg hover:bg-surface-container-high transition-all text-sm font-semibold">
                    Google
                </button>
                <button className="flex items-center justify-center gap-3 px-6 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg hover:bg-surface-container-high transition-all text-sm font-semibold">
                    Facebook
                </button>
            </div>
            {/* FOOTER */}
            <footer className="pt-6 text-center">
                <p className="text-xs text-on-surface-variant font-medium">
                By creating an account, you agree to our{" "}
                <a className="text-secondary underline decoration-secondary/30 hover:decoration-secondary">
                    Terms of Service
                </a>{" "}
                and{" "}
                <a className="text-secondary underline decoration-secondary/30 hover:decoration-secondary">
                    Privacy Policy
                </a>.
                </p>
            </footer>
        </section>
      </main>
    </div>
  );
}