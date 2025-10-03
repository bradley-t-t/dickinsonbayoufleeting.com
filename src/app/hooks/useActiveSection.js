import {useEffect, useState} from 'react'

export function useActiveSection(ids, observerOptions) {
    const [active, setActive] = useState(ids[0] || '');
    useEffect(() => {
        const elements = ids.map(id => document.getElementById(id)).filter(Boolean);
        if (!('IntersectionObserver' in window) || elements.length === 0) return;
        const observer = new IntersectionObserver(entries => {
            const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            if (visible.length) {
                setActive(visible[0].target.id);
            } else {
                let current = active;
                let minDelta = Infinity;
                elements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const delta = Math.abs(rect.top - (window.innerHeight * 0.25));
                    if (delta < minDelta) {
                        minDelta = delta;
                        current = el.id;
                    }
                });
                setActive(current);
            }
        }, observerOptions || {root: null, threshold: [0.15, 0.3, 0.6], rootMargin: '-10% 0px -55% 0px'});
        elements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [ids, observerOptions, active]);
    return [active, setActive];
}

