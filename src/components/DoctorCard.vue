<script setup>
import { ref } from 'vue';

const props = defineProps({
    doctors: Array,
})
const emit = defineEmits(["removeDoctor", "editDoctor"])
const showModal = ref(false)
const doctorToDelete = ref(null)

function confirmDelete(doctor){
    doctorToDelete.value = doctor 
    showModal.value = true
}

function deleteDoctor(){
    if(doctorToDelete.value){
        emit("removeDoctor", doctorToDelete.value)
    }
    showModal.value = false
    doctorToDelete.value = null
}

function cancelDelete(){
    showModal.value = false
    doctorToDelete.value = null
}

function editDoctor(doctor){
    emit("editDoctor", doctor)
}
</script>

<template>
<div class="doctor-container">
  <div class="header-table">
    <h2>
      <svg xmlns="http://www.w3.org/2000/svg" class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5v14"/><path d="M7 10h10"/></svg>
      Personnel Médical
    </h2>
  </div>

  <table class="doctor-table">
    <thead>
      <tr>
        <th>Nom du Praticien</th>
        <th>Spécialité</th>
        <th>Contact</th>
        <th>Statut</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="doctor in doctors" :key="doctor.id">
        <td class="doctor-name">{{ doctor.name }}</td>
        <td><span class="spec-tag">{{ doctor.speciality }}</span></td>
        <td>{{ doctor.phone }}</td>
        <td>
          <span :class="['status-pill', doctor.available ? 'available' : 'unavailable']">
            {{ doctor.available ? 'En service' : 'Absent' }}
          </span>
        </td>
        <td class="actions-cell">
          <button class="btn-action edit" @click="editDoctor(doctor)" title="Modifier">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
          </button>
          <button class="btn-action delete" @click="confirmDelete(doctor)" title="Supprimer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <Transition name="fade">
    <div v-if="showModal" class="modal-overlay" @click.self="cancelDelete">
      <div class="modal-card">
        <div class="modal-icon-warn">!</div>
        <h3>Confirmer la suppression</h3>
        <p>Voulez-vous vraiment retirer <strong>{{ doctorToDelete?.name }}</strong> de l'annuaire ? Cette action est irréversible.</p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="cancelDelete">Annuler</button>
          <button class="btn-confirm" @click="deleteDoctor">Supprimer le profil</button>
        </div>
      </div>
    </div>
  </Transition>
</div>
</template>

<style scoped>
.doctor-container {
  padding: 2rem;
  background: white;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
}

.header-table {
  margin-bottom: 2rem;
}

h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 800;
}

.title-icon {
  width: 32px;
  height: 32px;
  color: #0d9488;
}

/* Tableau */
.doctor-table {
  width: 100%;
  border-collapse: collapse;
}

.doctor-table th {
  text-align: left;
  padding: 1rem;
  background: #f8fafc;
  color: #64748b;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #f1f5f9;
}

.doctor-table td {
  padding: 1.2rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  font-size: 0.95rem;
}

.doctor-name {
  font-weight: 700;
  color: #1e293b;
}

.spec-tag {
  background: #f1f5f9;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #475569;
}

/* Status Pills */
.status-pill {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}

.available { background: #dcfce7; color: #166534; }
.unavailable { background: #fee2e2; color: #991b1b; }

/* Actions */
.actions-cell {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.btn-action {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-action svg { width: 18px; height: 18px; }

.edit:hover { border-color: #0d9488; color: #0d9488; background: #f0fdfa; }
.delete:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-card {
  background: white;
  padding: 2.5rem;
  border-radius: 24px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
}

.modal-icon-warn {
  width: 50px;
  height: 50px;
  background: #fee2e2;
  color: #ef4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 auto 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 2rem;
}

.btn-cancel {
  flex: 1;
  padding: 0.8rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: white;
  font-weight: 600;
  cursor: pointer;
}

.btn-confirm {
  flex: 1;
  padding: 0.8rem;
  border-radius: 12px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

/* Animations */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>