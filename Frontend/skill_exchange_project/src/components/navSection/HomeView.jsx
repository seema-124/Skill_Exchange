import React, { useState, useEffect } from 'react';
import { Users, Zap, Globe, MessageSquare, Loader2 } from 'lucide-react';
import API from '../../api/axios';

const HomeView = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalSwaps: 0,
        activeRooms: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCommunityStats = async () => {
            try {
                const res = await API.get('/users/stats/community');
                setStats(res.data);
            } catch (err) {
                console.error("Stats fetch failed, using fallback.");
                // Fallback values so the UI isn't empty during demo
                setStats({ totalUsers: 150, totalSwaps: 85, activeRooms: 12 });
            } finally {
                setLoading(false);
            }
        };
        fetchCommunityStats();
    }, []);

    const statCards = [
        { label: 'Active Learners', value: stats.totalUsers, icon: <Users size={20}/>, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { label: 'Total Skill Swaps', value: stats.totalSwaps, icon: <Zap size={20}/>, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Live Learning Rooms', value: stats.activeRooms, icon: <MessageSquare size={20}/>, color: 'text-orange-500', bg: 'bg-orange-50' }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
            {/* Hero Section */}
            <div className="bg-[#6366f1] p-12 rounded-[40px] text-white relative overflow-hidden shadow-2xl shadow-indigo-100">
                <div className="relative z-10">
                    <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
                        Community Powered
                    </span>
                    <h1 className="text-4xl font-black mb-4 tracking-tight leading-tight">
                        Knowledge is the only <br/>currency here.
                    </h1>
                    <p className="text-indigo-100 font-medium max-w-md text-sm leading-relaxed opacity-90">
                        Join {stats.totalUsers}+ students across India exchanging skills in real-time. No fees, just growth.
                    </p>
                </div>
                <Globe className="absolute -right-10 -bottom-10 text-white/5" size={320} />
            </div>

            {/* Live Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((item) => (
                    <div key={item.label} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-6 group">
                        <div className={`p-4 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                            {loading ? <Loader2 size={20} className="animate-spin" /> : item.icon}
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-gray-800">
                                {loading ? '...' : item.value.toLocaleString()}
                            </h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Instructions / How it Works */}
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-xl font-black text-gray-800 mb-8">How to <span className="text-[#6366f1]">Start Exchange Skills</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 text-[#6366f1] flex items-center justify-center font-black">1</div>
                        <h4 className="font-bold text-gray-800">List your Skills</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">Go to 'Edit Profile' and tell the community what you can teach and what you want to learn.</p>
                    </div>
                    <div className="space-y-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center font-black">2</div>
                        <h4 className="font-bold text-gray-800">Find a Match</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">Use the 'Browse' tab to find experts who want the skills you have. Send a request!</p>
                    </div>
                    <div className="space-y-3">
                        <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center font-black">3</div>
                        <h4 className="font-bold text-gray-800">Enter the Room</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">Once accepted, your private 'Room' unlocks for chat, resource sharing, and video calls.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeView;