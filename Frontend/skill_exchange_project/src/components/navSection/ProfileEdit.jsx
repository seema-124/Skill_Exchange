import React, { useState } from 'react';
import { User, Save, X, BookOpen, Target } from 'lucide-react';
import API from '../../api/axios';

const ProfileEdit = ({ user, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        skillsToTeach: user.skillsToTeach || '',
        skillsToLearn: user.skillsToLearn || ''
    });

    const handleSave = async () => {
        try {
            const res = await API.put(`/users/update/${user.userId}`, formData);
            alert("Profile Updated Successfully!");
            onUpdate(res.data); // Update the user state in Dashboard
            onClose();
        } catch (err) {
            alert("Failed to update profile.");
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[1000] animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[40px] p-10 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-8 right-8 text-gray-300 hover:text-gray-600"><X /></button>
                
                <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
                    <User className="text-[#6366f1]" /> Edit Profile
                </h2>

                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input 
                            type="text" 
                            className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#6366f1] transition font-medium"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Skills You Can Teach (Comma separated)</label>
                        <div className="relative">
                            <BookOpen className="absolute left-4 top-4 text-gray-300" size={18} />
                            <input 
                                type="text" 
                                className="w-full p-4 pl-12 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#6366f1] transition font-medium"
                                placeholder="e.g. Java, React, SQL"
                                value={formData.skillsToTeach}
                                onChange={(e) => setFormData({...formData, skillsToTeach: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Skills You Want to Learn</label>
                        <div className="relative">
                            <Target className="absolute left-4 top-4 text-gray-300" size={18} />
                            <input 
                                type="text" 
                                className="w-full p-4 pl-12 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#6366f1] transition font-medium"
                                placeholder="e.g. Python, AI, UI/UX"
                                value={formData.skillsToLearn}
                                onChange={(e) => setFormData({...formData, skillsToLearn: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handleSave}
                    className="w-full mt-10 py-4 bg-[#6366f1] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:scale-105 transition flex items-center justify-center gap-2"
                >
                    <Save size={18} /> Save Changes
                </button>
            </div>
        </div>
    );
};

export default ProfileEdit;