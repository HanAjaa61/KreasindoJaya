<template>
  <section ref="sectionRef" class="stores-section" :class="{ visible: isVisible }">
    <div class="stores-wrapper">
      <h2 class="title">Kunjungi Tempat Kami</h2>
      <p class="subtitle">
        Temukan lokasi toko dan workshop kami di beberapa wilayah dan dapatkan layanan terbaik.
      </p>

      <div class="stores-grid">
        <div
          class="store-card"
          v-for="(store, index) in stores"
          :key="index"
          :style="{ animationDelay: `${0.3 + index * 0.15}s` }"
        >
          <div class="map-preview">
            <iframe 
              :src="store.gmapsEmbed"
              width="100%" 
              height="200" 
              style="border:0;" 
              allowfullscreen 
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          <div class="store-info">
            <h3 class="store-name">{{ store.name }}</h3>
            <p class="store-address">{{ store.address }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import storesData from '@/data/maps.json'

const stores = storesData
const sectionRef = ref(null)
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
  )

  if (sectionRef.value) observer.observe(sectionRef.value)

  if (window.innerWidth < 640) isVisible.value = true
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;800&display=swap');

.stores-section {
  background: linear-gradient(180deg, #191970 0%, #191970 70%, #1a1a4d 100%);
  padding: 1.5rem 1.5rem 10rem;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  color: #ffffff;
}

.stores-wrapper {
  width: 100%;
  max-width: 1000px;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
}

.stores-section.visible .stores-wrapper {
  animation: fadeUp 0.7s ease forwards;
}

.title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: clamp(1.6rem, 3.5vw, 2rem);
  margin-bottom: 0.4rem;
  opacity: 0;
  transform: translateY(20px);
}

.stores-section.visible .title {
  animation: fadeUp 0.7s ease forwards;
  animation-delay: 0.1s;
}

.subtitle {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: clamp(0.9rem, 1.8vw, 1rem);
  margin-bottom: 1.5rem;
  color: #d1d1f0;
  opacity: 0;
  transform: translateY(20px);
}

.stores-section.visible .subtitle {
  animation: fadeUp 0.7s ease forwards;
  animation-delay: 0.2s;
}

.stores-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .stores-grid {
    grid-template-columns: 1fr;
  }
  
  .stores-section {
    padding: 1.5rem 1.5rem 12rem;
  }
}

.store-card {
  background-color: #2a2a8f;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  text-align: center;
  opacity: 0;
  transform: translateY(28px);
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.stores-section.visible .store-card {
  animation: fadeUp 0.7s ease forwards;
}

.map-preview iframe {
  width: 100%;
  height: 180px;
  border: 0;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

.store-info {
  padding: 0.9rem 1rem 1.2rem;
}

.store-name {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  margin-bottom: 0.4rem;
}

.store-address {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 0.88rem;
  color: #d1d1f0;
  line-height: 1.4;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>