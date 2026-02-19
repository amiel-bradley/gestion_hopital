<script setup>
import { ref, computed } from 'vue';
import { users } from '@/services/data';

const showModal = ref(false)
const userToDelete = ref(null)
const searchQuery = ref("")
const showToast = ref(false)

// Couleurs pour les avatars
const avatarColors = ['#EEF2FF', '#ECFDF5', '#FFF7ED', '#FEF2F2', '#F5F3FF'];
const textColors = ['#4338CA', '#047857', '#C2410C', '#B91C1C', '#6D28D9'];

const filteredUser = computed(() => {
  if (!searchQuery.value) return users.value
  const query = searchQuery.value.toLowerCase().trim()
  return users.value.filter(user =>
    user.username.toLowerCase().includes(query) ||
    user.firstname.toLowerCase().includes(query) ||
    user.telephone.toString().includes(query)
  )
})

const notUser = computed(() => filteredUser.value.length === 0)

function confirmDelete(user) {
  userToDelete.value = user
  showModal.value = true
}

function supprimerUser() {
  if (userToDelete.value) {
    users.value = users.value.filter(u => u !== userToDelete.value)
    showToast.value = true;
    setTimeout(() => { showToast.value = false; }, 3000);
  }
  showModal.value = false
}

function cancelDelete() {
  showModal.value = false
  userToDelete.value = null
}
</script>

<template>
  <div class="app-shell">
    <header class="main-header">
      <div class="title-section">
        <div class="badge-status">Administration</div>
        <h1>Annuaire Membres</h1>
        <p>Gérez les accès de vos <strong>{{ filteredUser.length }}</strong> collaborateurs</p>
      </div>

      <div class="actions-section">
        <div class="search-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input v-model="searchQuery" type="text" placeholder="Rechercher un nom...">
        </div>
        <router-link to="/usersform" class="btn-add">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nouveau
        </router-link>
      </div>
    </header>

    <Transition name="toast">
      <div v-if="showToast" class="h-toast success">
        <div class="toast-icon">✓</div>
        <span>Utilisateur révoqué avec succès</span>
      </div>
    </Transition>

    <main class="data-card">
      <div class="table-responsive">
        <table class="modern-table">
          <thead>
            <tr>
              <th>Collaborateur</th>
              <th>Contact & Email</th>
              <th>Rôle</th>
              <th class="text-right">Gestion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUser" :key="user.email" class="table-row">
              <td>
                <div class="user-cell">
                  <div class="avatar-box"
                    :style="{ backgroundColor: avatarColors[index % 5], color: textColors[index % 5] }">
                    {{ user.firstname[0] }}{{ user.username[0] }}
                  </div>
                  <div class="user-meta">
                    <span class="full-name">{{ user.firstname }} {{ user.username }}</span>
                    <span class="user-id">ID: #{{ user.age }}{{ index }}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="contact-cell">
                  <span class="email-text">{{ user.email }}</span>
                  <span class="phone-text">{{ user.telephone }}</span>
                </div>
              </td>
              <td>
                <span :class="['role-pill', user.role.toLowerCase()]">{{ user.role }}</span>
              </td>
              <td class="text-right">
                <button @click="confirmDelete(user)" class="btn-delete" title="Supprimer l'accès">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path
                      d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="notUser" class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>Aucun résultat</h3>
        <p>Nous n'avons trouvé aucun membre pour "{{ searchQuery }}"</p>
      </div>
    </main>

    <Transition name="fade">
      <div v-if="showModal" class="modal-overlay" @click.self="cancelDelete">
        <div class="modal-content">
          <div class="warning-icon">!</div>
          <h3>Confirmer la suppression</h3>
          <p>L'accès de <strong>{{ userToDelete?.firstname }}</strong> sera immédiatement révoqué. Cette action est
            irréversible.</p>
          <div class="modal-actions">
            <button class="btn-cancel" @click="cancelDelete">Conserver</button>
            <button class="btn-confirm" @click="supprimerUser">Supprimer</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.app-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 24px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #fcfcfd;
}

/* --- HEADER --- */
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  gap: 20px;
}

.badge-status {
  display: inline-block;
  padding: 4px 12px;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 12px;
  text-transform: uppercase;
}

h1 {
  font-size: 2.2rem;
  font-weight: 900;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.03em;
}

.title-section p {
  color: #64748b;
  font-size: 1.1rem;
  margin-top: 8px;
}

/* --- ACTIONS --- */
.actions-section {
  display: flex;
  gap: 16px;
  align-items: center;
}

.search-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  color: #94a3b8;
}

.search-wrapper input {
  padding: 12px 16px 12px 42px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: white;
  width: 320px;
  font-size: 0.95rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-wrapper input:focus {
  border-color: #0d9488;
  box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1);
  outline: none;
}

.btn-add {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #0f172a;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn-add:hover {
  transform: translateY(-2px);
  background: #1e293b;
}

.btn-add svg {
  width: 18px;
}

/* --- TABLE --- */
.data-card {
  background: white;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: #f8fafc;
  padding: 16px 24px;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #f1f5f9;
}

.table-row {
  transition: background 0.2s;
}

.table-row:hover {
  background: #f8fafc;
}

td {
  padding: 16px 24px;
  border-bottom: 1px solid #f1f5f9;
}

/* --- USER CELL --- */
.user-cell {
  display: flex;
  align-items: center;
  gap: 14px;
}

.avatar-box {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.9rem;
}

.user-meta {
  display: flex;
  flex-direction: column;
}

.full-name {
  font-weight: 700;
  color: #1e293b;
  font-size: 0.95rem;
}

.user-id {
  font-size: 0.75rem;
  color: #94a3b8;
}

/* --- CONTACT CELL --- */
.contact-cell {
  display: flex;
  flex-direction: column;
}

.email-text {
  font-size: 0.9rem;
  color: #475569;
}

.phone-text {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 2px;
}

/* --- BADGES --- */
.role-pill {
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-block;
}

.role-pill.admin {
  background: #fee2e2;
  color: #991b1b;
}

.role-pill.user,
.role-pill.membre {
  background: #f0fdf4;
  color: #166534;
}

/* --- ACTIONS --- */
.btn-delete {
  background: #fff;
  border: 1px solid #fee2e2;
  color: #ef4444;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-delete:hover {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}

.btn-delete svg {
  width: 18px;
}

.text-right {
  text-align: right;
}

/* --- MODAL --- */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 32px;
  max-width: 440px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.warning-icon {
  width: 60px;
  height: 60px;
  background: #fff1f2;
  color: #e11d48;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 1.5rem;
  font-weight: bold;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

.btn-cancel {
  flex: 1;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: white;
  font-weight: 600;
  cursor: pointer;
}

.btn-confirm {
  flex: 1;
  padding: 14px;
  border-radius: 14px;
  border: none;
  background: #e11d48;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

/* --- TOAST --- */
.h-toast {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: white;
  padding: 12px 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2000;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

.toast-icon {
  background: #10b981;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
}

/* --- EMPTY STATE --- */
.empty-state {
  padding: 80px 0;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.empty-state h3 {
  color: #1e293b;
  margin: 0;
}

.empty-state p {
  color: #94a3b8;
}

/* TRANSITIONS */
.toast-enter-active {
  animation: slideIn 0.4s ease-out;
}

.toast-leave-active {
  transition: opacity 0.3s;
}

.toast-leave-to {
  opacity: 0;
}

@keyframes slideIn {
  from {
    transform: translate(-50%, -40px);
    opacity: 0;
  }

  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .main-header {
    flex-direction: column;
    align-items: stretch;
  }

  .search-wrapper input {
    width: 100%;
  }

  .modern-table thead {
    display: none;
  }

  .table-row {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  td {
    border: none;
    padding: 4px 0;
  }

  .text-right {
    text-align: left;
    margin-top: 12px;
  }
}
</style>