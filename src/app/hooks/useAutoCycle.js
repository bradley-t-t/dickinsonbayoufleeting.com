import {useEffect, useState} from 'react'

export function useAutoCycle(ids, delayMs = 6000, disabled = false) {
    const [current, setCurrent] = useState(ids[0]);
    useEffect(() => {
        if (disabled || ids.length < 2) return;
        const handle = setInterval(() => {
            setCurrent(c => {
                const idx = ids.indexOf(c);
                return ids[(idx + 1) % ids.length];
            });
        }, delayMs);
        return () => clearInterval(handle);
    }, [ids, delayMs, disabled]);
    return [current, setCurrent];
}

