import {useState} from 'react'
import './styles/LeasePackage.css'
import {LEASE_OPTIONS} from '../app/constants/leaseOptions'

function LeasePackage() {
    const [locationId, setLocationId] = useState(LEASE_OPTIONS[0].id)
    const loc = LEASE_OPTIONS.find(l => l.id === locationId)
    const openInquiry = e => {
        e.preventDefault();
        window.dispatchEvent(new Event('inquiry:open'))
    }
    return (
        <section className="rate" aria-label="Pricing" id="rates">
            <div className="rate__inner">
                <div className="rate__head">
                    <h2 className="rate__title">Lease Options</h2>
                    <p className="rate__subtitle">Fixed-rate waterfront acreage packages. Select a facility to view its
                        monthly lease details.</p>
                </div>
                <div className="estimator" aria-label="Lease options selector">
                    <div className="leaseSwitch" role="tablist" aria-label="Select facility">
                        {LEASE_OPTIONS.map(l => (
                            <button key={l.id} role="tab" aria-selected={l.id === locationId}
                                    className={`leaseSwitch__btn${l.id === locationId ? ' leaseSwitch__btn--active' : ''}`}
                                    onClick={() => setLocationId(l.id)}>{l.name}</button>
                        ))}
                    </div>
                    <div className="leaseSubtitle" aria-live="polite">{loc.subtitle}</div>
                    <div className="estimator__result" aria-live="polite">
                        <div className="estimator__figure">${loc.price.toLocaleString()}/mo</div>
                        <div className="estimator__note">{loc.acreage} • {loc.features.join(' • ')}</div>
                        <ul className="leaseFeatureList">
                            {loc.features.map(f => <li key={f} className="leaseFeatureList__item">{f}</li>)}
                        </ul>
                        <a className="btn btn--primary" href="#contact" onClick={openInquiry}>Start Lease Inquiry</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LeasePackage
