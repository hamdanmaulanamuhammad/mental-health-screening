<center>
<h1>Mental Health Care</h1>
Aplikasi Frontend Skrining Kesehatan Mental
</center>

## Gambaran Umum
Aplikasi web ini adalah antarmuka pengguna (UI) untuk sistem skrining kesehatan mental. Dibangun dengan **Vue.js** dan **Vite**, aplikasi ini menyediakan platform yang responsif dan interaktif bagi pengguna untuk melakukan asesmen DASS-21 dan mengelola data mereka. Aplikasi ini dirancang untuk berkomunikasi dengan layanan backend terpisah untuk otentikasi, logika bisnis, dan manajemen data.

## Fitur Utama
*   **Antarmuka Skrining Interaktif**: Menyediakan alur yang mudah digunakan untuk mengisi kuesioner DASS-21.
*   **Navigasi Cepat**: Menggunakan **Vue Router** untuk perpindahan halaman yang mulus di sisi klien tanpa perlu memuat ulang seluruh halaman.
*   **Desain Responsif**: Dibangun dengan **Tailwind CSS** agar dapat diakses dengan baik di berbagai perangkat, dari desktop hingga seluler.
*   **Komunikasi Terstruktur**: Menggunakan **Axios** untuk berinteraksi secara efisien dengan layanan backend melalui REST API.

## Struktur Proyek
Kode diatur secara modular untuk kemudahan pengembangan dan pemeliharaan. Berikut adalah rincian struktur direktori utama:

| Direktori        | Deskripsi                                                                                  |
|------------------|--------------------------------------------------------------------------------------------|
| `src/`           | Direktori utama yang berisi semua kode sumber aplikasi.                                    |
| `src/assets/`    | Berisi file statis seperti gambar, ikon, dan file CSS global.                              |
| `src/components/`| Berisi komponen-komponen Vue yang dapat digunakan kembali di berbagai bagian aplikasi.     |
| `src/router/`    | Berisi konfigurasi rute aplikasi menggunakan Vue Router.                                   |
| `src/services/`  | Berisi logika untuk berkomunikasi dengan API eksternal (`apiService.js`, `middlewareService.js`). |
| `src/views/`     | Berisi komponen-komponen Vue yang mewakili halaman atau tampilan utama aplikasi.           |
| `public/`        | Aset statis yang tidak diproses oleh *build tool* Vite dan disalin langsung ke direktori *output*. |
| `main.js`        | Titik masuk utama (entry point) dari aplikasi Vue.                                         |

---

## Komunikasi API
Aplikasi frontend ini mengonsumsi dua sistem api yang berbeda yaitu, [middleware](https://github.com/shluf/DASS21xSatuSehat) sebagai perantara antara web kuisioner dengan Satu Sehat dan [Backend DASS21](https://github.com/shluf/dass21-be) sebagai backend utama dari aplikasi ini. Logika untuk Interaksi ini diatur dalam direktori `src/services/`.

#### 1. Middleware Service (`http://localhost:8000`)
Layanan ini menangani otentikasi dan logika bisnis inti.
*   `POST /api/auth/register` - Mendaftarkan pengguna baru.
*   `POST /api/auth/login` - Login dan mendapatkan *access token*.
*   `GET /api/auth/user` - Mendapatkan detail pengguna yang sedang login.
*   `POST /api/dass21` - Mengirimkan skor DASS-21 untuk diproses.
*   `POST /api/register-patient` - Mendaftarkan pasien baru di SATUSEHAT.
*   `GET /api/locations` - Mendapatkan daftar lokasi faskes.
*   `POST /api/create-visit` - Membuat data kunjungan (Encounter) baru.

#### 2. Backend API Service (`http://localhost:8080`)
Layanan ini menangani operasi data murni (CRUD).
*   `POST /crud/participant/save` - Menyimpan data partisipan baru.
*   `GET /crud/participant/find` - Mengambil semua data partisipan.
*   `PUT /crud/participant/update` - Memperbarui data partisipan.
*   `POST /crud/response/save` - Menyimpan data respons dari kuesioner.
*   `GET /crud/response/find` - Mengambil semua data respons.

---

## Langkah-langkah Menjalankan Aplikasi

Berikut adalah panduan untuk menyiapkan dan menjalankan aplikasi frontend di lingkungan lokal.

**1. Prasyarat**
*   Pastikan **[Node.js](https://nodejs.org/)** (disarankan versi 18+) terinstal di sistem Anda. Ini sudah termasuk `npm` (Node Package Manager).
*   Telah menyelesaikan instalasi dan berhasil menjalankan **[Backend DASS21](https://github.com/shluf/dass21-be)**. Pastikan seluruh endpointnya dapat dijalankan dengan melakukan uji coba endpointnya dengan menggunakan collection postman berikut [Collection Postman Backend](https://documenter.getpostman.com/view/37974053/2sB2x3nDHa).
*   Telah menyelesaikan instalasi dan berhasil menjalankan **[Middleware](https://github.com/shluf/DASS21xSatuSehat)**. Pastikan seluruh endpointnya dapat dijalankan dengan melakukan uji coba endpointnya dengan menggunakan collection postman berikut [Collection Postman Middleware](https://documenter.getpostman.com/view/37974053/2sB2x3nDD7).



**2. Setup Proyek**

   A. **Kloning Repositori**
   
   Buka terminal, pindah ke direktori kerja Anda, dan kloning repositori ini.
   ```bash
   git clone https://github.com/hamdanmaulanamuhammad/mental-health-screening
   cd mental-health-screening-web
   ```

   B. **Instal Dependensi**
   
   Instal semua paket yang diperlukan yang tercantum dalam `package.json`:
   ```bash
   npm install
   ```

**3. Jalankan Server Pengembangan**
   Setelah instalasi selesai, jalankan server pengembangan menggunakan Vite:
   ```bash
   npm run dev
   ```
*   Perintah ini akan menjalankan aplikasi dalam mode pengembangan dengan fitur *hot-reload*.
*   Server akan tersedia di **http://localhost:5173** (atau port lain jika 5173 sudah digunakan).

**4. Opsi Tambahan**

*   **Build untuk Produksi**: Untuk membuat versi produksi dari aplikasi, jalankan:
    ```bash
    npm run build
    ```
    Hasilnya akan tersimpan di direktori `dist/`.

*   **Linting & Formatting**: Untuk memeriksa dan memperbaiki masalah konsistensi kode:
    ```bash
    npm run lint
    npm run format
    ```
