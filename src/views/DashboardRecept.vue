<script setup>


</script>

<template>
  <nav class="dashboard-menu">
    <h2> Votre Tableau de Bord</h2>
    <div class="link-container">
      <router-link to="/receptmedecins" class="nav-item medical">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        <span>Gérer le corps médical</span>
      </router-link>
      
      <router-link to="/receptpatients" class="nav-item patients">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span>Gérer les patients</span>
      </router-link>
      
      <router-link to="/rooms" class="nav-item rooms">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
        <span>Gérer les chambres</span>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.dashboard-menu {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 400px;
  margin: 20px auto;
}

h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
}

.link-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  font-weight: 600;
  padding: 15px 20px;
  border-radius: 12px;
  border: 2px solid transparent;
}

/* Style spécifique par section */
.medical {
  background-color: #e8f5e9; /* Vert clair */
  color: #2e7d32;
}
.medical:hover {
  background-color: #c8e6c9;
  border-color: #4caf50;
}

.patients {
  background-color: #fce4ec; /* Rose clair */
  color: #c2185b;
}
.patients:hover {
  background-color: #f8bbd0;
  transform: translateX(5px);
  border-color: #e91e63;
}

.rooms {
  background-color: #e3f2fd; /* Bleu clair */
  color: #1976d2;
}
.rooms:hover {
  background-color: #bbdefb;
  border-color: #2196f3;
}


</style>