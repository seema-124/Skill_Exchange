import React from 'react';
import { Search, Zap, Star, ShieldCheck, UserPlus, Loader2 } from 'lucide-react';

const BrowseView = ({ searchTerm, setSearchTerm, handleSearch, searchResults, loading, sendMatchRequest }) => {
    
    // Logic for Product Feature: Compatibility Score (ranges from 85-98% for search results)
    const getCompatibilityScore = (name) => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
        return Math.floor(Math.abs((Math.sin(hash) * 13) + 85));
    };

    return (
        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8">
            {/* Search Header */}
            <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">Discover <span className="text-[#6366f1]">Experts</span></h2>
                    <p className="text-gray-400 font-medium mt-1 text-sm">AI-powered matching based on your learning goals.</p>
                </div>
                <form onSubmit={handleSearch} className="flex gap-3 w-full md:w-auto relative">
                    <input 
                        type="text" 
                        placeholder="Search skills (e.g. Java, React)..." 
                        className="flex-1 md:w-80 px-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#6366f1] transition shadow-inner font-medium text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="bg-[#6366f1] text-white p-4 rounded-2xl shadow-lg shadow-indigo-100 hover:scale-105 transition flex items-center justify-center">
                        {loading ? <Loader2 className="animate-spin" size={22} /> : <Search size={22} />}
                    </button>
                </form>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.length > 0 ? (
                    searchResults.map((expert) => (
                        <div key={expert.userId} className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 bg-indigo-50 text-[#6366f1] rounded-2xl flex items-center justify-center font-black text-xl group-hover:bg-[#6366f1] group-hover:text-white transition-colors">
                                    {expert.name.charAt(0)}
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-emerald-500 font-black text-sm">
                                        <Zap size={14} fill="currentColor" /> {getCompatibilityScore(expert.name)}%
                                    </div>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Match Score</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-black text-lg text-gray-800 flex items-center gap-2">
                                    {expert.name}
                                    <ShieldCheck size={16} className="text-blue-500" />
                                </h4>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {expert.skillsToTeach?.split(',').map(skill => (
                                        <span key={skill} className="bg-gray-50 text-gray-500 px-3 py-1 rounded-lg text-[10px] font-bold border border-gray-100 uppercase">
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star size={12} fill="currentColor" />
                                    <span className="text-[10px] font-black">4.9 (24 Reviews)</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => sendMatchRequest(expert.userId)}
                                className="w-full py-4 bg-indigo-50 text-[#6366f1] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#6366f1] hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <UserPlus size={16} /> Request Connection
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={24} className="text-gray-300" />
                        </div>
                        <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Search for a skill to see smart matches</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseView;