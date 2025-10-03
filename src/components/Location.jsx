import {useState} from 'react'
import './styles/Location.css'
import {FACILITIES} from '../app/constants/facilities'
import {useAutoCycle} from '../app/hooks/useAutoCycle'

function Location() {
    const ids = FACILITIES.map(f => f.id)
    const [locked, setLocked] = useState(false)
    const [active, setActive] = useAutoCycle(ids, 6000, locked)
    const loc = FACILITIES.find(f => f.id === active) || FACILITIES[0]
    const mapsHref = loc.coords ? `https://maps.google.com/?q=${loc.coords.lat},${loc.coords.lng}` : `https://maps.google.com/?q=${encodeURIComponent(loc.address)}`
    const iframeSrc = loc.coords ? `https://www.google.com/maps?ll=${loc.coords.lat},${loc.coords.lng}&q=${loc.coords.lat},${loc.coords.lng}&z=15&output=embed` : `https://www.google.com/maps?q=${encodeURIComponent(loc.address)}&output=embed`
    const openInquiry = e => {
        e.preventDefault();
        window.dispatchEvent(new Event('inquiry:open'))
    }
    return (
        <section className="location" aria-label="Location" id="location">
            <div className="location__inner">
                <div className="location__head">
                    <h2 className="location__title">Location & Access</h2>
                    <p className="location__subtitle">Physical site details and direct contact for lease
                        coordination.</p>
                </div>
                <div className="location__body">
                    <div className="location__col">
                        <ul className="location__list" aria-label="Available locations">
                            {FACILITIES.map(f => {
                                const activeCard = f.id === active
                                return (
                                    <li key={f.id} className={`locCard${activeCard ? ' locCard--active' : ''}`}>
                                        <button className="locCard__main" aria-expanded={activeCard} onClick={() => {
                                            setActive(f.id);
                                            setLocked(true)
                                        }}>
                                            <span className="locCard__name">{f.name}</span>
                                            <span className="locCard__address">{f.address}</span>
                                        </button>
                                        {activeCard && (
                                            <div className="locCard__detail">
                                                <div className="locCard__actions">
                                                    <a className="btn btn--inline" href={mapsHref} target="_blank"
                                                       rel="noreferrer">Maps</a>
                                                    <a className="btn btn--inline"
                                                       href={`tel:1${f.phone.replace(/[^0-9]/g, '')}`}>Call</a>
                                                    <a className="btn btn--primary" href="#contact"
                                                       onClick={openInquiry}>Lease Inquiry</a>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="location__mapWrap">
                        <iframe title={loc.name} className="location__map" loading="lazy" allowFullScreen
                                src={iframeSrc}></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Location
