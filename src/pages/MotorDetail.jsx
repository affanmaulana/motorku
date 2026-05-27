import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import serviceData from '../data/serviceData.json'
import motorModels from '../data/motorModels.json'
import ResultCard from '../components/ResultCard'
import MaintenanceGuideModal from '../components/MaintenanceGuideModal'


export default function MotorDetail() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [motorInfo] = useState(() => {
    const raw = localStorage.getItem('motorkuData')
    if (!raw) return null
    try {
      const parsed = JSON.parse(raw)
      const model = motorModels.find(m => m.id === parsed.type)
      return { ...parsed, modelName: model ? model.name : 'Motor Custom' }
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(true)
  const [taskResponses, setTaskResponses] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)

    if (!motorInfo) {
      navigate('/', { replace: true })
      return
    }

    // Simulate brief loading
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [navigate, motorInfo])

  // Derive Result during render to avoid cascading updates/effects
  let result = null
  if (motorInfo) {
    const model = motorModels.find(m => m.id === motorInfo.type)

    // Filter matching service data based on model_id and KM range
    let match = serviceData.find(
      (entry) =>
        entry.model_ids.includes(motorInfo.type) &&
        motorInfo.km >= entry.range_km_min &&
        motorInfo.km <= entry.range_km_max
    )

    // Enhanced Fallback Logic: If no specific model match found
    if (!match) {
      if (motorInfo.km > 25000) {
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
      // 1. Gather all must_do tasks that apply to this motor model across ALL database entries
      const allAppliedEntries = serviceData.filter(entry => entry.model_ids.includes(motorInfo.type))
      const combinedMustDo = []
      
      allAppliedEntries.forEach(entry => {
        if (entry.must_do) {
          entry.must_do.forEach(item => {
            if (!item.only_for || item.only_for.includes(motorInfo.type)) {
              if (!combinedMustDo.some(t => t.task === item.task)) {
                combinedMustDo.push(item)
              }
            }
          })
        }
      })

      // Also gather high-KM must_do tasks if user's KM > 25000
      if (motorInfo.km > 25000) {
        const globalEntry = serviceData.find(entry => entry.model_ids.includes('default'))
        if (globalEntry && globalEntry.must_do) {
          globalEntry.must_do.forEach(item => {
            if (!combinedMustDo.some(t => t.task === item.task)) {
              combinedMustDo.push(item)
            }
          })
        }
      }

      // If combinedMustDo is completely empty, use the match must_do as fallback
      if (combinedMustDo.length === 0 && match.must_do) {
        match.must_do.forEach(item => {
          if (!item.only_for || item.only_for.includes(motorInfo.type)) {
            combinedMustDo.push(item)
          }
        })
      }

      // 2. Classify tasks based on periodic calculations with 20% leeway
      const shouldHaveDone = []
      const wajibDikerjakan = []
      const aman = []

      combinedMustDo.forEach(item => {
        const status = taskResponses[item.task]
        
        if (status === 'done') {
          aman.push(item)
          return
        }
        
        if (status === 'not_yet') {
          wajibDikerjakan.push({ ...item, isOverdue: true })
          return
        }

        // Parse interval from due_km or text description
        let I = item.due_km
        if (!I && item.interval) {
          const cleanInterval = item.interval.replace(/\./g, '')
          const keyMatch = cleanInterval.match(/(\d+)\s*km/i)
          if (keyMatch) {
            I = parseInt(keyMatch[1], 10)
          }
        }

        if (!I || isNaN(I)) {
          // No specific interval defined, always include as active must_do
          wajibDikerjakan.push(item)
          return
        }

        const userKm = motorInfo.km

        if (I === 1000 || item.interval.toLowerCase().includes('pertama')) {
          // First break-in service
          // Before window (25% of 1000): 750 <= userKm < 1000
          // Exactly due: userKm === 1000
          // After window (20% of 1000): 1000 < userKm <= 1200
          if (userKm >= 750 && userKm <= 1200) {
            if (userKm === 1000) {
              wajibDikerjakan.push(item)
            } else {
              shouldHaveDone.push(item)
            }
          }
          return
        }

        // Periodic recurring service matching with 25% before and 20% after leeway
        const M = Math.max(I, Math.round(userKm / I) * I)
        const d = userKm - M
        const beforeLeeway = -0.25 * I
        const afterLeeway = 0.2 * I
        
        if (d === 0) {
          wajibDikerjakan.push(item)
        } else if (d > 0 && d <= afterLeeway) {
          shouldHaveDone.push(item)
        } else if (d < 0 && d >= beforeLeeway) {
          shouldHaveDone.push(item)
        }
      })

      result = { 
        ...match, 
        motor_type: model?.type || 'matic',
        should_have_done: shouldHaveDone,
        must_do: wajibDikerjakan,
        aman: aman,
        check: (match.check || []).filter(item => 
          !item.only_for || item.only_for.includes(motorInfo.type)
        )
      }
    } else {
      // Final absolute fallback
      result = {
        range_km_min: 0,
        range_km_max: motorInfo.km,
        motor_type: model?.type || 'matic',
        should_have_done: [],
        must_do: [
          { "task": "Ganti Oli Mesin", "interval": "Rutin per 2.000 - 2.500 KM" },
          { "task": "Cek Kondisi Umum", "interval": "Pengecekan per 5.000 KM" }
        ],
        aman: [],
        check: ["Tekanan Ban", "Aki", "Lampu", "Rem"],
        human_message: `Saran servis spesifik untuk ${model?.name || 'motor ini'} sedang kami siapkan. Sebagai langkah aman, pastikan ganti oli rutin dan cek fungsi rem ya!`
      }
    }
  }

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

      {/* Maintenance Guide Button & Reset Button */}
      <div className="mt-xl flex flex-col gap-sm animate-fade-in-up" style={{ animationDelay: '0.16s', opacity: 0 }}>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full btn-primary flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-all py-3.5 px-4 font-semibold text-sm rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
            <path d="M6 6h10M6 10h10"/>
          </svg>
          Panduan Perawatan Lengkap
        </button>

        <button
          onClick={handleReset}
          className="w-full btn-secondary flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-all py-3.5 px-4 font-semibold text-sm rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Ganti Motor Lain
        </button>
      </div>

      {/* Complete Maintenance Guide Modal */}
      {motorInfo && (
        <MaintenanceGuideModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          motorId={motorInfo.type}
        />
      )}
    </div>
  )
}
