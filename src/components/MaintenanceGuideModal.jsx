import { useState, useEffect } from 'react'
import serviceData from '../data/serviceData.json'
import motorModels from '../data/motorModels.json'
import { formatInterval, formatTaskName } from './ResultCard'

// High-fidelity custom SVG icons for the editorial guide
const closeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

const wrenchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
)

const checkIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const infoIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
)

const calendarIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

const alertIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

function ModalCheckItem({ item }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="p-md rounded-md bg-canvas border border-hairline hover:border-signature-mint/50 transition-all duration-300 group cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center gap-sm">
        <div className="w-9 h-9 rounded-sm bg-signature-mint/10 dark:bg-signature-mint/15 flex items-center justify-center text-signature-mint group-hover:bg-signature-mint/20 transition-colors duration-300 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-caption font-semibold text-ink leading-tight">{formatTaskName(item.task)}</p>
        </div>
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 text-muted group-hover:text-ink transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-sm pt-sm border-t border-hairline/40 animate-fade-in">
          <p className="text-[12px] leading-relaxed text-muted font-medium">
            {item.desc}
          </p>
        </div>
      )}
    </div>
  )
}

export default function MaintenanceGuideModal({ isOpen, onClose, motorId }) {
  const [showAllChecks, setShowAllChecks] = useState(false)
  
  // Prevent scrolling of background when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  // 1. Resolve selected motor information
  const model = motorModels.find(m => m.id === motorId)
  if (!model) return null

  // 2. Fetch specific matching service entries
  let matchingEntries = serviceData.filter(entry => entry.model_ids.includes(motorId))

  // Fallback if no specific model entry is found
  if (matchingEntries.length === 0) {
    const segment = model.segment || 'entry'
    let fallbackId = 'matic-entry-fallback'
    if (model.type === 'manual') fallbackId = 'manual-fallback'
    else if (segment === 'premium') fallbackId = 'matic-premium-fallback'
    
    matchingEntries = serviceData.filter(entry => entry.model_ids.includes(fallbackId))
  }

  const mustDo = []
  const check = []

  matchingEntries.forEach(entry => {
    // Collect must_do tasks
    if (entry.must_do) {
      entry.must_do.forEach(item => {
        if (!item.only_for || item.only_for.includes(motorId)) {
          if (!mustDo.some(t => t.task === item.task)) {
            mustDo.push(item)
          }
        }
      })
    }

    // Collect check items
    if (entry.check) {
      entry.check.forEach(item => {
        if (!item.only_for || item.only_for.includes(motorId)) {
          if (!check.some(t => t.task === item.task)) {
            check.push(item)
          }
        }
      })
    }
  })

  // Separate must_do into "Inreyen (First Service)" and "Routine/Periodic Maintenance"
  const breakInTasks = mustDo.filter(item => item.due_km === 1000 || item.interval.toLowerCase().includes('pertama'))
  const routineTasks = mustDo.filter(item => item.due_km !== 1000 && !item.interval.toLowerCase().includes('pertama'))

  // 3. Resolve high-KM general recommendations
  const globalEntry = serviceData.find(entry => entry.model_ids.includes('default'))
  const highKmMustDo = globalEntry ? (globalEntry.must_do || []).filter(item => !item.only_for || item.only_for.includes(motorId)) : []
  const highKmCheck = globalEntry ? (globalEntry.check || []).filter(item => !item.only_for || item.only_for.includes(motorId)) : []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-primary/60 dark:bg-canvas/80 backdrop-blur-sm animate-fade-in">
      {/* Modal Container */}
      <div className="bg-canvas border border-hairline rounded-lg w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in-up">
        
        {/* Pinned Header */}
        <div className="px-lg py-md border-b border-hairline flex items-center justify-between bg-canvas z-10">
          <div>
            <h2 className="text-title-md font-semibold font-display gradient-text">
              Panduan Perawatan Lengkap
            </h2>
            <p className="text-[11px] text-muted font-bold uppercase tracking-wider mt-0.5">
              {model.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-hairline hover:bg-surface-soft active:bg-surface-strong transition-all flex items-center justify-center text-muted hover:text-ink cursor-pointer"
            aria-label="Tutup popup"
          >
            {closeIcon}
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-lg py-md space-y-lg custom-scrollbar">
          
          {/* Spec details card */}
          <div className="p-md rounded-md bg-signature-cream text-ink dark:bg-[#1a1714] dark:border dark:border-[#382d22] dark:text-[#f5e9d4] flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold text-muted dark:text-muted tracking-widest">Spesifikasi Motor</p>
              <h4 className="text-caption font-bold mt-0.5">{model.name}</h4>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-canvas text-ink border border-hairline dark:bg-[#0f1319] dark:text-white dark:border-[#382d22]">
                {model.brand}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-canvas text-ink border border-hairline dark:bg-[#0f1319] dark:text-white dark:border-[#382d22]">
                {model.type === 'matic' ? 'Matic' : 'Manual'}
              </span>
            </div>
          </div>

          {/* Section 1: Break-in Service (1.000 KM) */}
          {breakInTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-xs mb-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-signature-peach"></div>
                <h3 className="text-[10px] font-bold text-ink uppercase tracking-widest font-display flex-1">
                  Servis Pertama (Inreyen)
                </h3>
                <span className="text-[9px] font-bold text-signature-peach uppercase tracking-tight bg-signature-peach/10 px-2 py-0.5 rounded-sm">
                  1.000 KM Pertama
                </span>
              </div>
              <div className="space-y-xs">
                {breakInTasks.map((item, index) => (
                  <div
                    key={index}
                    className="p-md rounded-md bg-[#fffaf5] border border-signature-peach/25 dark:bg-[#20150d] dark:border-[#472d16] flex items-start gap-sm"
                  >
                    <div className="w-9 h-9 rounded-sm bg-signature-peach/10 dark:bg-[#ffb68c]/15 flex items-center justify-center text-signature-peach flex-shrink-0 mt-0.5">
                      {calendarIcon}
                    </div>
                    <div>
                      <p className="text-caption font-bold text-ink dark:text-white">{formatTaskName(item.task)}</p>
                      <p className="text-[12px] text-muted dark:text-white/60 font-medium leading-relaxed mt-1">
                        Pembersihan gram besi sisa pabrikan dan penyesuaian awal celah komponen mesin.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Routine Replacement Cycle */}
          <div>
            <div className="flex items-center gap-xs mb-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-signature-coral"></div>
              <h3 className="text-[10px] font-bold text-ink uppercase tracking-widest font-display flex-1">
                Siklus Penggantian Rutin
              </h3>
              <span className="text-[10px] font-bold text-muted bg-surface-soft px-2 py-0.5 rounded-sm">
                {routineTasks.length} Part / Cairan
              </span>
            </div>
            <div className="space-y-xs">
              {routineTasks.map((item, index) => (
                <div
                  key={index}
                  className="p-md rounded-md bg-canvas border border-hairline hover:border-signature-coral/30 hover:shadow-sm transition-all duration-300 flex items-start gap-sm"
                >
                  <div className="w-9 h-9 rounded-sm bg-signature-coral/10 dark:bg-[#ff6b54]/15 flex items-center justify-center text-signature-coral dark:text-[#ff6b54] flex-shrink-0 mt-0.5">
                    {wrenchIcon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-caption font-bold text-ink dark:text-white leading-tight">{formatTaskName(item.task)}</p>
                    <p className="text-[11px] text-signature-coral dark:text-[#ff6b54] font-bold mt-0.5 uppercase tracking-wide">
                      {formatInterval(item.interval)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Periodic Inspections */}
          {check.length > 0 && (
            <div>
              <div className="flex items-center gap-xs mb-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-signature-mint"></div>
                <h3 className="text-[10px] font-bold text-ink uppercase tracking-widest font-display flex-1">
                  Pemeriksaan Berkala
                </h3>
                <span className="text-[10px] font-bold text-muted bg-surface-soft px-2 py-0.5 rounded-sm">
                  {check.length} Bagian
                </span>
              </div>
              <div className="space-y-xs">
                {(showAllChecks ? check : check.slice(0, 5)).map((item, index) => (
                  <ModalCheckItem key={index} item={item} />
                ))}
              </div>
              
              {check.length > 5 && (
                <button
                  onClick={() => setShowAllChecks(!showAllChecks)}
                  className="w-full mt-sm h-12 px-md rounded-md border border-hairline hover:border-signature-mint/30 bg-canvas hover:bg-surface-soft active:bg-surface-strong transition-all duration-300 text-caption font-bold text-muted hover:text-ink cursor-pointer flex items-center justify-center gap-2 group shadow-sm"
                >
                  <span>
                    {showAllChecks ? "Sembunyikan Pemeriksaan" : `Lihat ${check.length - 5} Pemeriksaan Lainnya`}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 text-muted group-hover:text-ink transition-transform duration-300 ${showAllChecks ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Section 4: High Mileage Recommendations */}
          {highKmMustDo.length > 0 && (
            <div>
              <div className="flex items-center gap-xs mb-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-border-strong dark:bg-muted"></div>
                <h3 className="text-[10px] font-bold text-ink uppercase tracking-widest font-display flex-1">
                  Kilometer Tinggi (&gt; 25.000 KM)
                </h3>
                <span className="text-[9px] font-bold text-muted uppercase tracking-tight bg-surface-strong dark:bg-surface-soft px-2 py-0.5 rounded-sm">
                  Servis Besar
                </span>
              </div>
              <div className="space-y-xs">
                {/* High-KM Tasks */}
                {highKmMustDo.map((item, index) => (
                  <div
                    key={index}
                    className="p-md rounded-md bg-canvas border border-hairline border-dashed flex items-start gap-sm"
                  >
                    <div className="w-9 h-9 rounded-sm bg-surface-strong/30 dark:bg-surface-soft/10 flex items-center justify-center text-muted flex-shrink-0 mt-0.5">
                      {alertIcon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-caption font-bold text-ink dark:text-white leading-tight">{formatTaskName(item.task)}</p>
                      <p className="text-[11px] text-muted dark:text-[#9297a0] font-bold mt-0.5 uppercase tracking-wide">
                        {item.interval ? formatInterval(item.interval) : 'Rutin Berkala'}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Subtle reminder */}
                <div className="p-md rounded-md bg-surface-soft dark:bg-surface-soft/20 text-center text-muted font-medium text-[11px] leading-relaxed">
                  📢 <span className="font-semibold text-ink dark:text-white">Tip Penting:</span> Pada jarak tempuh tinggi, pengereman total, bearing roda, komstir, dan kompresi mesin wajib dievaluasi demi kenyamanan berkendara yang optimal.
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Pinned Footer */}
        <div className="px-lg py-sm border-t border-hairline bg-surface-soft dark:bg-[#161c24] text-center z-10">
          <p className="text-[9.5px] text-muted dark:text-[#9297a0] leading-relaxed font-medium py-1 max-w-sm mx-auto">
            Rekomendasi di atas disusun berdasarkan spesifikasi resmi {model.brand} serta data montir empiris untuk iklim tropis Indonesia yang berdebu dan macet.
          </p>
        </div>

      </div>
    </div>
  )
}
