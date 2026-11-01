import { Routes, Route } from 'react-router-dom'

// TeleVital top-level application component
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          // Semantic <main> tag for accessibility and central layout
          <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            {/* Serif font and custom primary blue defined in @theme in src/index.css */}
            <h1 className="font-serif text-4xl font-bold text-primary mb-2">
              TeleVital
            </h1>
            <p className="text-muted text-lg">
              Setup complete. Ready for page 1.
            </p>
          </main>
        }
      />
    </Routes>
  )
}

export default App
