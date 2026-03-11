<script setup>
import { rooms } from "@/services/data";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// ------------------- FORM STATE -------------------
const numero = ref("");
const capacite = ref(1);
const statut = ref("available");

const isEditing = ref(false);
const editingId = ref(null);

// ------------------- NOTIFICATION -------------------
const notification = ref("");
const showNotification = ref(false);

function notify(message) {
  notification.value = message;
  showNotification.value = true;
  setTimeout(() => { showNotification.value = false; }, 3000);
}

// ------------------- SAVE -------------------
function saveRoom() {
  if (!numero.value || !capacite.value) {
    notify("Champs obligatoires ⚠️");
    return;
  }

  const exist = rooms.value.find(r =>
    r.numero === numero.value && r.roomId !== editingId.value
  );

  if (exist) {
    notify("Numéro déjà utilisé ❌");
    return;
  }

  if (isEditing.value) {
    const room = rooms.value.find(r => r.roomId === editingId.value);
    if (room) {
      room.numero = numero.value;
      room.capacite = Number(capacite.value);
      room.statut = statut.value;
    }
    notify("Mise à jour réussie ✅");
  } else {
    rooms.value.push({
      roomId: Date.now(),
      numero: numero.value,
      capacite: Number(capacite.value),
      statut: statut.value,
      affectationPatient: []
    });
    notify("Unité ajoutée ✅");
  }
  resetForm();
}

function editRoom(room) {
  numero.value = room.numero;
  capacite.value = room.capacite;
  statut.value = room.statut;
  editingId.value = room.roomId;
  isEditing.value = true;
}

function deleteRoom(id) {
  if (confirm("Supprimer cette unité ?")) {
    const index = rooms.value.findIndex(r => r.roomId === id);
    if (index !== -1) {
      rooms.value.splice(index, 1);
      notify("Unité supprimée ❌");
    }
  }
}

function resetForm() {
  numero.value = "";
  capacite.value = 1;
  statut.value = "available";
  editingId.value = null;
  isEditing.value = false;
}

function goBack() {
  router.back();
}
</script>

<template>
  <div class="hospit-app">
    <header class="h-navbar">
      <div class="h-container flex-header">
        <div class="h-left">
          <button @click="goBack" class="h-btn-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
          <div class="h-brand-divider"></div>
          <div class="h-brand">
            <h1>Configuration</h1>
            <p>Unités & Inventaire</p>
          </div>
        </div>
        <div class="h-badge-main">System Live</div>
      </div>
    </header>

    <transition name="slide">
      <div v-if="showNotification" class="h-notif">
        <div class="h-notif-bar"></div>
        {{ notification }}
      </div>
    </transition>

    <main class="h-container h-main-content">
      <div class="h-grid">

        <section class="h-card h-form-box">
          <div class="h-card-head">
            <div class="h-circle-icon" :class="{ 'is-edit': isEditing }">
              <svg v-if="!isEditing" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 4v16m8-8H4" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path
                  d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <h2>{{ isEditing ? 'Modifier l\'unité' : 'Ajouter une unité' }}</h2>
          </div>

          <form @submit.prevent="saveRoom" class="h-form">
            <div class="h-input-group">
              <label>Identifiant (Numéro)</label>
              <input v-model="numero" type="text" placeholder="Ex: Bloc-A1" required />
            </div>

            <div class="h-input-group">
              <label>Nombre de lits</label>
              <input v-model="capacite" type="number" min="1" required />
            </div>

            <div class="h-input-group">
              <label>État de service</label>
              <div class="h-select-custom">
                <select v-model="statut">
                  <option value="available">Opérationnel (Libre)</option>
                  <option value="notavailable">Occupé</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            <div class="h-form-btns">
              <button type="submit" class="h-btn-primary" :class="{ 'btn-edit': isEditing }">
                {{ isEditing ? 'Confirmer les changements' : 'Enregistrer l\'unité' }}
              </button>
              <button v-if="isEditing" @click="resetForm" type="button" class="h-btn-ghost">Annuler</button>
            </div>
          </form>
        </section>

        <section class="h-card h-table-box">
          <div class="h-card-head flex-between">
            <div class="h-title-with-count">
              <h2>Registre des chambres</h2>
              <span class="h-count-pill">{{ rooms.length }}</span>
            </div>
          </div>

          <div class="h-scrollable">
            <table class="h-table">
              <thead>
                <tr>
                  <th>RÉFÉRENCE</th>
                  <th>CAPACITÉ</th>
                  <th>STATUT</th>
                  <th class="h-text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="room in rooms" :key="room.roomId">
                  <td class="h-ref">CH-{{ room.numero }}</td>
                  <td class="h-cap-cell">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 7h18M3 11h18M3 15h18M3 19h18" />
                    </svg>
                    {{ room.capacite }} lits
                  </td>
                  <td>
                    <span :class="['h-status-badge', room.statut]">
                      {{ room.statut }}
                    </span>
                  </td>
                  <td class="h-text-right">
                    <div class="h-actions">
                      <button @click="editRoom(room)" class="h-action-btn edit" title="Modifier">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <path
                            d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button @click="deleteRoom(room.roomId)" class="h-action-btn delete" title="Supprimer">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <path
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="rooms.length === 0">
                  <td colspan="4" class="h-empty">Aucune unité enregistrée</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* --- FOND ET TYPO --- */
.hospit-app {
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: 'Inter', -apple-system, sans-serif;
  color: #1e293b;
}

.h-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 30px;
}

/* --- NAVBAR --- */
.h-navbar {
  background: white;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.flex-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.h-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.h-btn-back {
  background: #f1f5f9;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.2s;
}

.h-btn-back:hover {
  background: #e2e8f0;
  color: #0d9488;
}

.h-btn-back svg {
  width: 14px;
}

.h-brand-divider {
  width: 1px;
  height: 30px;
  background: #e2e8f0;
}

.h-brand h1 {
  font-size: 1.1rem;
  font-weight: 800;
  margin: 0;
  color: #0f172a;
}

.h-brand p {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}

.h-badge-main {
  background: #f0fdf4;
  color: #166534;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  border: 1px solid #bbf7d0;
}

/* --- GRID --- */
.h-main-content {
  padding-top: 30px;
  padding-bottom: 50px;
}

.h-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 30px;
}

/* --- CARDS --- */
.h-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.h-card-head {
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 12px;
}

.h-card-head h2 {
  font-size: 1rem;
  font-weight: 800;
  margin: 0;
}

.h-circle-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0fdf4;
  color: #0d9488;
  display: flex;
  align-items: center;
  justify-content: center;
}

.h-circle-icon svg {
  width: 16px;
}

.h-circle-icon.is-edit {
  background: #fffbeb;
  color: #d97706;
}

/* --- FORMULAIRE --- */
.h-form {
  padding: 24px;
}

.h-input-group {
  margin-bottom: 20px;
}

.h-input-group label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: #475569;
  margin-bottom: 8px;
}

.h-input-group input,
.h-select-custom select {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
  font-size: 0.95rem;
  transition: 0.2s;
}

.h-input-group input:focus,
select:focus {
  border-color: #0d9488;
  outline: none;
  background: white;
}

.h-select-custom {
  position: relative;
}

.h-select-custom select {
  appearance: none;
}

.h-select-custom svg {
  position: absolute;
  right: 12px;
  top: 14px;
  width: 14px;
  color: #94a3b8;
  pointer-events: none;
}

.h-btn-primary {
  width: 100%;
  background: #0d9488;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s;
}

.h-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.3);
}

.h-btn-primary.btn-edit {
  background: #d97706;
}

.h-btn-ghost {
  width: 100%;
  background: none;
  border: none;
  padding: 10px;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
}

/* --- TABLEAU --- */
.h-title-with-count {
  display: flex;
  align-items: center;
  gap: 10px;
}

.h-count-pill {
  background: #f1f5f9;
  padding: 2px 10px;
  border-radius: 10px;
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 800;
}

.h-table {
  width: 100%;
  border-collapse: collapse;
}

.h-table th {
  padding: 14px 24px;
  text-align: left;
  font-size: 0.7rem;
  color: #94a3b8;
  letter-spacing: 0.05em;
  font-weight: 800;
  background: #f8fafc;
}

.h-table td {
  padding: 16px 24px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.9rem;
}

.h-ref {
  font-weight: 800;
  color: #0f172a;
}

.h-cap-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
}

.h-cap-cell svg {
  width: 14px;
  opacity: 0.4;
}

.h-status-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
}

.available {
  background: #dcfce7;
  color: #166534;
}

.notavailable {
  background: #fee2e2;
  color: #991b1b;
}

.maintenance {
  background: #fef3c7;
  color: #92400e;
}

/* --- ACTIONS --- */
.h-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.h-action-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  transition: 0.2s;
}

.h-action-btn:hover.edit {
  color: #d97706;
  border-color: #fcd34d;
  background: #fffbeb;
}

.h-action-btn:hover.delete {
  color: #dc2626;
  border-color: #fecaca;
  background: #fef2f2;
}

.h-action-btn svg {
  width: 14px;
}

/* --- NOTIF --- */
.h-notif {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #1e293b;
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  z-index: 1000;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.h-notif-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: #0d9488;
  width: 100%;
}

.h-text-right {
  text-align: right;
}

.h-empty {
  text-align: center;
  color: #94a3b8;
  padding: 40px !important;
  font-style: italic;
}

@media (max-width: 900px) {
  .h-grid {
    grid-template-columns: 1fr;
  }
}
</style>