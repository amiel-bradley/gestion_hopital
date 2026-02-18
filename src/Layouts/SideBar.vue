<script setup>

// import { computed } from 'vue';
// import { currentId } from '@/services/auth';
// import { users } from '@/services/data';

// const currentUser = computed(() => {
//   return users.value.find(u => u.id === currentId.value.id) || null;
// })
// console.log(currentUser.value);

</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-section">
      <small class="section-title">Menu Principal</small>
      <RouterLink to='/admindash' class="nav-item" >
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
        <span>Dashboard</span>
      </RouterLink>
    </div>

    <div class="sidebar-section">
      <small class="section-title">Gestion</small>
      <RouterLink to='/patients' class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span>Patients</span>
      </RouterLink>

      <RouterLink to='/doctors' class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5v14"/><path d="M7 10h10"/></svg>
        <span>Médecins</span>
      </RouterLink>

      <RouterLink to='/rdv' class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span>Rendez-vous</span>
      </RouterLink>

      <RouterLink to='/rooms' class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
        <span>Chambres</span>
      </RouterLink>

      <RouterLink to='/users' class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-593-87q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z"/></svg>
        <span>Ajouter des Utlisateurs</span>
      </RouterLink>
    </div>

    <div class="sidebar-footer">
      <p>HospitManage v1.0</p>
    </div>
  </aside>
</template>

<style scoped>

.sidebar {
  display: flex;
  flex-direction: column;
  width: 260px;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  min-height: 100vh;
  padding: 1.5rem 1rem;
  gap: 2rem;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-title {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 700;
  margin-bottom: 0.5rem;
  padding-left: 0.75rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #475569;
  font-weight: 600;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  transition: all 0.2s ease;
}

/* Taille et couleur des SVG */
.icon {
  width: 20px;
  height: 20px;
  stroke: currentColor; /* L'icône prend la couleur du texte */
}

.nav-item:hover {
  background-color: #f1f5f9;
  color: #0d9488;
}

.router-link-active {
  background-color: #ccfbf1 !important;
  color: #0d9488 !important;
}

.sidebar-footer {
  margin-top: auto;
  padding: 1rem;
  border-top: 1px solid #f1f5f9;
  font-size: 0.75rem;
  color: #cbd5e1;
  text-align: center;
}

@media (max-width: 768px) {
  .sidebar { width: 80px; padding: 1.5rem 0.5rem; align-items: center; }
  .section-title, .sidebar-footer, .nav-item span { display: none; }
  .nav-item { justify-content: center; width: 50px; height: 50px; padding: 0; }
}

</style>