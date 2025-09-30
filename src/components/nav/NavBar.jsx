import React, {useEffect, useState} from 'react'
import './NavBar.css'

function NavBar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12)
        window.addEventListener('scroll', onScroll, {passive: true})
        return () => window.removeEventListener('scroll', onScroll)
    }, [])
    useEffect(() => {
        if (!open) return;
        const close = e => {
            if (!e.target.closest('.nav')) setOpen(false)
        };
        window.addEventListener('click', close);
        return () => window.removeEventListener('click', close)
    }, [open])
    const links = [
        {label: 'Overview', href: '#overview'},
        {label: 'Rates', href: '#rates'},
        {label: 'Slips', href: '#slips'},
        {label: 'Amenities', href: '#amenities'},
        {label: 'Contact', href: '#contact'}
    ]
    return (
        <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} aria-label="Primary">
            <div className="nav__inner">
                <a href="#overview" className="nav__brand">Dickinson Bayou Fleeting</a>
                <button className="nav__toggle" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(o => !o)}>
                    <span className="nav__toggleBar"/><span className="nav__toggleBar"/><span
                    className="nav__toggleBar"/>
                </button>
                <ul className={`nav__links${open ? ' nav__links--open' : ''}`} role="list">
                    {links.map(l => (
                        <li key={l.href} className="nav__item"><a className="nav__link" href={l.href}
                                                                  onClick={() => setOpen(false)}>{l.label}</a></li>
                    ))}
                    <li className="nav__item nav__cta"><a href="#rates" className="nav__action">Get Quote</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
