<script setup>
// Logique éventuelle
</script>

<template>
  <nav class="dashboard-menu">
    <h2>Votre Tableau de Bord</h2>
    <div class="link-container">
      <router-link to="/rdv" class="nav-item medical">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>Mes Rendez-vous</span>
      </router-link>

      <router-link to="/patients" class="nav-item patients">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span>Mes patients</span>
      </router-link>

      <!-- <router-link to="/rooms" class="nav-item rooms">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span>Gestion des Salles</span>
      </router-link> -->
    </div>
  </nav>
</template>

<style scoped>
.dashboard-menu {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  max-width: 400px;
  margin: 40px auto;
  padding: 0 20px;
}

h2 {
  color: #1a202c;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  letter-spacing: -0.02em;
}

.link-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  font-weight: 600;
  padding: 16px 20px;
  border-radius: 14px;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.nav-item svg {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

/* Rendez-vous (Vert) */
.medical {
  background-color: #ecfdf5;
  color: #059669;
}
.medical:hover {
  background-color: #d1fae5;
  border-color: #10b981;
  transform: translateY(-2px);
}

/* Patients (Rose/Rouge) */
.patients {
  background-color: #fff1f2;
  color: #e11d48;
}
.patients:hover {
  background-color: #ffe4e6;
  border-color: #fb7185;
  transform: translateY(-2px);
}

/* Salles (Bleu) */
.rooms {
  background-color: #eff6ff;
  color: #2563eb;
}
.rooms:hover {
  background-color: #dbeafe;
  border-color: #60a5fa;
  transform: translateY(-2px);
}

/* Effet d'appui actif */
.nav-item:active {
  transform: scale(0.98);
}
</style>