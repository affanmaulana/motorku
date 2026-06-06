# Motorku 🏍️ — Cerdas Rawat Motormu

Motorku adalah aplikasi panduan perawatan (servis) sepeda motor pintar yang dirancang khusus untuk menghadapi kondisi operasional ekstrem di Indonesia (iklim tropis, tingkat kelembapan tinggi, debu jalanan, serta kemacetan stop-and-go). 

Dengan memadukan data rekomendasi resmi pabrikan (*manufacturer specs*) serta data empiris mekanik lapangan, Motorku membantu pemilik motor melacak jadwal servis secara presisi dan personal tanpa perlu bergantung pada tebakan manual.

---

## 🌟 Fitur Utama & Keunggulan

Aplikasi ini menyajikan antarmuka premium berbasis editorial dengan serangkaian fitur interaktif:

### 1. Rekomendasi Pintar Spesifik Tipe (20 Model Motor)
Sistem memiliki basis data bawaan ([motorModels.json](file:///d:/Dokumen/SaaS%20with%20AI/Motorcare/src/data/motorModels.json) & [serviceData.json](file:///d:/Dokumen/SaaS%20with%20AI/Motorcare/src/data/serviceData.json)) untuk 20 model motor populer di Indonesia dari berbagai brand besar:
*   **Honda**: Scoopy & Beat 110 (eSP/eSAF), Vario 125, Vario 160, PCX 160, ADV 160 (eSP+ 4-valve), Supra X 125, Revo Fit (bebek komuter), serta CRF150L (dual-purpose).
*   **Yamaha**: Mio M3, Gear 125, Fazzio & Grand Filano (Blue Core Hybrid-Assist), Lexi 125, NMAX 155, Aerox 155 (VVA engine), serta Vixion & R15 (sport transmisi manual).
*   **Suzuki**: Nex II (matic air-cooled) dan Satria F150 (DOHC kopling basah).

### 2. Klasifikasi Tugas Berbasis Logika Cerdas
Alih-alih menyajikan daftar statis, Motorku menghitung status perawatan secara dinamis menggunakan pembacaan odometer (KM) dengan aturan toleransi cerdas pada [MotorDetail.jsx](file:///d:/Dokumen/SaaS%20with%20AI/Motorcare/src/pages/MotorDetail.jsx):
*   **Wajib Dikerjakan**: Tugas servis krusial yang berada tepat pada jadwal interval.
*   **Konfirmasi Service (Early Warning / Overdue)**: Tugas yang berada dalam rentang toleransi (*leeway*) 25% sebelum jatuh tempo atau 20% setelah jatuh tempo (misalnya oli mesin inreyen pertama di kisaran 750 km - 1.200 km). Pengguna ditanya konfirmasi apakah servis ini sudah dilakukan.
*   **Aman (Sudah Selesai)**: Tugas yang telah dikonfirmasi selesai oleh pengguna secara interaktif.
*   **Pemeriksaan Rutin**: Inspeksi berkala (seperti ban, kampas rem, filter udara, rantai) lengkap dengan detail deskripsi interaktif ketika diklik mengenai alasan teknis mengapa bagian tersebut perlu diperiksa.

### 3. Logika Pakar Detil Suku Cadang & Cairan
*   **Oli Mesin Spesifik**: Deteksi volume pengisian oli (650 ml untuk matic eSAF, 800-900 ml matic sedang/besar, 1.0 liter manual sport, hingga 1.3-1.4 liter khusus mesin DOHC Satria F150).
*   **Sistem CVT & V-Belt**: Siklus pembersihan CVT untuk mencegah gejala gredek dan penukaran sabuk V-belt.
*   **Sistem Pendinginan Cairan**: Monitoring cairan radiator (coolant) dan water pump seal.
*   **Mesin Katup VVA / DOHC**: Penyetelan celah katup berkala yang disesuaikan untuk kebutuhan mesin performa tinggi.
*   **Sistem Hybrid**: Pengujian tegangan aki berkala khusus motor hybrid (voltase minimal 12.4V) demi menjaga fungsi *hybrid-assist* tetap berjalan optimal.

### 4. Interactive Checklist & State Persistence
*   Pengguna dapat mencentang tugas yang sudah selesai (*Sudah/Belum*).
*   Data pilihan motor dan odometer disimpan dengan aman secara lokal menggunakan `localStorage`, sehingga pengguna tidak kehilangan progress/data saat halaman dimuat ulang.
*   Tombol reset sekali-klik untuk beralih atau mengganti ke jenis motor lainnya.

### 5. Desain Premium (Light & Dark Mode)
*   Menggunakan palet warna HSL premium (Signature Coral, Peach, Mint, Cream, Canvas, Ink) untuk tampilan editorial modern.
*   Transisi halus dan mikro-animasi (*fade-in-up*) yang menyegarkan mata saat berpindah halaman atau membuka menu.
*   *Responsive design* yang nyaman diakses melalui smartphone maupun perangkat desktop.

---

## 🛠️ Stack Teknologi

Aplikasi ini dirancang sebagai Single Page Application (SPA) yang sangat cepat, bersih, dan tanpa *overhead library* yang tidak perlu:
*   **Core Framework**: React 19 (Vite)
*   **Styling System**: Tailwind CSS v3 + PostCSS
*   **Navigation & Routing**: React Router v7
*   **Data Storage**: Native Web LocalStorage API
*   **Icons**: Custom High-Fidelity Inline SVG (Bebas dari dependensi icon pack eksternal)

---

## 🚀 Panduan Menjalankan Secara Lokal

Pastikan Anda memiliki [Node.js](https://nodejs.org/) yang terpasang di sistem komputer Anda.

1.  **Clone Repositori**
    ```bash
    git clone <repository-url>
    cd motorcare
    ```

2.  **Instalasi Dependensi**
    ```bash
    npm install
    ```

3.  **Jalankan Server Pengembangan**
    ```bash
    npm run dev
    ```
    Buka tautan lokal yang tertera di terminal Anda (biasanya `http://localhost:5173`) untuk melihat aplikasi berjalan.

4.  **Proses Build untuk Produksi**
    ```bash
    npm run build
    ```

---

© 2026 Motorku — Panduan Servis Motor Terpercaya.
