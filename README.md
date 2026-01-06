# Aplikasi Dashboard Film

Aplikasi web untuk mengelola film dengan sistem login, dibuat dengan React di frontend dan Express di backend.

## Deskripsi

Ini adalah aplikasi dashboard sederhana untuk melihat, menambah, dan menghapus data film. Ada sistem login dengan JWT token dan bisa menyimpan data dalam file JSON. Tampilan desainnya punya mode terang dan gelap yang bisa diubah sesuai keinginan.

## Fitur

**Login dan Keamanan**
Bisa login pakai username dan password. Sistemnya pakai JWT token dan disimpan di browser.

**Manajemen Film**
Lihat daftar film dalam bentuk grid, tambah film baru dengan data lengkap, atau hapus film yang enggak mau. Data film disimpan di file JSON dan bisa berubah langsung tanpa perlu refresh.

**Tema**
Pilih antara mode terang atau gelap. Tampilan akan berubah sesuai pilihan kamu.

## Install dan Setup

**Yang perlu:**
- Node.js (versi 14 ke atas)
- npm atau yarn

**Cara install:**

1. Buka folder project di terminal:
   ```bash
   cd "c:\tugas pak ari\CRUD Movies Database"
   ```

2. Install library di folder utama:
   ```bash
   npm install
   ```

3. Masuk ke folder server dan install library juga:
   ```bash
   cd server
   npm install
   cd ..
   ```

4. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

   Atau kalau mau jalankan terpisah:
   - Frontend saja: `npm run client` (buka di http://localhost:5173)
   - Backend saja: `npm run server` (jalankan di http://localhost:3000)

## Struktur Folder

Folder-foldernya gini:

`index.html` - File HTML utama
`package.json` - Konfigurasi project dan library yang dipakai
`vite.config.js` - Pengaturan Vite

Folder `src/` berisi kode frontend:
- `main.jsx` - File awal React
- `App.jsx` - Komponen utama
- `App.css` dan `index.css` - Styling
- Folder `components/` - Tempat komponen-komponen React (Dashboard, LoginForm, ThemeToggle)
- Folder `data/` - File `movies.json` untuk data film

Folder `server/` berisi backend:
- `index.js` - File awal server
- `package.json` - Library untuk backend
- Folder `routes/` - File `auth.js` (login) dan `movies.js` (CRUD film)

## Teknologi yang Dipakai

**Di Frontend:**
- React.js - Library untuk bikin UI
- Vite - Build tool yang cepat untuk development
- SweetAlert2 - Notifikasi yang bagus
- CSS3 - Styling biasa

**Di Backend:**
- Node.js dengan Express - Framework untuk buat API
- JWT - Untuk sistem login/token
- CORS - Biar request bisa lintas domain
- dotenv - Untuk manage konfigurasi
- JSON file - Tempat nyimpan data film (gak perlu database)
## Konfigurasi

Di folder `server/` ada file `.env` yang berisi:

```env
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your-secret-key-change-this-in-production
```

Ubah `JWT_SECRET` kalau mau pake di production nanti. Username dan password bisa disesuaikan juga.

## Cara Pakai

**Login:**
Buka `http://localhost:5173` terus masuk pakai:
- Username: `admin`
- Password: `admin123`

**Lihat Film:**
Habis login, kamu bisa lihat daftar film dalam bentuk kotak-kotak.

**Tambah Film:**
Klik tombol "Add Movie" di atas, isi data film (judul, tahun, rating IMDB, URL banner, genre, sinopsis), terus klik add.

**Hapus Film:**
Arahkan ke kartu film, klik ikon trash, konfirmasi di popup.

**Ubah Tema:**
Klik ikon matahari atau bulan di atas untuk ganti tema terang atau gelap.

**Logout:**
Klik tombol logout di atas.

## API

**Login:**
POST `/api/auth/login`
Kirim `username` dan `password`, dapat balasan `token`.

**Verifikasi Token:**
POST `/api/auth/verify`
Header `Authorization: Bearer [token]`

**Lihat Film:**
GET `/api/movies`
Dapat daftar semua film.

**Tambah Film:**
POST `/api/movies`
Kirim data film (title, year, imdbRating, banner, genres, synopsis).

**Hapus Film:**
DELETE `/api/movies/:id`
Hapus film berdasarkan ID-nya.

## Data Film

Data film disimpan di file `src/data/movies.json`. Kalau kamu tambah atau hapus film, file ini bakal terupdate otomatis.

## Kalau Ada Masalah

**Server enggak terhubung?**
- Pastiin server backend udah jalan di port 5000
- Cek apakah ada aplikasi lain pakai port 5000
- Lihat kembali file `.env` di folder server

**Login gagal?**
- Pastiin file `.env` ada di folder server
- Cek username dan password di `.env`
- Pastiin server udah jalan

**Port udah terpakai?**
- Kalau port 5173 ato 5000 udah pakai, server akan coba port lain
- Atau ubah `PORT` di file `.env`



