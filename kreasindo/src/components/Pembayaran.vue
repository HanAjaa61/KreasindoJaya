<template>
  <div class="page">
    <div class="container">
      <div class="header fade-in">
        <div class="header-image">
          <img src="/bayar.png" alt="Payment Header" />
        </div>
        <h1>Pembayaran</h1>
        <p>Scan QRIS untuk menyelesaikan pembayaran pesanan produk percetakan Anda</p>
      </div>
      <div class="qris-card fade-in delay-1">
        <div class="qris-header">
          <span class="badge">QRIS Payment</span>
          <span class="verified">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Verified
          </span>
        </div>
        <div class="qris-wrapper">
          <div class="qris-image-container">
            <img src="/qris.jpeg" class="qris-image" alt="QRIS Code" />
          </div>
          <div class="merchant-info">
            <div class="merchant-icon">KJ</div>
            <div>
              <p class="merchant-name">KREASINDO JAYA 2</p>
              <p class="merchant-desc">Merchant Resmi</p>
            </div>
          </div>
        </div>
      </div>
    <section id ='payment'>
      <div class="steps-card fade-in delay-2">
        <div class="steps-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 11 12 14 22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
          <h3>Panduan Pembayaran</h3>
        </div>
        
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Scan QRIS</h4>
              <p>Gunakan aplikasi e-wallet atau sejenisnya untuk scan kode QRIS di atas</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Masukkan Nominal</h4>
              <p>Isi nominal sesuai dengan nota yang telah anda kirimkan di WhatsApp dan selesaikan pembayaran</p>
            </div>
          </div> 

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Simpan Bukti</h4>
              <p>Screenshot dan simpan bukti pembayaran beserta foto produk</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>Konfirmasi Pembayaran</h4>
              <p>Konfirmasi pembayaran anda dengan mengisi kode pesanan dan klik <strong>Kirim Konfirmasi</strong> di bawah</p>
            </div>
          </div>
        </div>
      </div>

      <button class="toggle-btn fade-in delay-3" @click="open = !open">
        <span>{{ open ? 'Tutup Formulir Konfirmasi' : 'Konfirmasi Pembayaran' }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" :class="{ rotate: open }">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      <transition name="slide">
        <div v-if="open" class="form-card">
          <div class="form-header">
            <h3>Konfirmasi Pembayaran</h3>
            <p>Masukkan kode pesanan untuk konfirmasi pembayaran</p>
          </div>

          <div class="form-body">
            <div class="input-group">
              <label>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                Kode Pesanan
              </label>
              <input 
                v-model="kodePesanan" 
                type="text" 
                placeholder="Contoh: INV-00123"
                class="input-field"
              />
            </div>

            <div class="info-box">
              <p><strong>Catatan:</strong> Pastikan kode pesanan anda sudah benar. Kami berhak menolak atau mengabaikan konfirmasi pembayaran anda jika kode pesanan anda tidak sesuai atau dengan kesepakatan bersama.</p>
            </div>

            <div class="actions">
              <button class="btn btn-cancel" @click="reset">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Batal
              </button>
              <button class="btn btn-send" @click="send">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Kirim Konfirmasi
              </button>
            </div>
          </div>
        </div>
      </transition>

      <div v-if="showErrorDialog" class="dialog-overlay" @click="closeErrorDialog">
        <div class="dialog-box" @click.stop>
          <div class="dialog-icon error-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <h3 class="dialog-title">{{ errorTitle }}</h3>
          <p class="dialog-message">{{ errorMessage }}</p>
          <div class="dialog-actions">
            <button @click="closeErrorDialog" class="dialog-btn dialog-btn-ok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Mengerti
            </button>
          </div>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const open = ref(false);
const kodePesanan = ref("");
const showErrorDialog = ref(false);
const errorTitle = ref("");
const errorMessage = ref("");

const wa1 = "6285249719971";

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' });
});

function send() {
  if (!kodePesanan.value) {
    showErrorDialog.value = true;
    errorTitle.value = 'Data Tidak Lengkap';
    errorMessage.value = 'Mohon masukkan kode pesanan sebelum mengirim konfirmasi!';
    return;
  }

  const message = `╔═══════════════════════════╗
║   KONFIRMASI PEMBAYARAN                       ║
╚═══════════════════════════╝

*KREASINDO JAYA 2*
Tanggal: ${new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
Waktu: ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WITA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*DETAIL KONFIRMASI*
• Kode Pesanan: *${kodePesanan.value}*
• Status: Menunggu Verifikasi 

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*LAMPIRAN*
Bukti Pembayaran (akan dikirim)
Foto Produk Diterima (akan dikirim)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Mohon verifikasi pembayaran saya.
Terima kasih!`;

  const url = encodeURIComponent(message);
  window.open(`https://wa.me/${wa1}?text=${url}`, "_blank");
}

function reset() {
  kodePesanan.value = "";
  open.value = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeErrorDialog() {
  showErrorDialog.value = false;
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

.page {
  min-height: 100vh;
  background: linear-gradient(180deg, #191970 0%, #191970 40%, #1a1a4d 100%);
  padding: 40px 25px 80px;
  position: relative;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding-bottom: 10px;
}
.header {
  text-align: center;
  margin-bottom: 32px;
  color: white;
}

.header-image {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-image img {
  max-width: 200px;
  height: auto;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.header h1 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 8px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.header p {
  font-size: 16px;
  opacity: 0.95;
  font-weight: 500;
}

.qris-card {
  background: white;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.qris-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.badge {
  background: #191970;
  color: white;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.verified {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #10b981;
  font-size: 14px;
  font-weight: 700;
}

.verified svg {
  width: 18px;
  height: 18px;
}

.qris-wrapper {
  position: relative;
}

.qris-image-container {
  width: 100%;
  background: #f9fafb;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qris-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 12px;
}

.merchant-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding: 16px;
  background: linear-gradient(135deg, #f0f4ff 0%, #e5ebff 100%);
  border-radius: 16px;
  border: 2px solid #191970;
}

.merchant-icon {
  width: 48px;
  height: 48px;
  background: #191970;
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
  flex-shrink: 0;
}

.merchant-name {
  font-weight: 800;
  font-size: 16px;
  color: #191970;
  margin-bottom: 2px;
}

.merchant-desc {
  font-size: 13px;
  color: #6b7280;
  font-weight: 600;
}

.steps-card {
  background: white;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.steps-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.steps-header svg {
  width: 24px;
  height: 24px;
  stroke: #191970;
  stroke-width: 2.5;
}

.steps-header h3 {
  font-size: 20px;
  font-weight: 800;
  color: #1f2937;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.step-number {
  width: 36px;
  height: 36px;
  background: #191970;
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
  flex-shrink: 0;
}

.step-content h4 {
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
}

.step-content p {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  font-weight: 500;
}

.toggle-btn {
  width: 100%;
  background: white;
  border: none;
  padding: 18px 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  color: #191970;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.toggle-btn svg {
  width: 20px;
  height: 20px;
  stroke-width: 2.5;
  transition: transform 0.3s ease;
}

.toggle-btn svg.rotate {
  transform: rotate(180deg);
}

.form-card {
  background: white;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  margin-bottom: 40px;
}

.form-header {
  margin-bottom: 28px;
}

.form-header h3 {
  font-size: 22px;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 6px;
}

.form-header p {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 10px;
}

.input-group label svg {
  width: 18px;
  height: 18px;
  stroke-width: 2;
  stroke: #191970;
}

.input-field {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: #f9fafb;
  font-weight: 600;
}

.input-field:focus {
  outline: none;
  border-color: #191970;
  background: white;
  box-shadow: 0 0 0 4px rgba(25, 25, 112, 0.1);
}

.info-box {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #eff6ff;
  border-radius: 12px;
  border-left: 4px solid #191970;
}

.info-box p {
  font-size: 13px;
  color: #1e3a8a;
  line-height: 1.6;
  font-weight: 600;
}

.info-box strong {
  color: #191970;
  font-weight: 800;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.btn {
  flex: 1;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 2.5;
}

.btn-cancel {
  background: #fee2e2;
  color: #dc2626;
}

.btn-cancel:hover {
  background: #fecaca;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
}

.btn-send {
  background: #10b981;
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-send:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
  background: #059669;
}

.fade-in {
  animation: fadeIn 0.6s ease forwards;
  opacity: 0;
}

.delay-1 {
  animation-delay: 0.1s;
}

.delay-2 {
  animation-delay: 0.2s;
}

.delay-3 {
  animation-delay: 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
  padding: 20px;
}

.dialog-box {
  background: #fff;
  border-radius: 24px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
}

.dialog-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  animation: iconPulse 1s ease infinite;
}

.dialog-icon.error-icon {
  background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
}

.dialog-icon svg {
  color: #fff;
}

.dialog-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.dialog-message {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0 0 28px 0;
  line-height: 1.6;
  font-weight: 600;
}

.dialog-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.dialog-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif;
}

.dialog-btn-ok {
  background: #191970;
  color: #fff;
  box-shadow: 0 4px 12px rgba(25, 25, 112, 0.3);
}

.dialog-btn-ok:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(25, 25, 112, 0.4);
  background: #141452;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(255, 68, 68, 0);
  }
}

@media (max-width: 640px) {
  .page {
    padding: 30px 15px 150px;
  }

  .header-image img {
    max-width: 150px;
  }

  .header h1 {
    font-size: 28px;
  }

  .qris-card,
  .steps-card,
  .form-card {
    padding: 20px;
  }

  .form-card {
    margin-bottom: 30px;
  }

  .actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .dialog-box {
    padding: 28px 20px;
  }

  .dialog-icon {
    width: 60px;
    height: 60px;
  }

  .dialog-icon svg {
    width: 48px;
    height: 48px;
  }

  .dialog-title {
    font-size: 1.3rem;
  }

  .dialog-message {
    font-size: 0.9rem;
  }
}
</style>