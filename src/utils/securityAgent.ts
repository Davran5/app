type ThreatLevel = 'SAFE' | 'SUSPICIOUS' | 'CRITICAL';

interface SecurityEvent {
    timestamp: number;
    type: string;
}

class SecurityAgent {
    private eventLog: SecurityEvent[] = [];
    private threatLevel: ThreatLevel = 'SAFE';
    private locked: boolean = false;

    private readonly WINDOW_MS = 5000;
    private readonly RATE_LIMIT = 5;
    private readonly CRITICAL_THRESHOLD = 10;

    public logEvent(type: string): void {
        const now = Date.now();
        this.eventLog.push({ timestamp: now, type });
        this.analyzePosture();
    }

    public checkActivity(type: string): boolean {
        if (this.locked) return false;

        this.logEvent(type);

        if (this.threatLevel === 'CRITICAL') {
            this.lockdown();
            return false;
        }

        return true;
    }

    private analyzePosture(): void {
        const now = Date.now();
        this.eventLog = this.eventLog.filter(e => now - e.timestamp < this.WINDOW_MS);

        const recentCount = this.eventLog.length;

        if (recentCount > this.CRITICAL_THRESHOLD) {
            this.threatLevel = 'CRITICAL';
        } else if (recentCount > this.RATE_LIMIT) {
            this.threatLevel = 'SUSPICIOUS';
        } else {
            this.threatLevel = 'SAFE';
        }
    }

    private lockdown(): void {
        this.locked = true;
        window.dispatchEvent(new CustomEvent('security-lockdown', {
            detail: { reason: 'Unbounded Consumption Detected' }
        }));
    }

    public getThreatLevel(): ThreatLevel {
        return this.threatLevel;
    }

    public reset(): void {
        this.eventLog = [];
        this.threatLevel = 'SAFE';
        this.locked = false;
    }
}

export const securityAgent = new SecurityAgent();
