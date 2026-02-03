<template>
  <section class="qris-payment-section">
    <div class="container">
      <div class="qris-content">
        <div class="qris-text">
          <h2 class="qris-title">Bayar dari Mana Saja dengan <span class="highlight">QRIS</span></h2>
          
          <div class="qris-image qris-image-mobile">
            <div class="image-glow"></div>
            <img src="/bayar.png" alt="QRIS Payment" class="main-image" />
            <div class="floating-card card-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <div>
                <p class="card-label">Total Pengguna</p>
                <p class="card-value">10,000+</p>
              </div>
            </div>
            <div class="floating-card card-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <div>
                <p class="card-label">Transaksi/Hari</p>
                <p class="card-value">500+</p>
              </div>
            </div>
          </div>
          
          <p class="qris-description">
            Nikmati kemudahan bertransaksi tanpa batas di CV. Kreasindo Jaya! Sekarang anda bisa melakukan pembayaran layanan dan produk dari jauh menggunakan QRIS. Cepat, aman, dan praktis.
          </p>
          
          <div class="qris-features">
            <div class="feature-item">
              <div class="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div class="feature-text">
                <h4>Pembayaran Instan</h4>
                <p>Transaksi terverifikasi dalam hitungan detik</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div class="feature-text">
                <h4>Aman & Terpercaya</h4>
                <p>Dilindungi sistem keamanan berlapis</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div class="feature-text">
                <h4>24/7 Tersedia</h4>
                <p>Bayar kapan saja tanpa batasan waktu</p>
              </div>
            </div>
          </div>
          
          <button @click="goToQRISPage" class="btn-qris">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Pelajari Lebih Lanjut
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
        
        <div class="qris-image qris-image-desktop">
          <div class="image-glow"></div>
          <img src="/bayar.png" alt="QRIS Payment" class="main-image" />
          <div class="floating-card card-1">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <div>
              <p class="card-label">Total Pengguna</p>
              <p class="card-value">10,000+</p>
            </div>
          </div>
          <div class="floating-card card-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <div>
              <p class="card-label">Transaksi/Hari</p>
              <p class="card-value">500+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'QRISPaymentSection',
  methods: {
    goToQRISPage() {
      this.$router.push('/payment');
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.qris-payment-section {
  background: #191970;
  padding: 75px 30px 150px;
  position: relative;
  overflow: hidden;
}

.qris-payment-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.3;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.qris-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

.qris-text {
  animation: fadeInLeft 1s ease;
}

.qris-image-mobile {
  display: none;
}

.qris-image-desktop {
  display: block;
}

.qris-title {
  color: #fff;
  font-size: 2.2rem;
  font-weight: 900;
  line-height: 1.3;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.highlight {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  display: inline-block;
}

.qris-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 28px;
  font-weight: 500;
}

.qris-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 28px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  padding: 14px;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateX(8px);
  border-color: rgba(255, 255, 255, 0.25);
}

.feature-icon {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-icon svg {
  color: #fff;
  width: 20px;
  height: 20px;
}

.feature-text h4 {
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 4px;
  letter-spacing: 0.2px;
}

.feature-text p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  line-height: 1.4;
  font-weight: 500;
}

.btn-qris {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: #1f2937;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.3px;
  box-shadow: 0 8px 24px rgba(251, 191, 36, 0.35);
}

.btn-qris:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(251, 191, 36, 0.45);
}

.btn-qris svg {
  width: 18px;
  height: 18px;
}

.qris-image {
  position: relative;
  animation: fadeInRight 1s ease;
}

.image-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%);
  animation: glow 3s ease-in-out infinite;
  z-index: 0;
}

.main-image {
  width: 100%;
  max-width: 450px;
  height: auto;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3));
  animation: float 6s ease-in-out infinite;
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2;
}

.floating-card svg {
  color: #667eea;
  width: 28px;
  height: 28px;
}

.card-label {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 2px;
  letter-spacing: 0.2px;
}

.card-value {
  color: #1f2937;
  font-size: 1.15rem;
  font-weight: 900;
  letter-spacing: -0.3px;
}

.card-1 {
  top: 12%;
  right: -8%;
  animation: float 4s ease-in-out infinite;
}

.card-2 {
  bottom: 18%;
  left: -12%;
  animation: float 5s ease-in-out infinite 1s;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1.08);
  }
}

@media (max-width: 968px) {
  .qris-payment-section {
    padding: 45px 18px 130px;
  }

  .qris-content {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .qris-text {
    text-align: center;
  }

  .qris-image-mobile {
    display: block;
    margin: 20px 0 25px;
    padding: 0 20px;
  }

  .qris-image-desktop {
    display: none;
  }

  .qris-title {
    font-size: 1.7rem;
    margin-bottom: 0;
  }

  .qris-description {
    font-size: 0.85rem;
    margin-bottom: 22px;
  }

  .main-image {
    max-width: 280px;
    margin: 0 auto;
    display: block;
  }

  .qris-image-mobile .floating-card {
    padding: 11px;
  }

  .qris-image-mobile .floating-card svg {
    width: 24px;
    height: 24px;
  }

  .qris-image-mobile .card-label {
    font-size: 0.68rem;
  }

  .qris-image-mobile .card-value {
    font-size: 1rem;
  }

  .qris-image-mobile .card-1 {
    top: 8%;
    right: 2%;
  }

  .qris-image-mobile .card-2 {
    bottom: 12%;
    left: 2%;
  }

  .qris-features {
    gap: 10px;
    margin-bottom: 22px;
  }

  .feature-item {
    padding: 11px;
  }

  .feature-icon {
    width: 34px;
    height: 34px;
  }

  .feature-icon svg {
    width: 18px;
    height: 18px;
  }

  .feature-text h4 {
    font-size: 0.88rem;
  }

  .feature-text p {
    font-size: 0.78rem;
  }

  .btn-qris {
    width: 100%;
    justify-content: center;
    padding: 12px 24px;
    font-size: 0.88rem;
  }
}

@media (max-width: 768px) {
  .qris-payment-section {
    padding: 40px 16px 120px;
  }

  .qris-image-mobile {
    padding: 0 18px;
  }

  .qris-title {
    font-size: 1.6rem;
    margin-bottom: 0;
  }

  .qris-description {
    font-size: 0.82rem;
    margin-bottom: 20px;
  }

  .main-image {
    max-width: 260px;
  }

  .qris-image-mobile .floating-card {
    padding: 10px;
  }

  .qris-image-mobile .card-label {
    font-size: 0.65rem;
  }

  .qris-image-mobile .card-value {
    font-size: 0.95rem;
  }

  .qris-image-mobile .card-1 {
    top: 6%;
    right: 5%;
  }

  .qris-image-mobile .card-2 {
    bottom: 10%;
    left: 5%;
  }

  .qris-features {
    gap: 9px;
    margin-bottom: 20px;
  }

  .feature-item {
    padding: 10px;
  }

  .feature-icon {
    width: 32px;
    height: 32px;
  }

  .feature-icon svg {
    width: 17px;
    height: 17px;
  }

  .feature-text h4 {
    font-size: 0.85rem;
  }

  .feature-text p {
    font-size: 0.75rem;
  }

  .btn-qris {
    padding: 11px 22px;
    font-size: 0.85rem;
    gap: 8px;
  }

  .btn-qris svg {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .qris-payment-section {
    padding: 125px 14px 110px;
  }

  .qris-image-mobile {
    padding: 0 15px;
  }

  .qris-title {
    font-size: 1.4rem;
    margin-bottom: 0;
  }

  .qris-description {
    font-size: 0.78rem;
    margin-bottom: 18px;
  }

  .main-image {
    max-width: 230px;
  }

  .qris-image-mobile .floating-card {
    padding: 9px;
  }

  .qris-image-mobile .floating-card svg {
    width: 22px;
    height: 22px;
  }

  .qris-image-mobile .card-label {
    font-size: 0.62rem;
  }

  .qris-image-mobile .card-value {
    font-size: 0.9rem;
  }

  .qris-image-mobile .card-1 {
    top: 4%;
    right: 8%;
  }

  .qris-image-mobile .card-2 {
    bottom: 8%;
    left: 8%;
  }

  .qris-features {
    gap: 8px;
    margin-bottom: 18px;
  }

  .feature-item {
    padding: 9px;
    flex-direction: row;
    text-align: left;
    align-items: flex-start;
  }

  .feature-icon {
    width: 30px;
    height: 30px;
  }

  .feature-icon svg {
    width: 15px;
    height: 15px;
  }

  .feature-text h4 {
    font-size: 0.8rem;
    margin-bottom: 2px;
  }

  .feature-text p {
    font-size: 0.7rem;
  }

  .btn-qris {
    padding: 10px 20px;
    font-size: 0.8rem;
    gap: 7px;
  }

  .btn-qris svg {
    width: 15px;
    height: 15px;
  }
}

@media (max-width: 360px) {
  .qris-payment-section {
    padding: 30px 12px 100px;
  }

  .qris-image-mobile {
    padding: 0 12px;
  }

  .qris-title {
    font-size: 1.3rem;
  }

  .qris-description {
    font-size: 0.75rem;
  }

  .main-image {
    max-width: 210px;
  }

  .qris-image-mobile .floating-card {
    padding: 8px;
  }

  .qris-image-mobile .floating-card svg {
    width: 20px;
    height: 20px;
  }

  .qris-image-mobile .card-label {
    font-size: 0.6rem;
  }

  .qris-image-mobile .card-value {
    font-size: 0.85rem;
  }

  .qris-image-mobile .card-1 {
    top: 3%;
    right: 10%;
  }

  .qris-image-mobile .card-2 {
    bottom: 7%;
    left: 10%;
  }

  .feature-text h4 {
    font-size: 0.78rem;
  }

  .feature-text p {
    font-size: 0.68rem;
  }

  .btn-qris {
    padding: 9px 18px;
    font-size: 0.78rem;
  }
}
</style>