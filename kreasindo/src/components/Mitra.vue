<template>
  <section
    ref="sectionRef"
    class="logo-section"
    :class="{ visible: isVisible }"
  >
    <div class="logo-card">
      <h2 class="title">Mitra & Konsumen Kami</h2>
      <p class="subtitle">
        Dipercaya oleh berbagai mitra dan konsumen dari beragam sektor industri
      </p>

      <div class="logo-mask">
        <div class="logo-track">
          <div
            class="logo-item"
            v-for="(logo, index) in logos"
            :key="'a-' + index"
          >
            <img :src="logo" alt="logo mitra" />
          </div>

          <div
            class="logo-item"
            v-for="(logo, index) in logos"
            :key="'b-' + index"
          >
            <img :src="logo" alt="logo mitra" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import logos from '@/data/logos.json'

const sectionRef = ref(null)
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.25 }
  )

  observer.observe(sectionRef.value)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap');

.logo-section {
  padding: 0 16px 160px;
  background: #f9fafb;
  display: flex;
  justify-content: center;
}

.logo-card {
  width: 100%;
  max-width: 1200px;
  background: #ffffff;
  border-radius: 28px;
  padding: 72px 40px 72px;
  margin-top: 140px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
  opacity: 0;
  transform: translateY(36px);
}

.logo-section.visible .logo-card {
  animation: fadeUp 0.8s ease forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  letter-spacing: 0.8px;
  font-size: clamp(1.9rem, 3.8vw, 2.6rem);
  color: #191970;
}

.subtitle {
  margin: 16px auto 96px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: clamp(1rem, 2.2vw, 1.15rem);
  color: #111827;
  max-width: 720px;
  line-height: 1.6;
}

.logo-mask {
  position: relative;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}

.logo-track {
  display: flex;
  width: max-content;
  animation: scroll-right 40s linear infinite;
}

.logo-track:hover {
  animation-play-state: paused;
}

.logo-item {
  flex: 0 0 auto;
  padding: 0 56px;
}

.logo-item img {
  height: clamp(90px, 11vw, 150px);
  object-fit: contain;
  transition: transform 0.3s ease;
}

.logo-item img:hover {
  transform: scale(1.12);
}

@keyframes scroll-right {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .logo-card {
    padding: 56px 24px 56px;
    margin-top: 100px;
    border-radius: 20px;
  }

  .subtitle {
    margin-bottom: 72px;
  }
}

@media (max-width: 480px) {
  .logo-card {
    padding: 44px 20px 44px;
    margin-top: 80px;
  }

  .logo-item {
    padding: 0 32px;
  }
}
</style>