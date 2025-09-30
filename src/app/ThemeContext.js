import {createContext, useEffect, useState} from 'react'

const ThemeContext = createContext()

function ThemeProvider({children}) {
    const [theme, setTheme] = useState('dark')
    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme])
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeProvider}

