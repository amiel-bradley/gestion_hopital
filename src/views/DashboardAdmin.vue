<script setup></script>

<!-- <template>
  <div
    class="min-h-screen font-sans antialiased bg-[#f8fafc] relative overflow-hidden"
  >
    <div>
      <main class="flex-1 p-8 relative">
        <div class="absolute inset-0 pointer-events-none opacity-40">
          <div
            class="absolute top-10 left-10 w-32 h-32 bg-teal-200 rounded-full blur-3xl"
          ></div>
          <div
            class="absolute bottom-20 right-20 w-64 h-64 bg-cyan-100 rounded-full blur-3xl"
          ></div>
          <div
            class="absolute top-1/2 left-1/4 w-48 h-48 bg-emerald-50 rounded-full blur-2xl"
          ></div>
        </div>

        <div class="relative z-10">
          <header class="mb-10">
            <h1 class="text-3xl font-black text-[#134e4a]">
              Tableau de Bord Administratif
            </h1>
            <p class="text-gray-500">
              Bienvenue, voici l'état actuel de l'hôpital aujourd'hui.
            </p>
          </header>

          <section
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10"
          >
            <div
              class="bg-white p-6 rounded-2xl border-b-4 border-cyan-500 shadow-sm hover:shadow-xl transition-all group"
            >
              <div class="flex justify-between items-start mb-4">
                <div
                  class="p-3 bg-cyan-50 rounded-xl text-2xl group-hover:scale-110 transition-transform"
                >
                  👥
                </div>
                <span class="text-emerald-500 font-bold text-sm">+3%</span>
              </div>
              <h3 class="text-3xl font-black text-[#134e4a]">1,284</h3>
              <p class="text-gray-400 font-medium text-sm">Patients Total</p>
            </div>

            <div
              class="bg-white p-6 rounded-2xl border-b-4 border-[#2dd4bf] shadow-sm hover:shadow-xl transition-all"
            >
              <div class="mb-4 p-3 bg-teal-50 w-fit rounded-xl text-2xl">
                👨‍⚕️
              </div>
              <h3 class="text-3xl font-black text-[#134e4a]">42</h3>
              <p class="text-gray-400 font-medium text-sm">
                Médecins en service
              </p>
            </div>

            <div
              class="bg-white p-6 rounded-2xl border-b-4 border-amber-400 shadow-sm hover:shadow-xl transition-all"
            >
              <div class="mb-4 p-3 bg-amber-50 w-fit rounded-xl text-2xl">
                📅
              </div>
              <h3 class="text-3xl font-black text-[#134e4a]">18</h3>
              <p class="text-gray-400 font-medium text-sm">
                Rendez-vous aujourd'hui
              </p>
            </div>

            <div
              class="bg-white p-6 rounded-2xl border-b-4 border-rose-500 shadow-sm hover:shadow-xl transition-all relative overflow-hidden"
            >
              <div class="mb-4 p-3 bg-rose-50 w-fit rounded-xl text-2xl">
                🏥
              </div>
              <h3 class="text-3xl font-black text-[#134e4a]">5</h3>
              <p class="text-gray-400 font-medium text-sm">Chambres Libres</p>
              <span
                class="absolute top-4 right-[-20px] bg-rose-600 text-white text-[9px] font-black px-8 py-1 rotate-45"
                >CRITIQUE</span
              >
            </div>
          </section>

          <section
            class="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white shadow-sm"
          >
            <h3 class="text-xl font-bold text-[#134e4a] mb-6 flex items-center">
              <span class="w-2 h-6 bg-[#2dd4bf] rounded-full mr-3"></span>
              Activités Récentes
            </h3>
            <div class="space-y-4">
              <div
                class="flex items-center p-4 bg-gray-50/50 rounded-2xl border border-transparent hover:border-teal-200 transition-all"
              >
                <div class="w-2 h-2 rounded-full bg-teal-400 mr-4"></div>
                <p class="text-gray-700">
                  Admission de
                  <span class="font-bold text-[#134e4a]">Mme. Diallo</span> -
                  Chambre 102
                </p>
              </div>
              <div
                class="flex items-center p-4 bg-gray-50/50 rounded-2xl border border-transparent hover:border-teal-200 transition-all"
              >
                <div class="w-2 h-2 rounded-full bg-teal-400 mr-4"></div>
                <p class="text-gray-700">
                  <span class="font-bold text-[#134e4a]">Dr. Martin</span> a
                  terminé sa consultation
                </p>
              </div>
              <div
                class="flex items-center p-4 bg-gray-50/50 rounded-2xl border border-transparent hover:border-teal-200 transition-all"
              >
                <div class="w-2 h-2 rounded-full bg-teal-400 mr-4"></div>
                <p class="text-gray-700">
                  Nouveau rendez-vous enregistré pour
                  <span class="text-teal-600 font-bold">14h30</span>
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template> -->

<template>
  <div
    class="min-h-screen font-sans antialiased bg-[#f8fafc] relative overflow-hidden p-4 md:p-12"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-[-10%] left-[-5%] w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-cyan-100/40 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute top-1/2 left-1/3 w-64 h-64 bg-emerald-50/50 rounded-full blur-2xl"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <header class="mb-12">
        <h1 class="text-4xl font-black text-[#134e4a] tracking-tight">
          Tableau de Bord Administratif
        </h1>
        <div class="flex items-center mt-2">
          <span class="w-8 h-1 bg-[#2dd4bf] rounded-full mr-3"></span>
          <p class="text-gray-500 text-lg">
            Bienvenue, voici l'état actuel de l'hôpital aujourd'hui.
          </p>
        </div>
      </header>

      <section
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
      >
        <div
          class="bg-white p-7 rounded-3xl border-b-4 border-cyan-500 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div class="flex justify-between items-start mb-5">
            <div
              class="p-4 bg-cyan-50 rounded-2xl text-3xl group-hover:scale-110 transition-transform"
            >
              👥
            </div>
            <span
              class="text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full font-bold text-xs"
              >+3%</span
            >
          </div>
          <h3 class="text-3xl font-black text-[#134e4a]">1,284</h3>
          <p
            class="text-gray-400 font-semibold text-sm uppercase tracking-wider"
          >
            Patients Total
          </p>
        </div>

        <div
          class="bg-white p-7 rounded-3xl border-b-4 border-[#2dd4bf] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <div class="mb-5 p-4 bg-teal-50 w-fit rounded-2xl text-3xl">👨‍⚕️</div>
          <h3 class="text-3xl font-black text-[#134e4a]">42</h3>
          <p
            class="text-gray-400 font-semibold text-sm uppercase tracking-wider"
          >
            Médecins en service
          </p>
        </div>

        <div
          class="bg-white p-7 rounded-3xl border-b-4 border-amber-400 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <div class="mb-5 p-4 bg-amber-50 w-fit rounded-2xl text-3xl">📅</div>
          <h3 class="text-3xl font-black text-[#134e4a]">18</h3>
          <p
            class="text-gray-400 font-semibold text-sm uppercase tracking-wider"
          >
            Rendez-vous aujourd'hui
          </p>
        </div>

        <div
          class="bg-white p-7 rounded-3xl border-b-4 border-rose-500 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
        >
          <div class="mb-5 p-4 bg-rose-50 w-fit rounded-2xl text-3xl">🏥</div>
          <h3 class="text-3xl font-black text-[#134e4a]">5</h3>
          <p
            class="text-gray-400 font-semibold text-sm uppercase tracking-wider"
          >
            Chambres Libres
          </p>
          <span
            class="absolute top-5 right-[-25px] bg-rose-600 text-white text-[10px] font-black px-10 py-1 rotate-45 shadow-sm"
          >
            CRITIQUE
          </span>
        </div>
      </section>

      <section
        class="bg-white/70 backdrop-blur-xl rounded-[40px] p-10 border border-white/50 shadow-xl"
      >
        <div class="flex items-center mb-8">
          <h3 class="text-2xl font-black text-[#134e4a]">Activités Récentes</h3>
          <span class="ml-4 flex-1 h-[1px] bg-gray-100"></span>
        </div>

        <div class="grid gap-4">
          <div
            class="flex items-center p-5 bg-white/50 rounded-2xl border border-transparent hover:border-teal-200 hover:bg-white transition-all group"
          >
            <div
              class="w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)] mr-5 transition-transform group-hover:scale-125"
            ></div>
            <p class="text-gray-700 text-lg">
              Admission de
              <span class="font-bold text-[#134e4a]">Mme. Diallo</span> —
              <span class="text-teal-600">Chambre 102</span>
            </p>
          </div>

          <div
            class="flex items-center p-5 bg-white/50 rounded-2xl border border-transparent hover:border-teal-200 hover:bg-white transition-all group"
          >
            <div
              class="w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)] mr-5 transition-transform group-hover:scale-125"
            ></div>
            <p class="text-gray-700 text-lg">
              <span class="font-bold text-[#134e4a]">Dr. Martin</span> a terminé
              sa consultation
            </p>
          </div>

          <div
            class="flex items-center p-5 bg-white/50 rounded-2xl border border-transparent hover:border-teal-200 hover:bg-white transition-all group"
          >
            <div
              class="w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)] mr-5 transition-transform group-hover:scale-125"
            ></div>
            <p class="text-gray-700 text-lg">
              Nouveau rendez-vous enregistré pour
              <span
                class="bg-teal-100 text-teal-700 px-3 py-1 rounded-lg font-bold ml-2"
                >14h30</span
              >
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
/* Dashboard.vue CSS */
.min-h-screen {
  min-height: 100vh;
  max-height: 100vh; /* empêche le scroll */
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
}

.bg-bubble {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
  pointer-events: none;
}

/* Bulles */
.bg-bubble-1 {
  top: -10%;
  left: -5%;
  width: 24rem;
  height: 24rem;
  background-color: #2dd4bf30;
}
.bg-bubble-2 {
  bottom: 10%;
  right: -5%;
  width: 31rem;
  height: 31rem;
  background-color: #06b6d430;
}
.bg-bubble-3 {
  top: 50%;
  left: 33%;
  width: 16rem;
  height: 16rem;
  background-color: #10b98150;
}

/* Card layout */
section.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
}

@media (min-width: 768px) {
  section.grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  section.grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Cards */
section.grid > div {
  background-color: #ffffff;
  border-radius: 2rem;
  padding: 2rem;
  border-bottom-width: 0.25rem;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

section.grid > div:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

/* Recent activities */
section.bg-white\/70 {
  max-height: 30rem;
  overflow-y: auto; /* si besoin, scroll seulement ici */
  scrollbar-width: thin;
  scrollbar-color: #2dd4bf40 transparent;
}

/* Responsive texte */
h1,
h3,
p {
  word-break: break-word;
}
</style>
