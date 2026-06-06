import { useState, useRef, useEffect } from 'react'
import motorModels from '../data/motorModels.json'

export default function InputForm({ onSubmit }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedModel, setSelectedModel] = useState(null)
  const [km, setKm] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)

  const dropdownRef = useRef(null)

  const filteredModels = motorModels.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.brand.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatNumber = (value) => {
    const num = value.replace(/\D/g, '')
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  const handleKmChange = (e) => {
    const raw = e.target.value.replace(/\./g, '')
    if (raw === '' || /^\d+$/.test(raw)) {
      setKm(formatNumber(raw))
      setError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const numericKm = parseInt(km.replace(/\./g, ''), 10)

    if (!selectedModel) {
      setError('Pilih motor kamu dulu ya!')
      triggerShake()
      return
    }

    if (!km || isNaN(numericKm) || numericKm <= 0) {
      setError('Masukkan angka kilometer yang valid.')
      triggerShake()
      return
    }

    if (numericKm > 200000) {
      setError('Wah, angkanya terlalu besar. Cek lagi speedometer kamu.')
      triggerShake()
      return
    }

    onSubmit({ type: selectedModel.id, km: numericKm })
  }

  const triggerShake = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-md">
      {/* Searchable Dropdown */}
      <div className="space-y-xs relative" ref={dropdownRef}>
        <label className="block text-caption font-semibold text-ink">
          Pilih Motor Kamu
        </label>

        <div className="relative">
          {/* Left Icon */}
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          </div>

          {/* Styled Select Box */}
          <div
            onClick={() => {
              setIsDropdownOpen(true)
              setSearchTerm('')
            }}
            className={`text-input pl-10 font-sans cursor-pointer flex items-center select-none min-h-[46px]
              ${selectedModel ? 'border-primary font-medium bg-surface-soft text-ink pr-16' : 'border-hairline shadow-sm text-muted/60 pr-10'}
            `}
          >
            <span>{selectedModel ? selectedModel.name : "Pilih tipe motor..."}</span>
          </div>

          {/* Close Button (if model is selected) */}
          {selectedModel && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedModel(null)
                setSearchTerm('')
              }}
              className="absolute inset-y-0 right-10 flex items-center justify-center text-muted hover:text-signature-coral transition-colors cursor-pointer w-8 h-full z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Chevron Icon (Always on the very right) */}
          <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 text-muted transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Dropdown Menu - Clean Editorial Style */}
        {isDropdownOpen && (
          <div className="absolute z-[60] w-full mt-1.5 bg-canvas border border-hairline rounded-sm shadow-lg overflow-hidden animate-fade-in-up">
            {/* Search Input inside Dropdown */}
            <div className="p-2 border-b border-hairline bg-surface-soft">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Ketik nama motor untuk mencari..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-canvas border border-hairline rounded-md pl-9 pr-8 py-2 text-sm font-sans text-ink focus:border-primary focus:outline-none placeholder-muted/65 h-9"
                  autoFocus
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center text-muted hover:text-signature-coral cursor-pointer w-8 h-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {filteredModels.length > 0 ? (
                filteredModels.map((model) => (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => {
                      setSelectedModel(model)
                      setSearchTerm(model.name)
                      setIsDropdownOpen(false)
                      setError('')
                    }}
                    className="w-full text-left px-md py-3 hover:bg-surface-soft flex items-center justify-between group transition-colors border-b border-hairline/40 last:border-b-0"
                  >
                    <div>
                      <p className="text-caption font-semibold text-ink group-hover:text-link transition-colors">
                        {model.name}
                      </p>
                      <p className="text-[10px] text-muted font-semibold uppercase tracking-wider mt-0.5">
                        {model.brand} • {model.type === 'matic' ? 'Matic' : 'Manual'}
                      </p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-muted group-hover:text-link transition-transform group-hover:translate-x-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                ))
              ) : (
                <div className="px-md py-6 text-center bg-surface-soft">
                  <p className="text-body-md font-semibold text-muted">Motor tidak ditemukan 😅</p>
                  <p className="text-[10px] text-muted/70 mt-1 uppercase tracking-widest font-bold">Coba kata kunci lain</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Odometer Input */}
      <div className="space-y-xs">
        <label htmlFor="odometer" className="block text-caption font-semibold text-ink">
          Kilometer Saat Ini (KM)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 12l4-3" />
            </svg>
          </div>
          <input
            id="odometer"
            type="text"
            inputMode="numeric"
            value={km}
            onChange={handleKmChange}
            placeholder="Contoh: 12.000"
            className={`text-input pl-10 pr-12 font-sans
              ${error ? 'border-signature-coral/60 focus:border-signature-coral' : 'border-hairline hover:border-hairline-strong'}
              ${isShaking ? 'animate-shake' : ''}`}
          />
          <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-caption text-muted font-bold">
            KM
          </span>
        </div>
      </div>

      {/* Error Message - Sobriety & Brand-voltage Contrast */}
      {error && (
        <div className="flex items-start gap-xs p-md bg-signature-coral/5 border border-signature-coral/20 rounded-sm animate-fade-in-up shadow-sm">
          <svg className="w-4 h-4 text-signature-coral mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="text-body-md text-signature-coral font-semibold leading-tight">{error}</p>
        </div>
      )}

      {/* Submit Button - Confident and Final CTA */}
      <button
        type="submit"
        className="w-full btn-primary tracking-wide transform active:scale-[0.98] transition-all"
      >
        Cek Kebutuhan Servis
      </button>
    </form>
  )
}
