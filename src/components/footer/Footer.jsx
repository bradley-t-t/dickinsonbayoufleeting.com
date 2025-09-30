import {useContext} from 'react'
import {ThemeContext} from '../../app/ThemeContext'
import './Footer.css'

function Footer() {
    const {theme, setTheme} = useContext(ThemeContext)
    return (
        <footer className="footer-bar">
            <div className="footer-content">
                <span>© 2025 Dickinson Bayou Fleeting</span>
                <button className="theme-toggle" aria-label="Toggle theme"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    {theme === 'dark' ? '🌞' : '🌜'}
                </button>
            </div>
        </footer>
    )
}

export default Footer

