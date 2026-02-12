<template>
<section class="mt-20 text-center">

  <!-- Title -->
  <h2 class="font-khmer text-xl gold mb-3">
    សារជូនពរ
  </h2>

  <div class="ornament">❖ ❀ ❖</div>

  <!-- Wish Card -->
  <div class="wish-card">

    <input
      v-model="name"
      placeholder="ឈ្មោះភ្ញៀវ"
      class="input"
    >

    <textarea
      v-model="msg"
      placeholder="សរសេរសារជូនពរ..."
      class="input h-24"
    ></textarea>

    <button @click="send" class="btn w-full">
      ផ្ញើសារជូនពរ
    </button>

  </div>

  <!-- Slideshow -->
  <div v-if="msgs.length" class="slideshow mt-8">

    <transition name="slide" mode="out-in">
      <div :key="slideIndex" class="slide-bubble">

        <b class="name">
          {{ msgs[slideIndex].name }}
        </b>

        <p>
          {{ msgs[slideIndex].text }}
        </p>

      </div>
    </transition>

  </div>


</section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'

const name = ref('')
const msg = ref('')
const msgs = ref([])
const slideIndex = ref(0)

const send = async ()=>{
  if(!name.value || !msg.value) return

  await addDoc(collection(db,"messages"),{
    name:name.value,
    text:msg.value,
    time:Date.now()
  })

  name.value=''
  msg.value=''
}

onMounted(()=>{
  onSnapshot(query(collection(db,"messages"),orderBy("time","desc")),
    s=>{
      msgs.value=s.docs.map(d=>d.data())
    })

  setInterval(()=>{
    if(msgs.value.length)
      slideIndex.value =
        (slideIndex.value+1) % msgs.value.length
  },4000)
})
</script>

<style scoped>

/* Gold title */
.gold{
background:linear-gradient(90deg,#bf953f,#fcf6ba,#7da0f2);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

/* Ornament */
.ornament{
font-size:18px;
color:#1f3b8f;
margin-bottom:14px;
}

/* Card */
.wish-card{
border:4px double #1f3b8f;
padding:20px;
border-radius:18px;
background:linear-gradient(#f6f9ff,#e7efff);
box-shadow:0 20px 40px rgba(31,59,143,.18);
}

/* Inputs */
.input{
width:100%;
border:2px solid rgba(31,59,143,.25);
padding:12px;
margin:8px 0;
border-radius:8px;
background:white;
outline:none;
}

.input:focus{
border-color:#1f3b8f;
box-shadow:0 0 8px rgba(47,91,209,.35);
}

/* Button */
.btn{
background:linear-gradient(135deg,#bf953f,#1f3b8f);
color:white;
padding:12px;
border-radius:8px;
letter-spacing:.05em;
box-shadow:0 8px 16px rgba(31,59,143,.3);
transition:.25s;
}

.btn:hover{
transform:translateY(-2px);
}

/* Slideshow */
.slide-bubble{
margin:auto;
width:90%;
padding:18px;
border-radius:22px;
background:linear-gradient(#f6f9ff,#e5efff);
box-shadow:0 10px 20px rgba(31,59,143,.18);
white-space:pre-wrap;
word-break:break-word;
overflow-wrap:anywhere;
}

/* Slide animation */
.slide-enter-active,
.slide-leave-active{
transition:all .7s ease;
}

.slide-enter-from{
opacity:0;
transform:translateX(40px);
}

.slide-leave-to{
opacity:0;
transform:translateX(-40px);
}

/* Message bubbles */
.bubble{
padding:14px;
border-radius:18px;
margin:8px 0;
width:80%;
box-shadow:0 6px 12px rgba(31,59,143,.15);
background:#f6f9ff;
white-space:pre-wrap;
word-break:break-word;
overflow-wrap:anywhere;
}

.left{margin-right:auto}
.right{margin-left:auto;background:#e5efff}

.name{
color:#1f3b8f;
display:block;
margin-bottom:4px;
}

/* Fade animation */
.fade-enter-active,
.fade-leave-active{
transition:opacity .6s ease;
}

.fade-enter-from,
.fade-leave-to{
opacity:0;
}

</style>
