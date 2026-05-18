import React from 'react';

const Home = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 bg-white shadow-sm">
                <h1 className="text-2xl font-bold text-blue-600">SkillExchange</h1>
                <div className="space-x-4">
                    <button onClick={onStart} className="text-gray-600 hover:text-blue-600 font-medium">Login</button>
                    <button onClick={onStart} className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
                        Join for Free
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="flex flex-col items-center text-center mt-20 px-4">
                <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
                    Learn, Teach & <span className="text-blue-600">Grow Together</span>
                </h2>
                <p className="text-gray-500 mt-6 text-xl max-w-2xl">
                    The ultimate peer-to-peer platform for students to exchange knowledge. 
                    Master Java, design graphics, or learn marketing — all by trading your own expertise.
                </p>
                <div className="mt-10 space-x-4">
                    <button onClick={onStart} className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition">
                        Get Started Today
                    </button>
                    <button className="border border-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50">
                        How it Works
                    </button>
                </div>
            </header>

            {/* Feature Highlights */}
            <section className="grid md:grid-cols-3 gap-8 px-10 mt-24 mb-20">
                <div className="p-8 bg-blue-50 rounded-2xl text-center">
                    <div className="text-3xl mb-4">🤝</div>
                    <h3 className="text-xl font-bold mb-2">P2P Matching</h3>
                    <p className="text-gray-600">Find peers who want exactly what you teach and offer what you need.</p>
                </div>
                <div className="p-8 bg-green-50 rounded-2xl text-center">
                    <div className="text-3xl mb-4">💎</div>
                    <h3 className="text-xl font-bold mb-2">Verified Skills</h3>
                    <p className="text-gray-600">Build your profile and get endorsements from the community.</p>
                </div>
                <div className="p-8 bg-purple-50 rounded-2xl text-center">
                    <div className="text-3xl mb-4">🚀</div>
                    <h3 className="text-xl font-bold mb-2">Zero Cost</h3>
                    <p className="text-gray-600">No money involved. Just pure knowledge exchange between students.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;