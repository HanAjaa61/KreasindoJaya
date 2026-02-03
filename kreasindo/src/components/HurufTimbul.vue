<template>
  <div class="huruf-order">
    <div class="container">
      <div class="header">
        <button class="back-btn" @click="$router.push('/services')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kembali
        </button>
        <h1 class="title">Pemesanan Huruf Timbul</h1>
        <p class="subtitle">Pilih jasa pembuatan huruf timbul berkualitas sesuai kebutuhan Anda</p>
      </div>

      <div class="product-huruf">
        <img src="/produk/huruftimbul.png" alt="Huruf Timbul" />
        <div class="huruf-overlay">
          <p>Huruf timbul merupakan media branding visual dengan desain tiga dimensi yang diproduksi secara presisi, menggunakan material berkualitas untuk hasil yang kuat, rapi, dan tahan lama.</p>
        </div>
      </div>

      <div v-if="!customerFilled" class="customer-card">
        <div class="card-header">
          <div class="header-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <h2 class="card-title">Data Pelanggan</h2>
          </div>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label>Nama Lengkap <span class="required">*</span></label>
            <input 
              v-model="customer.name" 
              type="text" 
              placeholder="Masukkan nama lengkap Anda"
              class="input-field"
            />
          </div>

          <div class="form-group">
            <label>Nomor Telepon <span class="required">*</span></label>
            <input 
              v-model="customer.phone" 
              type="tel" 
              placeholder="08xxxxxxxxxx (maks 13 digit)"
              class="input-field"
              :class="{ 'error': phoneError }"
              @input="validatePhone"
              maxlength="13"
            />
            <p v-if="phoneError" class="error-message">{{ phoneError }}</p>
            <p v-else class="helper-text">Format: 08xxxxxxxxxx</p>
          </div>

          <div class="form-group">
            <label>Alamat Lengkap <span class="required">*</span></label>
            <textarea 
              v-model="customer.address" 
              placeholder="Masukkan alamat lengkap untuk survey lokasi"
              class="input-field textarea"
              rows="4"
            ></textarea>
            <p class="address-note">
              <strong>Catatan :</strong> Alamat akan digunakan untuk survey lokasi pemasangan huruf timbul.
            </p>
          </div>
        </div>
        <div class="form-actions">
          <button @click="saveCustomerData" class="btn-save-customer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Simpan & Lanjutkan
          </button>
        </div>
      </div>

      <div v-for="(order, index) in orders" :key="index" class="order-card">
        <div class="card-header">
          <div class="header-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="9" x2="15" y2="9"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            <h2 class="card-title">Pesanan #{{ index + 1 }}</h2>
          </div>
          <button 
            v-if="orders.length > 1" 
            @click="removeOrder(index)" 
            class="remove-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Hapus
          </button>
        </div>

        <div class="card-body">
          <div class="form-group">
            <label class="main-label">Pilih Jenis Produk <span class="required">*</span></label>
            <div class="material-grid">
              <div 
                v-for="(product, key) in productOptions" 
                :key="key"
                class="material-card"
                :class="{ 'selected': order.product === key }"
                @click="selectProduct(index, key)"
              >
                <div class="material-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <path d="M3 9h18M9 21V9"></path>
                  </svg>
                </div>
                <div class="material-info">
                  <h4 class="material-name">{{ product.name }}</h4>
                </div>
                <div class="check-icon" v-if="order.product === key">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Kuantitas <span class="required">*</span></label>
            <div class="quantity-control">
              <button 
                type="button" 
                class="qty-btn" 
                @click="decreaseQty(index)"
                :disabled="order.quantity <= 1"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <input 
                v-model.number="order.quantity" 
                type="number" 
                min="1"
                step="1"
                class="qty-input"
                :disabled="!order.product"
              />
              <button 
                type="button" 
                class="qty-btn" 
                @click="increaseQty(index)"
                :disabled="!order.product"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
            <p class="helper-text">Jumlah produk yang dipesan</p>
          </div>
        </div>
      </div>

      <div v-if="customerFilled && orders.length > 0" class="summary-card">
        <div class="action-section">
          <button @click="addOrder" class="btn btn-add">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Tambah Produk
          </button>
          <button @click="resetForm" class="btn btn-cancel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Batal
          </button>
          <button @click="sendToWhatsApp" class="btn btn-whatsapp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Kirim ke WhatsApp
          </button>
        </div>
      </div>

      <div v-if="showDialog" class="dialog-overlay" @click="cancelDialog">
        <div class="dialog-box" @click.stop>
          <div class="dialog-icon warning-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <h3 class="dialog-title">Konfirmasi Pembatalan</h3>
          <p class="dialog-message">Apakah Anda yakin ingin membatalkan pesanan? Semua data yang telah diisi akan dihapus.</p>
          <div class="dialog-actions">
            <button @click="cancelDialog" class="dialog-btn dialog-btn-cancel">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Tidak
            </button>
            <button @click="confirmReset" class="dialog-btn dialog-btn-confirm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Ya, Batalkan
            </button>
          </div>
        </div>
      </div>

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

      <div class="footer-spacer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HurufTimbulOrder',
  data() {
    return {
      waNumber: '6285249719971', 
      orderCode: '',
      customer: {
        name: '',
        phone: '',
        address: ''
      },
      customerFilled: false,
      orders: [],
      phoneError: '',
      showDialog: false,
      showErrorDialog: false,
      errorTitle: '',
      errorMessage: '',
      productOptions: {
        huruftimbul: {
          name: 'Huruf Timbul Custom'
        }
      },
      productNames: {
        huruftimbul: 'Huruf Timbul Custom'
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.generateOrderCode();
  },
  methods: {
    generateOrderCode() {
      const randomNum = Math.floor(Math.random() * 900) + 100;
      this.orderCode = `HtB${randomNum}02`;
    },
    saveCustomerData() {
      if (!this.customer.name || !this.customer.phone || !this.customer.address) {
        this.showError('Data Tidak Lengkap', 'Mohon lengkapi semua data pelanggan terlebih dahulu!');
        return;
      }

      if (this.phoneError) {
        this.showError('Nomor Telepon Salah', 'Mohon perbaiki nomor telepon Anda!');
        return;
      }

      this.customerFilled = true;
      this.addOrder();
      this.$nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
    showError(title, message) {
      this.errorTitle = title;
      this.errorMessage = message;
      this.showErrorDialog = true;
    },
    closeErrorDialog() {
      this.showErrorDialog = false;
    },
    validatePhone() {
      const phone = this.customer.phone;
      if (!phone) {
        this.phoneError = '';
        return;
      }
      if (!phone.startsWith('08')) {
        this.phoneError = 'Nomor harus diawali dengan 08';
      } else if (phone.length < 9) {
        this.phoneError = 'Nomor minimal 9 digit';
      } else if (phone.length > 13) {
        this.phoneError = 'Nomor maksimal 13 digit';
      } else if (!/^\d+$/.test(phone)) {
        this.phoneError = 'Hanya boleh angka';
      } else {
        this.phoneError = '';
      }
    },
    selectProduct(index, key) {
      this.orders[index].product = key;
    },
    addOrder() {
      this.orders.push({
        product: '',
        quantity: 1
      });
    },
    removeOrder(index) {
      this.orders.splice(index, 1);
    },
    increaseQty(index) {
      this.orders[index].quantity++;
    },
    decreaseQty(index) {
      if (this.orders[index].quantity > 1) {
        this.orders[index].quantity--;
      }
    },
    showConfirmDialog() {
      this.showDialog = true;
    },
    cancelDialog() {
      this.showDialog = false;
    },
    confirmReset() {
      this.customer = { name: '', phone: '', address: '' };
      this.customerFilled = false;
      this.orders = [];
      this.phoneError = '';
      this.showDialog = false;
      this.generateOrderCode();
      this.$nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
    resetForm() {
      this.showConfirmDialog();
    },
    sendToWhatsApp() {
      if (!this.customer.name || !this.customer.phone || !this.customer.address) {
        this.showError('Data Pelanggan Tidak Lengkap', 'Mohon lengkapi data pelanggan terlebih dahulu!');
        return;
      }

      if (this.phoneError) {
        this.showError('Nomor Telepon Salah', 'Mohon perbaiki nomor telepon Anda!');
        return;
      }

      for (let i = 0; i < this.orders.length; i++) {
        const order = this.orders[i];
        if (!order.product || !order.quantity) {
          this.showError('Data Pesanan Tidak Lengkap', `Mohon lengkapi data pesanan #${i + 1}! Pastikan jenis produk dan kuantitas sudah diisi!`);
          return;
        }
      }

      let message = `*PESANAN HURUF TIMBUL*\n\n`;
      message += `*DATA PELANGGAN*\n\n`;
      message += `Nama: ${this.customer.name}\n`;
      message += `No. HP: ${this.customer.phone}\n`;
      message += `Alamat: ${this.customer.address}\n\n`;
      message += `*DETAIL PESANAN*\n`;
      message += `━━━━━━━━━━━━━━━━━━━━\n`;

      this.orders.forEach((order, index) => {
        message += `\n*Pesanan #${index + 1}*\n\n`;
        message += `*Kode Pesanan: ${this.orderCode}*\n`;
        message += `Jenis Produk: ${this.productNames[order.product]}\n`;
        message += `Kuantitas: ${order.quantity} unit\n`;
      });

      message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
      message += `\nSegera konfirmasi saya terkait ketersediaan dan berapa harga yang harus saya bayar nanti? Terima kasih!`;

      const encodedMessage = encodeURIComponent(message);
      const waLink = `https://wa.me/${this.waNumber}?text=${encodedMessage}`;
      window.open(waLink, '_blank');
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  background: #191970;
}

.huruf-order {
  background: #191970;
  min-height: 100vh;
  padding: 40px 20px 120px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.header {
  margin-bottom: 40px;
  animation: fadeInDown 0.6s ease;
}

.back-btn {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 30px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateX(-5px);
  border-color: rgba(255, 255, 255, 0.4);
}

.back-btn svg {
  width: 18px;
  height: 18px;
}

.title {
  color: #fff;
  font-size: 2.8rem;
  font-weight: 800;
  text-align: center;
  margin: 0 0 16px 0;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.15rem;
  text-align: center;
  margin: 0 0 30px 0;
  font-weight: 400;
  line-height: 1.6;
}

.product-huruf {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 50px;
  animation: fadeInUp 0.8s ease;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.product-huruf img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.huruf-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
  padding: 35px 30px;
  color: #fff;
}

.huruf-overlay p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.7;
}

.customer-card,
.order-card,
.summary-card {
  background: #fff;
  border-radius: 24px;
  padding: 0;
  margin-bottom: 35px;
  animation: fadeInUp 0.8s ease;
  box-shadow: 0 12px 45px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 28px 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.header-left svg {
  color: #fff;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
}

.card-title {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.3px;
}

.card-body {
  padding: 35px;
}

.form-group {
  margin-bottom: 30px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label,
.main-label {
  display: block;
  color: #1f2937;
  font-weight: 700;
  margin-bottom: 14px;
  font-size: 1.05rem;
  letter-spacing: 0.3px;
}

.required {
  color: #ff4444;
  font-weight: 700;
  margin-left: 2px;
}

.input-field {
  width: 100%;
  padding: 18px 22px;
  border: 2px solid #e5e7eb;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  background: #f9fafb;
  font-family: 'Montserrat', sans-serif;
}

.input-field:focus {
  outline: none;
  border-color: #667eea;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.12);
}

.input-field.error {
  border-color: #ff4444;
  background: #fff5f5;
}

.input-field::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.7;
  padding: 18px 22px;
}

.error-message {
  color: #ff4444;
  font-size: 0.9rem;
  margin-top: 10px;
  font-weight: 600;
  animation: shake 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.helper-text {
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 10px;
  font-weight: 500;
  line-height: 1.5;
}

.address-note {
  margin-top: 12px;
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.6;
  font-weight: 500;
  padding: 12px 16px;
  background: #f9fafb;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.address-note strong {
  color: #374151;
  font-weight: 700;
}

.address-note span {
  display: block;
  margin-top: 6px;
  font-size: 0.85rem;
  color: #9ca3af;
}

.material-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  margin-top: 18px;
}

.material-card {
  position: relative;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border: 3px solid #e5e7eb;
  border-radius: 18px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.material-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(102, 126, 234, 0.18);
  border-color: #667eea;
}

.material-card.selected {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.45);
  transform: translateY(-5px);
}

.material-icon {
  width: 52px;
  height: 52px;
  background: rgba(102, 126, 234, 0.12);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.material-card.selected .material-icon {
  background: rgba(255, 255, 255, 0.2);
}

.material-icon svg {
  color: #667eea;
  width: 26px;
  height: 26px;
}

.material-card.selected .material-icon svg {
  color: #fff;
}

.material-info {
  flex: 1;
}

.material-name {
  font-size: 1.08rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  transition: color 0.3s ease;
  line-height: 1.4;
}

.material-card.selected .material-name {
  color: #fff;
}

.check-icon {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 34px;
  height: 34px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: checkPop 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.check-icon svg {
  color: #667eea;
  width: 20px;
  height: 20px;
}

.quantity-control {
  display: flex;
  align-items: stretch;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 14px;
  overflow: hidden;
  height: 58px;
  width: 100%;
  max-width: 100%;
  margin-top: 4px;
}

.qty-btn {
  background: #fff;
  border: none;
  width: 50px;
  min-width: 50px;
  max-width: 50px;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #667eea;
  font-weight: 700;
  font-size: 1.3rem;
}

.qty-btn:hover:not(:disabled) {
  background: #667eea;
  color: #fff;
}

.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-btn svg {
  width: 18px;
  height: 18px;
}

.qty-input {
  flex: 1;
  min-width: 0;
  max-width: 100%;
  border: none;
  text-align: center;
  font-size: 1.15rem;
  font-weight: 700;
  color: #1f2937;
  background: transparent;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  padding: 0 10px;
}

.qty-input:focus {
  outline: none;
}

.qty-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-input::-webkit-inner-spin-button,
.qty-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.qty-input[type=number] {
  -moz-appearance: textfield;
}

.remove-btn {
  background: rgba(255, 68, 68, 0.15);
  backdrop-filter: blur(10px);
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 11px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 700;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.remove-btn:hover {
  background: #ff4444;
  border-color: #ff4444;
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(255, 68, 68, 0.4);
}

.remove-btn svg {
  width: 18px;
  height: 18px;
}

.form-actions {
  padding: 0 35px 35px;
}

.btn-save-customer {
  width: 100%;
  padding: 16px 30px;
  border: none;
  border-radius: 16px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.3px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #fff;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.35);
}

.btn-save-customer:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(16, 185, 129, 0.45);
}

.btn-save-customer svg {
  width: 22px;
  height: 22px;
}

.action-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  padding: 28px 35px;
}

.btn {
  padding: 13px 22px;
  border: none;
  border-radius: 14px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.3px;
  white-space: nowrap;
  width: 100%;
}

.btn svg {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}

.btn-add {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  box-shadow: 0 8px 22px rgba(102, 126, 234, 0.35);
}

.btn-add:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.45);
}

.btn-cancel {
  background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
  color: #fff;
  box-shadow: 0 8px 22px rgba(255, 68, 68, 0.35);
}

.btn-cancel:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(255, 68, 68, 0.45);
}

.btn-whatsapp {
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  color: #fff;
  box-shadow: 0 8px 22px rgba(37, 211, 102, 0.35);
}

.btn-whatsapp:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(37, 211, 102, 0.45);
}

.footer-spacer {
  height: 100px;
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
  animation: iconPulse 1.5s ease infinite;
}

.dialog-icon.warning-icon {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
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
  letter-spacing: -0.5px;
}

.dialog-message {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0 0 28px 0;
  line-height: 1.6;
  font-weight: 500;
}

.dialog-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
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

.dialog-btn svg {
  width: 18px;
  height: 18px;
}

.dialog-btn-cancel {
  background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
}

.dialog-btn-cancel:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 68, 68, 0.4);
}

.dialog-btn-confirm {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.dialog-btn-confirm:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
}

.dialog-btn-ok {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.dialog-btn-ok:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
    box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(251, 191, 36, 0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-6px);
  }
  75% {
    transform: translateX(6px);
  }
}

@keyframes checkPop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .huruf-order {
    padding: 30px 18px 150px;
  }

  .header {
    margin-bottom: 35px;
  }

  .back-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
    margin-bottom: 25px;
  }

  .back-btn svg {
    width: 16px;
    height: 16px;
  }

  .title {
    font-size: 2.2rem;
    margin-bottom: 14px;
  }

  .subtitle {
    font-size: 1.05rem;
    margin-bottom: 25px;
  }

  .product-huruf {
    height: 240px;
    margin-bottom: 40px;
  }

  .huruf-overlay {
    padding: 28px 24px;
  }

  .huruf-overlay p {
    font-size: 1.05rem;
  }

  .card-header {
    padding: 24px 26px;
  }

  .card-title {
    font-size: 1.3rem;
  }

  .header-left svg {
    width: 24px;
    height: 24px;
  }

  .card-body {
    padding: 28px 26px;
  }

  .form-group {
    margin-bottom: 26px;
  }

  .form-group label,
  .main-label {
    font-size: 1rem;
    margin-bottom: 12px;
  }

  .input-field {
    padding: 16px 20px;
    font-size: 0.98rem;
  }

  .textarea {
    min-height: 110px;
  }

  .material-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .material-card {
    padding: 22px;
  }

  .material-icon {
    width: 48px;
    height: 48px;
  }

  .material-icon svg {
    width: 24px;
    height: 24px;
  }

  .material-name {
    font-size: 1.05rem;
  }

  .quantity-control {
    height: 56px;
  }

  .qty-btn {
    width: 48px;
    min-width: 48px;
    max-width: 48px;
  }

  .qty-input {
    font-size: 1.1rem;
  }

  .remove-btn {
    padding: 10px 18px;
    font-size: 0.9rem;
  }

  .form-actions {
    padding: 0 26px 28px;
  }

  .btn-save-customer {
    padding: 15px 28px;
    font-size: 1.02rem;
  }

  .action-section {
    grid-template-columns: 1fr;
    padding: 24px 26px;
    gap: 12px;
  }

  .btn {
    width: 100%;
    padding: 14px 24px;
    font-size: 0.95rem;
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

  .dialog-actions {
    grid-template-columns: 1fr;
  }

  .dialog-btn {
    padding: 12px 20px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .huruf-order {
    padding: 24px 14px 170px;
  }

  .header {
    margin-bottom: 30px;
  }

  .back-btn {
    padding: 9px 18px;
    font-size: 0.85rem;
    margin-bottom: 22px;
  }

  .back-btn svg {
    width: 15px;
    height: 15px;
  }

  .title {
    font-size: 1.9rem;
    margin-bottom: 12px;
  }

  .subtitle {
    font-size: 1rem;
    margin-bottom: 22px;
  }

  .product-huruf {
    height: 210px;
    margin-bottom: 35px;
  }

  .huruf-overlay {
    padding: 24px 20px;
  }

  .huruf-overlay p {
    font-size: 1rem;
  }

  .customer-card,
  .order-card,
  .summary-card {
    margin-bottom: 28px;
  }

  .card-header {
    padding: 20px 22px;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .header-left {
    gap: 12px;
  }

  .header-left svg {
    width: 22px;
    height: 22px;
  }

  .card-body {
    padding: 24px 22px;
  }

  .form-group {
    margin-bottom: 24px;
  }

  .form-group label,
  .main-label {
    font-size: 0.98rem;
    margin-bottom: 11px;
  }

  .input-field {
    padding: 15px 18px;
    font-size: 0.95rem;
  }

  .textarea {
    min-height: 105px;
  }

  .error-message,
  .helper-text {
    font-size: 0.88rem;
    margin-top: 9px;
  }

  .address-note {
    font-size: 0.88rem;
    margin-top: 10px;
    padding: 11px 14px;
  }

  .address-note span {
    margin-top: 5px;
    font-size: 0.82rem;
  }

  .material-grid {
    gap: 14px;
  }

  .material-card {
    padding: 20px;
    gap: 12px;
  }

  .material-icon {
    width: 46px;
    height: 46px;
  }

  .material-icon svg {
    width: 23px;
    height: 23px;
  }

  .material-name {
    font-size: 1.02rem;
  }

  .check-icon {
    width: 32px;
    height: 32px;
    top: 12px;
    right: 12px;
  }

  .check-icon svg {
    width: 18px;
    height: 18px;
  }

  .quantity-control {
    height: 54px;
  }

  .qty-btn {
    width: 46px;
    min-width: 46px;
    max-width: 46px;
  }

  .qty-btn svg {
    width: 17px;
    height: 17px;
  }

  .qty-input {
    font-size: 1.08rem;
  }

  .remove-btn {
    padding: 9px 16px;
    font-size: 0.88rem;
  }

  .remove-btn svg {
    width: 17px;
    height: 17px;
  }

  .form-actions {
    padding: 0 22px 24px;
  }

  .btn-save-customer {
    padding: 14px 26px;
    font-size: 1rem;
  }

  .btn-save-customer svg {
    width: 20px;
    height: 20px;
  }

  .action-section {
    padding: 22px 22px;
    gap: 11px;
  }

  .btn {
    padding: 13px 22px;
    font-size: 0.9rem;
  }

  .btn svg {
    width: 17px;
    height: 17px;
  }

  .footer-spacer {
    height: 90px;
  }

  .dialog-overlay {
    padding: 20px;
  }

  .dialog-box {
    padding: 32px 22px;
  }

  .dialog-icon {
    width: 64px;
    height: 64px;
    margin-bottom: 18px;
  }

  .dialog-icon svg {
    width: 52px;
    height: 52px;
  }

  .dialog-title {
    font-size: 1.4rem;
    margin-bottom: 13px;
  }

  .dialog-message {
    font-size: 0.92rem;
    margin-bottom: 26px;
  }

  .dialog-btn {
    padding: 12px 22px;
    font-size: 0.92rem;
  }

  .dialog-btn svg {
    width: 17px;
    height: 17px;
  }
}

@media (max-width: 360px) {
  .title {
    font-size: 1.7rem;
  }

  .subtitle {
    font-size: 0.95rem;
  }

  .product-huruf {
    height: 190px;
  }

  .card-title {
    font-size: 1.15rem;
  }

  .dialog-title {
    font-size: 1.3rem;
  }
}
</style>