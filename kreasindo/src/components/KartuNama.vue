<template>
  <div class="kartunama-order">
    <div class="container">
      <div class="header">
        <button class="back-btn" @click="$router.push('/services')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kembali
        </button>
        <h1 class="title">Pemesanan Kartu Nama</h1>
        <p class="subtitle">Pilih kartu nama berkualitas sesuai kebutuhan Anda</p>
      </div>

      <div class="product-banner">
        <img src="/produk/kartunama.jpg" alt="Kartu Nama" />
        <div class="banner-overlay">
          <p>Tingkatkan kesan profesionalisme Anda dengan kartu nama berkualitas yang mencerminkan identitas bisnis secara eksklusif.</p>
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
          <div class="form-row">
            <div class="form-group">
              <label>Nama Lengkap <span class="required">*</span></label>
              <input 
                v-model="customer.name" 
                type="text" 
                placeholder="Masukkan nama lengkap Anda"
                class="input-field"
              />
            </div>
          </div>
          <div class="form-row">
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
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Alamat Lengkap <span class="required">*</span></label>
              <textarea 
                v-model="customer.address" 
                placeholder="Masukkan alamat lengkap untuk pengiriman"
                class="input-field textarea"
                rows="4"
              ></textarea>
              <p class="address-note">
                <strong>Catatan :</strong> Jika pakai jasa kurir bisa isi alamat yang sesuai. Jika tidak, bisa isi <em>"ambil di tempat"</em>.<br />
  <span>(Harga total pemesanan produk belum termasuk biaya kurir)</span>
              </p>
            </div>
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
                v-for="(material, key) in materialOptions" 
                :key="key"
                class="material-card"
                :class="{ 'selected': order.material === key }"
                @click="selectMaterial(index, key)"
              >
                <div class="material-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <path d="M3 9h18M9 21V9"></path>
                  </svg>
                </div>
                <div class="material-info">
                  <h4 class="material-name">{{ material.name }}</h4>
                  <p class="material-price">{{ formatCurrency(material.price) }} / 100 lembar</p>
                  <div class="material-badge" v-if="material.design">+ Free Desain</div>
                </div>
                <div class="check-icon" v-if="order.material === key">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div class="form-row two-cols">
            <div class="form-group">
              <label>Ukuran <span class="required">*</span></label>
              <div class="input-with-lock">
                <input 
                  :value="fixedSize" 
                  type="text" 
                  class="input-field size-input locked"
                  disabled
                  readonly
                />
                <span class="lock-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
              </div>
              <p class="helper-text">Ukuran tetap untuk kartu nama</p>
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
                  @input="calculatePrice(index)"
                />
                <button 
                  type="button" 
                  class="qty-btn" 
                  @click="increaseQty(index)"
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

           <div class="screenshot-guide" v-if="order.material">
  <div class="guide-header">
    <h4 class="guide-title">Catatan Penting - Wajib Screenshot!</h4>
  </div>
  
  <div class="guide-content">
    <p class="guide-warning">
      <strong>WAJIB screenshot bagian detail harga seperti contoh gambar di bawah ini !</strong>
      Foto yang tidak sesuai atau terlewat setelah konfirmasi WhatsApp <strong>berhak kami tolak</strong>. 
      Ini penting sebagai bukti lampiran pemesanan dan penghindaran manipulasi harga.
    </p>

    <div class="guide-example">
      <p class="example-label">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        Contoh Screenshot yang Benar:
      </p>
      <div class="example-image-wrapper">
        <div class="example-badge">SCREENSHOT INI!</div>
        <div class="example-image">
          <img src="/buktipesan.png" alt="Contoh Screenshot Detail Harga" />
        </div>
        <div class="example-caption">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          Screenshot bagian ringkasan harga seperti ini
        </div>
      </div>
    </div>

    <div class="guide-steps">
      <p class="steps-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
        Langkah-langkah:
      </p>
      <ol class="steps-list">
        <li>
          <span class="step-number">1</span>
          <span class="step-text">Selesaikan pemilihan detail pesanan</span>
        </li>
        <li>
          <span class="step-number">2</span>
          <span class="step-text">Geser ke bawah hingga menemukan ringkasan harga seperti contoh gambar</span>
        </li>
        <li>
          <span class="step-number">3</span>
          <span class="step-text"><strong>Screenshot dan simpan gambar</strong></span>
        </li>
        <li>
          <span class="step-number">4</span>
          <span class="step-text">Klik tombol <strong>"Kirim ke WhatsApp"</strong> dan Anda akan diarahkan ke kontak kami</span>
        </li>
        <li class="highlight-step">
          <span class="step-number">5</span>
          <div class="step-text">
            <strong>JANGAN langsung kirim pesannya!</strong> Lampirkan dahulu foto hasil screenshot:
            <ul class="sub-steps">
              <li>Pilih ikon <strong> 🧷 (pin / lampiran)</strong> di sebelah kanan kotak pesan WhatsApp</li>
              <li>Pilih <strong>Galeri</strong></li>
              <li>Pilih foto hasil screenshot tadi di website CV. Kreasindo Jaya. (jika anda memiliki lebih dari 1 pesanan, maka foto semua bagian ringkasan harga sesuai contoh gambar diatas, kemudian pilih semua gambar sekaligus.)</li>
              <li>Kemudian <strong>baru klik kirim pesan</strong></li>
            </ul>
          </div>
        </li>
      </ol>
    </div>

    <div class="guide-footer">
      <span>Catatan: Pesanan tanpa lampiran screenshot yang valid dapat ditolak atau dengan kesepakatan bersama !</span>
    </div>
  </div>
</div>

          <div class="price-summary">
            <div class="price-row">
              <span class="price-label">Harga Satuan:</span>
              <span class="price-value">{{ formatCurrency(order.unitPrice) }}</span>
            </div>
            <div class="price-row total-row">
              <span class="price-label">Total Harga:</span>
              <span class="price-value total">{{ formatCurrency(order.totalPrice) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="customerFilled && orders.length > 0" class="summary-card">
        <div class="grand-total-section">
          <div class="total-content">
            <div class="total-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <div class="total-info">
              <p class="total-label">Total Keseluruhan</p>
              <p class="total-amount">{{ formatCurrency(grandTotal) }}</p>
            </div>
          </div>
        </div>

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
  name: 'BannerOrder',
  data() {
    return {
      waNumber: '6282227095278',
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
      fixedSize: '9 x 5.5 cm',
      materialOptions: {
        kartu1sisi: {
          name: 'Kartu Nama 1 Sisi',
          price: 75000,
          design: true
        },
        kartu2sisi: {
          name: 'Kartu Nama 2 Sisi',
          price: 100000,
          design: true
        }
      },
      materialNames: {
        kartu1sisi: 'Kartu Nama 1 Sisi',
        kartu2sisi: 'Kartu Nama 2 Sisi'
      }
    }
  },
  computed: {
    grandTotal() {
      return this.orders.reduce((sum, order) => sum + order.totalPrice, 0);
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.generateOrderCode();
  },
  methods: {
    generateOrderCode() {
      const randomNum = Math.floor(Math.random() * 900) + 100;
      this.orderCode = `KnM${randomNum}06`;
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
    selectMaterial(index, key) {
      this.orders[index].material = key;
      this.calculatePrice(index);
    },
    addOrder() {
      this.orders.push({
        material: '',
        size: this.fixedSize,
        quantity: 100,
        unitPrice: 0,
        totalPrice: 0
      });
    },
    removeOrder(index) {
      this.orders.splice(index, 1);
    },
    increaseQty(index) {
      this.orders[index].quantity += 100;
      this.calculatePrice(index);
    },
    decreaseQty(index) {
      if (this.orders[index].quantity > 100) {
        this.orders[index].quantity -= 100;
        this.calculatePrice(index);
      }
    },
    calculatePrice(index) {
      const order = this.orders[index];
      
      if (order.quantity) {
        if (order.quantity < 100) {
          order.quantity = 100;
        } else {
          order.quantity = Math.ceil(order.quantity / 100) * 100;
        }
      } else {
        order.quantity = 100;
      }
      
      if (!order.material) {
        order.unitPrice = 0;
        order.totalPrice = 0;
        return;
      }

      const pricePer100 = this.materialOptions[order.material].price;
      order.unitPrice = pricePer100;
      order.totalPrice = (order.quantity / 100) * pricePer100;
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(amount);
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
        if (!order.material || !order.quantity) {
          this.showError('Data Pesanan Tidak Lengkap', `Mohon lengkapi data pesanan #${i + 1}! Pastikan jenis produk sudah dipilih!`);
          return;
        }
      }

      let message = `*PESANAN KARTU NAMA*\n\n`;
      message += `*DATA PELANGGAN*\n`;
      message += `Nama: ${this.customer.name}\n`;
      message += `No. HP: ${this.customer.phone}\n`;
      message += `Alamat: ${this.customer.address}\n\n`;
      message += `*DETAIL PESANAN*\n`;
      message += `━━━━━━━━━━━━━━━━━━━━\n`;

      this.orders.forEach((order, index) => {
        message += `\n*Pesanan #${index + 1}*\n`;
        message += `*Kode Pesanan: ${this.orderCode}*\n`;
        message += `Jenis Produk: ${this.materialNames[order.material]}\n`;
        message += `Ukuran: ${order.size}\n`;
        message += `Kuantitas: ${order.quantity} lembar\n`;
        message += `Harga per 100 lembar: ${this.formatCurrency(order.unitPrice)}\n`;
        message += `Total: ${this.formatCurrency(order.totalPrice)}\n`;
      });

      message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
      message += `*TOTAL KESELURUHAN: ${this.formatCurrency(this.grandTotal)}*\n\n`;

      message += `Segera konfirmasi saya terkait ketersediaan produk atau hal-hal lainnya. Terima kasih ! `;

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
}

.kartunama-order {
  background: #191970;
  min-height: 100vh;
  padding: 40px 20px 120px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.header {
  margin-bottom: 30px;
  animation: fadeInDown 0.6s ease;
}

.back-btn {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 25px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
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
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin: 0 0 10px 0;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  text-align: center;
  margin: 0;
  font-weight: 400;
}

.product-banner {
  position: relative;
  width: 100%;
  height: 280px;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 40px;
  animation: fadeInUp 0.8s ease;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.product-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 30px;
  color: #fff;
}

.banner-overlay h2 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.customer-card,
.order-card {
  background: #fff;
  border-radius: 24px;
  padding: 0;
  margin-bottom: 30px;
  animation: fadeInUp 0.8s ease;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-left svg {
  color: #fff;
}

.card-title {
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
}

.card-body {
  padding: 30px;
}

.form-row {
  display: grid;
  gap: 20px;
  margin-bottom: 0;
}

.form-row.two-cols {
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label,
.main-label {
  display: block;
  color: #333;
  font-weight: 700;
  margin-bottom: 12px;
  font-size: 1rem;
  letter-spacing: 0.3px;
}

.required {
  color: #ff4444;
  font-weight: 700;
}

.input-field {
  width: 100%;
  padding: 16px 20px;
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
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.input-field.error {
  border-color: #ff4444;
  background: #fff5f5;
}

.input-field.locked {
  background: #e5e7eb;
  color: #6b7280;
  cursor: not-allowed;
  font-weight: 600;
}

.input-field::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.textarea {
  resize: vertical;
  min-height: 100px;
  line-height: 1.6;
}

.error-message {
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 8px;
  font-weight: 600;
  animation: shake 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.helper-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 8px;
  font-weight: 500;
}

.material-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.material-card {
  position: relative;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border: 3px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.material-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(102, 126, 234, 0.15);
  border-color: #667eea;
}

.material-card.selected {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
  transform: translateY(-4px);
}

.material-icon {
  width: 48px;
  height: 48px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
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
}

.material-card.selected .material-icon svg {
  color: #fff;
}

.material-info {
  flex: 1;
}

.material-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 6px 0;
  transition: color 0.3s ease;
}

.material-card.selected .material-name {
  color: #fff;
}

.material-price {
  font-size: 1.1rem;
  font-weight: 800;
  color: #667eea;
  margin: 0;
  transition: color 0.3s ease;
}

.material-card.selected .material-price {
  color: #fff;
}

.material-badge {
  display: inline-block;
  background: #10b981;
  color: #fff;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-top: 8px;
}

.material-card.selected .material-badge {
  background: rgba(255, 255, 255, 0.3);
}

.check-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: checkPop 0.3s ease;
}

.check-icon svg {
  color: #667eea;
}

.input-with-lock {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input-with-lock .input-field.size-input {
  width: 100%;
  padding-right: 50px;
}

.lock-icon {
  position: absolute;
  right: 20px;
  color: #9ca3af;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-control {
  display: flex;
  align-items: stretch;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 14px;
  overflow: hidden;
  height: 56px;
  width: 100%;
  max-width: 100%;
}

.qty-btn {
  background: #fff;
  border: none;
  width: 46px;
  min-width: 46px;
  max-width: 46px;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #667eea;
  font-weight: 700;
}

.qty-btn:hover:not(:disabled) {
  background: #667eea;
  color: #fff;
}

.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-input {
  flex: 1;
  min-width: 0;
  max-width: 100%;
  border: none;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  background: transparent;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
}

.qty-input:focus {
  outline: none;
}

.qty-input::-webkit-inner-spin-button,
.qty-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.qty-input[type=number] {
  -moz-appearance: textfield;
}

.price-summary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 18px;
  padding: 24px;
  margin-top: 30px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  margin-bottom: 12px;
  font-size: 1.05rem;
}

.price-row:last-child {
  margin-bottom: 0;
}

.price-row.total-row {
  padding-top: 16px;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  margin-top: 8px;
}

.price-label {
  font-weight: 600;
}

.price-value {
  font-weight: 800;
  font-size: 1.15rem;
}

.price-value.total {
  font-size: 1.4rem;
  color: #fff;
}

.remove-btn {
  background: rgba(255, 68, 68, 0.1);
  backdrop-filter: blur(10px);
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 10px 18px;
  border-radius: 10px;
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
}

.summary-card {
  background: #fff;
  border-radius: 24px;
  padding: 0;
  margin-bottom: 30px;
  animation: fadeInUp 1.1s ease;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.grand-total-section {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  padding: 28px 30px;
}

.total-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.total-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.total-icon svg {
  color: #fff;
}

.total-info {
  flex: 1;
}

.total-label {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 6px 0;
}

.total-amount {
  color: #fff;
  font-size: 2rem;
  font-weight: 900;
  margin: 0;
  letter-spacing: -0.5px;
}

.action-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 24px 30px;
}

.btn {
  padding: 11px 20px;
  border: none;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.2px;
  white-space: nowrap;
  width: 100%;
}

.btn svg {
  flex-shrink: 0;
}

.btn-add {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.btn-add:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(102, 126, 234, 0.4);
}

.btn-cancel {
  background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
}

.btn-cancel:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 68, 68, 0.4);
}

.btn-whatsapp {
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  color: #fff;
  box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
}

.btn-whatsapp:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(37, 211, 102, 0.4);
}

.footer-spacer {
  height: 80px;
}

.form-actions {
  padding: 0 30px 30px;
}

.btn-save-customer {
  width: 100%;
  padding: 14px 28px;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.3px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #fff;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
}

.btn-save-customer:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(16, 185, 129, 0.4);
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
.address-note {
  margin-top: 8px;
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.5;
  font-weight: 500;
}

.address-note strong {
  color: #374151;
}

.address-note em {
  font-style: normal;
  font-weight: 700;
  color: #667eea;
}

.address-note span {
  display: block;
  margin-top: 4px;
  font-size: 0.8rem;
  color: #9ca3af;
}

.screenshot-guide {
  background: linear-gradient(135deg, #fff5f5 0%, #ffe4e6 100%);
  border: 3px solid #ff4444;
  border-radius: 18px;
  padding: 0;
  margin-top: 24px;
  overflow: hidden;
  animation: pulseWarning 2s ease-in-out infinite;
}

@keyframes pulseWarning {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(255, 68, 68, 0);
  }
}

.guide-header {
  background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
  padding: 18px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.guide-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  animation: iconBounce 1s ease-in-out infinite;
}

@keyframes iconBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.guide-icon svg {
  color: #fff;
}

.guide-title {
  color: #fff;
  font-size: 1.15rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: 0.3px;
  line-height: 1.3;
}

.guide-content {
  padding: 24px;
}

.guide-warning {
  color: #7f1d1d;
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0 0 20px 0;
  font-weight: 500;
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  border-left: 4px solid #ff4444;
}

.guide-warning strong {
  color: #991b1b;
  font-weight: 800;
}

.guide-example {
  margin-bottom: 24px;
}

.example-label {
  color: #374151;
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.example-label svg {
  color: #667eea;
  flex-shrink: 0;
}

.example-image-wrapper {
  position: relative;
}

.example-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #fff;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  z-index: 10;
  animation: badgePulse 1.5s ease-in-out infinite;
}

@keyframes badgePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.example-image {
  background: #fff;
  border: 3px solid #667eea;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.example-image img {
  max-width: 280px;
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: block;
}

.example-caption {
  margin-top: 12px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  border: 2px solid #7dd3fc;
  border-radius: 10px;
  color: #0c4a6e;
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.example-caption svg {
  color: #0284c7;
  flex-shrink: 0;
}

.guide-steps {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  border: 2px solid #e5e7eb;
}

.steps-title {
  color: #1f2937;
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.steps-title svg {
  color: #667eea;
  flex-shrink: 0;
}

.steps-list {
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: step-counter;
}

.steps-list > li {
  margin-bottom: 14px;
  padding: 14px;
  background: #f9fafb;
  border-radius: 10px;
  border-left: 4px solid #667eea;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  transition: all 0.3s ease;
}

.steps-list > li:hover {
  background: #f3f4f6;
  transform: translateX(4px);
}

.steps-list > li:last-child {
  margin-bottom: 0;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 50%;
  font-weight: 800;
  font-size: 0.95rem;
  flex-shrink: 0;
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.step-text {
  flex: 1;
  color: #374151;
  font-size: 0.9rem;
  line-height: 1.7;
  font-weight: 500;
  padding-top: 4px;
  word-break: break-word;
}

.step-text strong {
  color: #1f2937;
  font-weight: 800;
}

.highlight-step {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important;
  border-left-color: #f59e0b !important;
  border-width: 4px;
}

.highlight-step .step-number {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
  animation: numberPulse 1.5s ease-in-out infinite;
}

@keyframes numberPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.highlight-step .step-text {
  color: #78350f;
}

.sub-steps {
  margin: 12px 0 0 0;
  padding-left: 20px;
  list-style-type: none;
  counter-reset: sub-counter;
}

.sub-steps li {
  margin-bottom: 8px;
  color: #78350f;
  font-size: 0.875rem;
  line-height: 1.6;
  padding-left: 24px;
  position: relative;
  word-break: break-word;
}

.sub-steps li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #f59e0b;
  font-weight: 800;
}

.sub-steps li:last-child {
  margin-bottom: 0;
}

.sub-steps strong {
  color: #78350f;
  font-weight: 800;
}

.guide-footer {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  padding: 14px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 2px solid #fbbf24;
  flex-wrap: wrap;
}

.guide-footer svg {
  color: #f59e0b;
  flex-shrink: 0;
}

.guide-footer span {
  color: #78350f;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.5;
  flex: 1;
  word-break: break-word;
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
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.01); }
}

@keyframes checkPop {
  0% { transform: scale(0); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@media (max-width: 768px) {
  .banner-order {
    padding: 30px 15px 140px;
  }

  .back-btn {
    padding: 8px 16px;
    font-size: 0.85rem;
  }

  .back-btn svg {
    width: 16px;
    height: 16px;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .product-banner {
    height: 200px;
    margin-bottom: 30px;
  }

  .banner-overlay h2 {
    font-size: 1.4rem;
  }

  .card-header {
    padding: 20px;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .card-body {
    padding: 20px;
  }

  .form-row.two-cols {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .material-grid {
    grid-template-columns: 1fr;
  }

  .action-section {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 10px;
  }

  .btn {
    width: 100%;
    padding: 12px 20px;
    font-size: 0.9rem;
  }

  .grand-total-section {
    padding: 24px 20px;
  }

  .total-content {
    flex-direction: column;
    text-align: center;
  }

  .total-icon {
    width: 50px;
    height: 50px;
  }

  .total-icon svg {
    width: 24px;
    height: 24px;
  }

  .total-amount {
    font-size: 1.8rem;
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

  .screenshot-guide {
    margin-top: 20px;
    border-width: 2px;
  }

  .guide-header {
    padding: 16px 20px;
    gap: 10px;
  }

  .guide-icon {
    width: 36px;
    height: 36px;
  }

  .guide-icon svg {
    width: 20px;
    height: 20px;
  }

  .guide-title {
    font-size: 1rem;
    line-height: 1.4;
  }

  .guide-content {
    padding: 20px;
  }

  .guide-warning {
    font-size: 0.875rem;
    padding: 14px;
    line-height: 1.6;
  }

  .example-label {
    font-size: 0.875rem;
    gap: 6px;
  }

  .example-label svg {
    width: 18px;
    height: 18px;
  }

  .example-badge {
    font-size: 0.7rem;
    padding: 5px 12px;
    top: -6px;
    right: -6px;
  }

  .example-image {
    padding: 12px;
  }

  .example-image img {
    max-width: 220px;
  }

  .example-caption {
    font-size: 0.8rem;
    padding: 8px 14px;
    gap: 6px;
  }

  .guide-steps {
    padding: 16px;
  }

  .steps-title {
    font-size: 0.95rem;
  }

  .steps-list > li {
    padding: 12px;
    gap: 12px;
  }

  .step-number {
    width: 28px;
    height: 28px;
    min-width: 28px;
    font-size: 0.875rem;
  }

  .step-text {
    font-size: 0.85rem;
    line-height: 1.6;
  }

  .sub-steps {
    padding-left: 16px;
  }

  .sub-steps li {
    font-size: 0.8rem;
    padding-left: 20px;
  }

  .guide-footer {
    padding: 12px 16px;
    gap: 10px;
  }

  .guide-footer svg {
    width: 18px;
    height: 18px;
  }

  .guide-footer span {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .banner-order {
    padding: 20px 12px 160px;
  }

  .back-btn {
    padding: 8px 14px;
    font-size: 0.8rem;
  }

  .back-btn svg {
    width: 14px;
    height: 14px;
  }

  .title {
    font-size: 1.6rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .product-banner {
    height: 180px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .remove-btn {
    width: 100%;
    justify-content: center;
  }

  .total-amount {
    font-size: 1.6rem;
  }

  .btn {
    padding: 12px 20px;
    font-size: 0.9rem;
  }

  .screenshot-guide {
    border-radius: 14px;
  }

  .guide-header {
    padding: 12px 16px;
    gap: 8px;
  }

  .guide-icon {
    width: 32px;
    height: 32px;
  }

  .guide-icon svg {
    width: 18px;
    height: 18px;
  }

  .guide-title {
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .guide-content {
    padding: 16px;
  }

  .guide-warning {
    font-size: 0.8rem;
    padding: 12px;
    border-radius: 10px;
  }

  .example-label {
    font-size: 0.8rem;
    gap: 5px;
  }

  .example-label svg {
    width: 16px;
    height: 16px;
  }

  .example-badge {
    font-size: 0.65rem;
    padding: 4px 10px;
    top: -5px;
    right: -5px;
    letter-spacing: 0.3px;
  }

  .example-image {
    padding: 10px;
  }

  .example-image img {
    max-width: 100%;
  }

  .example-caption {
    font-size: 0.75rem;
    padding: 8px 12px;
    gap: 5px;
  }

  .example-caption svg {
    width: 14px;
    height: 14px;
  }

  .guide-steps {
    padding: 14px;
    border-radius: 10px;
  }

  .steps-title {
    font-size: 0.875rem;
    gap: 6px;
    margin-bottom: 14px;
  }

  .steps-title svg {
    width: 16px;
    height: 16px;
  }

  .steps-list > li {
    padding: 10px;
    gap: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
  }

  .step-number {
    width: 26px;
    height: 26px;
    min-width: 26px;
    font-size: 0.8rem;
  }

  .step-text {
    font-size: 0.8rem;
    line-height: 1.6;
    padding-top: 2px;
  }

  .highlight-step {
    padding: 10px !important;
  }

  .sub-steps {
    margin-top: 10px;
    padding-left: 14px;
  }

  .sub-steps li {
    font-size: 0.75rem;
    padding-left: 18px;
    margin-bottom: 6px;
    line-height: 1.5;
  }

  .guide-footer {
    padding: 10px 14px;
    gap: 8px;
    border-radius: 8px;
  }

  .guide-footer svg {
    width: 16px;
    height: 16px;
  }

  .guide-footer span {
    font-size: 0.75rem;
    line-height: 1.4;
  }
}
</style>