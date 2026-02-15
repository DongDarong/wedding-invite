<script setup>
import { useLanguage } from '../composables/useLanguage'
import abaQr from '../assets/qr/aba.jpg'
import aclidaQr from '../assets/qr/aclida.jpg'

const { isKh } = useLanguage()
</script>

<template>
  <footer class="home-footer mt-12 text-center text-[#d9c291]/85 animate-[fade-up_1.5s_ease] max-[390px]:mt-9">
    <div class="qr-grid mb-6">
      <article class="qr-card temple-frame">
        <div class="temple-panel qr-panel p-3">
          <img :src="abaQr" alt="ABA QR Code" class="qr-image w-full rounded-lg">
          <p class="qr-label mt-2 text-xs tracking-[0.08em] text-[#d7b97a]">ABA QR</p>
          <a
            :href="abaQr"
            download="aba-qr.jpg"
            class="qr-download inline-flex mt-2 rounded-full p-3  text-[10px] tracking-[0.08em] gold-btn transition"
          >
            Download ABA QR
          </a>
        </div>
      </article>
      <article class="qr-card temple-frame">
        <div class="temple-panel qr-panel p-3">
          <img :src="aclidaQr" alt="ACLEDA QR Code" class="qr-image w-full rounded-lg">
          <p class="qr-label mt-2 text-xs tracking-[0.08em] text-[#d7b97a]">ACLEDA QR</p>
          <a
            :href="aclidaQr"
            download="acleda-qr.jpg"
            class="qr-download inline-flex mt-2 rounded-full p-3 text-[10px] tracking-[0.08em] gold-btn transition"
          >
            Download ACLEDA QR
          </a>
        </div>
      </article>
    </div>

    <p class="gratitude-title text-sm">
      {{ isKh ? 'សារថ្លែងអំណរគុណ' : 'Message of Gratitude' }}
    </p>
    <p class="gratitude-body text-[11px] tracking-[0.06em] mt-2 leading-6 max-w-3xl mx-auto" :class="isKh ? 'font-khmer-body' : 'font-engraved'">
      {{ isKh
        ? 'យើងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងស្មោះអស់ពីដួងចិត្ត ចំពោះឯកឧត្តម លោក លោកស្រី និងភ្ញៀវកិត្តិយសទាំងអស់ ដែលបានចំណាយពេលវេលាដ៏មានតម្លៃ អញ្ជើញចូលរួមពិធីមង្គលការរបស់យើងខ្ញុំ។ វត្តមាន និងពាក្យជូនពររបស់លោកអ្នក គឺជាកម្លាំងចិត្តដ៏ធំធេង សម្រាប់ជីវិតគូរថ្មីរបស់យើង។'
        : 'We would like to express our heartfelt thanks to Excellencies, Ladies and Gentlemen, and all distinguished guests for taking your valuable time to attend our wedding ceremony. Your presence and kind blessings are a great encouragement for our new married life.' }}
    </p>
    <a
      href="https://dongdarong.github.io/dd-portfolio/"
      target="_blank"
      rel="noreferrer"
      class="inline-block m-3 text-[11px] tracking-[0.12em] text-[#d7b97a] hover:text-[#f0dbb3] transition"
    >
      &copy; Dong Darong
    </a>
    <router-link
      to="/admin"
      class="inline-flex mt-4 rounded-full p-3 text-xs tracking-[0.08em] gold-btn transition"
    >
      {{ isKh ? 'គ្រប់គ្រង' : 'Admin' }}
    </router-link>
  </footer>
</template>

<style scoped>
.qr-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  justify-items: center;
}

.qr-card {
  width: 100%;
  max-width: 190px;
}

.qr-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.qr-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border: 1px solid rgba(201, 164, 91, 0.35);
}

.qr-label {
  font-weight: 600;
}

.qr-download {
  min-width: 124px;
  justify-content: center;
}


.gratitude-title {
  font-family: 'Noto Serif Khmer', serif;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.gratitude-body {
  font-size: 0.78rem;
}

@media (min-width: 1024px) {
  .qr-grid {
    gap: 1rem;
  }

  .qr-card {
    max-width: 220px;
  }

  .qr-image {
    height: 280px;
  }

  .gratitude-title {
    font-size: 0.92rem;
  }

  .gratitude-body {
    font-size: 0.84rem;
    line-height: 1.8;
    max-width: 58rem;
  }
}

@media (max-width: 640px) {
  .qr-grid {
    grid-template-columns: 1fr;
  }

  .qr-card {
    max-width: 210px;
  }

  .qr-image {
    height: auto;
    max-height: 280px;
    object-fit: contain;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .home-footer {
    margin-top: 3.4rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(201, 164, 91, 0.2);
  }
}

@media (min-width: 1280px) and (max-width: 1535px) {
  .home-footer {
    margin-top: 4rem;
    padding-top: 1.2rem;
    border-top: 1px solid rgba(201, 164, 91, 0.22);
  }
}

@media (min-width: 1536px) {
  .home-footer {
    margin-top: 4.4rem;
    padding-top: 1.35rem;
    border-top: 1px solid rgba(201, 164, 91, 0.24);
  }
}
</style>



