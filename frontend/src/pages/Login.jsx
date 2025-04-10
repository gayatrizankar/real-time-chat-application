import { useState } from "react";
import React from "react";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { toast } from "react-hot-toast"; // Import toast

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic Validation Before Submission
    if (!formData.email.trim()) {
      toast.error("❌ Email is required.");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("❌ Password is required.");
      return;
    }

    const success = await login(formData);
    if (!success) {
      toast.error("❌ Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left Side */}
      <div className="h-screen w-1/2 bg-blue-400 flex flex-col justify-center items-center">
        <p className="text-2xl font-bold text-blue-900">Welcome Back</p>
        <p className="text-blue-900">Login to your account</p>
      </div>

      {/* Right Side */}
      <div className="h-screen w-1/2 bg-blue-200 flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Input */}
          <input
            className="h-[40px] w-[400px] p-2 border border-gray-300 rounded-md"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          {/* Password Input */}
          <div className="relative w-full">
            <input
              className="h-[40px] w-[400px] p-2 border border-gray-300 rounded-md pr-10"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-blue-900 text-white p-2 rounded-md flex justify-center w-[400px] font-bold text-lg"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? <Loader size={24} className="animate-spin" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
