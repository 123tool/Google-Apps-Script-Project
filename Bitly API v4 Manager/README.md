# 🚀 Bitly URL Shortener

Sistem manajemen pemendek URL (URL Shortener) profesional yang dibangun di atas **Google Apps Script** menggunakan **Bitly API v4**. Dilengkapi dengan fitur pelacakan klik otomatis dan sistem *Dual-Layer Caching* untuk performa maksimal.

---

## 🌟 Fitur Utama
* **API v4 Ready**: Menggunakan versi API Bitly terbaru yang stabil.
* **High Performance**: Dilengkapi `CacheService` untuk meminimalkan beban kuota `PropertiesService`.
* **Click Tracking**: Melacak jumlah klik secara real-time langsung dari skrip.
* **Modular Design**: Menggunakan pola *Namespace* (`BitlyApp`) untuk menghindari konflik variabel.
* **Secure**: Kredensial disimpan secara terenkripsi di `UserProperties` Google.

---

## 🛠️ Instalasi & Persiapan

### 1. Dapatkan API Token Bitly
1. Login ke akun [Bitly](https://bitly.com).
2. Masuk ke **Settings** > **API** > **Generate Token**.
3. Salin dan simpan token Anda.

### 2. Setup di Google Apps Script
1. Buka [Google Apps Script](https://script.google.com).
2. Salin kode dari file `Code.gs` ke editor Anda.
3. Jalankan fungsi `setupAwal()` untuk mengonfigurasi token dan GUID:
   ```javascript
   function setupAwal() {
     const token = "TOKEN_ANDA_DISINI";
     const guid = "GUID_ANDA_DISINI"; 
     Logger.log(BitlyApp.init(token, guid));
   }
