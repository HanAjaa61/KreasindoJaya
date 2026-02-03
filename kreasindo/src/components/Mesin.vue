<template>
  <section
    ref="sectionRef"
    class="machine-section"
    :class="{ visible: isVisible }"
  >
    <div class="machine-card-wrapper">
      <h2 class="title">Mesin Produksi Kami</h2>
      <p class="subtitle">
        Didukung dengan mesin-mesin percetakan modern yang lengkap untuk memastikan kualitas dan ketepatan produksi
      </p>

      <div class="machine-grid">
        <div
          class="machine-card"
          v-for="(machine, index) in machines"
          :key="index"
          :style="{ animationDelay: `${0.35 + index * 0.12}s` }"
        >
          <div
            class="image-wrapper"
            :class="{ active: activeIndex === index }"
            @click="handleClick(index)"
          >
            <img :src="machine.image" :alt="machine.name" />
            <div class="machine-detail">
              <p>{{ machine.description }}</p>
            </div>
          </div>

          <h3 class="machine-name">{{ machine.name }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import machines from '@/data/machines.json'

const activeIndex = ref(null)
const sectionRef = ref(null)
const isVisible = ref(false)

const handleClick = (index) => {
  if (window.matchMedia('(hover: hover)').matches) return
  activeIndex.value = activeIndex.value === index ? null : index
}

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(entry.target)
      }
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px',
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }

  if (window.innerWidth < 640) {
    isVisible.value = true
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;800&display=swap');

.machine-section {
  padding: 40px 16px 120px;
  background: #f9fafb;
  display: flex;
  justify-content: center;
}

.machine-card-wrapper {
  width: 100%;
  max-width: 1200px;
  background: #ffffff;
  border-radius: 28px;
  padding: 88px 40px 80px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
  opacity: 0;
  transform: translateY(24px);
}

.machine-section.visible .machine-card-wrapper {
  animation: fadeUp 0.7s ease forwards;
}

.title {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: clamp(1.8rem, 3.6vw, 2.5rem);
  color: #191970;
  opacity: 0;
  transform: translateY(20px);
}

.machine-section.visible .title {
  animation: fadeUp 0.7s ease forwards;
  animation-delay: 0.15s;
}

.subtitle {
  margin: 16px auto 88px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: clamp(1rem, 2.2vw, 1.15rem);
  color: #111827;
  max-width: 720px;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(20px);
}

.machine-section.visible .subtitle {
  animation: fadeUp 0.7s ease forwards;
  animation-delay: 0.25s;
}

.machine-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
}

.machine-card {
  text-align: center;
  opacity: 0;
  transform: translateY(28px);
}

.machine-section.visible .machine-card {
  animation: fadeUp 0.7s ease forwards;
}

.image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 18px;
  margin-bottom: 20px;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.machine-detail {
  position: absolute;
  inset: 0;
  background: rgba(25, 25, 112, 0.92);
  color: #ffffff;
  padding: 28px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.machine-detail p {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
}

.machine-name {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #111827;
}

.image-wrapper.active .machine-detail {
  opacity: 1;
}

@media (hover: hover) {
  .image-wrapper:hover img {
    transform: scale(1.08);
  }

  .image-wrapper:hover .machine-detail {
    opacity: 1;
  }
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .machine-card-wrapper {
    padding: 72px 24px 64px;
  }

  .subtitle {
    margin-bottom: 64px;
  }
}
</style>