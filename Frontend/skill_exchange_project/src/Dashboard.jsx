import React, { useState, useEffect } from 'react';
import API from './api/axios';
import { BookOpen, Bot, X, Send, Settings, User } from 'lucide-react';

// Modules from navSection
import HomeView from './components/navSection/HomeView';
import DashboardView from './components/navSection/DashboardView';
import UpgradeView from './components/navSection/UpgradeView';
import BrowseView from './components/navSection/BrowseView'; 
import RequestView from './components/navSection/RequestView'; 
import RoomsView from './components/navSection/RoomsView'; 
import ProfileEdit from './components/navSection/ProfileEdit'; // You will create this file next
import Notification from './Notification';

const Dashboard = ({ user: initialUser, onLogout }) => {
    // --- State Management ---
    const [user, setUser] = useState(initialUser); // Local user state for dynamic updates
    const [currentTab, setCurrentTab] = useState('dashboard');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [matches, setMatches] = useState([]); 
    const [pendingRequests, setPendingRequests] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [isBotOpen, setIsBotOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false); // For Profile Modal
    const [botMessage, setBotMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'bot', text: `Hi ${user.name}! Ready to update your skill profile or find a new partner?` }
    ]);

    // --- Data Fetching ---
    const fetchData = async () => {
        if (!user?.userId) return;
        try {
            const matchRes = await API.get(`/requests/accepted/${user.userId}`);
            setMatches(matchRes.data || []);

            const pendingRes = await API.get(`/requests/pending/${user.userId}`);
            setPendingRequests(pendingRes.data || []);
        } catch (err) {
            console.log("Syncing database...");
        }
    };

    useEffect(() => {
        fetchData();
    }, [user.userId, currentTab]);

    // --- Action Handlers ---
    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!searchTerm) return;
        setLoading(true);
        try {
            const response = await API.get(`/users/search?skill=${searchTerm}&currentUserId=${user.userId}`);
            setSearchResults(response.data || []);
        } catch (err) {
            console.error("Search failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            await API.put(`/requests/update/${requestId}?status=Accepted`);
            alert("Connection established!");
            fetchData(); 
            setCurrentTab('rooms'); 
        } catch (err) {
            alert("Error accepting request.");
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            await API.put(`/requests/update/${requestId}?status=Rejected`);
            fetchData();
        } catch (err) {
            console.log("Reject failed");
        }
    };

    const handleBotSend = () => {
        if (!botMessage.trim()) return;
        const newHistory = [...chatHistory, { role: 'user', text: botMessage }];
        setChatHistory(newHistory);
        setTimeout(() => {
            setChatHistory([...newHistory, { 
                role: 'bot', 
                text: `I'm looking for experts in "${botMessage}"... Try searching in the 'Browse' tab!` 
            }]);
        }, 1000);
        setBotMessage('');
    };

    return (
        <div className="min-h-screen bg-[#f8f9fd] pb-24 relative font-sans">
            
            {/* --- NAVIGATION --- */}
            <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-[500] shadow-sm">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
                        <div className="bg-[#6366f1] p-1.5 rounded-lg text-white"><BookOpen size={20} /></div>
                        <h1 className="text-xl font-bold text-[#1e293b]">SkillExchange</h1>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        {['home', 'browse', 'requests', 'rooms', 'dashboard', 'pro'].map((tab) => (
                            <button 
                                key={tab}
                                onClick={() => setCurrentTab(tab)}
                                className={`text-[11px] font-black uppercase tracking-widest transition-all ${currentTab === tab ? 'text-[#6366f1] border-b-2 border-[#6366f1] pb-1' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {tab === 'pro' ? '✨ Go Pro' : tab}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    {/* EDIT PROFILE BUTTON */}
                    <button 
                        onClick={() => setIsEditOpen(true)}
                        className="flex items-center gap-2 text-[10px] font-black text-[#6366f1] uppercase bg-indigo-50 px-4 py-2 rounded-xl hover:bg-[#6366f1] hover:text-white transition-all shadow-sm shadow-indigo-100"
                    >
                         Edit Profile
                    </button>
                    <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>
                    <span className="text-xs font-bold text-gray-700 uppercase">{user.name}</span>
                    <button onClick={onLogout} className="text-[10px] font-black text-red-500 uppercase px-3 py-1.5 hover:bg-red-50 rounded-lg transition">Logout</button>
                </div>
            </nav>
            
            {/* --- CONTENT --- */}
            <div className="px-8 mt-8">
                {currentTab === 'home' && <HomeView />}
                
                {currentTab === 'dashboard' && (
                    <DashboardView user={user} matchesCount={matches.length} />
                )}
                
                {currentTab === 'browse' && (
                    <BrowseView 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                        searchResults={searchResults}
                        loading={loading}
                        sendMatchRequest={(id) => API.post(`/requests/send?senderId=${user.userId}&receiverId=${id}`)}
                    />
                )}

                {currentTab === 'requests' && (
                    <RequestView 
                        pendingRequests={pendingRequests} 
                        onAccept={handleAcceptRequest}
                        onReject={handleRejectRequest}
                    />
                )}

                {currentTab === 'rooms' && (
                    <RoomsView activeRooms={matches} currentUser={user} />
                )}
                
                {currentTab === 'pro' && (
                    <UpgradeView user={user} onUpgrade={() => alert("Redirecting...")} />
                )}
            </div>

            {/* --- MODALS --- */}
            {isEditOpen && (
                <ProfileEdit 
                    user={user} 
                    onClose={() => setIsEditOpen(false)} 
                    onUpdate={(updatedUser) => setUser(updatedUser)} 
                />
            )}

            {/* AI Bot Floater */}
            <div className="fixed bottom-8 right-8 z-[500]">
                <button onClick={() => setIsBotOpen(!isBotOpen)} className="w-16 h-16 bg-[#6366f1] text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                    {isBotOpen ? <X size={28} /> : <Bot size={28} />}
                </button>
                {isBotOpen && (
                    <div className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-white rounded-[32px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
                        <div className="bg-[#6366f1] p-6 text-white font-black text-lg flex items-center gap-3">
                            <Bot size={22} /> SkillBuddy AI
                        </div>
                        <div className="flex-1 p-5 overflow-y-auto bg-gray-50/50 space-y-4">
                            {chatHistory.map((chat, i) => (
                                <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-4 text-xs font-medium max-w-[80%] shadow-sm ${chat.role === 'user' ? 'bg-[#6366f1] text-white rounded-2xl rounded-tr-none' : 'bg-white text-gray-700 rounded-2xl rounded-tl-none border border-gray-100'}`}>
                                        {chat.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-white border-t border-gray-100 relative">
                            <input type="text" placeholder="Message..." className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-xl outline-none text-xs" value={botMessage} onChange={(e) => setBotMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleBotSend()} />
                            <button onClick={handleBotSend} className="absolute right-6 top-6 text-[#6366f1]"><Send size={18} /></button>
                        </div>
                    </div>
                )}
            </div>

            <div className="hidden"><Notification user={user} /></div>
        </div>
    );
};

export default Dashboard;