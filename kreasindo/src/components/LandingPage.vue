<template>
  <div class="landing-page " id="home">
    <div class="content-section">
      <div class="text-content">
        <h3 class="about-heading">ABOUT OUR PLATFORM</h3>
        <h1 class="main-heading">THE PLACE WHERE IMAGINE COME TRUE</h1>
        <p class="description">
          CV. Kreasindo Jaya adalah tempat di mana ide-ide kreatif menjadi kenyataan melalui layanan percetakan dan desain grafis berkualitas tinggi. Kami berkomitmen untuk memberikan solusi cetak yang inovatif dan profesional untuk memenuhi kebutuhan Anda.
        </p>
        <div class="dots-container top-dots">
        </div>
        <div class="dots-container bottom-dots">
        </div>
      </div>
    </div>
    <div class="image-section">
      <img
        src="@/assets/toko.jpeg"
        alt="Farmer with vegetables"
        class="main-image"
      />
    </div>
  </div>
</template>

<style scoped>
.landing-page {
  display: flex;
  min-height: calc(100vh - 90px); 
  background-color: #e5f6d5; 
  font-family: 'Arial', sans-serif;
}

.content-section {
  position: relative;
  background-color: #191970; 
  color: #fff;
  padding: 4rem;
  width: 70vw; 
  min-height: calc(100vh); 
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: flex-start; 
  box-sizing: border-box; 
}

.text-content {
  max-width: 500px; 
  margin: 0 auto; 
  text-align: left; 
}

.about-heading {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
  color: #9fb6f1;
  animation: fadeInSlideUp 0.8s ease-out 0.2s forwards;
  opacity: 0; 
}

.main-heading {
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #fff;
  animation: fadeInSlideUp 0.8s ease-out 0.4s forwards;
  opacity: 0;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: #d1fae5;
  margin-bottom: 2rem;
  animation: fadeInSlideUp 0.8s ease-out 0.6s forwards;
  opacity: 0;
}

.button-container {
  display: flex;
  gap: 1.5rem;
  animation: fadeInSlideUp 0.8s ease-out 0.8s forwards;
  opacity: 0;
}

.btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background-color: #d1fae5;
  color: #166534;
}

.btn-primary:hover {
  background-color: #fff;
}

.btn-secondary {
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.btn-secondary:hover {
  background-color: #fff;
  color: #166534;
}

.dots-container {
  position: absolute;
  display: flex;
  gap: 0.5rem;
}

.dots-container.top-dots {
  top: 1rem;
  right: 1rem;
}

.dots-container.bottom-dots {
  bottom: 1rem;
  left: 1rem;
}

.dots-container span {
  width: 8px;
  height: 8px;
  background-color: #d1fae5;
  border-radius: 50%;
  animation: dotPulse 1.5s infinite ease-in-out alternate;
}

.dots-container.top-dots span:nth-child(1) { animation-delay: 0s; }
.dots-container.top-dots span:nth-child(2) { animation-delay: 0.2s; }
.dots-container.top-dots span:nth-child(3) { animation-delay: 0.4s; }
.dots-container.top-dots span:nth-child(4) { animation-delay: 0.6s; }

.dots-container.bottom-dots span:nth-child(1) { animation-delay: 0.8s; }
.dots-container.bottom-dots span:nth-child(2) { animation-delay: 1s; }
.dots-container.bottom-dots span:nth-child(3) { animation-delay: 1.2s; }
.dots-container.bottom-dots span:nth-child(4) { animation-delay: 1.4s; }

.image-section {
  width: 50vw; 
  min-height: calc(100vh - 80px); 
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%; 
  object-fit: cover; 
  display: block;
  object-position: 85% top;
  animation: fadeIn 1s ease-out forwards, imageZoomIn 1s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes imageZoomIn {
  from {
    transform: scale(1.05); 
  }
  to {
    transform: scale(1); 
  }
}

@keyframes dotPulse {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
}

@media (max-width: 992px) {
  .landing-page {
    flex-direction: column-reverse; 
    min-height: auto; 
  }
  .content-section,
  .image-section {
    width: 100vw; 
    min-height: auto; 
    box-sizing: border-box; 
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); 
  }
  .image-section {
    height: 36vh;
    min-height: 230px;
  }
  .content-section .text-content {
      margin: 0; 
      max-width: none; 
      text-align: center; 
  }
  .button-container {
      justify-content: center; 
  }
}
</style>