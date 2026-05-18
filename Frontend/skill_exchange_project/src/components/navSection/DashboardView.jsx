import React, { useState, useEffect } from 'react';
import { Zap, Bell, MessageSquare, BookOpen, Calendar, Target, Sparkles, Loader2 } from 'lucide-react';
import API from '../../api/axios';

const DashboardView = ({ user, matchesCount, pendingCount, onTabChange }) => {
    const [suggestedPartner, setSuggestedPartner] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    // Calculate dynamic counts from user profile string
    const skillsOfferedCount = user.skillsToTeach ? user.skillsToTeach.split(',').filter(s => s.trim() !== "").length : 0;
    const skillsWantedCount = user.skillsToLearn ? user.skillsToLearn.split(',').filter(s => s.trim() !== "").length : 0;

    // // AI Logic: Find a real person in the DB who teaches what the user wants to learn
    // useEffect(() => {
    //     const getAiSuggestion = async () => {
    //         if (user.skillsToLearn) {
    //             setIsSearching(true);
    //             try {
    //                 const firstSkill = user.skillsToLearn.split(',')[0].trim();
    //                 const res = await API.get(`/users/search?skill=${firstSkill}&currentUserId=${user.userId}`);
    //                 if (res.data.length > 0) {
    //                     setSuggestedPartner(res.data[0]);
    //                 }
    //             } catch (err) {
    //                 console.log("AI Suggestion failed to fetch real users.");
    //             } finally {
    //                 setIsSearching(false);
    //             }
    //         }
    //     };
    //     getAiSuggestion();
    // }, [user.skillsToLearn, user.userId]);

    const cards = [
        { label: 'Skills Offered', value: skillsOfferedCount, icon: <BookOpen size={20}/>, color: 'bg-indigo-600', shadow: 'shadow-indigo-100' },
        { label: 'Skills Wanted', value: skillsWantedCount, icon: <Target size={20}/>, color: 'bg-emerald-500', shadow: 'shadow-emerald-100' },
        { label: 'Pending', value: pendingCount, icon: <Bell size={20}/>, color: 'bg-rose-500', shadow: 'shadow-rose-100', tab: 'requests' },
        { label: 'Active Rooms', value: matchesCount, icon: <MessageSquare size={20}/>, color: 'bg-sky-500', shadow: 'shadow-sky-100', tab: 'rooms' }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <div 
                        key={card.label} 
                        onClick={() => card.tab && onTabChange(card.tab)}
                        className={`${card.color} p-8 rounded-[36px] text-white shadow-xl ${card.shadow} cursor-pointer hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group`}
                    >
                        <div className="relative z-10">
                            <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                                {card.icon}
                            </div>
                            <h2 className="text-4xl font-black mb-1">{card.value}</h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] opacity-80">{card.label}</p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* AI Insight Box (The Brain of the Dashboard) */}
                <div className="md:col-span-2 bg-[#1e293b] p-10 rounded-[44px] text-white relative overflow-hidden shadow-2xl shadow-slate-200">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit">
                            <Sparkles size={12} /> AI Matching Engine
                        </div>
                        
                        <h3 className="text-3xl font-bold mt-8 mb-6">SkillBuddy Insights</h3>
                        
                        {isSearching ? (
                            <div className="flex items-center gap-3 text-slate-400">
                                <Loader2 className="animate-spin" /> <p className="text-sm">Analyzing community database...</p>
                            </div>
                        ) : suggestedPartner ? (
                            <div className="space-y-4">
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    I've found <span className="text-white font-black underline decoration-indigo-500 decoration-4 underline-offset-4">{suggestedPartner.name}</span>. 
                                    They are an expert in <span className="text-indigo-400 font-bold">{user.skillsToLearn?.split(',')[0]}</span> and are ready to swap!
                                </p>
                                <p className="text-slate-500 text-xs font-medium">98% Compatibility based on your recent profile update.</p>
                            </div>
                        ) : (
                            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                                Tell me what you want to learn in your profile, and I'll find the perfect mentor for you in real-time.
                            </p>
                        )}

                        <button 
                            onClick={() => onTabChange('browse')}
                            className="mt-10 bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 hover:scale-105 transition-all active:scale-95 shadow-lg shadow-black/20"
                        >
                            {suggestedPartner ? `Connect with ${suggestedPartner.name.split(' ')[0]}` : 'Explore Experts'}
                        </button>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"></div>
                    <div className="absolute top-10 right-10 opacity-10">
                        <Zap size={120} />
                    </div>
                </div>

                {/* Right Side Column: Planning & Goals */}
                <div className="bg-white p-10 rounded-[44px] border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                <Calendar size={18} className="text-[#6366f1]" /> Your Goal
                            </h4>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Focus Skill</p>
                                <p className="text-sm text-gray-700 font-bold">
                                    {user.skillsToLearn?.split(',')[0] || 'Set a learning goal'}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-gray-50">
                                <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase mb-2">
                                    <span>Learning Progress</span>
                                    <span className="text-indigo-600">65%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full w-2/3 transition-all duration-1000"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <button 
                        onClick={() => onTabChange('browse')}
                        className="mt-12 w-full py-5 border-2 border-dashed border-gray-100 text-gray-400 rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:border-indigo-200 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all duration-300"
                    >
                        + Expand Network
                    </button> */}
                </div>

            </div>
        </div>
    );
};

export default DashboardView;