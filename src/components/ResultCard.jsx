const iconMap = {
  'Ganti Oli Mesin (0.8L)': (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l.01 0" /><path d="M6 18l.01 0" /><path d="M12 3v2" /><path d="M12 7c2 0 3 1 3 3s-1 3-3 3-3 1-3 3 1 3 3 3" /><path d="M12 19v2" />
    </svg>
  ),
  'Ganti Oli Mesin (1L)': (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l.01 0" /><path d="M6 18l.01 0" /><path d="M12 3v2" /><path d="M12 7c2 0 3 1 3 3s-1 3-3 3-3 1-3 3 1 3 3 3" /><path d="M12 19v2" />
    </svg>
  ),
  'Ganti Oli Mesin': (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l.01 0" /><path d="M6 18l.01 0" /><path d="M12 3v2" /><path d="M12 7c2 0 3 1 3 3s-1 3-3 3-3 1-3 3 1 3 3 3" /><path d="M12 19v2" />
    </svg>
  ),
  'Ganti Oli Gardan': (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M12 3v6" /><path d="M12 15v6" /><path d="M3 12h6" /><path d="M15 12h6" />
    </svg>
  ),
  'Ganti Busi': (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  'Ganti V-Belt': (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="12" r="4" /><circle cx="17" cy="12" r="4" /><path d="M7 8c3.333-2 6.667-2 10 0" /><path d="M7 16c3.333 2 6.667 2 10 0" />
    </svg>
  ),
  'Ganti Roller': (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" />
    </svg>
  ),
  'Bersihkan Filter Udara': (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  ),
  'Ganti Rantai & Sproket Set': (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  'Cek Air Radiator': (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" /><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /><path d="M12 2v2" /><path d="M12 22v-2" />
    </svg>
  ),
  'Kuras Air Radiator': (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" /><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /><path d="M12 2v2" /><path d="M12 22v-2" />
    </svg>
  ),
}

const defaultIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
)

const checkIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

export default function ResultCard({ data, onTaskAction }) {
  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Human Message Card */}
      <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-400/20 pulse-glow">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 dark:bg-amber-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xl">🔧</span>
          </div>
          <div>
            <h3 className="text-amber-700 dark:text-amber-300 font-bold text-xs uppercase tracking-widest mb-1">Kata Montir</h3>
            <p className="text-slate-800 dark:text-slate-100 text-sm leading-relaxed font-medium">{data.human_message}</p>
          </div>
        </div>
      </div>

      {/* Should Have Done Section (New Category) */}
      {data.should_have_done && data.should_have_done.length > 0 && (
        <div className="animate-fade-in-up stagger-1" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            <h3 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Konfirmasi Service</h3>
          </div>
          <div className="space-y-3">
            {data.should_have_done.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-orange-200 dark:border-orange-500/20 shadow-sm"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/15 flex items-center justify-center text-orange-600 dark:text-orange-400 flex-shrink-0">
                    {iconMap[item.task] || defaultIcon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{item.task}</p>
                    <p className="text-[11px] text-orange-600 dark:text-orange-400 font-semibold mt-0.5">
                      Target: {item.interval}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex-1">Udah dikerjain belum?</p>
                  <button
                    onClick={() => onTaskAction(item.task, 'done')}
                    className="px-4 py-1.5 rounded-lg bg-emerald-500 text-white text-[11px] font-bold hover:bg-emerald-600 transition-colors cursor-pointer"
                  >
                    Sudah
                  </button>
                  <button
                    onClick={() => onTaskAction(item.task, 'not_yet')}
                    className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                  >
                    Belum
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Must Do Section */}
      {data.must_do && data.must_do.length > 0 && (
        <div className="animate-fade-in-up stagger-2" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <h3 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Wajib Dikerjakan</h3>
          </div>
          <div className="space-y-2.5">
            {data.must_do.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 hover:border-red-400/30 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/15 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:bg-red-100 dark:group-hover:bg-red-500/25 transition-colors duration-300 flex-shrink-0">
                  {iconMap[item.task] || defaultIcon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{item.task}</p>
                  <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold mt-0.5">
                    {item.interval}
                  </p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-400/10 px-2.5 py-1 rounded-lg">
                    Wajib
                  </span>
                  {item.isOverdue && (
                    <button
                      onClick={() => onTaskAction(item.task, null)}
                      className="text-[9px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-tighter"
                    >
                      Urungkan
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Aman Section (New Category) */}
      {data.aman && data.aman.length > 0 && (
        <div className="animate-fade-in-up stagger-3" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <h3 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Aman (Sudah Selesai)</h3>
          </div>
          <div className="space-y-2.5 opacity-70">
            {data.aman.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/30 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400 line-through decoration-slate-400 block">{item.task}</span>
                  <span className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70 font-bold uppercase">{item.interval}</span>
                </div>
                <button
                  onClick={() => onTaskAction(item.task, null)}
                  className="ml-auto text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mt-0.5"
                >
                  Urungkan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Check Section */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          <h3 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Perlu Dicek</h3>
        </div>
        <div className="space-y-2.5">
          {data.check.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 hover:border-amber-400/30 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:bg-amber-100 dark:group-hover:bg-amber-500/25 transition-colors duration-300 flex-shrink-0">
                {checkIcon}
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{item}</span>
              <div className="ml-auto">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 px-2.5 py-1 rounded-lg">
                  Cek
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KM Range Info */}
      <div className="animate-fade-in-up stagger-3" style={{ opacity: 0 }}>
        <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400 dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
          </svg>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            Panduan range {data.range_km_min.toLocaleString('id-ID')} — {data.range_km_max.toLocaleString('id-ID')} KM ({data.motor_type === 'matic' ? 'Matic' : 'Manual'})
          </p>
        </div>
      </div>
    </div>
  )
}
