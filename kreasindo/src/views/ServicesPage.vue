<template>
  <div class="services-page">
    <main>
      <section class="search-section">
        <div class="container">
          <div class="search-container">
            <div class="search-box">
              <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Cari produk atau layanan..."
                class="search-input"
                @input="handleSearch"
              />
              <button v-if="searchQuery" @click="clearSearch" class="clear-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div v-if="showSuggestions && suggestions.length > 0" class="suggestions-dropdown">
              <div 
                v-for="(suggestion, index) in suggestions" 
                :key="index"
                class="suggestion-item"
                @click="selectSuggestion(suggestion)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <span>{{ suggestion }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div v-if="isLoading" class="loading-container">
        <div class="loader"></div>
        <p class="loading-text">Mencari produk...</p>
      </div>

      <div v-else-if="!isLoading && hasSearchResults && totalProductsCount === 0" class="not-found">
        <img src="/produk/notfound.png" alt="Produk tidak ditemukan" class="not-found-image" />
        <h3 class="not-found-title">Produk Tidak Ditemukan</h3>
        <p class="not-found-text">Maaf, produk "{{ searchQuery }}" tidak tersedia dalam katalog kami.</p>
        <button @click="clearSearch" class="btn-back-catalog">Kembali ke Katalog</button>
      </div>

      <div v-else class="carousels-wrapper">
        <PrintingCarousel 
          :searchQuery="searchQuery" 
          @products-count="updatePrintingCount"
          @keywords="updateKeywords"
        />
        
        <SouvenirCarousel 
          :searchQuery="searchQuery" 
          @products-count="updateSouvenirCount"
          @keywords="updateKeywords"
        />
        
        <WorkshopCarousel 
          :searchQuery="searchQuery" 
          @products-count="updateWorkshopCount"
          @keywords="updateKeywords"
        />

        <FukuCarousel 
          :searchQuery="searchQuery" 
          @products-count="updateFukuCount"
          @keywords="updateKeywords"
        />
      </div>

      <div class="footer-spacer"></div>
    </main>
  </div>
</template>

<script>
import PrintingCarousel from '@/components/PrintingCarousel.vue';
import SouvenirCarousel from '@/components/SouvenirCarousel.vue';
import WorkshopCarousel from '@/components/WorkshopCarousel.vue';
import FukuCarousel from '@/components/FukuCarousel.vue';

export default {
  name: 'ServicesPage',
  components: {
    PrintingCarousel,
    SouvenirCarousel,
    WorkshopCarousel,
    FukuCarousel
  },
  data() {
    return {
      searchQuery: '',
      showSuggestions: false,
      isLoading: false,
      printingCount: 0,
      souvenirCount: 0,
      workshopCount: 0,
      fukuCount: 0,
      allKeywords: new Set()
    }
  },
  computed: {
    suggestions() {
      if (!this.searchQuery) return [];
      
      const query = this.searchQuery.toLowerCase();
      
      return Array.from(this.allKeywords)
        .filter(keyword => keyword.toLowerCase().includes(query))
        .slice(0, 5);
    },
    totalProductsCount() {
      return this.printingCount + this.souvenirCount + this.workshopCount + this.fukuCount;
    },
    hasSearchResults() {
      return this.searchQuery.length > 0;
    }
  },
  methods: {
    handleSearch() {
      this.showSuggestions = true;
      this.isLoading = true;
      
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion;
      this.showSuggestions = false;
      this.handleSearch();
    },
    clearSearch() {
      this.searchQuery = '';
      this.showSuggestions = false;
      this.isLoading = false;
    },
    updatePrintingCount(count) {
      this.printingCount = count;
    },
    updateSouvenirCount(count) {
      this.souvenirCount = count;
    },
    updateWorkshopCount(count) {
      this.workshopCount = count;
    },
    updateFukuCount(count) {
      this.fukuCount = count;
    },
    updateKeywords(keywords) {
      keywords.forEach(keyword => this.allKeywords.add(keyword));
    }
  },
  watch: {
    searchQuery(newVal) {
      if (!newVal) {
        this.showSuggestions = false;
      }
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

.services-page {
  min-height: 100vh;
  background: #191970;
}

.search-section {
  background: #191970;
  padding: 60px 20px 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.search-container {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  animation: fadeInDown 1.2s ease;
}

.search-box {
  position: relative;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  padding: 0 20px;
  transition: all 0.3s ease;
}

.search-box:focus-within {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  transform: translateY(-2px);
}

.search-icon {
  color: #3b82f6;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 18px 16px;
  font-size: 1.05rem;
  font-weight: 500;
  color: #1f2937;
  background: transparent;
  font-family: 'Montserrat', sans-serif;
}

.search-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.clear-btn {
  background: #f3f4f6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.clear-btn:hover {
  background: #e5e7eb;
  transform: scale(1.1);
}

.clear-btn svg {
  color: #6b7280;
}

.suggestions-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 10;
  animation: slideDown 0.3s ease;
}

.suggestion-item {
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f3f4f6;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover {
  background: #f9fafb;
}

.suggestion-item svg {
  color: #3b82f6;
  flex-shrink: 0;
}

.suggestion-item span {
  color: #374151;
  font-weight: 500;
  font-size: 0.95rem;
}

.carousels-wrapper {
  background: #191970;
  display: flex;
  flex-direction: column;
  gap: 20px; 
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  animation: fadeIn 0.5s ease;
  background: #191970;
}

.loader {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 20px;
}

.not-found {
  text-align: center;
  padding: 60px 20px 120px;
  animation: fadeInUp 0.8s ease;
  background: #191970;
}

.not-found-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-bottom: 30px;
  opacity: 0.9;
}

.not-found-title {
  color: #fff;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 16px;
}

.not-found-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 30px;
  line-height: 1.6;
}

.btn-back-catalog {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: #fff;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 8px 20px rgba(30, 58, 138, 0.3);
}

.btn-back-catalog:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(30, 58, 138, 0.4);
}

.footer-spacer {
  height: 180px;
  background: #1a1a4d;
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

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .search-section {
    padding: 40px 15px 60px;
  }

  .page-title {
    font-size: 2.2rem;
  }

  .page-subtitle {
    font-size: 1rem;
    margin-bottom: 30px;
  }

  .search-input {
    font-size: 1rem;
    padding: 16px 12px;
  }

  .not-found-title {
    font-size: 1.6rem;
  }

  .not-found-text {
    font-size: 1rem;
  }
  
  .footer-spacer {
    height: 260px;
  }
  
  .carousels-wrapper {
    gap: 15px; 
  }
}

@media (max-width: 480px) {
  .search-section {
    padding: 30px 12px 50px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .page-subtitle {
    font-size: 0.95rem;
  }

  .search-input {
    font-size: 0.95rem;
  }

  .not-found-title {
    font-size: 1.4rem;
  }
  
  .carousels-wrapper {
    gap: 10px; 
  }
}
</style>