<template>
  <a
    :href="whatsappLink"
    target="_blank"
    rel="noopener noreferrer"
    class="wa-floating"
    aria-label="Chat via WhatsApp"
  >
    <span class="wave wave1"></span>
    <span class="wave wave2"></span>

    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
      alt="WhatsApp"
      class="wa-icon"
    />
  </a>
</template>

<script setup>
import { computed } from "vue";

const phoneNumber = "6285249719971";

const message = `
Halo CV. Kreasindo Jaya! 
Saya ingin memesan produk anda berupa:

Nama Produk:
Jumlah:
Detail Produk:

Segera kabari saya jika produk tersedia dan harga yang harus saya bayarkan. Terima kasih! 
`;

const whatsappLink = computed(() => {
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
});
</script>

<style scoped>
.wa-floating {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 64px;
  height: 64px;
  background-color: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

@media (hover: hover) {
  .wa-floating:hover {
    transform: scale(1.15);
    box-shadow: 0 12px 32px rgba(37, 211, 102, 0.55);
  }
}

.wa-icon {
  width: 34px;
  height: 34px;
  z-index: 2;
  transition: transform 0.25s ease;
}

@media (hover: hover) {
  .wa-floating:hover .wa-icon {
    transform: scale(1.05);
  }
}

.wave {
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgba(37, 211, 102, 0.4);
  animation: pulse 2.5s infinite;
}

.wave2 {
  animation-delay: 1.2s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .wa-floating {
    width: 56px;
    height: 56px;
    bottom: 20px;
    right: 20px;
  }

  .wa-icon {
    width: 30px;
    height: 30px;
  }

  .wave {
    width: 56px;
    height: 56px;
  }
}
</style>
