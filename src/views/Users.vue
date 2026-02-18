<script setup>
import router from '@/router';
import { ref, computed } from 'vue';
import { users } from '@/services/data';



const showModal = ref(false)
const userToDelete = ref(null)
const searchQuery = ref("")
const showToast = ref(false) 

const filteredUser = computed(() => {
  if (!searchQuery.value) {
    return users.value
  }


  const query = searchQuery.value.toLowerCase().trim()

  return users.value.filter(user =>
    user.username.toLowerCase().includes(query) ||
    user.firstname.toLowerCase().includes(query) ||
    user.telephone.toString().includes(query)
  )
})
console.log(filteredUser)

const notUser = computed(() => {
  return filteredUser.value.length === 0
})



function confirmDelete(user){
    userToDelete.value = user 
    showModal.value = true
}

function supprimerUser(){
    if(userToDelete.value){
        users.value = users.value.filter(u => u !== userToDelete.value)
        
        showToast.value = true;
        

        setTimeout(() => {
            showToast.value = false;
            userToDelete.value = null;
        }, 3000);
    }
    showModal.value = false
    userToDelete.value = null
}

function cancelDelete(){
    showModal.value = false
    userToDelete.value = null
}

</script>


<template>
  <div class="app-shell">
    <header class="main-header">
      <div class="title-section">
        <h1>Annuaire Utilisateurs</h1>
        <p>{{ filteredUser.length }} membres enregistrés</p>
      </div>
      <div class="actions-section">
        <div class="search-container">
          <input v-model="searchQuery" type="text" placeholder="Rechercher...">
        </div>
        <router-link to="/usersform" class="btn-primary">Ajouter</router-link>
      </div>
    </header>

<Transition name="toast-pop">
  <div v-if="showToast" class="simple-alert">
    <span class="alert-icon">✨</span>
    <span class="alert-message">Utilisateur supprimé avec succès</span>
  </div>
</Transition>

    <main class="content-card">
      <table class="minimal-table">
        <thead>
          <tr>
            <th>Identité</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUser" :key="user.email">
            <td>
              <div class="user-info">
                <span class="avatar">{{ user.firstname[0] }}</span>
                <div>
                  <div class="full-name">{{ user.firstname }} {{ user.username }}</div>
                  <div class="sub-text">{{ user.age }} ans</div>
                </div>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>{{ user.telephone }}</td>
            <td><span class="badge">{{ user.role }}</span></td>
            <td class="actions">
              <button @click="confirmDelete(user)" class="btn-icon-delete">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="notUser" class="empty-view">
        Aucun utilisateur ne correspond à votre recherche.
      </div>
    </main>

    <Transition name="blur">
      <div v-if="showModal" class="glass-overlay" @click.self="cancelDelete">
        <div class="glass-modal">
          <h3>Supprimer le profil ?</h3>
          <p>Cette action supprimera définitivement <strong>{{ userToDelete?.username }}</strong>.</p>
          <div class="modal-btns">
            <button class="btn-ghost" @click="cancelDelete">Annuler</button>
            <button class="btn-danger" @click="supprimerUser">Confirmer</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
/* --- Base & Layout --- */
.app-shell {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
  color: #1a1a1a;
  font-family: 'Inter', system-ui, sans-serif;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}

h1 { font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; }
.title-section p { color: #666; margin-top: 4px; }

/* --- Barre de recherche & Bouton --- */
.actions-section { display: flex; gap: 12px; }

.search-container input {
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  background: #f9f9f9;
  width: 280px;
  transition: all 0.2s;
}

.search-container input:focus {
  outline: none;
  background: white;
  border-color: #000;
  box-shadow: 0 0 0 4px rgba(0,0,0,0.05);
}

.btn-primary {
  background: #42a17a;
  color: #fff;
  padding: 12px 24px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s;
}

/* --- Tableau Minimaliste --- */
.content-card {
  background: white;
  border-radius: 20px;
  border: 1px solid #eee;
  overflow: hidden;
}

.minimal-table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 16px 24px;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #888;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #eee;
}

td { padding: 20px 24px; border-bottom: 1px solid #fafafa; font-size: 0.95rem; }

/* --- Info Utilisateur (Avatar) --- */
.user-info { display: flex; align-items: center; gap: 12px; }
.avatar {
  width: 36px;
  height: 36px;
  background: #f0f0f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #555;
}
.full-name { font-weight: 600; }
.sub-text { font-size: 0.8rem; color: #999; }

/* --- Badges & Boutons --- */
.badge {
  background: #b6dadb;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgb(63, 110, 84);
}

.btn-icon-delete {
  background: transparent;
  border: none;
  color: #ff4d4d;
  font-size: 0.85rem;
  cursor: pointer;
  font-weight: 500;
  padding: 8px;
}

/* --- Modal Glassmorphism --- */
.glass-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.glass-modal {
  background: white;
  padding: 32px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  max-width: 400px;
  text-align: center;
}

.modal-btns { display: flex; gap: 12px; margin-top: 24px; }
.btn-ghost { flex: 1; border: none; background: #f5f5f5; padding: 12px; border-radius: 12px; cursor: pointer; }
.btn-danger { flex: 1; border: none; background: #ff4d4d; color: white; padding: 12px; border-radius: 12px; cursor: pointer; }

/* --- Nouveau Style Alert Toast --- */
.simple-alert {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  
  /* Style Soft UI / Glass */
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  color: #1a1a1a;
  border: 1px solid #42a17a;
  
  padding: 14px 28px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 600;
  z-index: 1000;
  
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 15px 30px rgba(66, 161, 122, 0.15);
}

.alert-icon {
  background: #42a17a;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.7rem;
  color: white;
}

/* --- Animation de "Pop" plus fluide --- */
.toast-pop-enter-active {
  animation: toast-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-pop-leave-active {
  transition: all 0.3s ease;
}

.toast-pop-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px) scale(0.8);
}

@keyframes toast-in {
  0% {
    opacity: 0;
    transform: translate(-50%, 50px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
}
</style>