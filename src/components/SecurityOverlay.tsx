
import { useEffect, useState } from 'react';
import { ShieldAlert, Activity } from 'lucide-react';

export default function SecurityOverlay() {
    const [isLocked, setIsLocked] = useState(false);
    const [reason, setReason] = useState('');

    useEffect(() => {
        const handleLockdown = (e: any) => {
            setIsLocked(true);
            setReason(e.detail?.reason || 'Security Violation');
        };

        window.addEventListener('security-lockdown', handleLockdown);
        return () => window.removeEventListener('security-lockdown', handleLockdown);
    }, []);

    if (!isLocked) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-[#0B0C0E] text-white flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="max-w-xl w-full bg-[#1a1c23] border border-red-500/30 rounded-lg p-8 shadow-2xl relative overflow-hidden">

                {/* Background Pulse Animation */}
                <div className="absolute inset-0 bg-red-500/5 animate-pulse" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/50">
                        <ShieldAlert className="w-10 h-10 text-red-500" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-3xl font-display font-medium text-red-400">Security Alert Triggered</h2>
                        <p className="text-gray-400 text-lg">AI-SPM has blocked access due to anomalous behavior.</p>
                    </div>

                    <div className="w-full bg-black/30 rounded p-4 border border-white/5 text-left space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Threat Level</span>
                            <span className="text-red-500 font-bold uppercase tracking-wider">Critical</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Detection Logic</span>
                            <span className="text-white">Heuristic Velocity Check</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Reason</span>
                            <span className="text-white font-mono">{reason}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition-colors flex items-center gap-2"
                    >
                        <Activity size={18} />
                        Acknowledge & Reload
                    </button>

                    <p className="text-xs text-gray-600 mt-4">
                        Incident ID: {Date.now().toString(36).toUpperCase()} • IP Logged • Forensics Initiated
                    </p>
                </div>
            </div>
        </div>
    );
}
