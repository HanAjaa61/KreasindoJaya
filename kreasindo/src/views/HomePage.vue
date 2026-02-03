<script setup>
import LandingPage from '@/components/LandingPage.vue';
import About from '@/components/About.vue';
import Testimoni from '@/components/Testimoni.vue';
import Mitra from '@/components/Mitra.vue';
import Mesin from '@/components/Mesin.vue';
import Alamat from '@/components/Alamat.vue';
import Fuku from '@/components/Fuku.vue';
import Highlight from '@/components/PembayaranHighlight.vue';
</script>

<template>
  <main>
    <LandingPage />
    <About />
    <Highlight />
    <Mesin />
    <Fuku />
    <Mitra/>
    <Testimoni />
    <Alamat />   
  </main>
</template>