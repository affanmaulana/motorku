import { useState } from 'react'

export function formatInterval(str) {
  if (!str) return '';
  let res = str.trim();
  
  if (/1\.000\s*km\s*pertama/i.test(res)) {
    return "1.000 KM Pertama";
  }

  // Replace various prefixes with "Setiap "
  res = res.replace(/^(per|disarankan\s+per|wajib\s+setiap|pengecekan\s+per|segera\s*>\s*)\s+/i, "Setiap ");

  // Case insensitive replacement for km/KM
  res = res.replace(/km/gi, "KM");

  // Standardize spaces in ranges
  res = res.replace(/([\d\.]+)\s*-\s*([\d\.]+)/g, "$1 - $2");

  // Re-order Time and KM if they coexist
  if (/setiap\s+(\d+)\s+(bulan|tahun)\s*\/\s*([\d\.]+)\s*KM/i.test(res)) {
    res = res.replace(/setiap\s+(\d+)\s+(bulan|tahun)\s*\/\s*([\d\.]+)\s*KM/i, "Setiap $3 KM / $1 $2");
  }
  
  if (/estimasi\s+per\s+(\d+)\s+tahun/i.test(res)) {
    res = res.replace(/estimasi\s+per\s+(\d+)\s+tahun/i, "Setiap $1 Tahun");
  }

  // Ensure it starts with "Setiap " (except "Pertama")
  if (!res.startsWith("Setiap") && !res.includes("Pertama")) {
    res = "Setiap " + res;
  }

  // Remove duplicate "Setiap Setiap"
  res = res.replace(/^Setiap\s+Setiap\s+/i, "Setiap ");

  // Strip parentheses content
  res = res.replace(/\s*\(.*?\)/g, "");

  // Clean double spaces
  res = res.replace(/\s+/g, " ");

  return res.trim();
}

export function formatTaskName(name) {
  if (!name) return '';
  let res = name.trim();
  const cleanStr = res.toLowerCase();

  if (cleanStr.includes("ganti oli mesin")) {
    return "Ganti Oli Mesin";
  }
  if (cleanStr.includes("ganti oli gardan")) {
    return "Ganti Oli Gardan";
  }
  if (cleanStr.includes("ganti v-belt") || cleanStr === "v-belt" || cleanStr === "v-belt condition") {
    return "Ganti V-Belt & Roller Set";
  }
  if (cleanStr.includes("busi")) {
    return "Ganti Busi";
  }
  if (cleanStr.includes("filter udara")) {
    return "Ganti Filter Udara";
  }
  if (cleanStr.includes("tegangan aki") || cleanStr.includes("aki (hybrid)")) {
    return "Cek Tegangan Aki";
  }
  if (cleanStr.includes("air radiator") || cleanStr.includes("cairan radiator")) {
    if (cleanStr.includes("kuras")) {
      return "Kuras & Ganti Air Radiator";
    }
    return "Cek Air Radiator";
  }
  if (cleanStr.includes("penyetelan klep") || cleanStr.includes("setel klep")) {
    return "Setel Celah Klep";
  }
  if (cleanStr.includes("gear set") || cleanStr.includes("gir set") || cleanStr.includes("rantai")) {
    if (cleanStr.includes("periksa") || cleanStr.includes("mulur")) {
      return "Periksa Rantai & Gir";
    }
    return "Ganti Gear Set & Rantai";
  }
  if (cleanStr.includes("servis besar")) {
    return "Servis Besar Menyeluruh";
  }
  if (cleanStr.includes("minyak rem")) {
    return "Ganti Minyak Rem";
  }
  if (cleanStr.includes("roller")) {
    if (cleanStr.includes("rumah")) {
      return "Periksa Rumah Roller";
    }
    return "Periksa Kondisi Roller";
  }

  // Remove parentheses
  res = res.replace(/\s*\(.*?\)/g, "");
  // Remove trailing dashes
  res = res.replace(/\s*-\s*.*$/g, "");

  return res.trim();
}

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
            {item.desc}
          </p>
        </div>
      )}
    </div>
  )
}

export default function ResultCard({ data, onTaskAction }) {
  const [showAllChecks, setShowAllChecks] = useState(false)

  if (!data) return null

  const mustDoCount = data.must_do ? data.must_do.length : 0
  const shouldCount = data.should_have_done ? data.should_have_done.length : 0
  const checkCount = data.check ? data.check.length : 0
  const amanCount = data.aman ? data.aman.length : 0

  const visibleChecks = data.check 
    ? (showAllChecks ? data.check : data.check.slice(0, 5)) 
    : []

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
                    <p className="text-caption font-bold text-ink dark:text-white">{formatTaskName(item.task)}</p>
                    <p className="text-[11.5px] text-ink/65 dark:text-[#ffb68c]/75 font-medium mt-0.5">
                      {formatInterval(item.interval)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-sm">
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-ink/50 dark:text-white/40 flex-1">Udah dikerjain belum?</p>
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
                  <p className="text-caption font-bold text-white leading-snug whitespace-normal break-words">{formatTaskName(item.task)}</p>
                  <p className="text-[11px] text-white/80 dark:text-[#ff6b54] font-bold mt-0.5">
                    {formatInterval(item.interval)}
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
                  <span className="text-caption font-semibold text-muted dark:text-white/40 line-through block whitespace-normal break-words leading-snug">{formatTaskName(item.task)}</span>
                  <span className="text-[10px] text-success dark:text-[#86deb6] font-semibold uppercase">{formatInterval(item.interval)}</span>
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
            <div className="space-y-xs transition-all duration-300">
              {visibleChecks.map((item, index) => (
                <CheckItem key={index} item={item} />
              ))}
            </div>
            
            {checkCount > 5 && (
              <button
                onClick={() => setShowAllChecks(!showAllChecks)}
                className="w-full mt-sm h-12 px-md rounded-md border border-hairline hover:border-signature-mint/30 bg-canvas hover:bg-surface-soft active:bg-surface-strong transition-all duration-300 text-caption font-bold text-muted hover:text-ink cursor-pointer flex items-center justify-center gap-2 group shadow-sm"
              >
                <span>
                  {showAllChecks ? "Sembunyikan Pemeriksaan" : `Lihat ${checkCount - 5} Pemeriksaan Lainnya`}
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
