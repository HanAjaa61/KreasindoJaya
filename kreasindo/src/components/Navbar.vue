<template>
  <nav
    class="navbar"
    :class="[
      { 'navbar-red': isFukuActive },
      { 'hide-navbar': (isFukuCarouselOpen || isFooterVisible || isPaymentVisible) && hasScrolled}
    ]"
  >
    <div class="navbar-container">
      <RouterLink to="/" class="navbar-logo" @click="handleHomeClick">
        <img src="@/assets/logokreasindo.png" alt="Kreasindo Logo" class="logo-img" />
      </RouterLink>

      <div class="right-section">
        <ul class="nav-links">
          <li>
            <a href="#home" @click.prevent="handleHomeClick">
              <span class="link-text">Beranda</span>
              <span class="link-underline"></span>
            </a>
          </li>
          <li>
            <a href="#about-us" @click.prevent="handleAboutClick">
              <span class="link-text">Tentang</span>
              <span class="link-underline"></span>
            </a>
          </li>
          <li>
            <RouterLink to="/services">
              <span class="link-text">Produk</span>
              <span class="link-underline"></span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/payment">
              <span class="link-text">Pembayaran</span>
              <span class="link-underline"></span>
            </RouterLink>
          </li>
        </ul>

        <div
          class="hamburger"
          :class="{ 'is-active': isMobileMenuOpen }"
          @click="toggleMobileMenu"
        >
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
    </div>

    <ul
      class="mobile-menu"
      :class="[
        { 'is-open': isMobileMenuOpen },
        { 'menu-red': isFukuActive }
      ]"
    >
      <li><a href="#home" @click="handleMobileHomeClick">Beranda</a></li>
      <li><a href="#about-us" @click="handleMobileAboutClick">Tentang</a></li>
      <li><RouterLink to="/services" @click="closeMobileMenu">Produk</RouterLink></li>
      <li><RouterLink to="/payment" @click="closeMobileMenu">Pembayaran</RouterLink></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

const isMobileMenuOpen = ref(false)
const isFooterVisible = ref(false)
const isFukuCarouselOpen = ref(false)
const isPaymentVisible = ref(false)
const isFukuActive = ref(false)
const hasScrolled = ref(false)

const route = useRoute()
const router = useRouter()

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleHomeClick = async (e) => {
  if (e) e.preventDefault()
  if (route.path !== '/') {
    await router.push('/')
    await nextTick()
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleAboutClick = async (e) => {
  if (e) e.preventDefault()
  if (route.path !== '/') {
    await router.push('/')
    await nextTick()
  }
  setTimeout(() => {
    const aboutSection = document.getElementById('about-us')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, 100)
}

const handleMobileHomeClick = async (e) => {
  e.preventDefault()
  closeMobileMenu()
  await handleHomeClick()
}

const handleMobileAboutClick = async (e) => {
  e.preventDefault()
  closeMobileMenu()
  await handleAboutClick()
}

const handleScroll = () => {
  const isMobile = window.innerWidth <= 768
  const scrollY = window.scrollY || window.pageYOffset
  
  if (scrollY > 50) {
    hasScrolled.value = true
  } else {
    hasScrolled.value = false
  }
  
  if (route.path === '/') {
    const fuku = document.getElementById('fuku')
    if (fuku) {
      const rect = fuku.getBoundingClientRect()
      isFukuActive.value = rect.top <= 80 && rect.bottom >= 80
    } else {
      isFukuActive.value = false
    }

    const footer = document.querySelector('.footer-section') || 
                  document.querySelector('footer') || 
                  document.querySelector('.stores-section')
    
    if (footer) {
      const rect = footer.getBoundingClientRect()
      const footerThreshold = isMobile ? 800 : 200
      isFooterVisible.value = rect.top <= footerThreshold
    } else {
      isFooterVisible.value = false
    }
  } else {
    isFukuActive.value = false
    isFooterVisible.value = false
  }

  const fukucarousel = document.getElementById('fukucarousel')
  if (fukucarousel) {
    const rect = fukucarousel.getBoundingClientRect()
    
    const topThreshold = isMobile ? 1000 : 300
    const bottomThreshold = isMobile ? -500 : -100
    
    isFukuCarouselOpen.value = rect.top <= topThreshold && rect.bottom >= bottomThreshold
  } else {
    isFukuCarouselOpen.value = false
  }

  const paymentvisible = document.getElementById('payment')
  if (paymentvisible) {
    const rect = paymentvisible.getBoundingClientRect()
    
    const topThreshold = isMobile ? 150 : 300
    const bottomThreshold = isMobile ? -500 : -100
    
    isPaymentVisible.value = rect.top <= topThreshold && rect.bottom >= bottomThreshold
  } else {
    isPaymentVisible.value = false
  }
}

watch(() => route.path, () => {
  closeMobileMenu()
  hasScrolled.value = false
  handleScroll()
}, { immediate: true })

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #191970;
  transition: background-color 0.4s ease, transform 0.3s ease, opacity 0.3s ease;
}

.navbar-red {
  background: #b11226;
}

.navbar.hide-navbar {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
}

.navbar-container {
  max-width: 1280px;
  margin: auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.navbar-logo:hover {
  transform: scale(1.05) rotate(5deg);
}

.logo-img {
  height: 45px;
  width: 45px;
  cursor: pointer;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
  transition: filter 0.3s ease;
}

.navbar-logo:hover .logo-img {
  filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.3));
}

.right-section {
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.nav-links li {
  margin: 0;
  position: relative;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 0.5rem 0;
  overflow: hidden;
}

.link-text {
  position: relative;
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.nav-links a:hover .link-text {
  transform: translateY(-3px);
}

.link-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.7));
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  border-radius: 2px;
}

.nav-links a:hover .link-underline {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-links a::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.5s ease, height 0.5s ease;
  z-index: -1;
}

.nav-links a:hover::before {
  width: 150%;
  height: 300%;
}

.nav-links a::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s ease;
}

.nav-links a:hover::after {
  left: 100%;
}

.nav-links a.router-link-active .link-underline {
  transform: scaleX(1);
  background: linear-gradient(90deg, #fff, #ffd700);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  padding: 8px;
}

.hamburger .bar {
  width: 26px;
  height: 3px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger.is-active .bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.is-active .bar:nth-child(2) {
  opacity: 0;
}

.hamburger.is-active .bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-menu {
  list-style: none;
  background: #191970;
  position: absolute;
  width: 100%;
  left: 0;
  top: 100%;
  margin: 0;
  padding: 0;
  transform: translateY(-20px);
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s ease;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mobile-menu.menu-red {
  background: #b11226;
}

.mobile-menu.is-open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
  padding: 1.5rem 0 2rem;
}

.mobile-menu li {
  margin: 0.3rem 0;
}

.mobile-menu a {
  color: #fff;
  display: block;
  padding: 0.9rem 0;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.mobile-menu a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .navbar-container {
    padding: 0.8rem 1rem;
  }

  .logo-img {
    height: 40px;
    width: 40px;
  }
}
</style>