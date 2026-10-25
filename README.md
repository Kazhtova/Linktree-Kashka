# Kashka Octora — Portfolio

Situs portofolio statis bergaya "arsip": latar hitam, tipografi serif besar, label monospace bernomor, intro yang bisa diputar ulang, dan efek *decrypt* saat scroll.

Dibuat hanya dengan **HTML, CSS, dan JavaScript murni**. Tanpa framework, tanpa proses build, tanpa dependensi.

## Struktur

```
index.html          ← seluruh konten
assets/style.css    ← desain
assets/script.js    ← intro, efek decrypt, reveal, menu mobile, copy email
.nojekyll           ← supaya GitHub Pages menyajikan file apa adanya
```

## Deploy ke GitHub Pages

1. Push semua file ke branch `main`.
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Source: Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
4. Situs aktif di `https://kazhtova.github.io/Linktree-Kashka/` dalam 1–2 menit. Setiap `git push` berikutnya otomatis memperbarui situs.

> Tip: jika repo diberi nama `kazhtova.github.io`, situs tampil di `https://kazhtova.github.io/`.

## Mengubah isi

- **Proyek:** salin satu blok `<li>` di bagian `02 / SELECTED WORKS` pada `index.html`, lalu ganti nomor `REC`, tautan, judul, deskripsi, dan teknologi.
- **Foto:** simpan sebagai `assets/foto.jpg`, lalu ikuti komentar di dalam `<figure class="fig">` pada `index.html`. Foto otomatis dibuat hitam-putih.
- **LinkedIn / TikTok:** ganti `<div class="ch-off">` menjadi `<a href="URL-kamu" target="_blank" rel="noopener noreferrer">` (ikuti pola GitHub di atasnya).
- **Warna aksen:** ubah `--accent` (dan `--accent-text` untuk teks kecil) di bagian atas `assets/style.css`.
- **Putar ulang intro:** tambahkan `?intro=1` di URL, atau klik *Replay intro* di footer. Intro hanya tampil sekali per tab dan dilewati jika pengguna memilih *reduced motion*.
