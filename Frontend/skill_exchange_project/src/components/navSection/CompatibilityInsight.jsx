import React from 'react';
import { ShieldCheck, Clock, Star, Zap } from 'lucide-react';

const CompatibilityInsight = ({ partner, score }) => {
    return (
        <div className="bg-white p-6 rounded-[32px] border border-indigo-50 shadow-lg animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-gray-800 text-sm uppercase tracking-widest">Compatibility Insight</h3>
                <span className="text-2xl font-black text-[#6366f1]">{score}%</span>
            </div>
            
            <div className="space-y-4">
                {/* Skill Match Row */}
                <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                        <span className="text-gray-400">SKILL SYNERGY</span>
                        <span className="text-indigo-600">High</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[90%]"></div>
                    </div>
                </div>

                {/* Availability Row */}
                <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded-2xl">
                    <Clock size={16} className="text-emerald-600" />
                    <p className="text-[10px] font-bold text-emerald-700">Both available on Weekends</p>
                </div>

                {/* Rating Row */}
                <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-2xl">
                    <Star size={16} className="text-amber-500" />
                    <p className="text-[10px] font-bold text-amber-700">Top Rated Partner (4.8/5.0)</p>
                </div>
            </div>

            <button className="w-full mt-6 py-3 bg-[#6366f1] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100">
                Start Pro Session
            </button>
        </div>
    );
};

export default CompatibilityInsight;