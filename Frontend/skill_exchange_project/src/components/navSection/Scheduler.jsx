import React from 'react';
import { Calendar, Check } from 'lucide-react';

const Scheduler = () => {
    const slots = ['Morning', 'Afternoon', 'Evening', 'Weekend'];
    
    return (
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                <Calendar className="text-indigo-500" size={20} /> My Availability
            </h3>
            <div className="grid grid-cols-2 gap-4">
                {slots.map(slot => (
                    <div key={slot} className="relative group cursor-pointer">
                        <div className="p-4 border-2 border-gray-50 rounded-2xl group-hover:border-[#6366f1] transition-all">
                            <p className="text-xs font-bold text-gray-500">{slot}</p>
                            <div className="absolute top-3 right-3 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                                <Check size={10} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-4 italic font-medium">Matches are filtered based on shared slots.</p>
        </div>
    );
};

export default Scheduler;