import React, { useState } from 'react';
import { Star, X, MessageSquare, ShieldCheck } from 'lucide-react';

const ReviewModal = ({ partnerName, onClose }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[1000] p-4 animate-in fade-in zoom-in duration-300">
            <div className="bg-white w-full max-w-md rounded-[48px] p-10 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-8 right-8 text-gray-300 hover:text-gray-600"><X /></button>
                
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl mx-auto flex items-center justify-center mb-4">
                        <ShieldCheck size={32} className="text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">Session Complete!</h2>
                    <p className="text-sm text-gray-400 font-medium">How was your learning experience with <span className="text-[#6366f1]">{partnerName}</span>?</p>
                </div>

                <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setRating(star)}
                            className="transition-transform active:scale-90"
                        >
                            <Star 
                                size={36} 
                                className={`${(hover || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
                            />
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Comments</label>
                    <textarea 
                        placeholder="Write a quick feedback..."
                        className="w-full p-5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#6366f1] transition h-32 text-sm font-medium resize-none"
                    />
                </div>

                <button 
                    onClick={() => { alert("Feedback Submitted! Trust score updated."); onClose(); }}
                    className="w-full mt-8 py-4 bg-[#6366f1] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:scale-[1.02] transition flex items-center justify-center gap-2"
                >
                    <MessageSquare size={16} /> Submit Feedback
                </button>
            </div>
        </div>
    );
};

export default ReviewModal;