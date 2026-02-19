<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  doctors: Array,
})
const emit = defineEmits(["removeDoctor", "editDoctor"])

const showModal = ref(false)
const doctorToDelete = ref(null)
const searchQuery = ref("")

const notFound = computed(() => filteredDoctors.value.length === 0)

const filteredDoctors = computed(() => {
  if (!searchQuery.value) return props.doctors
  const query = searchQuery.value.toLowerCase().trim()
  return props.doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(query) ||
    doctor.speciality.toLowerCase().includes(query)
  )
})

function confirmDelete(doctor) {
  doctorToDelete.value = doctor
  showModal.value = true
}

function deleteDoctor() {
  if (doctorToDelete.value) emit("removeDoctor", doctorToDelete.value)
  showModal.value = false
  doctorToDelete.value = null
}

function cancelDelete() {
  showModal.value = false
  doctorToDelete.value = null
}
</script>

<template>
  <div class="doctor-container">

    <div class="table-controls">
      <div class="search-wrapper">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input v-model="searchQuery" type="text" placeholder="Rechercher un praticien..." />
      </div>
      <div class="count-badge">
        <b>{{ filteredDoctors.length }}</b> spécialist{{ filteredDoctors.length > 1 ? 'es' : '' }}
      </div>
    </div>

    <div class="desktop-view">
      <table class="doctor-table">
        <thead>
          <tr>
            <th>Praticien</th>
            <th>Spécialité</th>
            <th>Disponibilité</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doctor in filteredDoctors" :key="doctor.id">
            <td>
              <div class="doctor-identity">
                <div class="avatar-mini">{{doctor.name.split(' ').map(n => n[0]).join('')}}</div>
                <div class="name-info">
                  <span class="doctor-name">{{ doctor.name }}</span>
                  <span class="phone-sub">{{ doctor.phone }}</span>
                </div>
              </div>
            </td>
            <td><span class="spec-tag">{{ doctor.speciality }}</span></td>
            <td>
              <span :class="['status-pill', doctor.available ? 'available' : 'unavailable']">
                {{ doctor.available ? 'En service' : 'Absent' }}
              </span>
            </td>
            <td class="actions-cell">
              <button class="btn-action edit" @click="$emit('editDoctor', doctor)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button class="btn-action delete" @click="confirmDelete(doctor)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mobile-view">
      <div v-for="doctor in filteredDoctors" :key="doctor.id" class="doctor-mobile-card">
        <div class="card-top">
          <div class="avatar-mini">{{doctor.name.split(' ').map(n => n[0]).join('')}}</div>
          <div class="card-meta">
            <span class="doctor-name">{{ doctor.name }}</span>
            <span class="spec-tag">{{ doctor.speciality }}</span>
          </div>
          <span :class="['status-dot', doctor.available ? 'available' : 'unavailable']"></span>
        </div>
        <div class="card-footer">
          <span class="phone-sub">{{ doctor.phone }}</span>
          <div class="card-btns">
            <button class="btn-action edit" @click="$emit('editDoctor', doctor)"><svg viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <path
                  d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg></button>
            <button class="btn-action delete" @click="confirmDelete(doctor)"><svg viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <path
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg></button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="notFound" class="empty-state">
      <p>Aucun praticien trouvé.</p>
    </div>

    <Transition name="fade">
      <div v-if="showModal" class="modal-overlay" @click.self="cancelDelete">
        <div class="modal-card">
          <h3>Supprimer ?</h3>
          <p>Retirer <b>Dr. {{ doctorToDelete?.name }}</b> du système ?</p>
          <div class="modal-actions">
            <button class="btn-noborder" @click="cancelDelete">Annuler</button>
            <button class="btn-danger-fill" @click="deleteDoctor">Supprimer</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.doctor-container {
  background: white;
  border-radius: 20px;
}

/* RECHERCHE */
.table-controls {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.search-wrapper {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  color: #94a3b8;
}

.search-wrapper input {
  width: 100%;
  padding: 10px 10px 10px 38px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 0.9rem;
  outline: none;
}

.count-badge {
  font-size: 0.8rem;
  color: #64748b;
  background: #f1f5f9;
  padding: 6px 12px;
  border-radius: 8px;
}

/* TABLEAU DESKTOP */
.doctor-table {
  width: 100%;
  border-collapse: collapse;
}

.doctor-table th {
  text-align: left;
  padding: 12px 20px;
  background: #f8fafc;
  color: #64748b;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.doctor-table td {
  padding: 15px 20px;
  border-bottom: 1px solid #f1f5f9;
}

.doctor-identity {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-mini {
  width: 32px;
  height: 32px;
  background: #0d9488;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
}

.name-info {
  display: flex;
  flex-direction: column;
}

.doctor-name {
  font-weight: 700;
  color: #0f172a;
  font-size: 0.9rem;
}

.phone-sub {
  font-size: 0.8rem;
  color: #94a3b8;
}

.spec-tag {
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  color: #475569;
  font-weight: 600;
}

.status-pill {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 800;
}

.available {
  background: #dcfce7;
  color: #166534;
}

.unavailable {
  background: #fee2e2;
  color: #991b1b;
}

.actions-cell {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn-action {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-action svg {
  width: 16px;
}

.edit:hover {
  border-color: #0d9488;
  color: #0d9488;
}

.delete:hover {
  border-color: #ef4444;
  color: #ef4444;
}

/* MOBILE VIEW */
.mobile-view {
  display: none;
  padding: 10px;
}

.doctor-mobile-card {
  background: #f8fafc;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #e2e8f0;
}

.card-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.card-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-dot.available {
  background: #22c55e;
  box-shadow: 0 0 8px #22c55e;
}

.status-dot.unavailable {
  background: #ef4444;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e2e8f0;
  padding-top: 10px;
}

.card-btns {
  display: flex;
  gap: 8px;
}

/* RESPONSIVE BREAKPOINT */
@media (max-width: 768px) {
  .desktop-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .table-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-wrapper {
    max-width: 100%;
  }
}

/* MODAL & TRANSITIONS */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-card {
  background: white;
  padding: 25px;
  border-radius: 20px;
  width: 90%;
  max-width: 320px;
  text-align: center;
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-noborder {
  flex: 1;
  background: none;
  border: none;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
}

.btn-danger-fill {
  flex: 1;
  background: #ef4444;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>