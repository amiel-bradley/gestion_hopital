<script setup>
// import Header from '@/Layouts/Header.vue';
// import SideBar from '@/Layouts/SideBar.vue';
// import FormComs from "./views/FormComs.vue";
import SideBar from '@/Layouts/SideBar.vue';
import { auThis } from './services/auth';
import Header from '@/Layouts/Header.vue';

// import Patients from "./views/Patients.vue";
</script>

<template>
  <div class="app-layout">
    <header class="main-header" v-if="auThis">
      <Header/>
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

<style scoped>
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
</style>
