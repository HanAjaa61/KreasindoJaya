<template>
  <section
    ref="sectionRef"
    class="testimonials-section"
    :class="{ visible: isVisible }"
  >
    <div class="container">
      <h2 class="section-heading">Apa Kata Mereka ?</h2>
      <p class="section-subheading">
        Pengalaman mereka menggunakan layanan percetakan di CV. Kreasindo Jaya.
      </p>

      <div class="testimonials-grid">
        <div
          class="testimonial-card"
          v-for="(item, index) in testimonials"
          :key="index"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          <div class="avatar-container">
            <img
              :src="item.image"
              :alt="item.name"
              class="user-avatar"
              loading="lazy"
            />
          </div>

          <p class="testimonial-text">"{{ item.text }}"</p>

          <div class="user-info">
            <span class="user-name">{{ item.name }}</span>
            <span class="user-role">{{ item.role }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import farhan from '@/assets/farhan.jpeg'
import hasyim from '@/assets/hasyim.jpeg'
import rafli from '@/assets/raflii.jpeg'

const testimonials = [
  {
    name: 'Farhan',
    role: 'Konsumen Barang dan Jasa di CV. Kreasindo Jaya',
    text:
      'Sangat membantu! pelayanan percetakan di CV. Kreasindo Jaya sangat profesional dan memuaskan.',
    image: farhan
  },
  {
    name: 'Hasyim',
    role: 'Konsumen Barang dan Jasa di CV. Kreasindo Jaya',
    text:
      'Saya memesan piala dengan bantuan rekomendasi desain yang sangat memuaskan sehingga hasilnya melebihi ekspektasi.',
    image: hasyim
  },
  {
    name: 'Rafli',
    role: 'Konsumen Barang dan Jasa di CV. Kreasindo Jaya',
    text:
      'Saya memesan desain baju dan sangat puas. Hasil berkualitas tinggi dan prosesnya cepat.',
    image: rafli
  }
]

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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

.testimonials-section {
  background: #191970;
  padding: 120px 16px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  font-family: 'Montserrat', sans-serif;
}

.testimonials-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.section-heading {
  font-size: clamp(1.9rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #ffffff;
}

.section-subheading {
  margin-top: 14px;
  margin-bottom: 64px;
  font-size: 1rem;
  font-weight: 500;
  color: #e5e7eb;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.testimonial-card {
  background: #ffffff;
  padding: 36px 28px;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  opacity: 0;
  transform: translateY(32px);
}

.testimonials-section.visible .testimonial-card {
  animation: fadeUp 0.7s ease forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.avatar-container {
  width: 84px;
  height: 84px;
  margin: 0 auto 16px;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonial-text {
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.6;
  color: #374151;
  font-style: italic;
  margin-bottom: 20px;
}

.user-name {
  font-weight: 700;
  color: #191970;
}

.user-role {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .testimonials-section {
    padding: 96px 16px;
  }
}
</style>