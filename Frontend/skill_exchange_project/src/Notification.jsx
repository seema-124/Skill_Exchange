import React, { useState, useEffect } from 'react';
import API from './api/axios';
import { UserCheck, UserX, Bell } from 'lucide-react';

const Notifications = ({ user }) => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const response = await API.get(`/requests/pending/${user.userId}`);
            setRequests(response.data);
        } catch (err) { 
            console.error("Error fetching notifications"); 
        }
    };

    useEffect(() => { 
        if (user?.userId) fetchRequests(); 
    }, [user?.userId]);

    const handleAction = async (requestId, status) => {
        try {
            // Using your specific update endpoint
            await API.put(`/requests/update/${requestId}?status=${status}`);
            alert(`Request ${status}!`);
            fetchRequests(); // Refresh list
        } catch (err) { 
            alert("Action failed"); 
        }
    };

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mt-8">
            <div className="flex items-center gap-2 mb-6 text-blue-600 font-bold">
                <Bell size={20} />
                <h3>Pending Exchange Requests ({requests.length})</h3>
            </div>
            
            <div className="space-y-4">
                {requests.map(req => (
                    <div key={req.requestId} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-200">
                        <div>
                            {/* FIX: Use Optional Chaining (?.) and a fallback for the name */}
                            <p className="font-bold text-gray-800">
                                {req.sender?.name || `User #${req.senderId || 'Unknown'}`}
                            </p>
                            <p className="text-sm text-gray-500">wants to exchange skills with you</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleAction(req.requestId, 'Accepted')} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                                <UserCheck size={20} />
                            </button>
                            <button onClick={() => handleAction(req.requestId, 'Rejected')} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                                <UserX size={20} />
                            </button>
                        </div>
                    </div>
                ))}
                {requests.length === 0 && (
                    <p className="text-gray-400 text-center py-4 italic text-sm">No new notifications</p>
                )}
            </div>
        </div>
    );
};

export default Notifications;