<template>
  <section
    id="fuku"
    ref="sectionRef"
    class="fuku-section"
    :class="{ visible: isVisible }"
  >
    <div class="fuku-container">
      <div class="fuku-content">
        <h2 class="fuku-title">Fuku</h2>
        
        <div class="fuku-images fuku-images-mobile" :class="{ open: isVisible }">
          <transition-group name="fade" mode="out-in">
            <img
              v-for="(img, index) in currentImages"
              :key="`${currentSetIndex}-${index}`"
              :src="img"
              class="fuku-image"
            />
          </transition-group>
        </div>
        
        <p class="fuku-subtitle">
          Brand terbaru dari CV. Kreasindo Jaya yang menghadirkan layanan custom merchandise
          dan souvenir dengan desain eksklusif dan kualitas terbaik sesuai keinginan Anda.
        </p>

        <a
          href="#fukucarousel"
          @click.prevent="scrollToFukuCarousel"
          class="fuku-button"
        >
          Telusuri
        </a>
      </div>

      <div class="fuku-images fuku-images-desktop" :class="{ open: isVisible }">
        <transition-group name="fade" mode="out-in">
          <img
            v-for="(img, index) in currentImages"
            :key="`${currentSetIndex}-${index}`"
            :src="img"
            class="fuku-image"
          />
        </transition-group>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const poseImages = [
  '/pose/pose1.jpeg',
  '/pose/pose2.jpeg',
  '/pose/pose3.jpeg'
]

const warnaImages = [
  '/warna/warna1.jpeg',
  '/warna/warna2.jpeg',
  '/warna/warna3.jpeg',
  '/warna/warna4.jpeg',
  '/warna/poloo.jpeg',
  '/warna/jerseyy.jpeg'
]

const sectionRef = ref(null)
const isVisible = ref(false)
const currentSetIndex = ref(0)
let autoSlideInterval = null

const currentImages = computed(() => {
  if (currentSetIndex.value === 0) {
    return poseImages
  } else {
    const warnaIndex = currentSetIndex.value - 1
    return [warnaImages[warnaIndex], warnaImages[warnaIndex], warnaImages[warnaIndex]]
  }
})

const scrollToFukuCarousel = () => {
  router.push('/services#fukucarousel').then(() => {
    setTimeout(() => {
      const fukucarousel = document.getElementById('fukucarousel')
      if (fukucarousel) {
        fukucarousel.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  })
}

const nextSlide = () => {
  const totalSets = 1 + warnaImages.length
  currentSetIndex.value = (currentSetIndex.value + 1) % totalSets
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 3000)
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        setTimeout(() => {
          startAutoSlide()
        }, 1000)
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )

  observer.observe(sectionRef.value)
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

.fuku-section {
  background: linear-gradient(135deg, #b11226, #8e0f1f);
  padding: 200px 20px 220px;
  min-height: 100vh;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.9s ease;
  font-family: 'Montserrat', sans-serif;
}

.fuku-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.fuku-container {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 120px;
  align-items: center;
}

.fuku-title {
  font-size: 56px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 28px;
}

.fuku-subtitle {
  font-size: 16px;
  line-height: 1.9;
  color: #fde2e2;
  margin-bottom: 52px;
  max-width: 520px;
}

.fuku-button {
  display: inline-block;
  padding: 16px 48px;
  color: #ffffff;
  border: 2px solid #ffffff;
  text-decoration: none;
  font-weight: 600;
  border-radius: 999px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.fuku-button:hover {
  background: #ffffff;
  color: #b11226;
}

.fuku-images-mobile {
  display: none;
}

.fuku-images-desktop {
  display: flex;
}

.fuku-images {
  position: relative;
  width: 100%;
  height: 360px;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
}

.fuku-image {
  position: absolute;
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 22px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
  opacity: 0;
  transform: scale(0.85);
  transition: all 1s ease;
}

.fuku-images.open .fuku-image {
  opacity: 1;
}

.fuku-images.open .fuku-image:nth-child(1) {
  transform: translateX(-140px) rotate(-18deg);
}

.fuku-images.open .fuku-image:nth-child(2) {
  transform: translateY(-10px) scale(1.05);
  z-index: 3;
}

.fuku-images.open .fuku-image:nth-child(3) {
  transform: translateX(140px) rotate(18deg);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .fuku-section {
    padding: 150px 20px 170px;
  }

  .fuku-container {
    grid-template-columns: 1fr;
    gap: 0;
    text-align: center;
  }

  .fuku-images-mobile {
    display: flex;
    margin: 25px 0 30px;
  }

  .fuku-images-desktop {
    display: none;
  }

  .fuku-title {
    font-size: 36px;
    margin-bottom: 0;
  }

  .fuku-subtitle {
    font-size: 14.5px;
    margin-left: auto;
    margin-right: auto;
  }

  .fuku-button {
    padding: 12px 34px;
    font-size: 13.5px;
  }

  .fuku-images {
    margin-left: 0;
    height: 230px;
    padding: 0 24px;
  }

  .fuku-image {
    width: 130px;
    height: 195px;
  }

  .fuku-images.open .fuku-image:nth-child(1) {
    transform: translateX(-70px) rotate(-10deg);
  }

  .fuku-images.open .fuku-image:nth-child(2) {
    transform: translateY(-3px) scale(0.98);
  }

  .fuku-images.open .fuku-image:nth-child(3) {
    transform: translateX(70px) rotate(10deg);
  }
}

@media (max-width: 480px) {
  .fuku-title {
    font-size: 28px;
  }

  .fuku-subtitle {
    font-size: 13.5px;
    line-height: 1.6;
  }

  .fuku-button {
    padding: 11px 30px;
    font-size: 13px;
  }

  .fuku-images {
    height: 200px;
    padding: 0 28px;
  }

  .fuku-image {
    width: 110px;
    height: 165px;
  }

  .fuku-images.open .fuku-image:nth-child(1) {
    transform: translateX(-60px) rotate(-8deg);
  }

  .fuku-images.open .fuku-image:nth-child(2) {
    transform: translateY(-2px) scale(0.96);
  }

  .fuku-images.open .fuku-image:nth-child(3) {
    transform: translateX(60px) rotate(8deg);
  }
}
</style>