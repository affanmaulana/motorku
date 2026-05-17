import { useState } from 'react'

const wrenchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
)

const warningIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const checkIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

function CheckItem({ item }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="p-md rounded-md bg-canvas border border-hairline hover:border-signature-mint/50 transition-all duration-300 group cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center gap-sm">
        <div className="w-9 h-9 rounded-sm bg-signature-mint/10 dark:bg-signature-mint/15 flex items-center justify-center text-signature-mint group-hover:bg-signature-mint/20 transition-colors duration-300 flex-shrink-0">
          {checkIcon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-caption font-semibold text-ink">{item.task}</p>
        </div>
        <div className="flex flex-col items-end justify-center">
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
            <span className="text-signature-coral font-semibold">Kenapa perlu dicek?</span> {item.desc}
          </p>
        </div>
      )}
    </div>
  )
}

export default function ResultCard({ data, onTaskAction }) {
  if (!data) return null

  const mustDoCount = data.must_do ? data.must_do.length : 0
  const shouldCount = data.should_have_done ? data.should_have_done.length : 0
  const checkCount = data.check ? data.check.length : 0
  const amanCount = data.aman ? data.aman.length : 0

  return (
    <div className="space-y-xl">
      {/* Checklist Sections - Displayed All-At-Once with Premium Headers */}

      {/* Section 1: Konfirmasi Service (Bold Peach in Light Mode, Sophisticated Amber-Bronze in Dark Mode) */}
      {data.should_have_done && data.should_have_done.length > 0 && (
        <div className="animate-fade-in-up stagger-1">
          <div className="flex items-center gap-xs mb-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-signature-peach animate-pulse"></div>
            <h3 className="text-[10px] font-bold text-ink uppercase tracking-widest font-display flex-1">
              Konfirmasi Service
            </h3>
            <span className="text-[10px] font-bold text-muted bg-surface-soft px-2 py-0.5 rounded-sm">
              {shouldCount} part
            </span>
          </div>
          <div className="space-y-sm">
            {data.should_have_done.map((item, index) => (
              <div
                key={index}
                className="p-md rounded-md bg-signature-peach text-ink shadow-sm border-none dark:bg-[#20150d] dark:border dark:border-[#472d16] dark:border-l-4 dark:border-l-[#ffb68c] dark:text-white transition-all duration-300"
              >
                <div className="flex items-start gap-sm mb-md">
                  <div className="w-9 h-9 rounded-sm bg-white/30 dark:bg-[#ffb68c]/15 flex items-center justify-center text-ink dark:text-[#ffb68c] flex-shrink-0 mt-0.5">
                    {wrenchIcon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-caption font-bold text-ink dark:text-white">{item.task}</p>
                    <p className="text-[11px] text-ink/80 dark:text-[#ffb68c] font-bold mt-0.5">
                      Target: {item.interval}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-sm">
                  <p className="text-[11px] font-bold text-ink/75 dark:text-white/60 flex-1">Udah dikerjain belum?</p>
                  <button
                    onClick={() => onTaskAction(item.task, 'done')}
                    className="px-sm py-1.5 rounded-sm bg-ink text-canvas dark:bg-[#ffb68c] dark:text-[#0f1319] text-[11px] font-bold hover:bg-ink/90 dark:hover:bg-[#ffb68c]/90 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
                  >
                    Sudah
                  </button>
                  <button
                    onClick={() => onTaskAction(item.task, 'not_yet')}
                    className="px-sm py-1.5 rounded-sm bg-white/20 border border-ink/10 text-ink dark:bg-white/10 dark:border-white/10 dark:text-white text-[11px] font-bold hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    Belum
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Wajib Dikerjakan (Bold Coral in Light Mode, Sophisticated Deep Burgundy in Dark Mode) */}
      <div className="animate-fade-in-up stagger-2">
        <div className="flex items-center gap-xs mb-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-signature-coral"></div>
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-widest font-display flex-1">
            Wajib Dikerjakan
          </h3>
          <span className="text-[10px] font-bold text-muted bg-surface-soft px-2 py-0.5 rounded-sm">
            {mustDoCount} part
          </span>
        </div>

        {data.must_do && data.must_do.length > 0 ? (
          <div className="space-y-xs">
            {data.must_do.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-sm p-md rounded-md bg-signature-coral text-white shadow-sm border-none dark:bg-[#20100f] dark:border dark:border-[#451916] dark:border-l-4 dark:border-l-[#ff6b54] transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-sm bg-white/25 dark:bg-[#ff6b54]/15 flex items-center justify-center text-white dark:text-[#ff6b54] flex-shrink-0 mt-0.5">
                  {warningIcon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-caption font-bold text-white leading-snug whitespace-normal break-words">{item.task}</p>
                  <p className="text-[11px] text-white/80 dark:text-[#ff6b54] font-bold mt-0.5">
                    {item.interval}
                  </p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-end gap-xs">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white dark:text-[#ff6b54] bg-white/20 dark:bg-[#ff6b54]/15 px-2 py-0.5 rounded-sm">
                    Wajib
                  </span>
                  {item.isOverdue && (
                    <button
                      onClick={() => onTaskAction(item.task, null)}
                      className="text-[9px] font-bold text-white/80 dark:text-white/60 hover:text-white transition-colors uppercase tracking-tight cursor-pointer"
                    >
                      Urungkan
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-xl rounded-md bg-soft-mint dark:bg-[#0c1612] dark:border dark:border-[#173024] border border-signature-mint/30 text-center">
            <span className="text-2xl block mb-sm">🛵</span>
            <h4 className="text-caption font-bold text-ink dark:text-white uppercase tracking-widest mb-1">Semua Aman!</h4>
            <p className="text-[12px] text-muted dark:text-white/60 font-medium leading-relaxed max-w-xs mx-auto">
              Tidak ada tugas servis wajib saat ini. Motor Anda berada dalam kondisi prima.
            </p>
          </div>
        )}
      </div>

      {/* Section 3: Aman (Sudah Selesai) - Displayed ONLY when items exist (Soft Mint in Light Mode, Sophisticated Emerald in Dark Mode) */}
      {data.aman && data.aman.length > 0 && (
        <div className="animate-fade-in-up stagger-3">
          <div className="flex items-center gap-xs mb-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
            <h3 className="text-[10px] font-bold text-ink uppercase tracking-widest font-display flex-1">
              Aman (Sudah Selesai)
            </h3>
            <span className="text-[10px] font-bold text-muted bg-surface-soft px-2 py-0.5 rounded-sm">
              {amanCount} part
            </span>
          </div>

          <div className="space-y-xs opacity-95">
            {data.aman.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-sm p-sm rounded-md bg-soft-mint border border-signature-mint/20 hover:border-signature-mint/40 dark:bg-[#0c1612] dark:border dark:border-[#173024] hover:shadow-sm transition-all duration-300 group animate-fade-in"
              >
                <div className="w-8 h-8 rounded-sm bg-success/10 dark:bg-[#86deb6]/15 flex items-center justify-center text-success dark:text-[#86deb6] flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-caption font-semibold text-muted dark:text-white/40 line-through block whitespace-normal break-words leading-snug">{item.task}</span>
                  <span className="text-[10px] text-success dark:text-[#86deb6] font-semibold uppercase">{item.interval}</span>
                </div>
                <button
                  onClick={() => onTaskAction(item.task, null)}
                  className="ml-auto text-[10px] font-semibold text-muted dark:text-white/40 hover:text-ink dark:hover:text-white transition-colors mt-0.5 cursor-pointer"
                >
                  Urungkan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 4: Pemeriksaan Rutin (Soft Accordions Background) */}
      <div className="animate-fade-in-up stagger-4">
        <div className="flex items-center gap-xs mb-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-signature-mint"></div>
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-widest font-display flex-1">
            Pemeriksaan Rutin
          </h3>
          <span className="text-[10px] font-bold text-muted bg-surface-soft px-2 py-0.5 rounded-sm">
            {checkCount} part
          </span>
        </div>

        {data.check && data.check.length > 0 ? (
          <div className="space-y-xs">
            {data.check.map((item, index) => (
              <CheckItem key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="p-xl rounded-md bg-surface-soft border border-hairline text-center">
            <span className="text-2xl block mb-sm">🔍</span>
            <h4 className="text-caption font-bold text-ink uppercase tracking-widest mb-1">Tidak Ada Pemeriksaan</h4>
            <p className="text-[12px] text-muted font-medium leading-relaxed max-w-xs mx-auto">
              Semua bagian motor tidak memerlukan pemeriksaan tambahan saat ini.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
