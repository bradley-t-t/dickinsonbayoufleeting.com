import {FACILITIES} from './facilities'
import {useEffect, useState} from 'react'

export const LEASE_OPTIONS = FACILITIES.map(f => ({
    id: f.id,
    name: f.shortName,
    subtitle: 'Dedicated slip access with on-site assistance.',
    acreage: f.acreage,
    price: f.price,
    features: f.features
}))

export function useScrolled(threshold = 12) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold);
        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);
    return scrolled;
}

