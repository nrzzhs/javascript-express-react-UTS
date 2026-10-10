# Daftar Teman Teman Aji

Aplikasi mobile CRUD (Create, Read, Update, Delete) untuk mengelola daftar teman, lengkap dengan upload foto.

Dibuat sebagai bagian dari kelas **FullStack JavaScript Developer dengan Express dan React Native** di Santri Koding.

**Nama:** Nur Azizah Santoso
**NIM:** 2400655

## Teknologi

- **Frontend:** React Native 0.77, React Navigation, Axios, react-native-image-picker
- **Backend:** Express.js, Prisma ORM, MySQL, Multer (upload gambar)

## Fitur

- Menampilkan daftar teman beserta foto
- Menambah teman baru (nama, deskripsi, foto)
- Mengedit data teman
- Menghapus teman (dengan konfirmasi)

## Struktur Folder

```
javascript-express-react-UTS/
├── backend-express/     # REST API (Express + Prisma)
└── LearnReactNative/    # Aplikasi mobile (React Native)
```

## Cara Menjalankan

### 1. Backend

```bash
cd backend-express
npm install
```

Salin `.env.example` menjadi `.env`, lalu sesuaikan `DATABASE_URL`. Nyalakan MySQL (XAMPP/Laragon), lalu:

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

Server berjalan di `http://localhost:3000`.

### 2. React Native

```bash
cd LearnReactNative
npm install
```

Salin `.env.example` menjadi `.env`. Untuk emulator Android, gunakan:

```
BACKEND_API_URL=http://10.0.2.2:3000
```

Jalankan Metro, lalu di terminal lain jalankan aplikasi:

```bash
npx react-native start
npm run android
```

## Endpoint API

| Method | Endpoint         | Fungsi             |
| ------ | ---------------- | ------------------ |
| GET    | /api/posts       | Ambil semua data   |
| GET    | /api/posts/:id   | Ambil satu data    |
| POST   | /api/posts       | Tambah data        |
| PUT    | /api/posts/:id   | Ubah data          |
| DELETE | /api/posts/:id   | Hapus data         |

## Screenshot

*(Tambahkan screenshot aplikasi di sini)*
