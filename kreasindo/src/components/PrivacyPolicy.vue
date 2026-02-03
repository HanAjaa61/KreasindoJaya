<template>
  <section class="privacy-policy-section">
    <div class="container">
      <h2 class="title">Privacy Policy</h2>
      <p class="intro">
        Di CV. Kreasindo Jaya, privasi pengunjung website sangat penting bagi kami. Kami menjelaskan bagaimana informasi Anda dikumpulkan, digunakan, dan dilindungi.
      </p>

      <div class="policy-content">
        <div class="policy-item">
          <h3>1. Informasi yang Kami Kumpulkan</h3>
          <p>
            Kami dapat mengumpulkan informasi seperti nama, email, nomor telepon, dan data teknis (alamat IP, browser, cookies) saat Anda menggunakan website atau mengisi formulir.
          </p>
        </div>

        <div class="policy-item">
          <h3>2. Penggunaan Informasi</h3>
          <p>
            Informasi yang dikumpulkan digunakan untuk:
          </p>
          <ul>
            <li>Menyediakan layanan dan informasi terkait percetakan.</li>
            <li>Meningkatkan pengalaman pengguna di website.</li>
            <li>Komunikasi promosi, penawaran, dan berita perusahaan.</li>
          </ul>
        </div>

        <div class="policy-item">
          <h3>3. Penyimpanan dan Perlindungan Data</h3>
          <p>
            Data Anda disimpan secara aman dengan langkah proteksi yang memadai. Kami tidak menyimpan data lebih lama dari yang diperlukan.
          </p>
        </div>

        <div class="policy-item">
          <h3>4. Pembagian Data</h3>
          <p>
            CV. Kreasindo Jaya tidak membagikan data pribadi Anda ke pihak ketiga tanpa izin, kecuali untuk keperluan hukum atau layanan pendukung terkait.
          </p>
        </div>

        <div class="policy-item">
          <h3>5. Cookies dan Tracking</h3>
          <p>
            Website menggunakan cookies untuk meningkatkan pengalaman pengguna dan analisis trafik. Cookies dapat dinonaktifkan melalui pengaturan browser.
          </p>
        </div>

        <div class="policy-item">
          <h3>6. Hak Pengguna</h3>
          <p>
            Anda berhak meminta akses, pembaruan, atau penghapusan data pribadi dengan menghubungi kami melalui halaman <a href="#contact">Contact</a>.
          </p>
        </div>

        <div class="policy-item">
          <h3>7. Perubahan Privacy Policy</h3>
          <p>
            CV. Kreasindo Jaya dapat memperbarui privacy policy ini kapan saja. Perubahan akan dipublikasikan di halaman ini.
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

.privacy-policy-section {
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

.policy-content .policy-item {
  margin-bottom: 2rem;
}

.policy-content h3 {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  color: #191970;
  position: relative;
  padding-left: 0.6rem;
}

.policy-content h3::before {
  content: "•";
  color: #ffdd57;
  position: absolute;
  left: 0;
  font-size: 1.2rem;
  line-height: 1;
}

.policy-content p,
.policy-content ul {
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.policy-content ul {
  list-style-type: disc;
  margin-left: 1.5rem;
}

.policy-content a {
  color: #191970;
  text-decoration: underline;
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

  .policy-content h3 {
    font-size: 1.1rem;
  }

  .policy-content p,
  .policy-content ul {
    font-size: 0.93rem;
  }
}
</style>
