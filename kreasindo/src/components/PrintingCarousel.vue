<template>
  <section v-if="displayedProducts.length > 0" class="printing-catalog">
    <div class="container">
      <h2 class="section-title">Percetakan</h2>
      <p class="section-subtitle">Berbagai layanan percetakan berkualitas untuk kebutuhan Anda</p>

      <div class="carousel-wrapper">
        <button 
          class="carousel-arrow left" 
          @click="scrollLeft"
          :disabled="isAtStart"
          v-show="displayedProducts.length > itemsPerView"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div class="carousel-container" ref="carouselContainer">
          <div class="carousel" :style="{ transform: `translateX(-${currentSlide * slideWidth}%)` }">
            <div 
              v-for="product in displayedProducts" 
              :key="product.id"
              class="card"
              :class="{ 'coming-soon': product.comingSoon }"
              @click="!product.comingSoon && navigateToProduct(product)"
            >
              <div class="card-image">
                <img v-if="product.image" :src="product.image" :alt="product.title" />
                <div v-else class="placeholder">
                  <span>{{ product.title.substring(0, 2) }}</span>
                </div>
                <div v-if="!product.comingSoon" class="card-overlay">
                  <span class="view-details">Lihat Detail</span>
                </div>
              </div>
              <div class="card-content">
                <h3 class="card-title">{{ product.title }}</h3>
                <p class="card-description">{{ product.description }}</p>
                <div v-if="product.price" class="price-range">
                  <span class="price">{{ product.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          class="carousel-arrow right" 
          @click="scrollRight"
          :disabled="isAtEnd"
          v-show="displayedProducts.length > itemsPerView"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div v-if="displayedProducts.length > itemsPerView" class="pagination-dots">
        <button 
          v-for="(dot, index) in totalSlides" 
          :key="index"
          class="dot"
          :class="{ 'active': currentSlide === index }"
          @click="goToSlide(index)"
        ></button>
      </div>
    </div>
  </section>
</template>

<script>
import printingProducts from '@/data/printing.json';

export default {
  name: 'PrintingCarousel',
  props: {
    searchQuery: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentSlide: 0,
      isMobile: false,
      products: []
    }
  },
  computed: {
    displayedProducts() {
      if (!this.searchQuery || this.searchQuery.trim() === '') {
        return this.products;
      }
      
      const query = this.searchQuery.toLowerCase().trim();
      
      const filtered = this.products.filter(product => {
        if (product.comingSoon) return false;
        
        const titleMatch = product.title.toLowerCase().includes(query);
        
        const descMatch = product.description.toLowerCase().includes(query);
        
        const keywordMatch = product.keywords.some(keyword => 
          keyword.toLowerCase().includes(query)
        );
        
        return titleMatch || descMatch || keywordMatch;
      });
      
      return filtered;
    },
    itemsPerView() {
      return this.isMobile ? 1 : 2;
    },
    slideWidth() {
      return 100;
    },
    totalSlides() {
      return Math.ceil(this.displayedProducts.length / this.itemsPerView);
    },
    isAtStart() {
      return this.currentSlide === 0;
    },
    isAtEnd() {
      return this.currentSlide >= this.totalSlides - 1;
    }
  },
  mounted() {
    this.products = printingProducts;
    this.emitKeywords();
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
    window.scrollTo(0, 0);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
      this.currentSlide = 0;
    },
    scrollLeft() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
    scrollRight() {
      if (this.currentSlide < this.totalSlides - 1) {
        this.currentSlide++;
      }
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
    navigateToProduct(product) {
      if (product.route) {
        this.$router.push(product.route);
      }
    },
    emitKeywords() {
      const keywords = new Set();
      this.products.forEach(product => {
        if (!product.comingSoon) {
          keywords.add(product.title);
          product.keywords.forEach(keyword => keywords.add(keyword));
        }
      });
      this.$emit('keywords', Array.from(keywords));
    }
  },
  watch: {
    displayedProducts(newVal) {
      this.currentSlide = 0;
      this.$emit('products-count', newVal.length);
    },
    searchQuery() {
      this.$emit('products-count', this.displayedProducts.length);
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

.printing-catalog {
  background: #191970;
  padding: 60px 20px 150px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  color: #fff;
  font-size: 2.4rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 12px;
  animation: fadeInDown 0.8s ease;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 50px;
  animation: fadeInDown 1s ease;
}

.carousel-wrapper {
  position: relative;
  animation: fadeInUp 1s ease;
}

.carousel-container {
  overflow: hidden;
  border-radius: 24px;
}

.carousel {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
}

.card {
  flex: 0 0 calc(50% - 15px);
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  margin-right: 30px;
}

.card:nth-child(2n) {
  margin-right: 0;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.card.coming-soon {
  cursor: default;
  opacity: 0.8;
}

.card.coming-soon:hover {
  transform: none;
}

.card-image {
  position: relative;
  height: 280px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card:hover .card-image img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(25, 25, 112, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .card-overlay {
  opacity: 1;
}

.view-details {
  color: #fff;
  font-size: 1.15rem;
  font-weight: 700;
  padding: 14px 32px;
  border: 2px solid #fff;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.card:hover .view-details {
  background: #fff;
  color: #191970;
  transform: scale(1.05);
}

.placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.placeholder span {
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
}

.card-content {
  padding: 28px;
}

.card-title {
  color: #191970;
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.card-description {
  color: #6b7280;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.6;
  margin-bottom: 16px;
}

.price-range {
  display: flex;
  align-items: center;
}

.price {
  color: #667eea;
  font-size: 1.15rem;
  font-weight: 800;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 5;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.carousel-arrow:hover:not(:disabled) {
  background: #fff;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
}

.carousel-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-arrow.left {
  left: -28px;
}

.carousel-arrow.right {
  right: -28px;
}

.carousel-arrow svg {
  color: #667eea;
}

.pagination-dots {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.2);
}

.dot.active {
  background: #fff;
  width: 32px;
  border-radius: 6px;
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

@media (max-width: 768px) {
  .printing-catalog {
    padding: 40px 15px 130px;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .section-subtitle {
    font-size: 1rem;
    margin-bottom: 40px;
  }

  .carousel-wrapper {
    position: relative;
    padding: 0;
  }

  .carousel-container {
    overflow: hidden;
    margin: 0 50px;
  }

  .carousel {
    padding: 0;
  }

  .card {
    flex: 0 0 100%;
    margin-right: 0;
  }

  .card-image {
    height: 220px;
  }

  .card-content {
    padding: 24px;
  }

  .card-title {
    font-size: 1.4rem;
  }

  /* Mobile navigation arrows */
  .carousel-arrow {
    display: flex !important;
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .carousel-arrow.left {
    left: 0;
  }

  .carousel-arrow.right {
    right: 0;
  }

  /* Mobile pagination dots */
  .pagination-dots {
    display: flex !important;
    margin-top: 30px;
  }
}

@media (max-width: 480px) {
  .printing-catalog {
    padding: 30px 12px 110px;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-subtitle {
    font-size: 0.95rem;
  }

  .card-image {
    height: 200px;
  }

  .card-title {
    font-size: 1.3rem;
  }

  .card-description {
    font-size: 0.95rem;
  }
}
</style>