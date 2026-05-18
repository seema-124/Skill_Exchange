import React from 'react';
import { ShieldCheck, Zap, Clock, Star, X } from 'lucide-react';

const MatchInsight = ({ partner, onClose }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[1000] p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[48px] p-10 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-8 right-8 text-gray-300 hover:text-gray-600"><X /></button>
                
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-indigo-50 rounded-3xl mx-auto flex items-center justify-center mb-4 border border-indigo-100">
                        <Zap size={40} className="text-[#6366f1]" fill="currentColor" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">AI Compatibility Insight</h2>
                    <p className="text-sm text-gray-400 font-medium">Analyzing synergy between you and {partner?.name || 'Expert'}</p>
                </div>

                <div className="space-y-6">
                    {/* Compatibility Score */}
                    <div className="bg-indigo-50/50 p-6 rounded-[32px] border border-indigo-100 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Total Match Score</p>
                            <h3 className="text-3xl font-black text-[#6366f1]">92%</h3>
                        </div>
                        <ShieldCheck size={48} className="text-[#6366f1] opacity-20" />
                    </div>

                    {/* Breakdown logic (Product Feature 2.2) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock size={14} className="text-emerald-500" />
                                <span className="text-[10px] font-black uppercase text-gray-400">Time Sync</span>
                            </div>
                            <p className="text-xs font-bold text-gray-700">Both available Weekends</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Star size={14} className="text-amber-500" />
                                <span className="text-[10px] font-black uppercase text-gray-400">Expertise</span>
                            </div>
                            <p className="text-xs font-bold text-gray-700">Top 5% in React JS</p>
                        </div>
                    </div>
                </div>

                <button className="w-full mt-8 py-4 bg-[#6366f1] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:scale-[1.02] transition">
                    Send Connect Request
                </button>
            </div>
        </div>
    );
};

export default MatchInsight;