# Data Perawatan Motor Berdasarkan Tipe Saat Ini

Dokumen ini menyajikan seluruh data jadwal perawatan berkala, indikator kilometer (KM), dan data pemeriksaan rutin yang tersimpan di dalam sistem aplikasi saat ini. Informasi dipetakan secara spesifik untuk masing-masing **tipe motor** (20 tipe motor dari database `motorModels.json` dan `serviceData.json`).

---

## 1. Honda Beat 110 & Honda Scoopy

Kedua tipe motor matic entry air-cooled dari Honda ini memiliki kesamaan platform mesin eSP, sehingga jatah pemeliharaannya disatukan di sistem, kecuali V-Belt yang memiliki perlakuan khusus.

### A. Indikator KM & Jadwal Penggantian Rutin (`must_do`)
* **KM 1.000 (Servis Pertama):** 
  * Ganti Oli Mesin (1.000 KM Pertama)
* **Kelipatan 2.000 KM:** 
  * Ganti Oli Mesin (Rutin per 2.000 km) — Kapasitas eSAF/eSP baru adalah 650 ml.
* **Kelipatan 8.000 KM:** 
  * Ganti Oli Gardan (Setiap 8.000 - 10.000 km)
  * Bersihkan CVT (Setiap 8.000 km untuk mencegah gejala gredek)
* **Kelipatan 20.000 KM (Khusus Beat & Scoopy):** 
  * Ganti V-Belt (Early Replacement — Disarankan lebih cepat per 20.000 - 25.000 km di iklim tropis berdebu)
* **Kelipatan >25.000 KM (Servis Besar):**
  * Servis Besar Menyeluruh (Kuras kerak silinder)
  * Pembersihan Throttle Body Injeksi (Setiap 25.000 km)
  * Cek Kompresi Mesin & Celah Klep (Setiap 20.000 km)

### B. Data Pemeriksaan Rutin (`check`)
* **Pengecekan Awal (0 - 4.000 KM):** Tekanan angin ban, ketebalan kampas rem depan/belakang, lampu utama & lampu sein.
* **Pengecekan Berkala (4.000 - 20.000 KM):** Filter udara tipe viskos basah (tidak boleh disemprot), ketebalan kampas rem, kerenggangan busi, serta keretakan sabuk V-belt.
* **Pengecekan Jarak Jauh (>25.000 KM):** Kebocoran seal shockbreaker, laher/bearing roda, kelonggaran komstir, kabel seling gas/rem, dan fungsi pengereman total.

---

## 2. Honda Vario 125

Matic bervolume menengah ini menggunakan sistem pendingin cairan (liquid-cooled) yang menuntut perawatan termal tambahan.

### A. Indikator KM & Jadwal Penggantian Rutin (`must_do`)
* **Kelipatan 4.000 KM:** 
  * Ganti Oli Mesin (Rutin per 4.000 km) — Kapasitas 800 ml.
* **Kelipatan 5.000 KM:** 
  * Cek/Tambah Air Radiator (Coolant level check)
* **Kelipatan 10.000 KM:** 
  * Ganti Oli Gardan (Setiap 10.000 km)
* **Kelipatan 12.000 KM:** 
  * Kuras & Ganti Cairan Radiator (Setiap 12.000 - 24.000 km)
* **Kelipatan 24.000 KM:** 
  * Ganti Minyak Rem DOT 3 / DOT 4 (Setiap 2 tahun sekali)
* **Kelipatan >25.000 KM (Servis Besar):**
  * Servis Besar Menyeluruh
  * Pembersihan Throttle Body Injeksi (Setiap 25.000 km)
  * Cek Kompresi Mesin & Celah Klep (Setiap 20.000 km)

### B. Data Pemeriksaan Rutin (`check`)
* **Pengecekan Awal (0 - 12.000 KM):** Kebocoran radiator (coolant leakage), ketebalan kampas rem, pengapian busi.
* **Pengecekan Berkala (12.000 - 25.000 KM):** Retakan selang radiator, keausan water pump seal (weep hole check), ketebalan kampas rem cakram depan/belakang.
* **Pengecekan Jarak Jauh (>25.000 KM):** Shockbreaker seal, bearing komstir/roda, kabel gas, pengetesan pengereman total.

---

## 3. Honda Vario 160, Honda PCX 160, & Honda ADV 160

Trio matic premium bermesin eSP+ 4-valve 160cc pendingin cairan dengan fitur modern keyless remote.

### A. Indikator KM & Jadwal Penggantian Rutin (`must_do`)
* **Kelipatan 5.000 KM:** 
  * Cek/Tambah Air Radiator (Coolant level check)
* **Kelipatan 6.000 KM:** 
  * Ganti Oli Mesin (Rutin per 6.000 km) — Kapasitas 800 ml (850 ml jika kuras).
* **Kelipatan 10.000 KM:** 
  * Ganti Oli Gardan (Setiap 10.000 km)
* **Kelipatan 12.000 KM:** 
  * Penyetelan Celah Klep (Valve Clearance Check - Honda eSP+)
  * Kuras & Ganti Cairan Radiator (Setiap 12.000 - 24.000 km)
* **Kelipatan 20.000 KM:** 
  * Ganti Baterai Remote Keyless (CR2032 - Estimasi ganti per 2 tahun)
* **Kelipatan 24.000 KM:** 
  * Ganti Minyak Rem DOT 3 / DOT 4 (Setiap 2 tahun sekali)
* **Kelipatan >25.000 KM (Servis Besar):**
  * Servis Besar Menyeluruh & Pembersihan Throttle Body (Setiap 25.000 km)

### B. Data Pemeriksaan Rutin (`check`)
* **Pengecekan Awal (0 - 12.000 KM):** Fungsi dinamis kipas pendingin radiator otomatis, inspeksi kampas rem visual, retakan sabuk V-belt.
* **Pengecekan Berkala (12.000 - 25.000 KM):** Kebocoran selang radiator, peninjauan water pump seal, ketebalan kampas rem.
* **Pengecekan Jarak Jauh (>25.000 KM):** Seal shockbreaker teleskopik, kelonggaran bearing roda, komstir, filamen kabel gas, pengetesan pengereman total.

---

## 4. Yamaha NMAX 155 & Yamaha Aerox 155

Dua tipe matic premium pendingin cairan Yamaha bermesin Blue Core VVA (Variable Valve Actuation) dengan keyless remote.

### A. Indikator KM & Jadwal Penggantian Rutin (`must_do`)
* **Kelipatan 3.000 KM:** 
  * Ganti Oli Mesin (Rutin per 3.000 km) — Kapasitas 900 ml.
* **Kelipatan 5.000 KM:** 
  * Cek/Tambah Air Radiator
* **Kelipatan 8.000 KM:** 
  * Penyetelan Klep (Wajib per 8.000 km karena pengaruh VVA aktif di RPM tinggi)
* **Kelipatan 10.000 KM:** 
  * Ganti Oli Gardan (Setiap 10.000 km)
* **Kelipatan 12.000 KM:** 
  * Kuras & Ganti Cairan Radiator (Setiap 12.000 - 24.000 km)
* **Kelipatan 20.000 KM:** 
  * Ganti Baterai Remote Keyless (Setiap 2 tahun sekali)
* **Kelipatan 24.000 KM:** 
  * Ganti Minyak Rem DOT 4 (Setiap 2 tahun sekali)
* **Kelipatan >25.000 KM (Servis Besar):**
  * Servis Besar Menyeluruh & Pembersihan Throttle Body (Setiap 25.000 km)

### B. Data Pemeriksaan Rutin (`check`)
* **Pengecekan Awal (0 - 12.000 KM):** Fungsi hembusan kipas pendingin radiator, ketebalan kampas rem depan/belakang, kondisi fisik sabuk V-belt.
* **Pengecekan Berkala (12.000 - 25.000 KM):** Selang radiator, seal water pump weep-hole, ketebalan kampas rem.
* **Pengecekan Jarak Jauh (>25.000 KM):** Seal shockbreaker, bearing roda/komstir kaku, kabel gas, pengetesan pengereman total.

---

## 5. Yamaha Lexi 125

Tipe matic medium pendingin cairan Yamaha yang mewarisi silsilah arsitektur silinder dan katup VVA Maxi Series 155cc.

### A. Indikator KM & Jadwal Penggantian Rutin (`must_do`)
* **Kelipatan 3.000 KM:** 
  * Ganti Oli Mesin (Rutin per 3.000 km) — Kapasitas 900 ml.
* **Kelipatan 5.000 KM:** 
  * Cek/Tambah Air Radiator
* **Kelipatan 10.000 KM:** 
  * Ganti Oli Gardan (Setiap 10.000 km)
* **Kelipatan 12.000 KM:** 
  * Kuras & Ganti Cairan Radiator (Setiap 12.000 - 24.000 km)
* **Kelipatan 24.000 KM:** 
  * Ganti Minyak Rem (Setiap 2 tahun sekali)
* **Kelipatan >25.000 KM (Servis Besar):**
  * Servis Besar Menyeluruh & Pembersihan Throttle Body (Setiap 25.000 km)

### B. Data Pemeriksaan Rutin (`check`)
* **Pengecekan Awal (0 - 12.000 KM):** Kebocoran coolant radiator, ketebalan kampas rem depan/belakang, kondisi pengapian busi.
* **Pengecekan Berkala (12.000 - 25.000 KM):** Selang radiator kaku, keausan seal water pump, ketebalan kampas rem.
* **Pengecekan Jarak Jauh (>25.000 KM):** Seal shockbreaker depan, bearing roda, komstir seret, seling kabel gas.

---

## 6. Yamaha Fazzio & Yamaha Grand Filano

Tipe matic entry Yamaha berteknologi Hybrid-Assist pendingin udara dengan sistem keyless remote.

### A. Indikator KM & Jadwal Penggantian Rutin (`must_do`)
* **KM 1.000 (Servis Pertama):** 
  * Ganti Oli Mesin (1.000 KM Pertama)
* **Kelipatan 3.000 KM:** 
  * Ganti Oli Mesin (Rutin per 3.000 km) — Kapasitas 800 ml.
* **Kelipatan 6.000 KM:** 
  * Cek Tegangan Aki (Sistem Hybrid assist membutuhkan voltase aki >12.4V)
* **Kelipatan 8.000 KM:** 
  * Ganti Oli Gardan (Setiap 8.000 - 10.000 km)
  * Bersihkan CVT (Setiap 8.000 km untuk cegah gredek)
* **Kelipatan 20.000 KM:** 
  * Ganti Baterai Remote Keyless (CR2032 - per 2 tahun)
* **Kelipatan >25.000 KM (Servis Besar):**
  * Servis Besar Menyeluruh & Pembersihan Throttle Body (Setiap 25.000 km)

### B. Data Pemeriksaan Rutin (`check`)
* **Pengecekan Awal (0 - 4.000 KM):** Tekanan ban, kampas rem, lampu utama/ sein, Tegangan Aki (Hybrid Assist khusus Fazzio & Filano).
* **Pengecekan Berkala (4.000 - 20.000 KM):** Filter udara viscous paper, keausan kampas rem, pengapian busi, retakan sabuk V-belt.
* **Pengecekan Jarak Jauh (>25.000 KM):** Seal shockbreaker, bearing roda, komstir kaku, kabel gas, pengereman total.

---

## 7. Yamaha Mio M3 & Yamaha Gear 125

Tipe matic entry pendingin udara Yamaha bermesin Blue Core 125cc konvensional (non-keyless).

### A. Indikator KM & Jadwal Penggantian Rutin (`must_do`)
* **KM 1.000 (Servis Pertama):** 
  * Ganti Oli Mesin (1.000 KM Pertama)
* **Kelipatan 3.000 KM:** 
  * Ganti Oli Mesin (Rutin per 3.000 km) — Kapasitas 800 ml.
* **Kelipatan 8.000 KM:** 
  * Ganti Oli Gardan (Setiap 8.000 - 10.000 km)
  * Bersihkan CVT (Setiap 8.000 km)
* **Kelipatan >25.000 KM (Servis Besar):**
  * Servis Besar Menyeluruh & Pembersihan Throttle Body (Setiap 25.000 km)

### B. Data Pemeriksaan Rutin (`check`)
* **Pengecekan Awal (0 - 4.000 KM):** Tekanan ban, kampas rem depan/belakang, kelayakan fungsi lampu.
* **Pengecekan Berkala (4.000 - 20.000 KM):** Filter udara, ketebalan kampas rem, kondisi elektroda busi, keretakan sabuk V-belt.
* **Pengecekan Jarak Jauh (>25.000 KM):** Seal shockbreaker bocor, bearing roda goyang, komstir berat, filamen kabel gas kaku.

---

## 8. Suzuki Nex II

Tipe matic entry pendingin udara Suzuki dengan spesifikasi kapasitas oli mesin khusus.

### A. Indikator KM & Jadwal Penggantian Rutin (`must_do`)
* **Kelipatan 2.500 KM (Kondisi Berat/Komuter):** 
  * Ganti Oli Mesin — Kapasitas 800 ml (SGO 4T SP 10W40).
* **Kelipatan 8.000 KM:** 
  * Ganti Oli Gardan (Setiap 8.000 km)
  * Bersihkan CVT (Setiap 8.000 km)
* **Kelipatan >25.000 KM (Servis Besar):**
  * Servis Besar Menyeluruh & Pembersihan Throttle Body (Setiap 25.000 km)

### B. Data Pemeriksaan Rutin (`check`)
* **Pengecekan Awal & Berkala (0 - 20.000 KM):** Tekanan angin ban (cegah ban botak), ketebalan kampas rem depan/belakang.
* **Pengecekan Jarak Jauh (>25.000 KM):** Seal suspensi depan (shockbreaker), bearing roda/ laher komstir kaku, kabel gas/rem, pengereman total.

---

## 9. Suzuki Satria F150

Tipe motor manual performa tinggi DOHC 150cc kopling basah dari Suzuki.

### A. Indikator KM & Jadwal Penggantian Rutin (`must_do`)
* **Kelipatan 2.500 KM:** 
  * Ganti Oli Mesin (Khusus DOHC) — Kapasitas 1,3 liter (1,4 liter jika ganti filter). Wajib JASO MA2.
* **Kelipatan 20.000 KM:** 
  * Penyetelan Celah Klep (DOHC Valve Clearance)
  * Servis Besar (Kuras kerak silinder mesin DOHC)
* **Kelipatan >25.000 KM (Servis Besar):**
  * Servis Besar Menyeluruh & Pembersihan Throttle Body (Setiap 25.000 km)

### B. Data Pemeriksaan Rutin (`check`)
* **Pengecekan Awal & Berkala (0 - 25.000 KM):** Setelan jarak main kabel kopling basah (cegah kopling selip dan perpindahan keras).
* **Pengecekan Jarak Jauh (>25.000 KM):** Seal shockbreaker teleskopik depan, bearing roda, komstir kaku, filamen kabel gas, pengereman total.

---

## 10. Honda Supra X 125 & Honda Revo

Tipe motor manual bebek (cub) komuter pendingin udara konvensional dari Honda.

### A. Indikator KM & Jadwal Penggantian Rutin (`must_do`)
* **Kelipatan 3.000 KM:** 
  * Ganti Oli Mesin (Shared Sump JASO MA) — Kapasitas 800 ml.
* **Kelipatan 8.000 KM:** 
  * Ganti Busi (Elektroda nikel standar bebek)
* **Kelipatan 10.000 KM:** 
  * Penyetelan Klep (Siklus kelonggaran katup mesin bebek)
* **Kelipatan 15.000 KM:** 
  * Periksa Mulur Rantai & Ketajaman Gir (Sprocket set check)
* **Kelipatan >25.000 KM (Servis Besar):**
  * Servis Besar Menyeluruh & Pembersihan Throttle Body (Setiap 25.000 km)

### B. Data Pemeriksaan Rutin (`check`)
* **Pengecekan Awal & Berkala (0 - 25.000 KM):** Jarak renggang tuas kopling mekanis/kopling otomatis ganda, kondisi filter udara kertas kering (dapat dibersihkan).
* **Pengecekan Jarak Jauh (>25.000 KM):** Seal shockbreaker depan/belakang, bearing roda goyang, komstir kaku, filamen kabel gas/rem, pengereman tromol/cakram total.

---

## 11. Honda CRF150L, Yamaha Vixion, & Yamaha R15

Tipe motor manual sport pendingin cairan & pendingin udara berkecepatan tinggi dengan transmisi manual.

### A. Indikator KM & Jadwal Penggantian Rutin (`must_do`)
* **Kelipatan 3.000 KM:** 
  * Ganti Oli Mesin (Shared Sump JASO MA/MA2) — Kapasitas 1,0 liter.
* **Kelipatan 8.000 KM:** 
  * Ganti Busi (Busi performa nikel/iridium)
* **Kelipatan 10.000 KM:** 
  * Penyetelan Klep (Valve Clearance check sport engine)
* **Kelipatan 15.000 KM:** 
  * Periksa Mulur Rantai & Ketajaman Gir (Gir tajam merusak rantai dengan cepat)
* **Kelipatan >25.000 KM (Servis Besar):**
  * Servis Besar Menyeluruh & Pembersihan Throttle Body (Setiap 25.000 km)

### B. Data Pemeriksaan Rutin (`check`)
* **Pengecekan Awal & Berkala (0 - 25.000 KM):** Kabel kopling (lumasi secara berkala agar tidak kaku), filter udara (filter kotor memicu tarikan sport 'ngempos').
* **Pengecekan Jarak Jauh (>25.000 KM):** Seal suspensi karet teleskopik/upside down, bearing as roda/ bearing swing arm goyang, komstir kaku, filamen kawat seling kabel gas, pengereman total.
