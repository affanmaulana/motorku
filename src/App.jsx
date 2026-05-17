import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import MotorDetail from './pages/MotorDetail'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-canvas text-body">
      {/* Header - 64px tall editorial nav */}
      <header className="glass sticky top-0 z-50 h-[64px] flex items-center">
        <div className="w-full max-w-lg mx-auto px-lg flex items-center justify-between">
          <div className="flex items-center gap-sm">
            {/* Logo Icon - Editorial brand voltage style */}
            <div className="w-9 h-9 rounded-md bg-signature-coral flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-label-md font-semibold text-ink leading-none">
                Motorku
              </h1>
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted mt-0.5">PANDUAN SERVIS MOTOR</p>
            </div>
          </div>

          {/* Theme Toggle Button - Circular Icon Style */}
          <button 
            onClick={toggleTheme}
            className="btn-icon-circular w-9 h-9 cursor-pointer hover:scale-105 active:scale-95 transition-all"
            aria-label={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<MotorDetail />} />
        </Routes>
      </main>

      {/* Footer - Minimal Editorial style */}
      <footer className="border-t border-hairline py-xl mt-auto bg-surface-soft">
        <div className="max-w-lg mx-auto px-lg text-center">
          <p className="text-caption font-medium text-muted">
            © 2026 Motorku — Data bersifat panduan umum.
          </p>
          <p className="text-[11px] text-muted/80 mt-xs">
            Dibuat untuk membantu perawatan motor kamu agar tetap prima.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
