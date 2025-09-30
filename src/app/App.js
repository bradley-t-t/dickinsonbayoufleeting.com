import HomeView from '../components/home/HomeView'
import NavBar from '../components/nav/NavBar'
import Footer from '../components/footer/Footer'
import {ThemeProvider} from './ThemeContext'

function App() {
    return (
        <ThemeProvider>
            <NavBar/>
            <HomeView/>
            <Footer/>
        </ThemeProvider>
    )
}

export default App
