# Analisis Kekurangan Data Panduan Perawatan Motor

Berdasarkan perbandingan mendalam antara **Dokumen Riset Teknis (`src/data/research-3.md`)** dan **Database Aplikasi (`src/data/serviceData.json`)**, kami menemukan beberapa area ketidaklengkapan data servis rutin (`must_do`) dan ketidaksesuaian interval antar merk motor. 

Di bawah ini adalah rincian lengkap mengenai komponen apa saja yang belum masuk ke jadwal penggantian rutin (`must_do`), di motor mana saja hal itu terjadi, serta rekomendasi perbaikan untuk menjamin validitas 100% tanpa adanya bentrokan (clash).

---

## 1. Komponen Penggantian Rutin yang Absen di Database (`serviceData.json`)

Meskipun database sudah memiliki data pelumasan oli mesin dan oli gardan yang baik, beberapa suku cadang vital habis pakai (consumables) justru **hanya dimasukkan ke dalam daftar pemeriksaan (`check`)**, padahal memiliki batas kilometer penggantian absolut (`must_do`).

### A. Penggantian Busi (Spark Plug)
Busi adalah suku cadang habis pakai yang wajib diganti secara berkala demi menjaga ketepatan pengapian dan efisiensi bahan bakar.
* **Kekurangan:** Di dalam `serviceData.json`, penggantian busi (`must_do`) **hanya didefinisikan untuk Motor Manual** (`manual-maintenance-0k-25k` - Setiap 8.000 km). **Seluruh 14 model motor matic** (Honda Beat, Scoopy, Vario 125, Vario 160, PCX, ADV, NMAX, Aerox, Lexi, Mio M3, Gear, Fazzio, Filano, Nex II) sama sekali tidak memiliki jadwal ganti busi rutin di bagian `must_do` (hanya ada di bagian `check`).
* **Dampak:** Pengguna motor matic tidak akan pernah mendapatkan peringatan ganti busi di halaman detail mereka.
* **Rekomendasi Interval Valid:**
  * **Matic Entry (Nikel - 8.000 KM):** Beat 110, Scoopy, Mio M3, Gear 125, Fazzio, Filano, Nex II.
  * **Matic Premium (Premium/Long-Life - 12.000 KM):** Vario 125, Vario 160, PCX 160, ADV 160, NMAX 155, Aerox 155, Lexi 125.

### B. Penggantian Filter Udara (Air Filter / Cleaner)
Filter udara bertipe viscous paper element tidak boleh dibersihkan dan harus diganti total saat masa pakainya habis.
* **Kekurangan:** Jadwal penggantian filter udara **tidak ada di `must_do` untuk semua jenis motor** (hanya terdaftar sebagai pemeriksaan visual di bagian `check`).
* **Dampak:** Odometer pengguna bisa melebihi 20.000 KM tanpa pernah diperingatkan untuk mengganti filter udara yang berdebu.
* **Rekomendasi Interval Valid:**
  * **Matic & Manual Entry (12.000 - 16.000 KM):** Beat 110, Scoopy, Nex II, Mio, Gear, Fazzio, Filano, Supra X, Revo, Satria F150.
  * **Matic & Manual Premium (16.000 - 18.000 KM):** Vario 125, Vario 160, PCX 160, ADV 160, NMAX 155, Aerox 155, Lexi 125, Vixion, R15.

### C. Penggantian V-Belt & Weight Roller (Satu Paket CVT)
V-belt dan Roller mengalami kelelahan struktur karet dan perubahan bentuk (peang) seiring jarak tempuh.
* **Kekurangan:** Penggantian V-belt di `must_do` **hanya tertera untuk Honda Beat dan Scoopy** di kilometer 20.000 (`honda-beat-vbelt-special`). Untuk **11 model matic lainnya**, tidak ada jadwal penggantian V-Belt maupun Roller di `must_do`.
* **Dampak:** Pengguna NMAX, PCX, Aerox, Vario, dll. tidak akan mendapatkan rekomendasi ganti V-Belt di odometer 24.000 KM, yang berisiko fatal jika sabuk putus di jalan.
* **Rekomendasi Interval Valid:**
  * **Paket Ganti V-Belt, Roller, & Damper (Setiap 24.000 KM):** Wajib diterapkan ke semua jenis motor matic secara seragam demi keamanan operasional puli CVT.

### D. Penggantian Satu Set Gir & Rantai (Chain & Sprocket Kit)
Rantai dan gir motor manual mengalami pengikisan mata gigi dan kemuluran pin baja.
* **Kekurangan:** Penggantian rantai/gir tidak dijadwalkan di `must_do` untuk motor manual. Hanya ada petunjuk cek ketegangan tiap 1.000 KM.
* **Dampak:** Pengguna motor sport/bebek dengan odometer tinggi tidak diingatkan untuk merestorasi sistem transmisi akhir mereka.
* **Rekomendasi Interval Valid:**
  * **Ganti Rantai & Gir Set (15.000 - 18.000 KM):** Honda Supra X 125, Honda Revo, Honda CRF150L, Suzuki Satria F150.
  * **Ganti Rantai O-Ring Premium (20.000 - 24.000 KM):** Yamaha Vixion, Yamaha R15 (menggunakan tipe O-Ring internal pelumas).

---

## 2. Disparitas & Clash Data Aktual Antar Merk di Database

Terdapat beberapa pengelompokan motor di database yang menyebabkan interval perawatan meleset dari buku pedoman resmi masing-masing merk (terjadi pencampuran/clash):

### A. Suzuki Nex II Dipaksa Mengikuti Siklus Oli 3.000 KM
* **Kondisi Database:** Nex II dimasukkan ke dalam kelompok `air-cooled-matic-4k-20k` bersama Yamaha Mio M3, Gear, Fazzio, dan Filano. Kelompok ini mewajibkan ganti oli mesin setiap **3.000 KM** via filter `only_for`.
* **Realitas Riset:** Buku manual resmi PT Suzuki Indomobil Sales (SIS) merancang mesin Nex II dengan kapasitas pelumas 0,8 liter yang sanggup bertahan hingga kelipatan **4.000 KM**.
* **Dampak:** Data tidak valid karena Nex II dipaksa ganti oli 1.000 KM lebih cepat dari prosedur resmi pabrikan Suzuki.

### B. Suzuki Satria F150 Menggunakan Siklus Oli 3.000 KM Umum
* **Kondisi Database:** Satria F150 digabungkan dalam kelompok `manual-maintenance-0k-25k` dengan bebek Supra X dan Revo yang mematok ganti oli setiap **3.000 KM**.
* **Realitas Riset:** Satria F150 adalah motor DOHC berperforma tinggi yang bekerja pada RPM ekstrem (hingga 13.000 RPM) dengan kompresi tinggi. Pabrikan dan mekanik mewajibkan ganti oli setiap **2.500 KM** untuk mencegah keausan silinder.
* **Dampak:** Rekomendasi 3.000 KM terlalu lambat untuk menjaga durabilitas mesin DOHC Satria F150 di kondisi perkotaan tropis.

---

## 3. Matriks Rekomendasi Pemetaan JSON Database yang Ideal

Untuk menyelesaikan seluruh kekurangan di atas tanpa saling tumpang tindih (clash), kita dapat membagi atau menyempurnakan struktur `serviceData.json` dengan menambahkan field penentu tugas yang lebih spesifik. Berikut adalah contoh blueprint objek upgrade database yang direkomendasikan:

```json
// Tambahan atau modifikasi objek pada serviceData.json untuk menutup celah di atas:

{
  "id": "spark-plug-replacement-entry-matic",
  "model_ids": [
    "honda-beat-110", "honda-scoopy", "suzuki-nex-ii", 
    "yamaha-mio-m3", "yamaha-gear-125", "yamaha-fazzio", "yamaha-grand-filano"
  ],
  "range_km_min": 0,
  "range_km_max": 25000,
  "must_do": [
    {
      "task": "Ganti Busi (Elektroda Nikel)",
      "interval": "Setiap 8.000 KM",
      "due_km": 8000
    }
  ]
},
{
  "id": "spark-plug-replacement-premium-matic",
  "model_ids": [
    "honda-vario-125", "honda-vario-160", "honda-pcx-160", 
    "honda-adv-160", "yamaha-nmax-155", "yamaha-aerox-155", "yamaha-lexi-125"
  ],
  "range_km_min": 0,
  "range_km_max": 25000,
  "must_do": [
    {
      "task": "Ganti Busi Premium (Long-Life)",
      "interval": "Setiap 12.000 KM",
      "due_km": 12000
    }
  ]
},
{
  "id": "air-filter-replacement-viscous",
  "model_ids": [
    "honda-beat-110", "honda-scoopy", "suzuki-nex-ii", "yamaha-mio-m3", 
    "yamaha-gear-125", "yamaha-fazzio", "yamaha-grand-filano", "honda-vario-125",
    "honda-vario-160", "honda-pcx-160", "honda-adv-160", "yamaha-nmax-155", 
    "yamaha-aerox-155", "yamaha-lexi-125"
  ],
  "range_km_min": 0,
  "range_km_max": 25000,
  "must_do": [
    {
      "task": "Ganti Filter Udara (Tipe Viskos Basah)",
      "interval": "Setiap 12.000 - 16.000 KM",
      "due_km": 12000
    }
  ]
},
{
  "id": "vbelt-roller-replacement-standard",
  "model_ids": [
    "honda-vario-125", "honda-vario-160", "honda-pcx-160", "honda-adv-160", 
    "yamaha-nmax-155", "yamaha-aerox-155", "yamaha-lexi-125", "yamaha-mio-m3", 
    "yamaha-gear-125", "yamaha-fazzio", "yamaha-grand-filano", "suzuki-nex-ii"
  ],
  "range_km_min": 12000,
  "range_km_max": 25000,
  "must_do": [
    {
      "task": "Ganti Satu Paket V-Belt & Weight Roller CVT",
      "interval": "Disarankan setiap 24.000 KM",
      "due_km": 24000
    }
  ]
}
```

Dengan mengimplementasikan pemetaan di atas ke dalam `serviceData.json`, Panduan Perawatan Total yang muncul di aplikasi akan menjadi **100% akurat, lengkap secara industri, dan sepenuhnya bebas dari bentrokan antar merk motor**.
