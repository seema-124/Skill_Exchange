import React, { useState } from 'react';
import { Video, Send, User } from 'lucide-react';

const RoomsView = ({ activeRooms, currentUser }) => {
    const [selectedRoom, setSelectedRoom] = useState(activeRooms[0] || null);
    const [messages, setMessages] = useState([]); // Local storage for current session messages
    const [inputText, setInputText] = useState(""); // Track what you are typing

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        // Create the new message object
        const newMessage = {
            id: Date.now(),
            senderId: currentUser.userId,
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Add to the list and clear the input
        setMessages([...messages, newMessage]);
        setInputText("");
    };

    return (
        <div className="flex h-[600px] bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden animate-in fade-in">
            {/* Sidebar: Collaborators List */}
            <div className="w-1/3 border-r border-gray-100 p-6 space-y-4">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Collaborators</h3>
                {activeRooms.map(room => {
                    const partner = room.sender?.userId === currentUser?.userId ? room.receiver : room.sender;
                    return (
                        <div 
                            key={room.requestId}
                            onClick={() => setSelectedRoom(room)}
                            className={`p-4 rounded-2xl cursor-pointer transition-all border-l-4 ${selectedRoom?.requestId === room.requestId ? 'bg-indigo-50 border-[#6366f1]' : 'hover:bg-gray-50 border-transparent'}`}
                        >
                            <h4 className="font-bold text-gray-800">{partner?.name || 'Partner'}</h4>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">
                                {partner?.skillsToTeach || 'Skill Swap'}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedRoom ? (
                    <>
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#6366f1] rounded-xl flex items-center justify-center text-white font-bold">
                                    {(selectedRoom.sender?.userId === currentUser?.userId ? selectedRoom.receiver?.name : selectedRoom.sender?.name)?.charAt(0) || 'P'}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">
                                        {(selectedRoom.sender?.userId === currentUser?.userId ? selectedRoom.receiver?.name : selectedRoom.sender?.name)}
                                    </h4>
                                    <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold uppercase">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Online
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={() => {
                                    const meetUrl = "https://meet.google.com/new";
                                    window.open(meetUrl, '_blank');
                                    alert("Copy the Google Meet link from the new tab and paste it here to share!");
                                }} 
                                className="bg-emerald-500 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold text-xs hover:bg-emerald-600 transition shadow-lg shadow-emerald-100">
                                <Video size={16} /> Start Video Call
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-8 space-y-4 overflow-y-auto bg-gray-50/20">
                            <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Session Started: Connect for {selectedRoom.sender?.userId === currentUser?.userId ? selectedRoom.receiver?.skillsToTeach : selectedRoom.sender?.skillsToTeach}
                            </div>

                            {/* Render sent messages */}
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.senderId === currentUser.userId ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-4 max-w-[80%] rounded-2xl shadow-sm text-sm ${msg.senderId === currentUser.userId ? 'bg-[#6366f1] text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'}`}>
                                        {msg.text}
                                        <p className="text-[9px] mt-1 opacity-50 text-right">{msg.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white border-t border-gray-100 flex gap-4">
                            <input 
                                type="text" 
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Paste meeting link or type a message..." 
                                className="flex-1 bg-gray-50 p-4 rounded-2xl outline-none text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all" 
                            />
                            <button 
                                onClick={handleSendMessage}
                                className="bg-[#6366f1] p-4 rounded-2xl text-white shadow-lg shadow-indigo-100 hover:scale-105 transition"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <User size={48} className="opacity-20 mb-4" />
                        <p className="font-black text-xs uppercase tracking-widest">Select a room to start learning</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomsView;