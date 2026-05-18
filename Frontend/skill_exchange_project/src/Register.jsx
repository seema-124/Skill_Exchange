import React, { useState } from 'react';
import API from './api/axios';
import { UserPlus, Mail, Lock, BookOpen, CheckCircle, Award, Target } from 'lucide-react';

const Register = ({ onLogin, onBack }) => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        bio: '',
        skillsToTeach: '', 
        skillsToLearn: ''  
    });
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        try {
            const response = await API.post('/auth/register', formData);
            if (response.data.includes("Successful")) {
                setMessage({ text: "Account created! Redirecting to login...", type: "success" });
                setTimeout(() => onLogin(), 2000);
            } else {
                setMessage({ text: response.data, type: "error" });
            }
        } catch (error) {
            setMessage({ text: "Connection error. Check your backend.", type: "error" });
        }
    };

    return (
        <div className="fixed inset-0 bg-white flex z-[100]">
            
            {/* LEFT SIDE: Marketing Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#164e9e] items-center justify-center p-16 text-white">
                <div className="max-w-md">
                    <h2 className="text-5xl font-black mb-8 leading-tight">Join the SkillExchange Community</h2>
                    <p className="text-blue-100 text-lg mb-10 font-medium">The world's first peer-to-peer knowledge sharing platform where skills are the only currency.</p>
                    
                    <ul className="space-y-6">
                        <li className="flex items-center gap-4 text-xl font-medium">
                            <div className="bg-white/20 p-1 rounded-full">
                                <CheckCircle size={24} className="text-blue-200" />
                            </div>
                            Exchange knowledge without money
                        </li>
                        <li className="flex items-center gap-4 text-xl font-medium">
                            <div className="bg-white/20 p-1 rounded-full">
                                <CheckCircle size={24} className="text-blue-200" />
                            </div>
                            Connect with AI-Matched peers
                        </li>
                        <li className="flex items-center gap-4 text-xl font-medium">
                            <div className="bg-white/20 p-1 rounded-full">
                                <CheckCircle size={24} className="text-blue-200" />
                            </div>
                            Build your professional portfolio
                        </li>
                    </ul>

                    <div className="mt-16 pt-10 border-t border-white/10">
                        <p className="text-blue-200 italic font-serif">"The best way to learn a skill is to teach it."</p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Registration form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#f8f9fd] overflow-y-auto">
                <div className="max-w-[520px] w-full bg-white p-10 rounded-[32px] shadow-xl shadow-blue-100 border border-gray-100">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-black text-[#164e9e] mb-1">Create Account</h1>
                        <p className="text-gray-500 font-medium text-sm">Fill in your skills for AI Smart Matching</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name & Email Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 ml-1">FULL NAME</label>
                                <div className="relative">
                                    <UserPlus className="absolute left-4 top-3.5 text-gray-400" size={16} />
                                    <input type="text" placeholder="John Doe" 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 outline-none focus:bg-white focus:border-blue-500 transition text-sm"
                                        onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 ml-1">EMAIL ADDRESS</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={16} />
                                    <input type="email" placeholder="name@email.com" 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 outline-none focus:bg-white focus:border-blue-500 transition text-sm"
                                        onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                                </div>
                            </div>
                        </div>

                        {/* Skill Matching Row (THE AI PART) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-indigo-500 ml-1">SKILLS YOU CAN TEACH</label>
                                <div className="relative">
                                    <Award className="absolute left-4 top-3.5 text-indigo-400" size={16} />
                                    <input type="text" placeholder="Java, Python..." 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-indigo-100 bg-indigo-50/30 outline-none focus:bg-white focus:border-indigo-500 transition text-sm font-medium"
                                        onChange={(e) => setFormData({...formData, skillsToTeach: e.target.value})} required />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-purple-500 ml-1">SKILLS YOU WANT TO LEARN</label>
                                <div className="relative">
                                    <Target className="absolute left-4 top-3.5 text-purple-400" size={16} />
                                    <input type="text" placeholder="React, Figma..." 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-100 bg-purple-50/30 outline-none focus:bg-white focus:border-purple-500 transition text-sm font-medium"
                                        onChange={(e) => setFormData({...formData, skillsToLearn: e.target.value})} required />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 ml-1">PASSWORD</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 text-gray-400" size={16} />
                                <input type="password" placeholder="••••••••" 
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 outline-none focus:bg-white focus:border-blue-500 transition text-sm"
                                    onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 ml-1">BIO</label>
                            <div className="relative">
                                <BookOpen className="absolute left-4 top-3.5 text-gray-400" size={16} />
                                <textarea placeholder="A short intro about your background..." 
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 outline-none focus:bg-white focus:border-blue-500 transition h-16 resize-none text-sm"
                                    onChange={(e) => setFormData({...formData, bio: e.target.value})} />
                            </div>
                        </div>

                        {message.text && (
                            <div className={`p-3 rounded-xl text-xs text-center font-bold ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                {message.text}
                            </div>
                        )}

                        <button type="submit" className="w-full bg-[#164e9e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1e3a8a] transition shadow-lg mt-2 active:scale-95">
                            Sign Up
                        </button>
                    </form>

                    <div className="text-center mt-6 space-y-3">
                        <p className="text-sm text-gray-500 font-medium">
                            Already have an account? 
                            <button onClick={onLogin} className="ml-1.5 text-[#164e9e] font-bold hover:underline">Login here</button>
                        </p>
                        <button onClick={onBack} className="text-xs text-gray-400 font-bold hover:text-gray-600">
                            ← BACK TO HOME
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;