
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendToAirtable } from '@/lib/airtable';
import { toast } from "sonner";


const generateUUID = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "Tablet";
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "Mobile";
    }
    return "Desktop";
};

export const TrafficTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const trackPageView = async () => {
            // Avoid tracking in strictly local development if desired, but user wants it. 
            // We will check for credentials inside initAirtable anyway.

            try {
                // Visitor ID Logic
                let visitorId = localStorage.getItem('visitor_id');
                let isRepeatVisitor = true;

                if (!visitorId) {
                    visitorId = generateUUID();
                    localStorage.setItem('visitor_id', visitorId);
                    isRepeatVisitor = false;
                }

                // Session ID Logic
                let sessionId = sessionStorage.getItem('session_id');
                if (!sessionId) {
                    sessionId = generateUUID();
                    sessionStorage.setItem('session_id', sessionId);
                }

                // IP Address
                let ipAddress = 'Unknown';
                try {
                    const ipRes = await fetch('https://api.ipify.org?format=json');
                    const ipData = await ipRes.json();
                    ipAddress = ipData.ip;
                } catch (e) {
                    console.error('Failed to get IP', e);
                }

                const tableName = 'traffic volume';
                const fields = {
                    "Visitor ID": visitorId,
                    "Page URL": window.location.href,
                    "Page Path": location.pathname,
                    "Page Title": document.title,
                    "Referrer": document.referrer || "Direct",
                    "IP Address": ipAddress,
                    "Timestamp": new Date().toISOString(),
                    "Session ID": sessionId,
                    "Is Repeat Visitor": isRepeatVisitor,
                    "User Agent": navigator.userAgent,
                    "Screen": `${window.screen.width}x${window.screen.height}`,
                    "Device Type": getDeviceType(),
                };

                const { success, error } = await sendToAirtable(tableName, fields);

                if (success) {
                    console.log(`Traffic tracked successfully in "${tableName}" for ${location.pathname}`);
                } else {
                    throw new Error(error);
                }

            } catch (error: any) {
                console.error("Traffic Tracking Error Details:", error);
                if (import.meta.env.DEV) {
                    toast.error(`Traffic Tracking Error ("traffic volume"): ${error?.message || "Unknown error"}`);
                }
            }
        };

        trackPageView();

    }, [location]); // Runs on every route change

    return null;
};
