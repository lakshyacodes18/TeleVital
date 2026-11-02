import { Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

// Top-level routing configuration for TeleVital
function App() {
  return (
    <Routes>
      {/* Root route and in-page clean URL routes without hash */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/how" element={<WelcomePage />} />
      <Route path="/people" element={<WelcomePage />} />
      <Route path="/faq" element={<WelcomePage />} />
      {/* Catch-all route renders the friendly 404 page for unhandled paths */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
