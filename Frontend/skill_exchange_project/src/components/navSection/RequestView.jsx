import React from 'react';
import { Check, X, User } from 'lucide-react';

const RequestView = ({ pendingRequests, onAccept, onReject }) => {
    return (
        <div className="animate-in fade-in duration-500 space-y-6">
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                Connection <span className="text-[#6366f1]">Requests</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingRequests.length > 0 ? (
                    pendingRequests.map(req => {
                        // 1. Logic to get the REAL name from the object or a fallback
                        const displayName = req.sender?.name || req.senderName;
                        // 2. Logic to handle both senderId and sender_id naming
                        const displayId = req.senderId || req.sender_id || req.sender?.userId;

                        return (
                            <div key={req.requestId || req.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-[#6366f1] font-bold uppercase">
                                        {displayName ? displayName.charAt(0) : <User size={18} />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">
                                            {displayName || `Request from User #${displayId || '?'}`}
                                        </h4>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            Status: {req.status || 'Pending'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => onReject(req.requestId || req.id)} 
                                        className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition"
                                    >
                                        <X size={18} />
                                    </button>
                                    <button 
                                        onClick={() => onAccept(req.requestId || req.id)} 
                                        className="p-3 bg-emerald-50 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition shadow-lg shadow-emerald-100"
                                    >
                                        <Check size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full py-20 text-center opacity-30 font-black uppercase tracking-widest text-xs">
                        No pending requests
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestView;