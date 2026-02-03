<template>
  <section class="about-section" id="about-us">
    <div class="content-wrapper">
      <div class="card text-card" ref="textCard">
        <h2 class="section-title">Tentang Kami</h2>
        <p class="description">
          CV. Kreasindo Jaya adalah perusahaan yang bergerak di bidang percetakan dan jasa desain grafis. Kami menyediakan layanan percetakan berkualitas tinggi dengan keterampilan dan pengalaman yang telah terbukti dalam memberikan solusi terbaik untuk kebutuhan cetak Anda.
        </p>
        <p class="description">
          Sistem kami dirancang untuk memberikan hasil cetak terbaik dengan kualitas tinggi dan layanan pelanggan yang ramah.
        </p>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="number-plus-wrapper">
              <AnimatedNumber :end-value="5000" />
              <span class="plus">+</span>
            </div>
            <span class="stat-label">Pelanggan puas</span>
          </div>
          <div class="stat-item">
            <div class="number-plus-wrapper">
              <AnimatedNumber :end-value="10" />
              <span class="plus">+</span>
            </div>
            <span class="stat-label">Jenis Layanan</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">24/7</span>
            <div class="label">
            <span class="stat-label">Dukungan</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card image-card" ref="imageCard">
        <img src="@/assets/tokoo.jpeg" alt="foto about" class="about-image" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import AnimatedNumber from './AnimatedNumber.vue'; 

const textCard = ref(null);
const imageCard = ref(null);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, {
  threshold: 0.2
});

onMounted(() => {
  if (textCard.value) observer.observe(textCard.value);
  if (imageCard.value) observer.observe(imageCard.value);
});

onUnmounted(() => {
  if (textCard.value) {
    observer.unobserve(textCard.value);
  }
  if (imageCard.value) {
    observer.unobserve(imageCard.value);
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

@keyframes slideUpFadeIn {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes zoomInFadeIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.about-section {
  padding: 6rem 2rem;
  background-color: #f8fafc;
  font-family: 'Poppins', sans-serif;
  color: #334155;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.label {
  transform: translateY(9px);
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  width: 100%;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.text-card {
  transition-delay: 0.1s;
}

.image-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-delay: 0.3s;
}

.image-card.animate-in .about-image {
  animation: zoomInFadeIn 1s ease-out forwards;
}

.about-image {
  object-fit: cover;
  border-radius: 12px;
  width: 100%;
  height: 100%;
}

.section-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #00008B;
  margin-bottom: 1.5rem;
}

.description {
  font-size: 1rem;
  line-height: 1.7;
  color: #111827;
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 2rem;
  margin-top: 2.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.number-plus-wrapper {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 0.25rem;
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 700;
  color: #00008B;
  line-height: 1;
}

.plus {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00008B;
  line-height: 1;
  position: relative;
  top: 5px;
}

.stat-label {
  font-size: 0.85rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 600;
  transform: translateY(-5px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 992px) {
  .content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .image-card {
    order: -1;
  }
  .about-image {
    width: 100%; 
  }
  .card, .about-image {
    opacity: 1;
    transform: none;
    transition: none;
    animation: none !important;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 4rem 1.5rem;
  }
  .card {
    padding: 2rem;
  }
  .section-title {
    font-size: 2rem;
  }
  .stats-grid {
    gap: 1.5rem;
  }
}
</style>