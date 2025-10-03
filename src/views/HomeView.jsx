import HeroSection from '../components/Hero'
import LeasePackage from '../components/LeasePackage'
import Amenities from '../components/Amenities'
import Location from '../components/Location'

function HomeView() {
    return (
        <main>
            <HeroSection/>
            <LeasePackage/>
            <Amenities/>
            <Location/>
        </main>
    )
}

export default HomeView
