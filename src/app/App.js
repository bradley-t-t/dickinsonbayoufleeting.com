import {useEffect, useState} from 'react'
import HomeView from '../views/HomeView'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import InquiryModal from '../components/InquiryModal'
import './styles/App.css'
import './styles/Buttons.css'

function App() {
    const [inquiryOpen, setInquiryOpen] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: light)')
        const apply = () => document.documentElement.setAttribute('data-theme', mq.matches ? 'light' : 'dark')
        apply()
        const handler = () => setInquiryOpen(true)
        window.addEventListener('inquiry:open', handler)

        if (mq.addEventListener) {
            mq.addEventListener('change', apply)
            return () => {
                mq.removeEventListener('change', apply)
                window.removeEventListener('inquiry:open', handler)
            }
        } else {
            mq.addListener(apply)
            return () => {
                mq.removeListener(apply)
                window.removeEventListener('inquiry:open', handler)
            }
        }
    }, [])

    return (
        <div className="App">
            <NavBar/>
            <HomeView/>
            <Footer/>
            <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} onSubmit={() => {
            }}/>
        </div>
    )
}

export default App
