## ⚙️ Account Gmail Manager by 123Tool

> Solusi otomatisasi *enterprise* tingkat tinggi untuk manajemen dan pembuatan akun Google Workspace secara massal, dirancang dan dieksekusi secara eksklusif di dalam ekosistem **Google Apps Script**. Tidak memerlukan Termux, VPS, atau *hosting* eksternal lainnya.

## 📌 Deskripsi Proyek
**Account Gmail Manager** adalah alat administrasi yang kuat dan ringan untuk melakukan otomatisasi pembuatan akun pengguna secara terprogram. Dengan memanfaatkan **Google Workspace Admin SDK Directory API**, alat ini memungkinkan *deployment* ratusan akun secara instan, legal, dan aman tanpa risiko deteksi *anti-abuse* atau kebutuhan *bypass* verifikasi yang rumit. 

## ✨ Fitur

### 1. Arsitektur Native
* **100% Google Apps Script:** Eksekusi kode sepenuhnya berjalan di infrastruktur Google. Nol ketergantungan pada *server* pihak ketiga.
* **No Hardcoded Secrets:** Menggunakan `PropertiesService` untuk manajemen kredensial dan konfigurasi yang aman.
* **Integrasi Resmi API:** Menggunakan Admin Directory API untuk pembuatan akun yang sah dengan tingkat keberhasilan 100% tanpa *flagging* keamanan.

### 2. Antarmuka UI Pengguna Sederhana
* **Dasbor Statistik Real-Time:** Lacak total eksekusi, tingkat keberhasilan, dan kegagalan langsung dari konsol *frontend*.
* **Responsive Layout:** Antarmuka bergaya kartu (*card-based*) yang elegan dan mudah digunakan.

### 3. Manajemen Data & Logging
* **Auto-Save JSON:** Otomatis menyimpan metadata akun (email, nama, status) ke dalam file `.json` terstruktur di Google Drive.
* **Laporan Terperinci:** Pencatatan *error handling* yang tangguh jika terjadi anomali pemrosesan data.

## 🚀 Panduan Instalasi & Deployment

1. **Buat Proyek Apps Script:**
   Buka [script.google.com](https://script.google.com/) dan buat proyek baru.
2. **Aktifkan Admin Directory API:**
   * Di editor Apps Script, buka menu **Layanan** (ikon plus `+` di panel kiri).
   * Cari dan tambahkan **Admin Directory API**.
3. **Salin Source Code:**
   * Masukkan kode *backend* ke dalam `Code.gs`.
   * Buat file HTML baru bernama `Index.html` dan masukkan kode *frontend* UI.
4. **Konfigurasi Properti Skrip:**
   * Masuk ke **Pengaturan proyek** (ikon roda gigi).
   * Tambahkan konfigurasi yang diperlukan di bagian **Properti skrip** (misalnya `DEFAULT_DOMAIN`).
5. **Deploy sebagai Web App:**
   * Klik tombol **Terapkan** (Deploy) > **Deployment baru**.
   * Pilih jenis **Aplikasi Web**.
   * Setel akses sesuai kebutuhan (disarankan: *Hanya saya* atau *Pengguna di domain Anda* untuk keamanan).

## 🛠️ Stack
* **Backend:** JavaScript (V8 Engine) via Google Apps Script
* **Frontend:** HTML5, CSS3, Google HtmlService
* **API:** Google Workspace Admin SDK Directory API
* **Storage:** Google Drive API (JSON format)

---

### 👨‍💻 Dikelola **SPY-E** & **123Tool** 
*Catatan: Alat ini ditujukan untuk penggunaan administratif yang sah di dalam ekosistem Google Workspace. Pengguna wajib mematuhi Ketentuan Layanan Google API dalam penggunaannya.*
