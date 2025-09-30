import React, {useMemo, useState} from 'react'
import './HomeView.css'

function HomeView() {
    const heroTitle = 'Premium Dock Space Leasing'
    const heroSubtitle = 'Secure protected bayou frontage with reliable shore power, fresh water, monitored access, and responsive on-site assistance.'
    const stats = [
        {label: 'Occupancy', value: '82%'},
        {label: 'Avg Response', value: '12m'},
        {label: 'Available Slips', value: '18'},
        {label: 'On-Time Dockings', value: '99%'}
    ]
    const amenities = [
        {name: 'Shore Power 30A / 50A', desc: 'Multiple service tiers including twin feeds on select slips.'},
        {name: 'Fresh Water', desc: 'Filtered supply points along primary piers.'},
        {name: 'Security Lighting', desc: 'Low-glare LED pathway and pedestal lighting.'},
        {name: 'Waste & Recycling', desc: 'Designated containment and scheduled removal.'},
        {name: 'Vehicle Parking', desc: 'Tenant parking adjacent to gated entry.'},
        {name: 'Line Assistance', desc: 'Help during arrival and departure windows.'},
        {name: 'Tide Resilient Docks', desc: 'Engineered flotation maintaining consistent freeboard.'},
        {name: 'Periodic Patrol', desc: 'Visual walk-throughs and anomaly reporting.'}
    ]
    const powerSurcharge = {None: 0, '30A': 40, '2x30A': 70, '50A': 65, '2x50A': 120}

    function perFootRate(len) {
        if (len >= 70) return 26;
        if (len >= 60) return 23;
        if (len >= 50) return 21;
        if (len >= 40) return 19;
        return 18
    }

    function termDiscount(term) {
        if (term >= 12) return 0.10;
        if (term >= 6) return 0.06;
        if (term >= 3) return 0.03;
        return 0
    }

    function computeMonthly(length, power, term, liveaboard) {
        const len = Math.max(15, Math.min(120, Number(length) || 0))
        const base = len * perFootRate(len)
        const p = powerSurcharge[power] || 0
        let subtotal = base + p
        if (liveaboard) subtotal *= 1.12
        const disc = termDiscount(term)
        subtotal *= 1 - disc
        const env = 15
        const monthly = Math.round(subtotal + env)
        const effective = monthly / len
        return {monthly, base, powerFee: p, discount: disc, liveaboardApplied: liveaboard, effective, env}
    }

    const sampleSlips = [
        {id: 'A1', lengthFt: 40, widthFt: 14, power: '30A', liveaboard: false},
        {id: 'A2', lengthFt: 45, widthFt: 15, power: '50A', liveaboard: false},
        {id: 'B3', lengthFt: 55, widthFt: 17, power: '50A', liveaboard: false},
        {id: 'B4', lengthFt: 60, widthFt: 18, power: '2x50A', liveaboard: false},
        {id: 'C5', lengthFt: 32, widthFt: 12, power: '30A', liveaboard: false},
        {id: 'C6', lengthFt: 38, widthFt: 13, power: '30A', liveaboard: false},
        {id: 'D7', lengthFt: 72, widthFt: 20, power: '2x50A', liveaboard: true},
        {id: 'E8', lengthFt: 50, widthFt: 16, power: '50A', liveaboard: false}
    ].map(s => {
        const calc = computeMonthly(s.lengthFt, s.power, 12, s.liveaboard);
        return {...s, monthly: calc.monthly}
    })
    const [estLength, setEstLength] = useState('48')
    const [estPower, setEstPower] = useState('50A')
    const [estTerm, setEstTerm] = useState('12')
    const [estLiveaboard, setEstLiveaboard] = useState(false)
    const estimate = useMemo(() => computeMonthly(estLength, estPower, Number(estTerm), estLiveaboard), [estLength, estPower, estTerm, estLiveaboard])
    return (
        <main className="home">
            <section className="hero hero--video" aria-label="Introduction" id="overview">
                <div className="hero__media" aria-hidden="true">
                    <video className="hero__video" autoPlay muted loop playsInline preload="metadata"
                           poster="/bg-video-poster.jpg" disablePictureInPicture>
                        <source src="/bg-video.mp4" type="video/mp4"/>
                    </video>
                    <div className="hero__overlay"/>
                </div>
                <div className="hero__inner">
                    <div className="hero__panel">
                        <h1 className="hero__title">{heroTitle}</h1>
                        <p className="hero__subtitle">{heroSubtitle}</p>
                        <div className="hero__actions">
                            <button className="btn btn--primary">View Slips</button>
                            <button className="btn btn--ghost">Request Info</button>
                        </div>
                        <div className="hero__stats" aria-label="Key metrics">
                            {stats.map(s => (
                                <div key={s.label} className="stat">
                                    <span className="stat__value">{s.value}</span>
                                    <span className="stat__label">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="rate" aria-label="Rate estimator" id="rates">
                <div className="rate__inner">
                    <div className="rate__head">
                        <h2 className="rate__title">Dockage Estimator</h2>
                        <p className="rate__subtitle">Indicative monthly pricing. Final quote subject to inspection,
                            contract terms, and availability.</p>
                    </div>
                    <form className="estimator" onSubmit={e => e.preventDefault()} aria-label="Dockage estimator form">
                        <div className="estimator__grid">
                            <label className="estimator__field">
                                <span className="estimator__label">Length (ft)</span>
                                <input className="estimator__input" type="number" min="15" max="120" value={estLength}
                                       onChange={e => setEstLength(e.target.value)}/>
                            </label>
                            <label className="estimator__field">
                                <span className="estimator__label">Power</span>
                                <select className="estimator__input" value={estPower}
                                        onChange={e => setEstPower(e.target.value)}>
                                    <option value="None">None</option>
                                    <option value="30A">30A</option>
                                    <option value="2x30A">2 x 30A</option>
                                    <option value="50A">50A</option>
                                    <option value="2x50A">2 x 50A</option>
                                </select>
                            </label>
                            <label className="estimator__field">
                                <span className="estimator__label">Term (months)</span>
                                <select className="estimator__input" value={estTerm}
                                        onChange={e => setEstTerm(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="3">3</option>
                                    <option value="6">6</option>
                                    <option value="12">12</option>
                                </select>
                            </label>
                            <label className="estimator__field" style={{alignSelf: 'flex-end'}}>
                                <span className="estimator__label">Liveaboard</span>
                                <input type="checkbox" checked={estLiveaboard}
                                       onChange={e => setEstLiveaboard(e.target.checked)}/>
                            </label>
                        </div>
                        <div className="estimator__result" aria-live="polite">
                            {estimate && (
                                <>
                                    <div className="estimator__figure"
                                         data-testid="est-monthly">${estimate.monthly}/mo
                                    </div>
                                    <div
                                        className="estimator__note">Base {perFootRate(Math.max(15, Math.min(120, Number(estLength) || 0))).toFixed(0)}/ft
                                        •
                                        Power {estimate.powerFee > 0 ? '$' + estimate.powerFee : 'None'} • {estimate.liveaboardApplied ? 'Liveaboard +12% • ' : ''}{estimate.discount > 0 ? `${(estimate.discount * 100).toFixed(0)}% term disc • ` : ''}Env
                                        $15 • Eff {(estimate.effective).toFixed(2)}/ft
                                    </div>
                                    <button className="btn btn--primary" type="button">Initiate Lease Inquiry</button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </section>
            <section className="slips" aria-label="Available slips" id="slips">
                <div className="slips__head">
                    <h2 className="slips__title">Representative Slips</h2>
                    <p className="slips__subtitle">Sample inventory and indicative 12 month effective rates. Rates
                        assume standard term discount and exclude taxes where applicable.</p>
                </div>
                <div className="slips__grid">
                    {sampleSlips.map(s => (
                        <div key={s.id} className="slip">
                            <h3 className="slip__name">Slip {s.id}</h3>
                            <div className="slip__meta">
                                <div>Length <span className="slip__metaValue">{s.lengthFt}ft</span></div>
                                <div>Width <span className="slip__metaValue">{s.widthFt}ft</span></div>
                                <div>Power <span className="slip__metaValue">{s.power}</span></div>
                                <div>Liveaboard <span className="slip__metaValue">{s.liveaboard ? 'Yes' : 'No'}</span>
                                </div>
                            </div>
                            <div className="slip__rate">${s.monthly}/mo</div>
                            <div className="slip__actions">
                                <button className="btn btn--inline" type="button">Hold</button>
                                <button className="btn btn--inline" type="button">Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="amenities" aria-label="Amenities" id="amenities">
                <div className="amenities__inner">
                    <div className="amenities__head">
                        <h2 className="amenities__title">Amenities & Services</h2>
                        <p className="amenities__subtitle">Operational infrastructure designed for dependable year round
                            mooring.</p>
                    </div>
                    <div className="amenities__grid">
                        {amenities.map(a => (
                            <div key={a.name} className="amenity">
                                <h3 className="amenity__name">{a.name}</h3>
                                <p className="amenity__desc">{a.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="cta" aria-label="Call to action" id="contact">
                <div className="cta__inner">
                    <h2 className="cta__title">Secure Your Slip</h2>
                    <p className="cta__text">Begin a leasing conversation and lock in availability for your vessel.</p>
                    <div className="cta__actions">
                        <button className="btn btn--primary">Start Inquiry</button>
                        <button className="btn btn--ghost">Send Details</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default HomeView
