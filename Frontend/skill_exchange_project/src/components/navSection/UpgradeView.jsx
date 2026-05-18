import React from 'react';
import { Sparkles, CheckCircle, Zap, ShieldCheck } from 'lucide-react';

const UpgradeView = ({ user, onUpgrade }) => {
    const plans = [
        {
            name: 'Basic',
            price: 'Free',
            features: ['5 Match Requests/Day', 'Standard Search', 'Community Access'],
            current: !user.premium,
            color: 'bg-slate-50'
        },
        {
            name: 'Pro Expert',
            price: '₹499/mo',
            features: ['Unlimited Requests', 'AI Smart Matching', 'Verified Badge', 'Priority Support'],
            current: user.premium,
            color: 'bg-indigo-50 border-2 border-indigo-200'
        }
    ];

    return (
        <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-12">
                <div className="inline-block p-3 bg-yellow-50 rounded-2xl mb-4">
                    <Sparkles size={32} className="text-yellow-500" />
                </div>
                <h2 className="text-4xl font-black text-gray-800">Choose Your <span className="text-[#6366f1]">Growth Plan</span></h2>
                <p className="text-gray-400 font-medium mt-2">Unlock AI-powered matchmaking and unlimited skill swaps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.map((plan, i) => (
                    <div key={i} className={`${plan.color} p-10 rounded-[40px] relative overflow-hidden flex flex-col`}>
                        {plan.name === 'Pro Expert' && (
                            <div className="absolute top-6 right-6 bg-[#6366f1] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Recommended</div>
                        )}
                        <h3 className="text-2xl font-black text-gray-800">{plan.name}</h3>
                        <p className="text-3xl font-black mt-4 text-[#1e293b]">{plan.price}</p>
                        
                        <div className="mt-8 space-y-4 flex-1">
                            {plan.features.map(f => (
                                <div key={f} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                    <CheckCircle size={16} className="text-emerald-500" /> {f}
                                </div>
                            ))}
                        </div>

                        <button 
                            disabled={plan.current}
                            onClick={onUpgrade}
                            className={`mt-10 w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${plan.current ? 'bg-gray-200 text-gray-400 cursor-default' : 'bg-[#6366f1] text-white hover:scale-105 shadow-xl shadow-indigo-100'}`}
                        >
                            {plan.current ? 'Current Plan' : 'Upgrade Now'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpgradeView;