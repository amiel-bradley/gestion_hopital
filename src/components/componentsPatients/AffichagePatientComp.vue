<script setup>
import { computed, ref, onMounted } from "vue";
import { patients } from "@/services/data";
import { useRouter } from "vue-router";

const router = useRouter();

/* ----------- Recherche et filtre ----------- */
const search = ref("");
const selectedStatus = ref("");

onMounted(() => {
  const savedPatients = localStorage.getItem("patients");
  if (savedPatients) patients.value = JSON.parse(savedPatients);
});

const filteredPatients = computed(() => {
  return patients.value.filter((p) => {
    const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
    const matchSearch = fullName.includes(search.value.toLowerCase());
    const matchStatus =
      !selectedStatus.value || p.status === selectedStatus.value;
    return matchSearch && matchStatus;
  });
});

/* ----------- Notifications ----------- */
const notifications = ref([]);

const showNotification = (message, type = "success") => {
  const id = Date.now();
  notifications.value.push({ id, message, type });

  setTimeout(() => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  }, 3000);
};

/* ----------- Modal Suppression ----------- */
const showDeleteModal = ref(false);
const patientToDelete = ref(null);

const openDeleteModal = (id) => {
  patientToDelete.value = id;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  patients.value = patients.value.filter(
    (p) => p.id !== patientToDelete.value
  );
  localStorage.setItem("patients", JSON.stringify(patients.value));

  showDeleteModal.value = false;
  patientToDelete.value = null;

  showNotification("Patient supprimé avec succès", "danger");
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  patientToDelete.value = null;
};

/* ----------- Actions ----------- */
const ajouterPatient = () => {
  localStorage.removeItem("patientToEdit");
  router.push("/patients/formulaire");
};

const modifier = (patient) => {
  localStorage.setItem("patientToEdit", JSON.stringify(patient));
  router.push("/patients/formulaire");
};

const supp = (id) => {
  openDeleteModal(id);
};
</script>


<template>
  <!-- Modal Suppression -->
  <div v-if="showDeleteModal" class="custom-modal-overlay">
    <div class="custom-modal">
      <h3>Confirmation</h3>
      <p>Voulez-vous vraiment supprimer ce dossier ?</p>

      <div class="custom-modal-actions">
        <button @click="cancelDelete" class="modal-cancel">
          Annuler
        </button>
        <button @click="confirmDelete" class="modal-confirm">
          Supprimer
        </button>
      </div>
    </div>
  </div>

  <!-- Notifications -->
  <div class="custom-notification-container">
    <div v-for="notif in notifications" :key="notif.id" :class="['custom-toast', notif.type]">
      {{ notif.message }}
    </div>
  </div>


  <section class="patients-page">
    <header class="page-header">
      <div class="title-group">
        <div class="icon-circle-main">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <polyline points="17 11 19 13 23 9" />
          </svg>
        </div>
        <div>
          <h1>Registre Patients</h1>
          <p class="subtitle">{{ filteredPatients.length }} dossiers médicaux actifs</p>
        </div>
      </div>
      <button class="btn-add-main" @click="ajouterPatient">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span>Nouvelle Admission</span>
      </button>
    </header>

    <div class="filters-container">
      <div class="search-input-wrapper">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input type="text" v-model="search" placeholder="Rechercher un nom..." />
      </div>

      <div class="select-wrapper">
        <svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 4h18M6 12h12M10 20h4" />
        </svg>
        <select v-model="selectedStatus">
          <option value="">Tous les statuts</option>
          <option value="consultation">En consultation</option>
          <option value="hospitalise">Hospitalisé</option>
          <option value="sorti">Sorti</option>
          <option value="transfere">Transféré</option>
        </select>
        <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <div class="patients-grid">
      <article class="patient-card" v-for="patient in filteredPatients" :key="patient.id">
        <div class="card-header">
          <div class="patient-main-info">
            <div class="avatar-box">
              {{ patient.firstName[0] }}{{ patient.lastName[0] }}
            </div>
            <div class="name-id">
              <h3>{{ patient.firstName }} {{ patient.lastName }}</h3>
              <span class="id-tag">REF: {{ patient.id.toString().slice(0, 8).toUpperCase() }}</span>
            </div>
          </div>
          <span :class="['status-badge', patient.status]">
            <span class="pulse-dot"></span>
            {{ patient.status.replace("_", " ") }}
          </span>
        </div>

        <div class="card-body">
          <div class="info-row">
            <div class="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>{{ patient.phone }}</span>
            </div>
            <div class="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span class="blood-type">{{ patient.bloodGroup || 'N/A' }}</span>
            </div>
          </div>

          <div class="info-details-box">
            <div class="detail">
              <label>Besoin</label>
              <p>{{ patient.besoinMedical || "Consultation Générale" }}</p>
            </div>
            <div class="detail">
              <label>Assignation</label>
              <p>{{ patient.roomId ? 'Chambre ' + patient.roomId : 'Non assigné' }}</p>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <router-link :to="`/patients/details/${patient.id}`" class="btn-action detail-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Dossier
          </router-link>

          <button @click="modifier(patient)" class="btn-action edit" title="Modifier">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path
                d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>

          <button @click="supp(patient.id)" class="btn-action delete" title="Supprimer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
/* --- FOND & BASE --- */
.patients-page {
  background-color: #f8fafc;
  min-height: 100vh;
  padding: 40px;
  font-family: 'Inter', -apple-system, sans-serif;
}

/* --- HEADER --- */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-circle-main {
  background: #0d9488;
  color: white;
  width: 56px;
  height: 56px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.2);
}

.icon-circle-main svg {
  width: 28px;
}

h1 {
  font-size: 1.75rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
}

.subtitle {
  color: #64748b;
  font-weight: 500;
  margin-top: 4px;
}

.btn-add-main {
  background: #0f172a;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-add-main:hover {
  transform: translateY(-2px);
  background: #1e293b;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.btn-add-main svg {
  width: 18px;
}

/* --- FILTRES --- */
.filters-container {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  color: #94a3b8;
}

.search-input-wrapper input {
  width: 100%;
  padding: 14px 14px 14px 48px;
  border-radius: 16px;
  border: 1.5px solid #e2e8f0;
  background: white;
  outline: none;
  transition: 0.2s;
  font-size: 0.95rem;
}

.search-input-wrapper input:focus {
  border-color: #0d9488;
  box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1);
}

.select-wrapper {
  position: relative;
  width: 260px;
}

.filter-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  color: #94a3b8;
  pointer-events: none;
}

.chevron-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  color: #94a3b8;
  pointer-events: none;
}

.select-wrapper select {
  width: 100%;
  appearance: none;
  padding: 14px 40px 14px 48px;
  border-radius: 16px;
  border: 1.5px solid #e2e8f0;
  background: white;
  font-weight: 600;
  color: #475569;
  outline: none;
  cursor: pointer;
}

/* --- GRID & CARDS --- */
.patients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.patient-card {
  background: white;
  border-radius: 24px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.patient-card:hover {
  transform: translateY(-5px);
  border-color: #0d9488;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.patient-main-info {
  display: flex;
  gap: 14px;
}

.avatar-box {
  width: 52px;
  height: 52px;
  background: #f0fdfa;
  color: #0d9488;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.15rem;
  border: 1.5px solid #ccfbf1;
}

.name-id h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.01em;
}

.id-tag {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
}

/* Status Badge */
.status-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.status-badge.consultation {
  background: #e0f2fe;
  color: #0369a1;
}

.status-badge.hospitalise {
  background: #fee2e2;
  color: #b91c1c;
}

.status-badge.sorti {
  background: #f0fdf4;
  color: #15803d;
}

.status-badge.transfere {
  background: #fef3c7;
  color: #b45309;
}

/* Card Body */
.card-body {
  flex: 1;
}

.info-row {
  display: flex;
  gap: 20px;
  margin-bottom: 18px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #475569;
  font-weight: 600;
}

.info-item svg {
  width: 16px;
  color: #94a3b8;
}

.blood-type {
  color: #ef4444;
  font-weight: 800;
}

.info-details-box {
  background: #f8fafc;
  border-radius: 18px;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.detail label {
  font-size: 0.65rem;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.detail p {
  margin: 4px 0 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e293b;
}

/* Card Footer */
.card-footer {
  margin-top: 24px;
  display: flex;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
}

.btn-action {
  height: 44px;
  border-radius: 12px;
  border: 1.5px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
  font-family: inherit;
}

.detail-btn {
  flex: 2;
  gap: 10px;
  background: #f0fdfa;
  border-color: #ccfbf1;
  color: #0d9488;
  font-weight: 700;
  font-size: 0.85rem;
  text-decoration: none;
}

.detail-btn svg {
  width: 18px;
}

.detail-btn:hover {
  background: #0d9488;
  color: white;
  border-color: #0d9488;
  transform: translateY(-2px);
}

.edit,
.delete {
  flex: 0 0 44px;
}

.edit:hover {
  border-color: #0d9488;
  color: #0d9488;
  background: #f0fdfa;
}

.delete:hover {
  border-color: #ef4444;
  color: #ef4444;
  background: #fef2f2;
}
/* ================= MODAL ================= */

.custom-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.custom-modal {
  background: white;
  padding: 30px;
  border-radius: 24px;
  width: 400px;
  text-align: center;
  animation: fadeInScale 0.25s ease;
}

.custom-modal-actions {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
}

.modal-cancel {
  padding: 10px 18px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  background: white;
  cursor: pointer;
  font-weight: 600;
}

.modal-confirm {
  padding: 10px 18px;
  border-radius: 12px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

/* ================= NOTIFICATIONS ================= */

.custom-notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  z-index: 10000;
}

.custom-toast {
  padding: 14px 20px;
  border-radius: 14px;
  font-weight: 700;
  color: white;
  min-width: 250px;
  animation: slideInRight 0.3s ease;
}

.custom-toast.success {
  background: #10b981;
}

.custom-toast.danger {
  background: #ef4444;
}

/* Animations */

@keyframes slideInRight {
  from {
    transform: translateX(120%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeInScale {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}


.btn-action svg {
  width: 18px;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .patients-page {
    padding: 20px;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }

  .filters-container {
    flex-direction: column;
  }

  .select-wrapper {
    width: 100%;
  }
}
</style>