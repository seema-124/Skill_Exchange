import React, { useState } from 'react';
import API from './api/axios';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

const Login = ({ onSignup, onBack }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    // --- GOOGLE LOGIN LOGIC ---
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // 1. Get user details from Google API
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                
                // 2. Send Google data to your Spring Boot Backend
                const backendRes = await API.post('/requests/google-login', {
                    email: res.data.email,
                    name: res.data.name,
                    googleId: res.data.sub
                });

                // 3. Save user and refresh
                localStorage.setItem('user', JSON.stringify(backendRes.data));
                window.location.reload();
            } catch (err) {
                setMessage({ text: "Google Login failed. Please try manually.", type: "error" });
            }
        },
        onError: () => setMessage({ text: "Google Login Error", type: "error" })
    });

    // --- TRADITIONAL LOGIN LOGIC ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        try {
            const response = await API.post('/auth/login', credentials);
            if (typeof response.data === 'object' && response.data !== null) {
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.reload(); 
            } else {
                setMessage({ text: "Invalid email or password", type: "error" });
            }
        } catch (err) {
            setMessage({ text: "Backend connection error. Is Eclipse running?", type: "error" });
        }
    };

    return (
        <div className="fixed inset-0 bg-[#f0f7ff] flex items-center justify-center p-4 z-[100]">
            <div className="bg-white w-full max-w-[500px] rounded-[32px] shadow-sm border border-gray-100 p-12">
                
                <h2 className="text-3xl font-bold text-center text-[#1e293b] mb-10">
                    Login to <span className="text-[#1e3a8a]">SkillSwap</span>
                </h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1e293b] ml-1">Email</label>
                        <input 
                            type="email" 
                            placeholder="email" 
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-600 placeholder-gray-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                            required 
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1e293b] ml-1">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••" 
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-600 placeholder-gray-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                required 
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {message.text && (
                        <p className={`text-sm text-center font-medium ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                            {message.text}
                        </p>
                    )}

                    <button 
                        type="submit" 
                        className="w-full bg-[#164e9e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1e3a8a] transition shadow-lg mt-2 active:scale-[0.98]"
                    >
                        Login
                    </button>
                </form>

                <div className="relative my-10">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-4 bg-white text-gray-400 uppercase tracking-[0.2em]">OR</span>
                    </div>
                </div>

                {/* Google Login Button */}
                <button 
                    onClick={() => googleLogin()}
                    className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition mb-8 shadow-sm active:scale-[0.98]"
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                    Log in with Google
                </button>

                {/* Footer Navigation */}
                <div className="text-center space-y-4">
                    <p className="text-sm text-gray-600 font-medium">
                        Do not have an account? 
                        <button onClick={onSignup} className="ml-1.5 text-[#164e9e] font-bold hover:underline transition">Signup</button>
                    </p>
                    <button onClick={onBack} className="block w-full text-sm text-[#164e9e] font-bold hover:underline transition">
                        Back to home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;