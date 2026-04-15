# 🚀 Pro File Uploader Engine v2.0 (GAS Edition)
**Pro File Uploader Engine** adalah solusi premium berbasis Google Apps Script (GAS) untuk mengunggah file langsung ke Google Drive melalui antarmuka Google Sheets. Didesain dengan standar industri, sistem ini menawarkan fitur *Drag & Drop*, *Real-time Progress*, dan integrasi cerdas ke database spreadsheet.
## 🔥 Fitur Unggulan (Pro Features)
 * **Modern Dark UI:** Antarmuka berbasis Tailwind CSS dengan tema *Slate Dark* yang elegan dan responsif.
 * **Drag & Drop Support:** Memudahkan user mengunggah file hanya dengan menyeretnya ke area upload.
 * **Real-time Progress Bar:** Memberikan indikator proses pengunggahan secara visual yang halus.
 * **Smart Image Preview:** Menampilkan pratinjau gambar secara instan sebelum proses upload dilakukan.
 * **Automatic Permission Handling:** Secara otomatis menyetel izin file menjadi "Public View" sehingga rumus =IMAGE() di Sheets tidak akan *error*.
 * **Enterprise Logging:** Mencatat setiap aktivitas upload termasuk Nama File, ID, URL, Ukuran, hingga email pengunggah ke sheet log.
 * **Safe Base64 Transfer:** Optimalisasi pengiriman data file untuk menghindari *timeout* pada script.
## 🛠️ Persyaratan Sistem
 1. Akun Google (Google Drive & Google Sheets).
 2. Folder ID di Google Drive untuk menampung file hasil upload.
 3. Google Sheets dengan dua tab bernama:
   * FORM (Untuk menampilkan foto/hasil utama).
   * DATAFILEFOTO (Untuk database log file).
## 🚀 Panduan Instalasi (Step-by-Step)
### 1. Persiapan Google Drive
 * Buat folder baru di Google Drive Anda.
 * Buka folder tersebut, dan ambil **ID Folder** dari URL browser Anda.
   *(Contoh URL: drive.google.com/drive/folders/1xlIHq... -> ID-nya adalah bagian setelah slash terakhir).*
### 2. Konfigurasi Apps Script
 * Buka Google Sheets Anda.
 * Klik menu **Extensions** > **Apps Script**.
 * Ganti nama file Code.gs bawaan dengan kode dari file Code.gs di repo ini.
 * Buat file HTML baru dengan nama MenuOpload (pastikan ejaannya tepat), lalu masukkan kode dari file MenuOpload.html.
### 3. Penyesuaian Kode
Pada file Code.gs, cari bagian CONFIG dan sesuaikan ID folder Anda:
```javascript
const CONFIG = {
  FOLDER_ID: 'PASTE_ID_FOLDER_ANDA_DISINI',
  SHEET_LOG: 'DATAFILEFOTO',
  SHEET_FORM: 'FORM',
  // ... setting lainnya
};

```
## 💡 Cara Penggunaan
 1. Jalankan fungsi showDialog() dari editor Apps Script (atau hubungkan ke tombol di Spreadsheet).
 2. Modal dialog akan muncul dengan antarmuka **Pro Uploader**.
 3. Pilih file atau *Drag & Drop* file ke area yang disediakan.
 4. Klik **MULAI UPLOAD**.
 5. Setelah berhasil, file akan tersimpan di Drive, dan gambar akan otomatis muncul di sel H5 pada sheet FORM.
## 📐 Arsitektur Sistem
 1. **Frontend:** HTML5, Tailwind CSS, SweetAlert2.
 2. **Backend:** Google Apps Script (Server-side JavaScript).
 3. **Database:** Google Sheets & Google Drive File System.
## 🛡️ Lisensi & Kredit
Project ini dikembangkan oleh **SPY-E / AI7 Studio**.
Distribusi dan penggunaan untuk tujuan komersial diperbolehkan dengan tetap mencantumkan kredit pengembang asli.
**Automate Your Workflow, Elevate Your Business.** © 2024 AI7 Studio Store.
