<script setup>
/* On garde ta logique script telle quelle */
import { ref, computed } from "vue";
import { rooms, patients } from "@/services/data";
import { useRouter } from "vue-router";

const router = useRouter();
const selectedRoom = ref("");
const selectedPatient = ref("");

const notification = ref({ show: false, message: "", type: "success" });

function showNotif(message, type = "success") {
  notification.value = { show: true, message, type };
  setTimeout(() => (notification.value.show = false), 2500);
}

const assignedPatients = computed(() =>
  rooms.value.flatMap(r => r.affectationPatient)
);

const patientsAvailable = computed(() =>
  patients.value.filter(p => !assignedPatients.value.includes(p.id))
);

const roomsdispos = computed(() =>
  rooms.value.filter(r => r.affectationPatient.length < r.capacite)
);

function affecter() {
  if (!selectedRoom.value || !selectedPatient.value) {
    showNotif("Sélectionnez une chambre et un patient.", "error");
    return;
  }
  const room = rooms.value.find(r => r.numero === selectedRoom.value);
  if (!room) return;
  if (room.affectationPatient.length >= room.capacite) {
    showNotif("Cette chambre est complète.", "error");
    return;
  }
  room.affectationPatient.push(selectedPatient.value);
  room.statut = room.affectationPatient.length === room.capacite ? "notavailable" : "available";
  localStorage.setItem("rooms", JSON.stringify(rooms.value));
  selectedRoom.value = "";
  selectedPatient.value = "";
  showNotif("Patient affecté ✔️");
}

function desaffecter(room, patientId) {
  room.affectationPatient = room.affectationPatient.filter(id => id !== patientId);
  room.statut = room.affectationPatient.length === room.capacite ? "notavailable" : "available";
  localStorage.setItem("rooms", JSON.stringify(rooms.value));
  showNotif("Patient libéré ✔️");
}

function goBack() { router.back(); }
</script>

<template>
  <div class="h-assign-page">
    <header class="h-top-bar">
      <button class="h-back-link" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M15 19l-7-7 7-7" />
        </svg>
        Retour au tableau de bord
      </button>
      <div class="h-title-wrap">
        <h1>Gestion des Affectations</h1>
        <p>Affectez les patients aux lits disponibles</p>
      </div>
    </header>

    <div class="h-main-layout">
      <aside class="h-side-panel">
        <div class="h-sticky-card">
          <div class="h-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <path d="M20 8v6M23 11h-6" />
            </svg>
          </div>
          <h3>Admission Rapide</h3>
          <p class="h-helper">Remplissez les informations pour assigner un lit.</p>

          <div class="h-form-group">
            <label>Patient en attente</label>
            <div class="h-select-wrapper">
              <select v-model="selectedPatient">
                <option disabled value="">Sélectionner un patient...</option>
                <option v-for="p in patientsAvailable" :key="p.id" :value="p.id">
                  {{ p.firstName }} {{ p.lastName }}
                </option>
              </select>
            </div>
          </div>

          <div class="h-form-group">
            <label>Chambre de destination</label>
            <div class="h-select-wrapper">
              <select v-model="selectedRoom">
                <option disabled value="">Choisir une unité...</option>
                <option v-for="room in roomsdispos" :key="room.roomId" :value="room.numero">
                  Unité {{ room.numero }} ({{ room.capacite - room.affectationPatient.length }} places)
                </option>
              </select>
            </div>
          </div>

          <button class="h-btn-submit" @click="affecter" :disabled="!selectedRoom || !selectedPatient">
            Confirmer l'affectation
          </button>
        </div>
      </aside>

      <main class="h-content-area">
        <div class="h-section-title">
          <h3>État des Unités d'Hospitalisation</h3>
          <span class="h-badge-count">{{ rooms.length }} Chambres totales</span>
        </div>

        <div class="h-rooms-list">
          <div v-for="room in rooms" :key="room.roomId" class="h-room-row" :class="room.statut">
            <div class="h-room-header">
              <div class="h-room-name">
                <span class="h-tag">N° {{ room.numero }}</span>
                <h4>Chambre Standard</h4>
              </div>
              <div class="h-occupancy-pill">
                {{ room.affectationPatient.length }} / {{ room.capacite }} lits
              </div>
            </div>

            <div class="h-patients-grid">
              <div v-if="room.affectationPatient.length === 0" class="h-empty-slot">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14" />
                </svg>
                Chambre vide
              </div>

              <div v-for="id in room.affectationPatient" :key="id" class="h-patient-card">
                <div class="h-p-info">
                  <span class="h-p-name">{{patients.find(p => p.id === id)?.firstName}} {{patients.find(p => p.id ===
                    id)?.lastName }}</span>
                  <span class="h-p-status">Hospitalisé</span>
                </div>
                <button class="h-p-action" @click="desaffecter(room, id)" title="Libérer le patient">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                  Sortie
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <transition name="h-slide">
      <div v-if="notification.show" :class="['h-toast', notification.type]">
        <span class="h-toast-icon">{{ notification.type === 'success' ? '✓' : '!' }}</span>
        {{ notification.message }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
.h-assign-page {
  background: #f1f5f9;
  min-height: 100vh;
  padding: 0 0 50px 0;
  font-family: 'Inter', sans-serif;
}

/* TOP BAR */
.h-top-bar {
  background: white;
  padding: 20px 40px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.h-back-link {
  background: none;
  border: none;
  color: #64748b;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.h-back-link svg {
  width: 16px;
}

.h-title-wrap h1 {
  font-size: 1.3rem;
  margin: 0;
  color: #1e293b;
  font-weight: 800;
}

.h-title-wrap p {
  margin: 0;
  font-size: 0.85rem;
  color: #94a3b8;
}

/* LAYOUT */
.h-main-layout {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 30px;
  max-width: 1400px;
  margin: 30px auto;
  padding: 0 20px;
}

/* SIDE PANEL */
.h-sticky-card {
  background: white;
  padding: 30px;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  position: sticky;
  top: 110px;
}

.h-card-icon {
  width: 50px;
  height: 50px;
  background: #0d9488;
  color: white;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.h-card-icon svg {
  width: 26px;
}

.h-sticky-card h3 {
  margin: 0 0 8px 0;
  font-size: 1.2rem;
}

.h-helper {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 25px;
}

.h-form-group {
  margin-bottom: 20px;
}

.h-form-group label {
  display: block;
  font-size: 0.75rem;
  font-weight: 800;
  color: #475569;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.h-select-wrapper select {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  appearance: none;
  background: #f8fafc;
  font-weight: 500;
}

.h-btn-submit {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: #0d9488;
  color: white;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s;
}

.h-btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.h-btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.3);
}

/* CONTENT AREA */
.h-section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.h-badge-count {
  background: #e2e8f0;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
}

.h-rooms-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.h-room-row {
  background: white;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  padding: 20px;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 30px;
  align-items: center;
}

.h-room-row.notavailable {
  border-left: 6px solid #ef4444;
}

.h-room-row.available {
  border-left: 6px solid #10b981;
}

.h-tag {
  font-size: 0.7rem;
  font-weight: 900;
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 6px;
  color: #0d9488;
}

.h-room-name h4 {
  margin: 5px 0 0 0;
  font-size: 1rem;
  color: #1e293b;
}

.h-occupancy-pill {
  font-size: 0.8rem;
  font-weight: 800;
  color: #64748b;
  margin-top: 10px;
  display: inline-block;
  padding: 4px 10px;
  background: #f8fafc;
  border-radius: 6px;
}

.h-patients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.h-empty-slot {
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  color: #94a3b8;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.h-empty-slot svg {
  width: 20px;
  margin-bottom: 5px;
  opacity: 0.3;
}

.h-patient-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.h-p-name {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e293b;
}

.h-p-status {
  font-size: 0.7rem;
  color: #10b981;
  font-weight: 600;
}

.h-p-action {
  background: #fee2e2;
  color: #ef4444;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;
}

.h-p-action:hover {
  background: #ef4444;
  color: white;
}

/* TOAST */
.h-toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #1e293b;
  color: white;
  padding: 15px 25px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.h-toast.error {
  background: #ef4444;
}

.h-toast-icon {
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

/* TRANSITIONS */
.h-slide-enter-active,
.h-slide-leave-active {
  transition: all 0.3s ease;
}

.h-slide-enter-from {
  transform: translateY(100px);
  opacity: 0;
}

.h-slide-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@media (max-width: 1000px) {
  .h-main-layout {
    grid-template-columns: 1fr;
  }

  .h-side-panel {
    order: -1;
  }

  .h-sticky-card {
    position: static;
  }
}
</style>