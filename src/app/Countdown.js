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

            setTimeLeft(`${distance}ms`);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="countdown-timer mt-4">
            T-MINUS {timeLeft}
        </div>
    );
}