# Kashka Octora — Portfolio

Situs portofolio statis bergaya "arsip": latar hitam, tipografi serif besar, label monospace bernomor, intro yang bisa diputar ulang, dan efek *decrypt* saat scroll.

Dibuat hanya dengan **HTML, CSS, dan JavaScript murni**. Tanpa framework, tanpa proses build, tanpa dependensi.

**Live:** https://kazhtova.github.io/portfolio/

---

## Struktur

```
index.html          ← seluruh konten
assets/style.css    ← desain
assets/script.js    ← intro, efek decrypt, reveal, menu mobile, copy email
assets/moon.webp    ← ilustrasi ornamen di footer
.nojekyll           ← supaya GitHub Pages menyajikan file apa adanya
```

## Menjalankan secara lokal

Buka `index.html` di browser, atau jalankan lewat ekstensi Live Server di VS Code (`http://127.0.0.1:5500`).

## Deploy ke GitHub Pages

1. Push semua file ke branch `main`.
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Source: Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
4. Situs aktif di `https://kazhtova.github.io/portfolio/` dalam 1–2 menit. Setiap `git push` berikutnya otomatis memperbarui situs.

> Tip: jika repo diberi nama `kazhtova.github.io`, situs tampil di `https://kazhtova.github.io/` tanpa nama repo di belakangnya.

## Mengubah isi

- **Proyek:** salin satu blok `<li>` di bagian `02 / SELECTED WORKS` pada `index.html`, lalu ganti nomor `REC`, tautan, judul, deskripsi, dan teknologi. Perbarui juga teks `RECORD / 001—003`.
- **Teknologi:** ubah daftar di bagian `03 / MANIFEST`.
- **Foto:** simpan sebagai `assets/foto.jpg`, lalu ikuti komentar di dalam `<figure class="fig">` pada `index.html`. Foto otomatis dibuat hitam-putih.
- **LinkedIn / TikTok:** ganti `<div class="ch-off">` menjadi `<a href="URL-kamu" target="_blank" rel="noopener noreferrer">` (ikuti pola GitHub di atasnya).
- **Warna aksen:** ubah `--accent` (dan `--accent-text` untuk teks kecil) di bagian atas `assets/style.css`.
- **Ornamen footer:** ganti `assets/moon.webp` dengan gambar lain, atau hapus baris `<img class="colo-art" …>` di `index.html`.
- **Putar ulang intro:** tambahkan `?intro=1` di URL, atau klik *Replay intro* di footer. Intro hanya tampil sekali per tab dan dilewati jika pengguna memilih *reduced motion*.

## Font

[Bodoni Moda](https://fonts.google.com/specimen/Bodoni+Moda), [Inter Tight](https://fonts.google.com/specimen/Inter+Tight), dan [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono), dimuat dari Google Fonts.
