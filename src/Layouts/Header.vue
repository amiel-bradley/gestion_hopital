<script setup>
import { users } from '@/services/data';
import { auThis, currentId, logout } from '@/services/auth';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const currentUser = computed(() => {
  return users.value.find(u => u.id === currentId.value.id) || null;
})

function logoutt() {
    logout()
    router.push('/')
}
</script>

<template>
  <header class="navbar-header">
    <div class="nav-container">
      <div class="logo">
        <div class="logo-icon">+</div>
        Hospit<span>Manage</span>
      </div>

      <nav v-if="auThis" class="nav-main">
        <ul class="user-info">
          <li class="user-badge" :class="currentUser?.role?.toLowerCase()">
            {{ currentUser?.role || 'Personnel' }}
          </li>
          <li class="user-name">
            {{ currentUser?.firstname }} 
            <span class="user-id">ID: {{ currentUser?.username }}</span>
          </li>
        </ul>
        <button @click="logoutt" class="btn-logout">
          Quitter la session
        </button>
      </nav>

      <nav v-else class="nav-main">
        <ul class="nav-links">
          <li><RouterLink to="/" class="nav-link">Accueil</RouterLink></li>
        </ul>
        <RouterLink to="/login" class="btn-login">Accès Personnel</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 2px solid #0d9488; /* Ligne émeraude médicale */
  padding: 0.6rem 2rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo Hospitalier */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.5px;
}
.logo-icon {
  background: #0d9488;
  color: white;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 1.2rem;
}
.logo span { color: #0d9488; }

/* Menus */
.nav-main {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

ul {
  display: flex;
  align-items: center;
  gap: 1rem;
  list-style: none;
}

/* Liens */
.nav-link {
  text-decoration: none;
  color: #64748b;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;
}
.nav-link:hover {
  background: #f1f5f9;
  color: #0d9488;
}

/* Badges de Rôles (Couleurs médicales) */
.user-badge {
  background: #ccfbf1;
  color: #0f766e;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  border: 1px solid #99f6e4;
}

/* Si admin, on peut changer la couleur */
.user-badge.admin {
  background: #dbeafe;
  color: #1e40af;
  border-color: #bfdbfe;
}

.user-name {
  font-weight: 600;
  color: #334155;
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.user-id {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 400;
}

/* Boutons */
.btn-login {
  background-color: #0d9488;
  color: white;
  padding: 0.6rem 1.4rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 4px 6px -1px rgba(13, 148, 136, 0.2);
  transition: all 0.2s;
}

.btn-login:hover {
  background-color: #0f766e;
  transform: translateY(-1px);
}

.btn-logout {
  background: #fff1f2;
  border: 1px solid #fecdd3;
  color: #be123c;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.btn-logout:hover {
  background: #ffe4e6;
  border-color: #fda4af;
}

/* Responsive */
@media (max-width: 768px) {
  .user-name { display: none; }
  .navbar-header { padding: 0.5rem 1rem; }
}
</style>