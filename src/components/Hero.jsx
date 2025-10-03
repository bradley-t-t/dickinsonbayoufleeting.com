import './styles/Hero.css'

function HeroSection() {
    const heroTitle = 'Premium Dock Space Leasing'
    const heroSubtitle = 'Long-term waterfront access with dedicated slip and on-site assistance.'
    const badges = [
        '5 Acre Waterfront',
        'Dedicated Slip',
        'On-Site Assistance'
    ]
    const openInquiry = e => {
        e.preventDefault();
        window.dispatchEvent(new Event('inquiry:open'))
    }
    return (
        <section className="hero hero--video" aria-label="Introduction" id="overview">
            <div className="hero__media" aria-hidden="true">
                <video className="hero__video" autoPlay muted loop playsInline preload="metadata"
                       poster="/bg-video-poster.jpg" disablePictureInPicture>
                    <source src="/videos/bg-video.mp4" type="video/mp4"/>
                </video>
                <div className="hero__overlay"/>
            </div>
            <div className="hero__inner">
                <div className="hero__panel hero__panel--minimal">
                    <h1 className="hero__title">{heroTitle}</h1>
                    <p className="hero__subtitle">{heroSubtitle}</p>
                    <ul className="hero__badges" aria-label="Key features">
                        {badges.map(b => <li key={b} className="hero__badge">{b}</li>)}
                    </ul>
                    <div className="hero__actions">
                        <a className="btn btn--primary" href="#location">View Location</a>
                        <a className="btn btn--ghost" href="#contact" onClick={openInquiry}>Lease Inquiry</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
