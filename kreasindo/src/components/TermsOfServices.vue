<template>
  <section class="tos-section">
    <div class="container">
      <h2 class="title">Terms of Service</h2>
      <p class="intro">
        Dengan menggunakan website CV. Kreasindo Jaya, Anda menyetujui syarat dan ketentuan berikut. Harap baca dengan seksama sebelum menggunakan layanan kami.
      </p>

      <div class="tos-content">
        <div class="tos-item">
          <h3>1. Penggunaan Layanan</h3>
          <p>
            Anda setuju menggunakan website ini hanya untuk tujuan yang sah dan sesuai dengan hukum yang berlaku. Penggunaan untuk kegiatan ilegal atau merugikan pihak lain dilarang.
          </p>
        </div>

        <div class="tos-item">
          <h3>2. Konten Website</h3>
          <p>
            Semua konten, termasuk teks, gambar, logo, dan materi digital lainnya, adalah milik CV. Kreasindo Jaya atau pihak yang telah memberi izin. Konten tidak boleh disalin, disebarluaskan, atau digunakan tanpa izin resmi.
          </p>
        </div>

        <div class="tos-item">
          <h3>3. Akurasi Informasi</h3>
          <p>
            Kami berusaha memberikan informasi yang akurat dan terbaru. Namun, CV. Kreasindo Jaya tidak bertanggung jawab atas kesalahan atau ketidakakuratan konten di website.
          </p>
        </div>

        <div class="tos-item">
          <h3>4. Tautan Pihak Ketiga</h3>
          <p>
            Website ini dapat berisi tautan ke situs pihak ketiga. CV. Kreasindo Jaya tidak mengontrol konten tersebut dan tidak bertanggung jawab atas kerugian atau risiko yang mungkin terjadi.
          </p>
        </div>

        <div class="tos-item">
          <h3>5. Tanggung Jawab Pengguna</h3>
          <p>
            Pengguna bertanggung jawab atas keamanan akun, penggunaan data pribadi, dan aktivitas yang dilakukan melalui website. Penyalahgunaan akan menjadi tanggung jawab penuh pengguna.
          </p>
        </div>

        <div class="tos-item">
          <h3>6. Perubahan Term of Service</h3>
          <p>
            CV. Kreasindo Jaya berhak memperbarui Term of Service ini kapan saja. Perubahan akan dipublikasikan di halaman ini dan berlaku segera setelah diunggah.
          </p>
        </div>

        <p class="footer-note">&copy; CV. Kreasindo Jaya. All Rights Reserved.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

.tos-section {
  background-color: #f5f5f5;
  padding: 6rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  color: #111827;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.title {
  font-weight: 800;
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: 1.5rem;
  text-align: center;
  color: #191970;
}

.intro {
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 3rem;
  text-align: center;
  line-height: 1.6;
}

.tos-content .tos-item {
  margin-bottom: 2rem;
}

.tos-content h3 {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  color: #191970;
  position: relative;
  padding-left: 0.6rem;
}

.tos-content h3::before {
  content: "•";
  color: #ffdd57;
  position: absolute;
  left: 0;
  font-size: 1.2rem;
  line-height: 1;
}

.tos-content p {
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.footer-note {
  text-align: center;
  margin-top: 3rem;
  font-size: 0.9rem;
  color: #64748b;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .tos-content h3 {
    font-size: 1.1rem;
  }

  .tos-content p {
    font-size: 0.93rem;
  }
}
</style>