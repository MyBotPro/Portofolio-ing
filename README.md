# Portofolio My Ing — perbaikan desktop & sertifikat

Website portfolio statis (React yang sudah dibundel), siap diunggah ke hosting statis seperti GitHub Pages.

## Perbaikan dalam versi ini

- Layout desktop, tablet, dan mobile diperbaiki agar tidak ada bagian melebar keluar layar.
- Animasi latar tidak lagi membuat loop `requestAnimationFrame` baru setiap terjadi scroll.
- Bagian Home, About, Portfolio, dan Contact tidak bergantung pada animasi AOS agar teks bisa terlihat.
- Gambar cadangan di Home tetap tampil saat animasi eksternal Lottie gagal dimuat.
- Tab Projects dan Certificates sekarang benar-benar menampilkan isi data dari Firebase, bukan teks `Tidak Ada` yang ditulis permanen di kode.
- Data proyek dan sertifikat disimpan di cache browser; kegagalan membaca salah satu koleksi tidak menghapus isi koleksi yang lain.
- Sertifikat bawaan dapat selalu dilihat tanpa Firebase, baik sebagai gambar maupun PDF asli.
- File `certificates.jpg` ternyata PDF dengan ekstensi salah, sehingga diganti menjadi `certificates.pdf` + `certificates-preview.webp` yang valid.
- `Photo.png` ternyata JPG; telah diubah menjadi `Photo.jpg` dan referensinya diperbarui.
- BrowserRouter mendeteksi lokasi bundle untuk membantu deployment di subfolder GitHub Pages.

## Jalankan di komputer

Pada folder yang berisi `index.html` jalankan:

```bash
python -m http.server 8000
```

Kemudian buka `http://localhost:8000/`. Tidak perlu `npm install` karena file React asal sudah dalam bentuk hasil build (`sc.js`).

## Mengunggah ke GitHub Pages

1. Unggah **seluruh file dalam folder ini**, termasuk `portfolio-data.js`, `portfolio-fixes.css`, `certificates.pdf`, dan `certificates-preview.webp`, ke root repositori GitHub.
2. Buka **Settings → Pages**, pilih **Deploy from a branch**, branch `main`, folder **/(root)**, lalu simpan.
3. Tunggu GitHub Pages selesai deploy dan lakukan hard refresh (`Ctrl+Shift+R`) untuk menghindari file JS/CSS lama dari cache.

## Menambahkan sertifikat

Sertifikat lokal bawaan berada di `certificates.pdf` (gambar preview: `certificates-preview.webp`), dan pengaturannya pada objek `localCertificate` di `portfolio-data.js`. Sertifikat tambahan dari Firebase dibaca dari koleksi `certificates` dan otomatis dirender menggunakan beberapa nama properti umum, termasuk `Title`, `Img`, dan `Link`.

Jika koneksi Firebase atau aturan Firestore menolak permintaan, sertifikat lokal tetap muncul; data yang pernah dimuat sebelumnya tetap ada di cache browser. Koneksi Firestore dan konfigurasi akses tetap harus diatur pada proyek Firebase aslinya agar koleksi lain bisa dipublikasikan.

## Struktur

- `index.html` — titik masuk website
- `sc.js` — bundle React/Vite asli yang telah dipatch untuk masalah di atas
- `style.css` — stylesheet build bawaan
- `portfolio-fixes.css` — perbaikan responsive layout dan komponen kartu
- `portfolio-data.js` — normalisasi field Firebase, cache, dan sertifikat lokal
- `certificates.pdf` / `certificates-preview.webp` — sertifikat dan thumbnail

> ZIP asli hanya berisi **hasil build**, bukan source React/Vite (`src/`, `package.json`). Karena itu perbaikan React ditempatkan langsung dalam bundle JS yang ada. Simpan source React asli jika masih memilikinya untuk perubahan fitur besar di masa mendatang.
