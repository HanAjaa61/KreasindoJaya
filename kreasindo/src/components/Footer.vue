<template>
  <footer ref="footerRef" class="footer-section" :class="{ visible: isVisible }">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-column company-info">
          <div class="logo-wrapper">
            <img src="@/assets/logokreasindo.png" alt="Logo Perusahaan" class="footer-logo" />
          </div>
          <p class="company-tagline">Solusi Percetakan Berkualitas Tinggi</p>
          <p class="footer-description">
            CV. Kreasindo Jaya menyediakan layanan percetakan berkualitas tinggi dengan teknologi modern dan tim profesional yang siap membantu mewujudkan kebutuhan cetak Anda.
          </p>
          
          <div class="social-section">
            <h4 class="section-title">Terhubung Dengan Kami</h4>
            <div class="social-links">
              <a :href="socials.instagram" target="_blank" aria-label="Instagram" class="social-icon">
                <img src="@/assets/instagram.png" alt="Instagram" />
              </a>
              <a :href="socials.facebook" target="_blank" aria-label="Facebook" class="social-icon">
                <img src="@/assets/facebook.png" alt="Facebook" />
              </a>
              <a :href="socials.tiktok" target="_blank" aria-label="TikTok" class="social-icon">
                <img src="@/assets/tiktokk.png" alt="TikTok" />
              </a>
            </div>
          </div>
        </div>

        <div class="footer-column">
          <h4 class="section-title">Navigasi</h4>
          <nav class="footer-nav">
            <a href="#home" @click.prevent="handleHomeClick" class="nav-link">
              <span class="link-icon">→</span>
              <span>Beranda</span>
            </a>
            <a href="#about-us" @click.prevent="handleAboutClick" class="nav-link">
              <span class="link-icon">→</span>
              <span>Tentang</span>
            </a>
            <RouterLink to="/services" class="nav-link">
              <span class="link-icon">→</span>
              <span>Produk</span>
            </RouterLink>
            <RouterLink to="/payment" class="nav-link">
              <span class="link-icon">→</span>
              <span>Pembayaran</span>
            </RouterLink>
          </nav>
        </div>

        <div class="footer-column">
          <h4 class="section-title">Jam Operasional</h4>
          <div class="hours-card">
            <div class="hours-item">
              <div class="day-label">Senin - Sabtu</div>
              <div class="time-label">09.00 - 21.00 WITA</div>
            </div>
            <div class="hours-divider"></div>
            <div class="hours-item">
              <div class="day-label">Minggu</div>
              <div class="time-label closed">Libur</div>
            </div>
          </div>
          
          <div class="contact-info">
            <div class="info-item">
              <span class="info-icon">📍</span>
              <span>Kalimantan Timur, Indonesia</span>
            </div>
            <div class="info-item">
              <span class="info-icon">📧</span>
              <span>fukubykreasindojaya@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="bottom-content">
          <p class="copyright">© 2026 CV. Kreasindo Jaya. All Rights Reserved</p>
          <div class="bottom-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <span class="separator">•</span>
            <a href="/terms-of-services">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

const socials = {
  instagram: 'https://www.instagram.com/fuku.bykreasindojaya?igsh=MXNseDhjcmtsZmhteA==',
  facebook: 'https://www.facebook.com/share/17uvh9816Z/',
  tiktok: 'https://www.tiktok.com/@fuku.bykreasindojaya?_r=1&_t=ZS-92x1U0G8fuD'
}

const footerRef = ref(null)
const isVisible = ref(false)

const route = useRoute()
const router = useRouter()

const handleHomeClick = async () => {
  if (route.path !== '/') {
    await router.push('/')
    await nextTick()
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleAboutClick = async () => {
  if (route.path !== '/') {
    await router.push('/')
    await nextTick()
  }
  document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.1 }
  )

  if (footerRef.value) observer.observe(footerRef.value)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

.footer-section {
  position: relative;
  background: linear-gradient(135deg, #1a1a4d 100%, #1a1a4d 50%, #0f0f3d 100%);
  color: #ffffff;
  padding: 5rem 0 0;
  margin-top: -5px;
  font-family: 'Montserrat', sans-serif;
  overflow: hidden;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.footer-container {
  position: relative;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr;
  gap: 4rem;
  padding-bottom: 3rem;
  max-width: 1280px;
  margin: 0 auto;
}

.footer-column {
  animation: slideUp 0.8s ease forwards;
  opacity: 0;
}

.footer-section.visible .footer-column:nth-child(1) { animation-delay: 0.2s; }
.footer-section.visible .footer-column:nth-child(2) { animation-delay: 0.4s; }
.footer-section.visible .footer-column:nth-child(3) { animation-delay: 0.6s; }

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-wrapper {
  margin-bottom: 1.5rem;
}

.footer-logo {
  width: 160px;
  height: auto;
  filter: brightness(1.1);
  transition: transform 0.3s ease;
}

.footer-logo:hover {
  transform: scale(1.05);
}

.company-tagline {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffdd57;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.footer-description {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #d1d5ff;
  margin-bottom: 2.5rem;
  font-weight: 400;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffdd57;
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 3px;
  background: #ffdd57;
  border-radius: 2px;
}

.social-section {
  margin-top: 2.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.social-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 10px;
  position: relative;
  overflow: hidden;
}

.social-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 221, 87, 0.4), transparent);
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
}

.social-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(1.2);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.social-icon:first-child img {
  width: 120%;
  height: 120%;
}

.social-icon:hover {
  background: rgba(255, 221, 87, 0.2);
  border-color: #ffdd57;
  box-shadow: 0 0 30px rgba(255, 221, 87, 0.5),
              0 0 60px rgba(255, 221, 87, 0.3),
              0 0 90px rgba(255, 221, 87, 0.1);
}

.social-icon:hover::before {
  width: 150%;
  height: 150%;
}

.social-icon:hover img {
  transform: scale(1.15);
  filter: brightness(1.5) drop-shadow(0 0 8px rgba(255, 221, 87, 0.8));
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #d1d5ff;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
}

.link-icon {
  font-size: 1.2rem;
  color: #ffdd57;
  transition: transform 0.3s ease;
}

.nav-link:hover {
  color: #ffffff;
  padding-left: 0.5rem;
}

.nav-link:hover .link-icon {
  transform: translateX(5px);
}

.hours-card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  margin-bottom: 2rem;
}

.hours-item {
  padding: 0.8rem 0;
}

.day-label {
  font-size: 0.9rem;
  color: #ffdd57;
  font-weight: 600;
  margin-bottom: 0.4rem;
}

.time-label {
  font-size: 1rem;
  color: #ffffff;
  font-weight: 700;
}

.time-label.closed {
  color: #ff6b6b;
}

.hours-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0.8rem 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #d1d5ff;
  font-size: 0.9rem;
  font-weight: 500;
}

.info-icon {
  font-size: 1.2rem;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding: 2rem 0;
  margin-top: 2rem;
}

.bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1280px;
  margin: 0 auto;
}

.copyright {
  color: #d1d5ff;
  font-size: 0.9rem;
  font-weight: 500;
}

.bottom-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.bottom-links a {
  color: #d1d5ff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.bottom-links a:hover {
  color: #ffdd57;
}

.separator {
  color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .company-info {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .footer-section {
    padding: 3rem 0 0;
    margin-top: -10rem;
  }

  .footer-container {
    padding: 0 1.5rem;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .company-info {
    grid-column: 1;
  }

  .social-links {
    justify-content: flex-start;
  }

  .bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-logo {
    width: 130px;
  }

  .company-tagline {
    font-size: 1rem;
  }

  .footer-description {
    font-size: 0.9rem;
  }

  .section-title {
    font-size: 1rem;
  }

  .social-icon {
    width: 52px;
    height: 52px;
  }

  .hours-card {
    padding: 1.2rem;
  }
}
</style>