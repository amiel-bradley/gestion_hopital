<template> 
  <div class="flex h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-teal-50">
    <!-- Sidebar -->
  <!-- <aside class="w-64 bg-white shadow-lg hidden md:flex flex-col">
    <div class="p-6 border-b">
      <h1 class="text-xl font-bold text-teal-600">HospitManage</h1>
    </div>

    <nav class="flex-1 p-4 space-y-2">

      <p class="text-xs text-gray-400 uppercase">Menu</p>

      <a href="#" class="flex items-center gap-3 p-3 rounded-lg bg-teal-50 text-teal-700 font-medium">
        📊 Dashboard
      </a>

      <p class="text-xs text-gray-400 uppercase mt-6">Gestion</p>

      <a href="#" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
        👤 Patients
      </a>

      <a href="#" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
        ❤️ Médecins
      </a>

      <a href="#" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
        📅 Rendez-vous
      </a>

      <a href="#" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
        🛏️ Chambres
      </a>

    </nav>
  </aside> -->

  <!-- //Main -->
  <div class="flex-1 flex flex-col">

    <!-- Header -->
    <!-- <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 class="text-lg font-semibold text-gray-700">
        Tableau de bord
      </h2>

      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-600">ID: Marcel</span>
        <button class="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
          Quitter
        </button>
      </div>
    </header> -->

    <!-- Content -->
    <main class="flex-1 p-8">

      <div class="grid md:grid-cols-3 gap-6">

        <!-- Card -->
        <div class="group backdrop-blur-xl bg-white/60 border border-white/40
                    rounded-2xl shadow-md p-6
                    transition-all duration-300
                    hover:shadow-2xl hover:-translate-y-1 hover:bg-white/80">

          <h3 class="font-semibold text-gray-700 mb-2 group-hover:text-teal-700 transition">
            Corps médical
          </h3>

          <p class="text-sm text-gray-500 mb-4">
            Gérer les médecins
          </p>

          <router-link to="/doctors" 
          class="block w-full py-2 rounded-lg
                         bg-gradient-to-r from-green-400 to-emerald-500
                         text-white font-medium text-center
                         transition-all duration-300
                         hover:scale-[1.03] hover:shadow-lg active:scale-95">
            Accéder
          </router-link>

        </div>


        <!-- Card -->
        <div class="group backdrop-blur-xl bg-white/60 border border-white/40
                    rounded-2xl shadow-md p-6
                    transition-all duration-300
                    hover:shadow-2xl hover:-translate-y-1 hover:bg-white/80">

          <h3 class="font-semibold text-gray-700 mb-2 group-hover:text-pink-700 transition">
            Patients
          </h3>

          <p class="text-sm text-gray-500 mb-4">
            Gestion des patients
          </p>

          <router-link to="/receptpatients" class="block w-full py-2 rounded-lg
                         bg-gradient-to-r from-pink-400 to-rose-500
                         text-white font-medium text-center
                         transition-all duration-300
                         hover:scale-[1.03] hover:shadow-lg active:scale-95">
            Accéder
          </router-link>

        </div>


        <!-- Card -->
        <div class="group backdrop-blur-xl bg-white/60 border border-white/40
                    rounded-2xl shadow-md p-6
                    transition-all duration-300
                    hover:shadow-2xl hover:-translate-y-1 hover:bg-white/80">

          <h3 class="font-semibold text-gray-700 mb-2 group-hover:text-blue-700 transition">
            Chambres
          </h3>

          <p class="text-sm text-gray-500 mb-4">
            Gestion des chambres
          </p>

          <router-link to="/rooms" class="block w-full py-2 rounded-lg
                         bg-gradient-to-r from-blue-400 to-indigo-500
                         text-white font-medium text-center
                         transition-all duration-300
                         hover:scale-[1.03] hover:shadow-lg active:scale-95">
            Accéder
          </router-link>

        </div>

      </div>

    </main>

  </div>

</div>
</template>

<style scoped>

</style>
