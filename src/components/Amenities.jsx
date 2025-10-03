import './styles/Amenities.css'

function Amenities() {
    const amenities = [
        {name: 'Lorem Ipsum', desc: 'Dolor sit amet consectetur adipiscing elit.'},
        {name: 'Sed Do', desc: 'Eiusmod tempor incididunt ut labore et dolore.'},
        {name: 'Magna Aliqua', desc: 'Ut enim ad minim veniam quis nostrud exercitation.'},
        {name: 'Ut Labore', desc: 'Nisi ut aliquip ex ea commodo consequat.'},
        {name: 'Duis Aute', desc: 'Irure dolor in reprehenderit in voluptate velit.'},
        {name: 'Excepteur Sint', desc: 'Occaecat cupidatat non proident sunt in culpa.'}
    ]
    return (
        <section className="amenities" aria-label="Amenities" id="amenities">
            <div className="amenities__inner">
                <div className="amenities__head">
                    <h2 className="amenities__title">Amenities & Services</h2>
                    <p className="amenities__subtitle">Placeholder overview text for listed amenities and services
                        offered.</p>
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
    )
}

export default Amenities
