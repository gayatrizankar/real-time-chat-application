import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Loader } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore(); // ✅ Correct store call

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const validateForm = () => {
    let isValid = true;

    if (!formData.fullName) {
      toast.error('Full Name is required');
      isValid = false;
    }

    if (!formData.email) {
      toast.error('Email is required');
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      toast.error('Email is invalid');
      isValid = false;
    }

    if (!formData.password) {
      toast.error('Password is required');
      isValid = false;
    } else if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const success = await signup(formData); // ✅ Correct function call
    if (success) navigate("/");
  };

  return (
    <div className='flex h-screen w-screen'>
      <div className='h-screen w-1/2 bg-blue-400 flex flex-col justify-center'>
        <div className="flex items-center justify-center flex-col">
          <p className="text-2xl font-bold text-blue-900">Create Your Account</p>
          <p className="text-xl">Get started with a free account</p>
        </div>

        <div className="ml-[80px]">
          <p className="font-bold text-blue-900 text-2xl p-3">Full Name</p>
          <input value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="h-[40px] w-[500px] bg-blue-500 border-2 border-blue-900 rounded-xl p-2" placeholder="Enter your Name" />

          <p className="font-bold text-blue-900 text-2xl p-3">Email</p>
          <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-[40px] w-[500px] bg-blue-500 border-2 border-blue-900 rounded-xl p-2" placeholder="Enter your Email" />

          <p className="font-bold text-blue-900 text-2xl p-3">Password</p>
          <input type="password" value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="h-[40px] w-[500px] bg-blue-500 border-2 border-blue-900 rounded-xl p-2" placeholder="Enter your Password" />
        </div>

        <div className="flex items-center justify-center">
          <button onClick={handleSubmit} className="h-[50px] w-[200px] rounded-md bg-blue-900 text-2xl font-bold text-blue-400 flex items-center justify-center m-5 cursor-pointer">
            {isSigningUp ? (
              <>
                <Loader className="size-5 animate-spin text-white" />
                <p>Loading...</p>
              </>
            ) : (
              <p>Create Account</p>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-3">
          <p>Already have an Account?</p>
          <p onClick={() => navigate('/login')} className="text-blue-900 font-bold cursor-pointer">Login</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
