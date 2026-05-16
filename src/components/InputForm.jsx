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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Searchable Dropdown */}
      <div className="space-y-2 relative" ref={dropdownRef}>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">
          Pilih Motor Kamu
        </label>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-400 dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Cari motor (ex: Nmax, Vario...)"
            value={selectedModel ? selectedModel.name : searchTerm}
            onFocus={() => {
              setIsDropdownOpen(true)
              if (selectedModel) {
                setSearchTerm('')
                setSelectedModel(null)
              }
            }}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setIsDropdownOpen(true)
            }}
            className={`w-full pl-11 pr-10 py-4 bg-white dark:bg-slate-800 border-2 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500
              focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all duration-300
              ${selectedModel ? 'border-amber-500 font-bold' : 'border-slate-200 dark:border-slate-700 shadow-sm'}
            `}
          />

          {selectedModel && (
            <button
              type="button"
              onClick={() => {
                setSelectedModel(null)
                setSearchTerm('')
              }}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute z-[60] w-full mt-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
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
                    className="w-full text-left px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        {model.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                        {model.brand} • {model.type === 'matic' ? 'Matic' : 'Manual'}
                      </p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-amber-500 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center bg-slate-50/50 dark:bg-slate-900/50">
                  <p className="text-sm font-bold text-slate-400 dark:text-slate-600">Motor tidak ditemukan 😅</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-widest font-bold">Coba kata kunci lain</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Odometer Input */}
      <div className="space-y-2">
        <label htmlFor="odometer" className="block text-sm font-bold text-slate-700 dark:text-slate-200">
          Kilometer Saat Ini (KM)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-400 dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            className={`w-full pl-12 pr-14 py-4 bg-white dark:bg-slate-800 border-2 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 
              focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 
              transition-all duration-300 shadow-sm
              ${error ? 'border-red-500/60' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500'}
              ${isShaking ? 'animate-shake' : ''}`}
          />
          <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm text-slate-400 dark:text-slate-500 font-black">
            KM
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl animate-fade-in-up shadow-sm shadow-red-500/5">
          <svg className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="text-sm text-red-700 dark:text-red-300 font-bold leading-tight">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 
          text-white dark:text-slate-900 font-black text-base rounded-2xl 
          shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40
          transform hover:scale-[1.01] active:scale-[0.98]
          transition-all duration-300 cursor-pointer"
      >
        Cek Kebutuhan Servis
      </button>
    </form>
  )
}
