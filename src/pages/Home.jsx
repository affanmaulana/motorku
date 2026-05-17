import { useNavigate } from 'react-router-dom'
import InputForm from '../components/InputForm'

export default function Home() {
  const navigate = useNavigate()

  const handleSubmit = ({ type, km }) => {
    localStorage.setItem('motorkuData', JSON.stringify({ type, km }))
    navigate('/detail')
  }

  return (
    <div className="max-w-lg mx-auto px-lg py-xl">
      {/* Hero Section - Clean Whitespace Pacing */}
      <div className="text-center mb-xl animate-fade-in-up">
        <div className="inline-flex items-center gap-xs px-sm py-1 rounded-sm bg-surface-soft border border-hairline mb-md">
          <div className="w-1.5 h-1.5 rounded-full bg-signature-coral animate-pulse"></div>
          <span className="text-caption font-semibold uppercase tracking-wider text-muted">Panduan Servis Gratis</span>
        </div>
        <h2 className="text-display-md text-ink mb-sm leading-tight font-display font-medium">
          Kapan Terakhir
          <br />
          <span className="gradient-text font-semibold">Servis Motor?</span>
        </h2>
        <p className="text-body-md text-muted max-w-sm mx-auto leading-relaxed">
          Masukkan data motor kamu, dan kami kasih tau apa saja yang perlu diservis.
          Simpel, presisi, tanpa ribet.
        </p>
      </div>

      {/* Form Card - Editorial Content Card Style */}
      <div className="bg-canvas border border-hairline rounded-md p-lg sm:p-xl shadow-sm animate-fade-in-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
        <InputForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
