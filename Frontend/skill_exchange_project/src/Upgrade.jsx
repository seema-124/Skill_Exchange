import React, { useState } from 'react';
import API from './api/axios';
import { Check, ShieldCheck, Zap, Crown } from 'lucide-react';

const Upgrade = ({ user, onBack }) => {
    const [loading, setLoading] = useState(false);

    const [view, setView] = useState('home');

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            // We will create this endpoint in the backend next
            const response = await API.put(`/auth/upgrade/${user.userId}`);
            
            // Update the local storage so the UI reflects the change immediately
            const updatedUser = { ...user, premium: true };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            alert("Congratulations! You are now a Premium Member.");
            window.location.reload();
        } catch (err) {
            alert("Upgrade failed. Make sure your backend is updated.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-black text-gray-900 mb-4">Choose Your Plan</h2>
                <p className="text-gray-600 mb-12">Upgrade to unlock the full potential of SkillExchange.</p>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Free Plan */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm opacity-60">
                        <h3 className="text-xl font-bold mb-2">Free Tier</h3>
                        <div className="text-4xl font-black mb-6">₹0<span className="text-lg text-gray-400">/mo</span></div>
                        <ul className="text-left space-y-4 mb-8">
                            <li className="flex items-center gap-2 text-gray-600"><Check size={18}/> Limit: 3 Skills</li>
                            <li className="flex items-center gap-2 text-gray-600"><Check size={18}/> Basic Matching</li>
                            <li className="flex items-center gap-2 text-gray-600"><Check size={18}/> Standard Support</li>
                        </ul>
                        <button disabled className="w-full py-3 rounded-xl font-bold bg-gray-100 text-gray-400">Current Plan</button>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-white p-8 rounded-3xl border-2 border-blue-600 shadow-xl relative scale-105">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                            RECOMMENDED
                        </div>
                        <h3 className="text-xl font-bold mb-2">Premium Pro</h3>
                        <div className="text-4xl font-black mb-6 text-blue-600">₹499<span className="text-lg text-gray-400">/mo</span></div>
                        <ul className="text-left space-y-4 mb-8">
                            <li className="flex items-center gap-2 text-gray-800 font-medium"><Zap size={18} className="text-blue-600"/> Unlimited Skill Listings</li>
                            <li className="flex items-center gap-2 text-gray-800 font-medium"><ShieldCheck size={18} className="text-blue-600"/> Verified Pro Badge</li>
                            <li className="flex items-center gap-2 text-gray-800 font-medium"><Crown size={18} className="text-blue-600"/> Priority in Search Results</li>
                        </ul>
                        <button 
                            onClick={handleUpgrade}
                            disabled={loading}
                            className="w-full py-4 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                        >
                            {loading ? "Processing..." : "Upgrade Now"}
                        </button>
                    </div>
                </div>
                <button onClick={onBack} className="mt-10 text-gray-500 hover:text-gray-800">← Back to Dashboard</button>
            </div>
        </div>
    );
};

export default Upgrade;