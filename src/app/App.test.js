import {render, screen} from '@testing-library/react'
import App from './App'

test('renders placeholder dock leasing hero heading', () => {
    render(<App/>)
    expect(screen.getByRole('heading', {
        level: 1,
        name: /dock space leasing headline placeholder/i
    })).toBeInTheDocument()
})
