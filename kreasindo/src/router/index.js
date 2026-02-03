import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue';
import ServicesPage from '@/views/ServicesPage.vue';
import PrivacyPolicy from '@/components/PrivacyPolicy.vue';
import TermsOfServices from '@/components/TermsOfServices.vue';
import Pembayaran from '@/components/Pembayaran.vue';
import Spanduk from '@/components/Spanduk.vue';
import Luster from '@/components/Luster.vue';
import StikerMeteran from '@/components/StikerMeteran.vue';
import Banner from '@/components/Banner.vue';
import RollBanner from '@/components/RollBanner.vue';
import KartuNama from '@/components/KartuNama.vue';
import Nametag from '@/components/Nametag.vue';
import StikerA3 from '@/components/StikerA3.vue';
import ArtPaper from '@/components/ArtPaper.vue';
import Stempel from '@/components/Stempel.vue';
import StikerCutting from '@/components/StikerCutting.vue';
import Mug from '@/components/Mug.vue';
import Tumbler from '@/components/Tumbler.vue';
import Plakat from '@/components/Plakat.vue';
import Aksesoris from '@/components/Aksesoris.vue';
import Display from '@/components/Display.vue';
import NomorRumah from '@/components/NomorRumah.vue';
import PialaMendali from '@/components/PialaMendali.vue';
import Prasasti from '@/components/Prasasti.vue';
import NeonBox from '@/components/NeonBox.vue';
import Las from '@/components/Pengelasan.vue';
import HurufTimbulOrder from '@/components/HurufTimbul.vue';
import Rambu from '@/components/Rambu.vue';
import Plang from '@/components/Plang.vue';
import Kaos from '@/components/Kaos.vue';
import Jersey from '@/components/Jersey.vue';
import Polo from '@/components/Polo.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage', 
      component: HomePage,
    },
    {
      path: '/services',
      name: 'ServicesPage',
      component: ServicesPage,
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy,
    },
    {
      path: '/terms-of-services',
      name: 'TermsOfServices',
      component: TermsOfServices,
    },
    {
      path: '/luster',
      name: 'Luster',
      component: Luster
    },
    {
      path: '/stiker-meteran',
      name: 'StikerMeteran',
      component: StikerMeteran
    },
    {
      path: '/banner',
      name: 'Banner',
      component: Banner
    },
    {
      path: '/spanduk',
      name: 'Spanduk',
      component: Spanduk
    },
    {
      path: '/roll-banner',
      name: 'RollBanner',
      component: RollBanner
    },
    {
      path: '/kartu-nama',
      name: 'KartuNama',
      component: KartuNama
    },
    {
      path: '/kartu-nama',
      name: 'KartuNama',
      component: KartuNama
    },
    {
      path: '/stiker-a3',
      name: 'StikerA3',
      component: StikerA3
    },
    {
      path: '/nametag',
      name: 'Nametag',
      component: Nametag
    },
    {
      path: '/art-paper',
      name: 'ArtPaper',
      component: ArtPaper
    },
    {
      path: '/stempel',
      name: 'Stempel',
      component: Stempel
    },
    {
      path: '/cutting-stiker',
      name: 'StikerCutting',
      component: StikerCutting
    },
    {
      path: '/mug',
      name: 'Mug',
      component: Mug
    },
    {
      path: '/tumbler',
      name: 'Tumbler',
      component: Tumbler
    },
    {
      path: '/aksesoris',
      name: 'Aksesoris',
      component: Aksesoris
    },
    {
      path: '/displayqris',
      name: 'Display',
      component: Display
    },
    {
      path: '/nomorrumah',
      name: 'NomorRumah',
      component: NomorRumah
    },
    {
      path: '/pialamendali',
      name: 'PialaMendali',
      component: PialaMendali
    },
    {
      path: '/plakat',
      name: 'Plakat',
      component: Plakat
    },
    {
      path: '/prasasti',
      name: 'Prasasti',
      component: Prasasti
    },
    {
      path: '/neonbox',
      name: 'NeonBox',
      component: NeonBox
    },
    {
      path: '/payment',
      name: 'Pembayaran',
      component: Pembayaran
    },
    {
      path: '/huruftimbul',
      name: 'HurufTimbul',
      component: HurufTimbulOrder
    },
    {
      path: '/rambu',
      name: 'Rambu',
      component: Rambu
    },
    {
      path: '/las',
      name: 'Las',
      component: Las
    },
    {
      path: '/plang',
      name: 'Plang',
      component: Plang
    },
    {
      path: '/jersey',
      name: 'Jersey',
      component: Jersey
    },
    {
      path: '/polo',
      name: 'Polo',
      component: Polo
    },
    {
      path: '/kaos',
      name: 'Kaos',
      component: Kaos
    }
  ],
})

export default router
