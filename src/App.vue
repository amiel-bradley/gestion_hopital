<script setup>
// import Header from '@/Layouts/Header.vue';
// import SideBar from '@/Layouts/SideBar.vue';
// import FormComs from "./views/FormComs.vue";
import SideBar from "@/Layouts/SideBar.vue";
import { auThis } from "./services/auth";
import Header from "@/Layouts/Header.vue";

// import Patients from "./views/Patients.vue";
</script>

<template>
  <div class="app-layout">
    <div class="background-layer"></div>
    <header class="main-header" v-if="auThis">
      <Header />
    </header>

    <div class="content-wrapper">
      <aside v-if="auThis" class="sidebar-container">
        <SideBar />
      </aside>

      <main :class="{ 'full-width': !auThis }" class="page-content">
        <div class="view-card">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<!-- <style scoped>
/* Configuration de la grille globale */
.app-layout {
  min-height: 100vh;
  background-color: #f8fafc; /* Un gris très clair, presque blanc, pour le fond */
  display: flex;
  flex-direction: column;
}

.main-header {
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.content-wrapper {
  display: flex;
  flex: 1;
  padding: 1.5rem;
  gap: 1.5rem;
  max-width: 1600px; /* Pour éviter que le site soit trop large sur grand écran */
  margin: 0 auto;
  width: 100%;
}

/* Style de la Sidebar */
.sidebar-container {
  width: 280px;
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 1rem;
  height: calc(100vh - 120px); /* Hauteur fixe pour rester visible au scroll */
  position: sticky;
  top: 100px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

/* Zone Main */
.page-content {
  flex: 1;
  transition: all 0.3s ease;
}

.page-content.full-width {
  width: 100%;
}

/* Conteneur pour tes vues (RouterView) */
.view-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 2rem;
  min-height: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

/* Responsive */
@media (max-width: 1024px) {
  .sidebar-container {
    width: 80px; /* Réduction sur tablette */
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    padding: 1rem;
  }
  .sidebar-container {
    width: 100%;
    height: auto;
    position: relative;
    top: 0;
  }
}
</style> -->

<!-- <style scoped>
/* =========================
   BACKGROUND GLOBAL (APP)
   ========================= */

.app-layout {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  /* Dégradé principal (fidèle à l’image) */
  background: linear-gradient(135deg, #0f6f7a 0%, #1e8f9a 35%, #7fcfd4 100%);

  overflow: hidden;
}

/* =========================
   EFFET BULLES (BACKGROUND)
   ========================= */

.app-layout::before,
.app-layout::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  z-index: 0;
  filter: blur(1px);
}

/* Bulle haut gauche */
.app-layout::before {
  width: 420px;
  height: 420px;
  top: -140px;
  left: -140px;
}

/* Bulle bas droite */
.app-layout::after {
  width: 520px;
  height: 520px;
  bottom: -180px;
  right: -180px;
}

/* =========================
   HEADER
   ========================= */

.main-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: transparent;
}

/* =========================
   WRAPPER CENTRAL
   ========================= */

.content-wrapper {
  position: relative;
  z-index: 10; /* passe au-dessus du background */
  display: flex;
  flex: 1;
  gap: 1.5rem;
  padding: 1.5rem;

  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
}

/* =========================
   SIDEBAR
   ========================= */

.sidebar-container {
  /* width: 280px; */
  background: #ffffff;
  border-radius: 16px;
  padding: 1rem;

  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);

  /* height: calc(100vh - 140px); */
  position: sticky;
  top: 110px;
}

/* =========================
   MAIN CONTENT
   ========================= */

.page-content {
  flex: 1;
  transition: all 0.3s ease;
}

.page-content.full-width {
  width: 100%;
}

/* Carte blanche centrale */
.view-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  min-height: 100%;

  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

/* =========================
   RESPONSIVE
   ========================= */

@media (max-width: 1024px) {
  .sidebar-container {
    width: 80px;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    padding: 1rem;
  }

  .sidebar-container {
    width: 100%;
    height: auto;
    position: relative;
    top: 0;
  }
}
</style> -->

<style scoped>
/* App.vue CSS */
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden; /* empêche le scroll */
  background-color: #ffffff; /* blanc */
}

.main-header {
  flex: 0 0 auto;
  z-index: 20;
}

.content-wrapper {
  display: flex;
  flex: 1 1 auto;
  overflow: hidden; /* tout reste dans l'écran */
}

.sidebar-container {
  flex: 0 0 280px; /* largeur sidebar */
}

.page-content {
  flex: 1 1 auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
}

.page-content.full-width {
  flex: 1 1 100%;
}
</style>
