import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import serviceData from '../data/serviceData.json'
import motorModels from '../data/motorModels.json'
import ResultCard from '../components/ResultCard'

export default function MotorDetail() {
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [motorInfo, setMotorInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [taskResponses, setTaskResponses] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)

    const raw = localStorage.getItem('motorkuData')

    if (!raw) {
      navigate('/', { replace: true })
      return
    }

    const parsed = JSON.parse(raw)
    const model = motorModels.find(m => m.id === parsed.type)
    
    setMotorInfo({ ...parsed, modelName: model ? model.name : 'Motor Custom' })

    // Filter matching service data based on model_id and KM range
    let match = serviceData.find(
      (entry) =>
        entry.model_ids.includes(parsed.type) &&
        parsed.km >= entry.range_km_min &&
        parsed.km <= entry.range_km_max
    )

    // Enhanced Fallback Logic: If no specific model match found
    if (!match) {
      if (parsed.km > 25000) {
        match = serviceData.find(entry => entry.model_ids.includes('default'))
      } else {
        const segment = model?.segment || 'entry'
        let fallbackId = 'matic-entry-fallback'
        
        if (segment === 'premium') fallbackId = 'matic-premium-fallback'
        else if (segment === 'manual') fallbackId = 'manual-fallback'
        
        match = serviceData.find(entry => entry.model_ids.includes(fallbackId))
      }
    }

    if (match) {
      // Categorize tasks
      const allMustDo = match.must_do || []
      const shouldHaveDone = []
      const wajibDikerjakan = []
      const aman = []

      allMustDo.forEach(item => {
        const status = taskResponses[item.task]
        
        if (status === 'done') {
          aman.push(item)
        } else if (status === 'not_yet') {
          wajibDikerjakan.push({ ...item, isOverdue: true })
        } else if (item.due_km && parsed.km > item.due_km) {
          shouldHaveDone.push(item)
        } else {
          wajibDikerjakan.push(item)
        }
      })

      setResult({ 
        ...match, 
        motor_type: model?.type || 'matic',
        should_have_done: shouldHaveDone,
        must_do: wajibDikerjakan,
        aman: aman
      })
    } else {
      // Final absolute fallback
      setResult({
        range_km_min: 0,
        range_km_max: parsed.km,
        motor_type: model?.type || 'matic',
        should_have_done: [],
        must_do: [
          { "task": "Ganti Oli Mesin", "interval": "Rutin per 2.000 - 2.500 KM" },
          { "task": "Cek Kondisi Umum", "interval": "Pengecekan per 5.000 KM" }
        ],
        aman: [],
        check: ["Tekanan Ban", "Aki", "Lampu", "Rem"],
        human_message: `Saran servis spesifik untuk ${model?.name || 'motor ini'} sedang kami siapkan. Sebagai langkah aman, pastikan ganti oli rutin dan cek fungsi rem ya!`
      })
    }

    // Simulate brief loading
    setTimeout(() => setLoading(false), 600)
  }, [navigate, taskResponses])

  const handleTaskAction = (taskName, action) => {
    setTaskResponses(prev => ({
      ...prev,
      [taskName]: action
    }))
  }

  const handleReset = () => {
    localStorage.removeItem('motorkuData')
    navigate('/')
  }

  if (loading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-amber-400 animate-spin"></div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Menganalisis spesifikasi {motorInfo?.modelName}...</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Summary Header */}
      <div className="mb-6 animate-fade-in-up">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 mb-4 group cursor-pointer font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
          </svg>
          Kembali
        </button>

        <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-200/50 dark:shadow-black/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Motor Kamu</p>
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">
                {motorInfo?.modelName}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Odometer</p>
              <p className="text-xl font-bold gradient-text">
                {motorInfo?.km.toLocaleString('id-ID')} <span className="text-sm text-slate-500 dark:text-slate-400">KM</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
        <ResultCard data={result} onTaskAction={handleTaskAction} />
      </div>

      {/* Reset Button */}
      <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
        <button
          onClick={handleReset}
          className="w-full py-4 bg-white dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400/50 hover:bg-amber-400/5 
            text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 font-bold text-sm rounded-2xl 
            shadow-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Ganti Motor Lain
        </button>
      </div>
    </div>
  )
}
