'use client';
import { useState, useEffect } from 'react';

export default function Countdown({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        if (!targetDate) {
            setTimeLeft("NO LAUNCH TODAY");
            return;
        }
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(targetDate);
            if (isNaN(target.getTime())) {
                setTimeLeft("NO LAUNCH TODAY");
                clearInterval(interval);
                return;
            }
            const distance = target.getTime() - now;

            if (distance < 0) {
                setTimeLeft("LIFT OFF");
                clearInterval(interval);
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    // Update the helper function to handle any timezone
    function convertToLocalTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString([], { timeZoneName: 'short' });
    }

    // Display the target date in local time
    const targetLocalTime = targetDate ? convertToLocalTime(targetDate) : null;

    return (
        <div className="countdown-timer mt-4">
            {targetLocalTime && <div className="target-time">Target Time: {targetLocalTime}</div>}
            T-MINUS {timeLeft}
        </div>
    );
}