import React, {useEffect, useState} from 'react'
import './styles/NavBar.css'
import {NAV_LINKS} from '../app/constants/navLinks'
import {SECTION_IDS} from '../app/constants/sectionIds'
import {useScrolled} from '../app/hooks/useScrolled'
import {useActiveSection} from '../app/hooks/useActiveSection'

function NavBar() {
    const [open, setOpen] = useState(false)
    const scrolled = useScrolled(12)
    const [active, setActive] = useActiveSection(SECTION_IDS)
    useEffect(() => {
        if (!open) return
        const close = e => {
            if (!e.target.closest('.nav')) setOpen(false)
        }
        window.addEventListener('click', close)
        return () => window.removeEventListener('click', close)
    }, [open])
    const primaryIds = ['rates', 'amenities', 'location']
    const links = NAV_LINKS.filter(l => primaryIds.includes(l.id))
    const openInquiry = e => {
        e.preventDefault();
        window.dispatchEvent(new Event('inquiry:open'))
    }
    return (
        <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} aria-label="Primary">
            <div className="nav__inner">
                <a href="#overview" className="nav__brand" aria-label="Dickinson Bayou Fleeting">
                    <img src="/images/DBF-Logo-White.png" alt="Dickinson Bayou Fleeting"
                         className="nav__logo nav__logo--dark"/>
                    <img src="/images/DBF-Logo-Black.png" alt="Dickinson Bayou Fleeting"
                         className="nav__logo nav__logo--light"/>
                </a>
                <button className="nav__toggle" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(o => !o)}>
                    <span className="nav__toggleBar"/><span className="nav__toggleBar"/><span
                    className="nav__toggleBar"/>
                </button>
                <ul className={`nav__links${open ? ' nav__links--open' : ''}`}>
                    {links.map(l => (
                        <li key={l.href} className="nav__item"><a
                            className={`nav__link${active === l.id ? ' nav__link--active' : ''}`} href={l.href}
                            onClick={() => {
                                setOpen(false);
                                setActive(l.id)
                            }}>{l.label}</a></li>
                    ))}
                    <li className="nav__item nav__cta"><a href="#rates" className="nav__action" onClick={openInquiry}>Get
                        Quote</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
