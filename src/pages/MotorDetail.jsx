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
      // Categorize tasks with model-specific filtering
      const allMustDo = (match.must_do || []).filter(item => 
        !item.only_for || item.only_for.includes(parsed.type)
      )
      const shouldHaveDone = []
      const wajibDikerjakan = []
      const aman = []

      allMustDo.forEach(item => {
        const status = taskResponses[item.task]
        
        if (status === 'done') {
          aman.push(item)
        } else if (status === 'not_yet') {
          wajibDikerjakan.push({ ...item, isOverdue: true })
        } else if (item.due_km) {
          if (parsed.km > item.due_km) {
            // Overdue task -> moves to Konfirmasi Service
            shouldHaveDone.push(item)
          } else if (parsed.km === item.due_km) {
            // Exactly due right now -> active must_do
            wajibDikerjakan.push(item)
          }
          // If parsed.km < item.due_km, it's a future task and is hidden from current checklists.
        } else {
          // No specific due_km defined, always include as active must_do
          wajibDikerjakan.push(item)
        }
      })

      setResult({ 
        ...match, 
        motor_type: model?.type || 'matic',
        should_have_done: shouldHaveDone,
        must_do: wajibDikerjakan,
        aman: aman,
        check: (match.check || []).filter(item => 
          !item.only_for || item.only_for.includes(parsed.type)
        )
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
      <div className="max-w-lg mx-auto px-lg py-xl flex flex-col items-center justify-center gap-md">
        <div className="w-10 h-10 rounded-full border-4 border-hairline border-t-primary animate-spin"></div>
        <p className="text-body-md text-muted font-medium">Menganalisis spesifikasi {motorInfo?.modelName}...</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-lg py-xl">
      {/* Summary Header */}
      <div className="mb-lg animate-fade-in-up">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-body-md text-muted hover:text-link transition-colors duration-300 mb-md group cursor-pointer font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
          </svg>
          Kembali
        </button>

        {/* Editorial Info Card - Combined with Montir Recommendation */}
        <div className="bg-canvas border border-hairline rounded-md shadow-sm overflow-hidden animate-fade-in-up">
          <div className="p-lg flex items-center justify-between">
            <div>
              <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-0.5">Motor Kamu</p>
              <h2 className="text-title-lg font-semibold text-ink font-display">
                {motorInfo?.modelName}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-0.5">Odometer</p>
              <p className="text-title-lg font-bold text-signature-coral font-display">
                {motorInfo?.km.toLocaleString('id-ID')} <span className="text-caption text-muted font-normal">KM</span>
              </p>
            </div>
          </div>

          <div className="border-t border-hairline"></div>

          <div className="p-lg bg-soft-peach/60 dark:bg-soft-peach/20 border-l-4 border-signature-coral">
            <span className="text-[9px] font-bold text-signature-coral uppercase tracking-widest block mb-1 font-display">REKOMENDASI MONTIRKU</span>
            <p className="text-[12.5px] leading-relaxed font-medium text-ink">{result?.human_message}</p>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.08s', opacity: 0 }}>
        <ResultCard data={result} onTaskAction={handleTaskAction} />
      </div>

      {/* Reset Button - White outline button */}
      <div className="mt-xl animate-fade-in-up" style={{ animationDelay: '0.16s', opacity: 0 }}>
        <button
          onClick={handleReset}
          className="w-full btn-secondary flex items-center justify-center gap-xs cursor-pointer active:scale-[0.98] transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Ganti Motor Lain
        </button>
      </div>
    </div>
  )
}
