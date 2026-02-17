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
      <div class="logo">MyApp<span>.</span></div>

      <nav v-if="auThis" class="nav-main">
        <ul class="user-info">
          <li class="user-badge">{{ currentUser?.role || 'User' }}</li>
          <li class="user-name">{{ currentUser?.firstname }} <span>(@{{ currentUser?.username }})</span></li>
        </ul>
        <button @click="logoutt" class="btn-logout">
          Déconnexion
        </button>
      </nav>

      <nav v-else class="nav-main">
        <ul class="nav-links">
          <li><RouterLink to="/" class="nav-link">Accueil</RouterLink></li>
        </ul>
        <RouterLink to="/login" class="btn-login">Se Connecter</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px); /* Effet flou moderne */
  border-bottom: 1px solid #e2e8f0;
  padding: 0.75rem 2rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
}
.logo span { color: #0ea5e9; }

/* Menus */
.nav-main {
  display: flex;
  align-items: center;
  gap: 2rem;
}

ul {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
}

/* Liens de navigation */
.nav-link {
  text-decoration: none;
  color: #64748b;
  font-weight: 600;
  transition: color 0.2s;
}
.nav-link:hover, .router-link-active {
  color: #0ea5e9;
}

/* Infos Utilisateur */
.user-info {
  font-size: 0.9rem;
  color: #1e293b;
}

.user-badge {
  background: #f1f5f9;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748b;
}

.user-name span {
  color: #94a3b8;
  font-weight: 400;
}

/* Boutons */
.btn-login {
  background-color: #0ea5e9;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.btn-logout {
  background: transparent;
  border: 1px solid #fda4af;
  color: #e11d48;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-logout:hover {
  background: #fff1f2;
}

/* Responsive */
@media (max-width: 768px) {
  .user-name span { display: none; }
  .nav-container { padding: 0.5rem; }
}
</style>