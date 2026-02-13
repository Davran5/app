async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const getGPCStatus = (): boolean => {
    // @ts-ignore - navigator.globalPrivacyControl is a newer standard
    return navigator.globalPrivacyControl === true;
};

// Client-side approximation to avoid external IP lookup dependencies
export const isGDPRRegion = (): boolean => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!timeZone) return false;

    const gdprZones = [
        'Europe/', 'Atlantic/Reykjavik', 'Atlantic/Azores', 'Atlantic/Canary', 'Atlantic/Madeira'
    ];

    return gdprZones.some(zone => timeZone.startsWith(zone));
};

export const maskEmail = (email: string): string => {
    if (!email || !email.includes('@')) return email;
    const [user, domain] = email.split('@');
    if (user.length <= 1) return `*@${domain}`;
    return `${user[0]}***@${domain}`;
};

export const maskPhone = (phone: string): string => {
    if (!phone || phone.length < 4) return '***';
    const visible = phone.slice(-2);
    const hidden = phone.slice(0, -2).replace(/\d/g, '*');
    return `${hidden}${visible}`;
};

export const pseudonymizeData = async (data: any): Promise<any> => {
    const processed = { ...data };

    if (processed.email) {
        processed.email_masked = maskEmail(processed.email);
        processed.email_hash = await sha256(processed.email);
        delete processed.email;
    }

    if (processed.phone) {
        processed.phone_masked = maskPhone(processed.phone);
        delete processed.phone;
    }

    if (processed.name) {
        processed.name = "Pseudonymized User";
    }

    return processed;
};
