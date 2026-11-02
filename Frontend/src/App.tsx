import { Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

// Top-level routing configuration for TeleVital
function App() {
  return (
    <Routes>
      {/* Root route displays the main Welcome page */}
      <Route path="/" element={<WelcomePage />} />
      {/* Catch-all route renders the friendly 404 page for unhandled paths */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
