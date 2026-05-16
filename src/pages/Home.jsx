import { useNavigate } from 'react-router-dom'
import InputForm from '../components/InputForm'

export default function Home() {
  const navigate = useNavigate()

  const handleSubmit = ({ type, km }) => {
    localStorage.setItem('motorCareData', JSON.stringify({ type, km }))
    navigate('/detail')
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-8 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
          <span className="text-xs font-medium text-amber-600 dark:text-amber-300">Panduan Servis Gratis</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-tight">
          Kapan Terakhir
          <br />
          <span className="gradient-text">Servis Motor?</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          Masukkan data motor kamu, dan kami kasih tau apa aja yang perlu diservis.
          Simpel, tanpa ribet.
        </p>
      </div>

      {/* Form Card */}
      <div className="glass rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/40 animate-fade-in-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
        <InputForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
